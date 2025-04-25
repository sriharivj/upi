
import React from "react";
import { Shield, BookOpen, FileText, AlertTriangle, LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-purple-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Shield className="text-purple-600 mr-2" size={30} />
              <span className="text-lg font-semibold text-gray-900">UPI Fraud Watch</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-1">
              {isAuthenticated && (
                <>
                  <Link 
                    to="/" 
                    className="px-3 py-2 rounded-md text-sm font-medium text-purple-900 hover:bg-purple-50"
                  >
                    <div className="flex items-center gap-1">
                      <AlertTriangle size={16} />
                      <span>Fraud Scanner</span>
                    </div>
                  </Link>
                  <Link 
                    to="/education" 
                    className="px-3 py-2 rounded-md text-sm font-medium text-purple-900 hover:bg-purple-50"
                  >
                    <div className="flex items-center gap-1">
                      <BookOpen size={16} />
                      <span>Safety Guide</span>
                    </div>
                  </Link>
                  <Link 
                    to="/about" 
                    className="px-3 py-2 rounded-md text-sm font-medium text-purple-900 hover:bg-purple-50"
                  >
                    <div className="flex items-center gap-1">
                      <FileText size={16} />
                      <span>About Us</span>
                    </div>
                  </Link>
                </>
              )}
            </div>
            
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <div className="hidden md:flex items-center gap-1 text-sm px-3 py-1 bg-purple-50 rounded-full">
                  <User size={14} className="text-purple-700" />
                  <span className="text-purple-900">{user?.name}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <LogOut size={18} /> 
                  <span className="ml-1 hidden md:inline">Logout</span>
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="default" size="sm" className="bg-purple-600 hover:bg-purple-700">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
