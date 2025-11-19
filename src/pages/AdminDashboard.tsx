import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Clock, AlertCircle, Edit2, Save, X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

interface Complaint {
  id: string;
  title: string;
  description: string;
  location_address: string;
  category: string;
  image_url: string | null;
  status: string;
  created_at: string;
  userName: string;
  userEmail: string;
  userPhone?: string;
  assignedWorker?: string;
  workerContact?: string;
  workerDepartment?: string;
}

const AdminDashboard = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editStatus, setEditStatus] = useState<string>("");
  const [showWorkerModal, setShowWorkerModal] = useState<string | null>(null);
  const [workerForm, setWorkerForm] = useState({ name: '', contact: '', department: '' });

  useEffect(() => {
    if (!user) {
      toast.error("Please login to access this page");
      navigate('/auth');
      return;
    }
    
    if (!isAdmin) {
      toast.error("Access denied. Admin privileges required.");
      navigate('/');
      return;
    }
    
    loadComplaints();
  }, [user, isAdmin, navigate]);

  const loadComplaints = () => {
    try {
      setLoading(true);
      const stored = localStorage.getItem('complaints');
      if (stored) {
        setComplaints(JSON.parse(stored));
      }
    } catch (error) {
      toast.error('Failed to load complaints');
    } finally {
      setLoading(false);
    }
  };

  const updateComplaintStatus = (id: string, newStatus: string) => {
    const updated = complaints.map(c => 
      c.id === id ? { ...c, status: newStatus } : c
    );
    setComplaints(updated);
    localStorage.setItem('complaints', JSON.stringify(updated));
    setEditingId(null);
    toast.success('Status updated');
  };

  const deleteComplaint = (id: string) => {
    const updated = complaints.filter(c => c.id !== id);
    setComplaints(updated);
    localStorage.setItem('complaints', JSON.stringify(updated));
    toast.success('Complaint deleted');
  };

  const assignWorker = (id: string) => {
    if (!workerForm.name || !workerForm.contact) {
      toast.error('Please fill worker name and contact');
      return;
    }
    const updated = complaints.map(c => 
      c.id === id ? { 
        ...c, 
        assignedWorker: workerForm.name,
        workerContact: workerForm.contact,
        workerDepartment: workerForm.department
      } : c
    );
    setComplaints(updated);
    localStorage.setItem('complaints', JSON.stringify(updated));
    setShowWorkerModal(null);
    setWorkerForm({ name: '', contact: '', department: '' });
    toast.success('Worker assigned');
  };

  const filteredComplaints = selectedCategory === 'all' 
    ? complaints 
    : complaints.filter(c => c.category === selectedCategory);

  const stats = {
    total: complaints.length,
    pending: complaints.filter(c => c.status === 'pending').length,
    inProgress: complaints.filter(c => c.status === 'in_progress').length,
    resolved: complaints.filter(c => c.status === 'resolved').length,
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'in_progress':
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
      case 'resolved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container py-12">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage complaints and track issues</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Complaints</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.total}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-600">{stats.pending}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">{stats.inProgress}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Resolved</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">{stats.resolved}</div>
              </CardContent>
            </Card>
          </div>

          {/* Filter */}
          <div className="flex gap-4 items-center">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="waste_collection">Waste Collection</SelectItem>
                <SelectItem value="illegal_dumping">Illegal Dumping</SelectItem>
                <SelectItem value="overflow">Bin Overflow</SelectItem>
                <SelectItem value="broken_bin">Broken Bin</SelectItem>
                <SelectItem value="littering">Littering</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={loadComplaints} variant="outline">Refresh</Button>
          </div>

          {/* Complaints List */}
          <Card>
            <CardHeader>
              <CardTitle>Complaints ({filteredComplaints.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">Loading...</div>
              ) : filteredComplaints.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">No complaints found</div>
              ) : (
                <div className="space-y-4">
                  {filteredComplaints.map(complaint => (
                    <div key={complaint.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {getStatusIcon(complaint.status)}
                            <h3 className="font-semibold text-lg">{complaint.title}</h3>
                            <Badge variant="secondary">{complaint.category.replace('_', ' ')}</Badge>
                          </div>
                          <p className="text-muted-foreground text-sm mb-2">{complaint.description}</p>
                          <p className="text-xs text-muted-foreground">📍 {complaint.location_address}</p>
                          <p className="text-xs text-muted-foreground">📅 {new Date(complaint.created_at).toLocaleString()}</p>
                          
                          {complaint.image_url && (
                            <div className="mt-2">
                              <img src={complaint.image_url} alt="Complaint" className="max-h-32 rounded" />
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-2 border-t flex-wrap">
                        {editingId === complaint.id ? (
                          <>
                            <Select value={editStatus} onValueChange={setEditStatus}>
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="in_progress">In Progress</SelectItem>
                                <SelectItem value="resolved">Resolved</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button 
                              size="sm" 
                              onClick={() => updateComplaintStatus(complaint.id, editStatus)}
                            >
                              <Save className="h-4 w-4 mr-1" />
                              Save
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => setEditingId(null)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        ) : (
                          <>
                            <Badge variant="outline" className="capitalize">
                              {complaint.status.replace('_', ' ')}
                            </Badge>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => {
                                setEditingId(complaint.id);
                                setEditStatus(complaint.status);
                              }}
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="secondary"
                              onClick={() => {
                                setWorkerForm({
                                  name: complaint.assignedWorker || '',
                                  contact: complaint.workerContact || '',
                                  department: complaint.workerDepartment || ''
                                });
                                setShowWorkerModal(complaint.id);
                              }}
                            >
                              Assign Worker
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => deleteComplaint(complaint.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Worker Assignment Modal */}
      <Dialog open={!!showWorkerModal} onOpenChange={() => setShowWorkerModal(null)}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Assign Worker</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Worker Name</Label>
              <Input
                placeholder="Enter worker name"
                value={workerForm.name}
                onChange={(e) => setWorkerForm(prev => ({...prev, name: e.target.value}))}
              />
            </div>
            <div className="space-y-2">
              <Label>Worker Contact</Label>
              <Input
                placeholder="Enter phone/email"
                value={workerForm.contact}
                onChange={(e) => setWorkerForm(prev => ({...prev, contact: e.target.value}))}
              />
            </div>
            <div className="space-y-2">
              <Label>Department</Label>
              <Input
                placeholder="e.g., Sanitation"
                value={workerForm.department}
                onChange={(e) => setWorkerForm(prev => ({...prev, department: e.target.value}))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowWorkerModal(null)}>Cancel</Button>
            <Button onClick={() => showWorkerModal && assignWorker(showWorkerModal)}>Assign</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
