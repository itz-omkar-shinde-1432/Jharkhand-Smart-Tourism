import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Menu, X, Coins, Globe } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Destinations", href: "#destinations" },
    { name: "Culture", href: "#culture" },
    { name: "Activities", href: "#activities" },
    { name: "Green Tokens", href: "/green-tokens" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full glass border-b backdrop-blur-md bg-white/95">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 hover:scale-105 transition-transform duration-300">
            <MapPin className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold text-gradient">Jharkhand Tourism</h1>
              <p className="text-xs text-muted-foreground">Smart Portal</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-all duration-300 hover:text-primary hover:scale-105 ${
                  location.pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/green-tokens">
              <Button variant="outline" size="sm" className="gap-2 btn-enhanced">
                <Coins className="h-4 w-4" />
                Virtual Cash
              </Button>
            </Link>
            
            {/* Partner Link */}
            <a 
              href="https://wander-lust-tourism-platform.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button variant="ghost" size="sm" className="gap-2 btn-enhanced">
                <Globe className="h-4 w-4" />
                Partner
              </Button>
            </a>

            <Button className="btn-enhanced btn-glow">
              <Link to="/trip-planner" className="text-white">
                Book Now
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t animate-scale-in">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 text-base font-medium transition-colors hover:text-primary ${
                    location.pathname === item.href
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-3 py-2 space-y-2">
                <Link to="/green-tokens">
                  <Button variant="outline" size="sm" className="w-full gap-2">
                    <Coins className="h-4 w-4" />
                    Virtual Cash
                  </Button>
                </Link>
                
                <a 
                  href="https://wander-lust-tourism-platform.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button variant="ghost" size="sm" className="w-full gap-2">
                    <Globe className="h-4 w-4" />
                    Partner Platform
                  </Button>
                </a>
                
                <Button className="w-full">
                  <Link to="/trip-planner" className="text-white w-full">
                    Book Now
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;