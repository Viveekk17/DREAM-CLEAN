import { useState, useEffect } from "react";
import { MapPin, Clock, CheckCircle, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

interface Complaint {
  id: string;
  title: string;
  description: string;
  location_address: string;
  category: string;
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

const PublicDashboard = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = () => {
    try {
      setLoading(true);
      const stored = localStorage.getItem('complaints');
      if (stored) {
        const data = JSON.parse(stored);
        setComplaints(data.sort((a: Complaint, b: Complaint) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        ));
      }
    } catch (error) {
      console.error('Error loading complaints:', error);
      toast.error('Failed to load complaints');
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics
  const stats = {
    total: complaints.length,
    resolved: complaints.filter(c => c.status === 'resolved').length,
    pending: complaints.filter(c => c.status === 'pending').length,
    inProgress: complaints.filter(c => c.status === 'in_progress').length,
  };

  const completionPercentage = stats.total === 0 ? 0 : Math.round((stats.resolved / stats.total) * 100);
  const inProgressPercentage = stats.total === 0 ? 0 : Math.round((stats.inProgress / stats.total) * 100);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'in_progress':
        return <AlertCircle className="h-4 w-4" />;
      case 'resolved':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Public Complaints Dashboard</h1>
            <p className="text-xl text-muted-foreground">
              Track waste management issues and resolution progress
            </p>
          </div>

          {/* Completion Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-green-600">{completionPercentage}%</span>
                    <span className="text-xs text-muted-foreground">Completed</span>
                  </div>
                  <Progress value={completionPercentage} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {stats.resolved} of {stats.total} issues resolved
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">{inProgressPercentage}%</span>
                    <span className="text-xs text-muted-foreground">Working on</span>
                  </div>
                  <Progress value={inProgressPercentage} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {stats.inProgress} issues being addressed
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Issues:</span>
                  <span className="font-semibold">{stats.total}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Pending:</span>
                  <span className="font-semibold text-yellow-600">{stats.pending}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Resolved:</span>
                  <span className="font-semibold text-green-600">{stats.resolved}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Complaints List */}
          <Card>
            <CardHeader>
              <CardTitle>All Reported Issues</CardTitle>
              <CardDescription>
                Click on any issue to view full details
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Loading complaints...</p>
                </div>
              ) : complaints.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <p>No complaints reported yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {complaints.map((complaint) => (
                    <div key={complaint.id} className="border rounded-lg overflow-hidden">
                      {/* Complaint Summary */}
                      <button
                        onClick={() => setExpandedId(expandedId === complaint.id ? null : complaint.id)}
                        className="w-full text-left p-4 hover:bg-gray-50 transition-colors flex items-start gap-4"
                      >
                        <div className={`p-2 rounded-full ${getStatusColor(complaint.status)} shrink-0`}>
                          {getStatusIcon(complaint.status)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg truncate">{complaint.title}</h3>
                            <Badge variant="secondary" className="text-xs capitalize shrink-0">
                              {complaint.category.replace('_', ' ')}
                            </Badge>
                            <Badge className={`text-xs capitalize shrink-0 ${getStatusColor(complaint.status)}`}>
                              {complaint.status.replace('_', ' ')}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground truncate mb-2">
                            {complaint.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {complaint.location_address}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {new Date(complaint.created_at).toLocaleDateString()}
                              </div>
                            </div>
                            {expandedId === complaint.id ? (
                              <ChevronUp className="h-5 w-5 text-muted-foreground" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-muted-foreground" />
                            )}
                          </div>
                        </div>
                      </button>

                      {/* Expanded Details */}
                      {expandedId === complaint.id && (
                        <div className="bg-gray-50 border-t p-4 space-y-4">
                          {/* Full Description */}
                          <div>
                            <h4 className="font-semibold text-sm mb-2">Full Description</h4>
                            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                              {complaint.description}
                            </p>
                          </div>

                          {/* Image if available */}
                          {complaint.image_url && (
                            <div>
                              <h4 className="font-semibold text-sm mb-2">Issue Image</h4>
                              <img
                                src={complaint.image_url}
                                alt="Complaint"
                                className="rounded-lg max-h-80 object-cover"
                              />
                            </div>
                          )}

                          {/* Location Info */}
                          <div>
                            <h4 className="font-semibold text-sm mb-2">Location Details</h4>
                            <div className="text-sm text-muted-foreground">
                              <p>📍 {complaint.location_address}</p>
                              <p>📅 Reported on: {new Date(complaint.created_at).toLocaleString()}</p>
                            </div>
                          </div>

                          {/* Status Badge */}
                          <div>
                            <h4 className="font-semibold text-sm mb-2">Current Status</h4>
                            <Badge className={getStatusColor(complaint.status)}>
                              {complaint.status.replace('_', ' ').toUpperCase()}
                            </Badge>
                          </div>

                          {/* Success Progress */}
                          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                            <p className="text-sm font-semibold text-green-700 mb-2">Progress</p>
                            <Progress value={complaint.status === 'resolved' ? 100 : complaint.status === 'in_progress' ? 50 : 0} className="h-2" />
                            <p className="text-xs text-green-600 mt-2">{complaint.status === 'resolved' ? '✓ Completed' : complaint.status === 'in_progress' ? '⟳ In Progress' : '⏳ Pending'}</p>
                          </div>

                          {/* Assigned Worker Info */}
                          {complaint.assignedWorker ? (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                              <h4 className="font-semibold text-sm text-blue-700 mb-2">Assigned To</h4>
                              <div className="text-sm space-y-1">
                                <p><strong>Worker:</strong> {complaint.assignedWorker}</p>
                                <p><strong>Contact:</strong> {complaint.workerContact || 'N/A'}</p>
                                {complaint.workerDepartment && <p><strong>Department:</strong> {complaint.workerDepartment}</p>}
                              </div>
                            </div>
                          ) : (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                              <p className="text-sm text-yellow-700">⏳ Not yet assigned to a worker</p>
                            </div>
                          )}

                          {/* Citizen Contact Info */}
                          <div className="bg-gray-50 border rounded-lg p-3">
                            <h4 className="font-semibold text-sm mb-2">Reported By</h4>
                            <div className="text-sm space-y-1 text-muted-foreground">
                              <p>{complaint.userName}</p>
                              <p>{complaint.userEmail}</p>
                              {complaint.userPhone && <p>{complaint.userPhone}</p>}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PublicDashboard;
