
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { TopNavBackdrop } from "@/components/TopNavBackdrop";
import { Footer } from "@/components/ui/large-name-footer";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Use the same TopNavBackdrop as the landing page */}
      <TopNavBackdrop />

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center px-4 pt-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">404</h1>
          <p className="text-xl text-foreground/70 mb-4">Oops! Page not found</p>
          <Link to="/" className="text-primary hover:text-primary/80 underline transition-colors">
            Return to Home
          </Link>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default NotFound;
