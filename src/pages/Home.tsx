import { Link } from "react-router-dom";
import { Users, Building2, ArrowRight, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-clean-city.jpg";
import citizenIcon from "@/assets/citizen-icon.jpg";
import adminIcon from "@/assets/admin-icon.jpg";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="container relative py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold gradient-eco bg-clip-text text-transparent">
              DREAMCLEAN
            </h1>
            <p className="text-2xl md:text-3xl text-muted-foreground">
              A Smarter Way to Keep Our City Clean
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join us in creating a cleaner, greener tomorrow through smart waste management 
              and community engagement. Report issues, track progress, and make a difference.
            </p>
          </div>
        </div>
      </section>

      {/* Dashboard Cards Section */}
      <section className="container py-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Public Dashboard Card */}
          <Link to="/public" className="group">
            <Card className="card-elevated h-full border-2 group-hover:border-primary transition-all">
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between">
                  <Globe className="h-12 w-12 text-primary" />
                  <ArrowRight className="h-6 w-6 text-primary group-hover:translate-x-2 transition-transform" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardTitle className="text-2xl">Public Dashboard</CardTitle>
                <CardDescription className="text-base">
                  View all reported complaints and their status in real-time. 
                  Track community issues and see what's being resolved.
                </CardDescription>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ View all complaints</li>
                  <li>✓ Filter by status</li>
                  <li>✓ See resolution progress</li>
                  <li>✓ Community transparency</li>
                </ul>
              </CardContent>
            </Card>
          </Link>

          {/* Citizen Dashboard Card */}
          <Link to="/citizen" className="group">
            <Card className="card-elevated h-full border-2 group-hover:border-primary transition-all">
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between">
                  <Users className="h-12 w-12 text-primary" />
                  <ArrowRight className="h-6 w-6 text-primary group-hover:translate-x-2 transition-transform" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardTitle className="text-2xl">Citizen Dashboard</CardTitle>
                <CardDescription className="text-base">
                  Report waste complaints, track status, and learn about proper waste segregation. 
                  Make your voice heard and contribute to a cleaner city.
                </CardDescription>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ Submit complaints with photos</li>
                  <li>✓ Track complaint status</li>
                  <li>✓ Waste segregation helper</li>
                  <li>✓ Location-based reporting</li>
                </ul>
              </CardContent>
            </Card>
          </Link>

          {/* Admin Dashboard Card */}
          <Link to="/admin" className="group">
            <Card className="card-elevated h-full border-2 group-hover:border-primary transition-all">
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between">
                  <Building2 className="h-12 w-12 text-primary" />
                  <ArrowRight className="h-6 w-6 text-primary group-hover:translate-x-2 transition-transform" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardTitle className="text-2xl">Municipal Dashboard</CardTitle>
                <CardDescription className="text-base">
                  Manage complaints efficiently, assign tasks to workers, and monitor city-wide 
                  waste management with real-time analytics.
                </CardDescription>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ View all complaints</li>
                  <li>✓ Assign tasks to workers</li>
                  <li>✓ Track resolution progress</li>
                  <li>✓ Analytics dashboard</li>
                </ul>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold">Why DREAMCLEAN?</h2>
            <p className="text-xl text-muted-foreground">
              Building a movement for community-driven cleanliness and digital transparency
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="text-5xl">📱</div>
              <h3 className="text-xl font-semibold">Easy Reporting</h3>
              <p className="text-muted-foreground">
                Simple interface to report waste issues with photos and GPS location
              </p>
            </div>

            <div className="space-y-4">
              <div className="text-5xl">🔄</div>
              <h3 className="text-xl font-semibold">Real-time Tracking</h3>
              <p className="text-muted-foreground">
                Monitor complaint status from submission to resolution
              </p>
            </div>

            <div className="space-y-4">
              <div className="text-5xl">♻️</div>
              <h3 className="text-xl font-semibold">Smart Segregation</h3>
              <p className="text-muted-foreground">
                AI-powered waste classification and disposal guidance
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
