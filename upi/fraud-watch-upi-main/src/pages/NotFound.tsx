
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/ui/layout/Navbar";
import Footer from "../components/ui/layout/Footer";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 px-4">
        <div className="text-center max-w-md bg-white p-8 rounded-xl shadow-sm">
          <div className="flex justify-center mb-4">
            <div className="bg-red-100 p-3 rounded-full">
              <AlertTriangle className="text-red-500" size={40} />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2 text-gray-900">Page Not Found</h1>
          <p className="text-gray-600 mb-6">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-5 rounded-md transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
