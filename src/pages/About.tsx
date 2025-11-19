import { Target, Users, Leaf } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold gradient-eco bg-clip-text text-transparent">
              About DREAMCLEAN
            </h1>
            <p className="text-xl text-muted-foreground">
              Building a movement for community-driven cleanliness and digital transparency
            </p>
          </div>

          <Card className="card-elevated">
            <CardContent className="pt-6 space-y-6">
              <div className="prose max-w-none">
                <p className="text-lg leading-relaxed">
                  DREAMCLEAN is a revolutionary smart waste management platform designed to bridge 
                  the gap between citizens and municipal corporations. Through innovative technology 
                  and community engagement, we're transforming how cities handle waste management 
                  and cleanliness initiatives.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="card-elevated text-center">
              <CardHeader>
                <Target className="h-12 w-12 mx-auto text-primary" />
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To create cleaner, greener cities through smart technology and community 
                  participation in waste management.
                </p>
              </CardContent>
            </Card>

            <Card className="card-elevated text-center">
              <CardHeader>
                <Users className="h-12 w-12 mx-auto text-primary" />
                <CardTitle>Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  A future where every citizen actively participates in keeping their city 
                  clean and sustainable.
                </p>
              </CardContent>
            </Card>

            <Card className="card-elevated text-center">
              <CardHeader>
                <Leaf className="h-12 w-12 mx-auto text-primary" />
                <CardTitle>Our Values</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Transparency, sustainability, community engagement, and technological innovation.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="text-2xl">Project Team</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Vivek Singh</h3>
                  <p className="text-muted-foreground">Project Developer & Co-Creator</p>
                </div>
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Mansi Somani</h3>
                  <p className="text-muted-foreground">Project Developer & Co-Creator</p>
                </div>
              </div>
              <div className="p-6 bg-primary/10 border-2 border-primary rounded-lg text-center">
                <h3 className="font-semibold text-lg mb-2">Dr. Anil Pawar</h3>
                <p className="text-muted-foreground">Project Director & Mentor</p>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated bg-primary/5 border-2 border-primary">
            <CardContent className="pt-6 text-center space-y-4">
              <h2 className="text-3xl font-bold text-primary">Clean India, Green India 🇮🇳</h2>
              <p className="text-lg text-muted-foreground">
                Join us in our mission to make India cleaner, greener, and more sustainable 
                for future generations.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
