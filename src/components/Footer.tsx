import { MapPin, Mail, Phone, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-forest-dark to-primary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Government Logo & Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-8 w-8 text-secondary" />
              <div>
                <h3 className="text-xl font-bold">Jharkhand Tourism</h3>
                <p className="text-sm text-gray-300">Government of Jharkhand</p>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              Official tourism portal promoting the natural beauty, rich culture, and heritage of Jharkhand state.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <nav className="space-y-2">
              <Link to="/about" className="block text-sm text-gray-300 hover:text-secondary transition-colors">
                About Jharkhand
              </Link>
              <Link to="/destinations" className="block text-sm text-gray-300 hover:text-secondary transition-colors">
                Destinations
              </Link>
              <Link to="/culture" className="block text-sm text-gray-300 hover:text-secondary transition-colors">
                Culture & Heritage
              </Link>
              <Link to="/trip-planner" className="block text-sm text-gray-300 hover:text-secondary transition-colors">
                Plan Your Trip
              </Link>
            </nav>
          </div>

          {/* Government Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Government</h4>
            <nav className="space-y-2">
              <a href="#" className="block text-sm text-gray-300 hover:text-secondary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="block text-sm text-gray-300 hover:text-secondary transition-colors">
                Terms & Conditions
              </a>
              <a href="#" className="block text-sm text-gray-300 hover:text-secondary transition-colors">
                Accessibility
              </a>
              <a href="#" className="block text-sm text-gray-300 hover:text-secondary transition-colors">
                RTI
              </a>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-secondary" />
                <span className="text-sm text-gray-300">tourism@jharkhand.gov.in</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-secondary" />
                <span className="text-sm text-gray-300">+91-651-2446666</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-secondary" />
                <span className="text-sm text-gray-300">jharkhandtourism.gov.in</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-300">
            © 2025 Government of Jharkhand Tourism. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-xs text-gray-400">National Informatics Centre</span>
            <span className="text-xs text-gray-400">|</span>
            <span className="text-xs text-gray-400">Digital India Initiative</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;