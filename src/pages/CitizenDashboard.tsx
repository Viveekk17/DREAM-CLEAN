import { useState, useEffect } from "react";
import { MapPin, Camera, Upload, CheckCircle, Clock, AlertCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { wasteDatabase, searchWasteItem, type WasteItem } from "@/data/wasteData";

interface Complaint {
  id: string;
  title: string;
  description: string;
  location_address: string;
  category: string;
  location_lat: number | null;
  location_lng: number | null;
  status: string;
  created_at: string;
  image_url: string | null;
  userName: string;
  userEmail: string;
  userPhone?: string;
  assignedWorker?: string;
  workerContact?: string;
  workerDepartment?: string;
}

const CitizenDashboard = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [locationAddress, setLocationAddress] = useState("");
  const [category, setCategory] = useState("waste_collection");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  
  // Waste segregation state
  const [wasteType, setWasteType] = useState("");
  const [wasteResult, setWasteResult] = useState<WasteItem | null>(null);

  useEffect(() => {
    // Load complaints from localStorage
    const stored = localStorage.getItem('complaints');
    if (stored) {
      setComplaints(JSON.parse(stored));
    }
  }, []);

  const getGPSLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const address = `Location: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
        setLocationAddress(address);
        setLoading(false);
        toast.success('Location captured successfully!');
      },
      (error) => {
        console.error('Error getting location:', error);
        toast.error('Failed to get your location. Please enter manually.');
        setLoading(false);
      }
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image must be less than 5MB');
        return;
      }
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      // Convert image to base64 and store locally
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result as string);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    } catch (error: any) {
      console.error('Error processing image:', error);
      toast.error('Failed to process image');
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !locationAddress || !userName || !userEmail) {
      toast.error("Please fill in all required fields");
      return;
    }

    setUploading(true);

    try {
      let imageUrl = null;

      // Upload image if selected
      if (image) {
        imageUrl = await uploadImage(image);
      }

      // Create complaint object
      const newComplaint: Complaint = {
        id: Date.now().toString(),
        title,
        description,
        location_address: locationAddress,
        category,
        location_lat: null,
        location_lng: null,
        status: 'pending',
        created_at: new Date().toISOString(),
        image_url: imageUrl,
        userName,
        userEmail,
        userPhone: userPhone || undefined,
      };

      // Save to localStorage
      const updated = [newComplaint, ...complaints];
      setComplaints(updated);
      localStorage.setItem('complaints', JSON.stringify(updated));

      toast.success("Complaint submitted successfully!");
      
      // Reset form
      setTitle("");
      setDescription("");
      setLocationAddress("");
      setCategory("waste_collection");
      setImage(null);
      setImagePreview("");
      setUserName("");
      setUserEmail("");
      setUserPhone("");
    } catch (error: any) {
      console.error('Error submitting complaint:', error);
      toast.error('Failed to submit complaint. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleWasteSearch = () => {
    const result = searchWasteItem(wasteType);
    setWasteResult(result);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "in_progress":
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Citizen Portal</h1>
            <p className="text-xl text-muted-foreground">
              Report issues and learn about waste management
            </p>
          </div>

          <Tabs defaultValue="report" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="report">Report Issue</TabsTrigger>
              <TabsTrigger value="segregation">Waste Guide</TabsTrigger>
            </TabsList>

            <TabsContent value="report" className="space-y-6 mt-6">
              {/* Report Form */}
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle>Report a Waste Management Issue</CardTitle>
                  <CardDescription>
                    Share details about waste management issues in your area
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="userName">Your Name</Label>
                      <Input
                        id="userName"
                        placeholder="Enter your full name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="userEmail">Your Email</Label>
                      <Input
                        id="userEmail"
                        type="email"
                        placeholder="Enter your email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="userPhone">Your Phone (Optional)</Label>
                      <Input
                        id="userPhone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={userPhone}
                        onChange={(e) => setUserPhone(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="title">Issue Title</Label>
                      <Input
                        id="title"
                        placeholder="Brief description of the issue"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger id="category">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="waste_collection">Waste Collection</SelectItem>
                          <SelectItem value="illegal_dumping">Illegal Dumping</SelectItem>
                          <SelectItem value="overflow">Bin Overflow</SelectItem>
                          <SelectItem value="broken_bin">Broken Bin</SelectItem>
                          <SelectItem value="littering">Littering</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Provide detailed information about the issue"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        rows={4}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <div className="flex gap-2">
                        <Input
                          id="location"
                          placeholder="Enter address or use GPS"
                          value={locationAddress}
                          onChange={(e) => setLocationAddress(e.target.value)}
                          required
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={getGPSLocation}
                          disabled={loading}
                        >
                          <MapPin className="h-4 w-4 mr-2" />
                          {loading ? "Getting..." : "GPS"}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="image">Upload Image (Optional)</Label>
                      <div className="flex items-center gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById('image')?.click()}
                        >
                          <Camera className="h-4 w-4 mr-2" />
                          Choose Image
                        </Button>
                        <input
                          id="image"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                        {image && <span className="text-sm text-muted-foreground">{image.name}</span>}
                      </div>
                      {imagePreview && (
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="mt-4 rounded-lg max-h-48 object-cover"
                        />
                      )}
                    </div>

                    <Button type="submit" className="w-full" disabled={uploading}>
                      <Upload className="h-4 w-4 mr-2" />
                      {uploading ? "Submitting..." : "Submit Complaint"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* User's Complaints */}
              {complaints.length > 0 && (
                <Card className="card-elevated">
                  <CardHeader>
                    <CardTitle>All Complaints</CardTitle>
                    <CardDescription>Track your reported issues</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {complaints.map((complaint) => (
                        <div
                          key={complaint.id}
                          className="flex items-start gap-4 p-4 border rounded-lg"
                        >
                          {getStatusIcon(complaint.status)}
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{complaint.title}</h3>
                              <Badge variant="secondary" className="text-xs capitalize">
                                {complaint.category.replace("_", " ")}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {complaint.description}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              {complaint.location_address}
                            </div>
                          </div>
                          <Badge variant="outline" className="capitalize">
                            {complaint.status.replace("_", " ")}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="segregation" className="space-y-6 mt-6">
              {/* Waste Segregation Guide */}
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle>Waste Segregation Guide</CardTitle>
                  <CardDescription>
                    Learn how to properly dispose of different types of waste
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <Label htmlFor="waste-search">Search for a waste item</Label>
                    <div className="flex gap-2">
                      <Input
                        id="waste-search"
                        placeholder="e.g., plastic bottle, food scraps"
                        value={wasteType}
                        onChange={(e) => setWasteType(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleWasteSearch()}
                      />
                      <Button onClick={handleWasteSearch}>Search</Button>
                    </div>
                  </div>

                  {wasteResult && (
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        <div className="space-y-2">
                          <p className="font-semibold">{wasteResult.name}</p>
                          <p><strong>Category:</strong> {wasteResult.category}</p>
                          <p><strong>Classification:</strong> {wasteResult.classification}</p>
                          <div>
                            <strong>Instructions:</strong>
                            <ul className="mt-1 ml-4 list-disc text-sm">
                              {wasteResult.disposalInstructions.map((instruction, idx) => (
                                <li key={idx}>{instruction}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <Card>
                      <CardHeader className="bg-green-100 dark:bg-green-900">
                        <CardTitle className="text-lg">Wet Waste</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <p className="text-sm text-muted-foreground">
                          Biodegradable waste like food scraps, garden waste
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="bg-blue-100 dark:bg-blue-900">
                        <CardTitle className="text-lg">Dry Waste</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <p className="text-sm text-muted-foreground">
                          Recyclable items like paper, plastic, glass, metal
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="bg-gray-100 dark:bg-gray-800">
                        <CardTitle className="text-lg">Hazardous</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <p className="text-sm text-muted-foreground">
                          Batteries, electronics, chemicals, medical waste
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CitizenDashboard;
