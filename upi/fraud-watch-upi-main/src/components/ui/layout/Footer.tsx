
import React from "react";
import { Link } from "react-router-dom";
import { Shield, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-purple-50 border-t border-purple-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Shield className="text-purple-600 mr-2" size={24} />
            <span className="text-md font-semibold text-gray-900">UPI Fraud Watch</span>
          </div>
          
          <div className="flex gap-6">
            <Link to="/" className="text-sm text-purple-800 hover:text-purple-600">
              Home
            </Link>
            <Link to="/education" className="text-sm text-purple-800 hover:text-purple-600">
              Safety Guide
            </Link>
            <Link to="/about" className="text-sm text-purple-800 hover:text-purple-600">
              About Us
            </Link>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-purple-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} UPI Fraud Watch. Not affiliated with any bank. For educational purposes only.
            </p>
            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <a 
                href="https://npci.org.in/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-xs text-purple-700 hover:text-purple-900 flex items-center"
              >
                NPCI Guidelines <ExternalLink size={12} className="ml-1" />
              </a>
              <span className="text-gray-300">|</span>
              <a 
                href="https://www.rbi.org.in/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-xs text-purple-700 hover:text-purple-900 flex items-center"
              >
                RBI Rules <ExternalLink size={12} className="ml-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
