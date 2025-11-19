import { Link, useNavigate } from "react-router-dom";
import { Leaf, Menu, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Public Dashboard", path: "/public" },
    { name: "Citizen Portal", path: "/citizen" },
    { name: "Admin Portal", path: "/admin" },
    { name: "About", path: "/about" },
    { name: "FAQ", path: "/faq" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Leaf className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-primary">DREAMCLEAN</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <User className="h-3 w-3" />
                {user.email}
              </span>
              <Button onClick={signOut} variant="outline" size="sm" className="flex items-center gap-1">
                <LogOut className="h-3 w-3" />
                Logout
              </Button>
            </div>
          ) : (
            <Button onClick={() => navigate('/auth')} variant="default" size="sm">
              Login
            </Button>
          )}
        </div>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64">
            <div className="flex flex-col space-y-4 mt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-base font-medium text-foreground/80 hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              {user ? (
                <>
                  <div className="text-sm text-muted-foreground py-2 border-t">
                    {user.email}
                  </div>
                  <Button onClick={signOut} variant="outline" className="w-full">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <Button onClick={() => navigate('/auth')} variant="default" className="w-full">
                  Login
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
