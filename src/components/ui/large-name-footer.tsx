
"use client";

import { Link } from "react-router-dom";
import { Twitter, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";

function Footer() {
  return (
    <footer className="py-12 px-4 md:px-6 bg-background">
      <div className="w-full md:container md:mx-auto">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <Link to="/" className="flex items-center gap-2">
              <img src="/lovable-uploads/6d4123d7-e00c-4f84-a241-2205e79da083.png" alt="Logo" className="w-8" />
              <h2 className="text-lg font-bold">OpenAI Partner</h2>
            </Link>

            <div className="mt-2">
              <a href="https://x.com" target="_blank" rel="noopener noreferrer">
                <Button variant="secondary">
                  Behöver din vän vår tjänst? Dela!
                  <Twitter className="ml-1 w-3.5 h-3.5" />
                </Button>
              </a>
            </div>
            <p className="text-sm dark:text-gray-400 mt-5">
              © {new Date().getFullYear()} Prata AI. Alla rättigheter förbehållna.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Sidor</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#tjanster" className="text-gray-600 hover:text-white dark:text-gray-400 dark:hover:text-white">
                    Tjänster
                  </a>
                </li>
                <li>
                  <a href="#kundcase" className="text-gray-600 hover:text-white dark:text-gray-400 dark:hover:text-white">
                    Kundcase
                  </a>
                </li>
                <li>
                  <a href="#kontakt" className="text-gray-600 hover:text-white dark:text-gray-400 dark:hover:text-white">
                    Kontakt
                  </a>
                </li>
                <li>
                  <a href="#fragor" className="text-gray-600 hover:text-white dark:text-gray-400 dark:hover:text-white">
                    Frågor
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Sociala medier</h3>
              <ul className="space-y-2">
                <li>
                  <a href="https://www.mynewsdesk.com/se/prata-ai" className="text-gray-600 hover:text-white dark:text-gray-400 dark:hover:text-white">
                    MyNewsDesk
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/prata.ai/" className="text-gray-600 hover:text-white dark:text-gray-400 dark:hover:text-white">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/pratai" className="text-gray-600 hover:text-white dark:text-gray-400 dark:hover:text-white">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="https://x.com/prata_ai" className="text-gray-600 hover:text-white dark:text-gray-400 dark:hover:text-white">
                    X
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Rättsligt</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/privacy-policy" className="text-gray-600 hover:text-white dark:text-gray-400 dark:hover:text-white">
                    Integritetspolicy
                  </Link>
                </li>
                <li>
                  <Link to="/tos" className="text-gray-600 hover:text-white dark:text-gray-400 dark:hover:text-white">
                    Användarvillkor
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="w-full flex mt-4 items-center justify-center">
          <img src="/lovable-uploads/36d66259-ace7-4aa7-b7df-467af5899cd1.png" alt="prata.ai logo" className="h-auto w-auto max-h-[10rem]" />
        </div>
      </div>
    </footer>
  );
}

export { Footer };
