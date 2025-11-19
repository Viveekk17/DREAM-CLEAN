import { Leaf } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-muted/30 mt-20">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold text-primary">DREAMCLEAN</span>
            </div>
            <p className="text-sm text-muted-foreground">
              A Smarter Way to Keep Our City Clean
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Citizen Dashboard</li>
              <li>Municipal Dashboard</li>
              <li>About Us</li>
              <li>FAQ</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Contact</h3>
            <p className="text-sm text-muted-foreground">
              Email: contact@dreamclean.in<br />
              Support: support@dreamclean.in
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center space-y-2">
          <p className="text-2xl font-semibold text-primary">
            Clean India, Green India 🇮🇳
          </p>
          <p className="text-sm text-muted-foreground">
            © 2025 DREAMCLEAN. Created by Vivek Singh & Mansi Somani. Directed by Dr. Anil Pawar.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
