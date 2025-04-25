import React from "react";
import FraudChecker from "../components/FraudChecker";
import Navbar from "../components/ui/layout/Navbar";
import Footer from "../components/ui/layout/Footer";
import ChatBot from "../components/ChatBot";
import { Shield } from "lucide-react";

const Index = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <div className="flex-grow bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 py-8 px-4">
      <header className="mb-10 flex flex-col items-center max-w-5xl mx-auto">
        <div className="rounded-full p-3 bg-purple-100 shadow-md mb-3 animate-fade-in">
          <Shield className="text-purple-600" size={36} />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 text-center">UPI Fraud Detection Tool</h1>
        <p className="text-lg text-gray-700 max-w-xl text-center animate-fade-in">
          Instantly check UPI IDs and payment links for signs of fraud. Stay safe while making UPI transactions in India.
        </p>
      </header>
      <main className="w-full flex flex-col items-center max-w-5xl mx-auto">
        <FraudChecker />
      </main>
    </div>
    <ChatBot />
    <Footer />
  </div>
);

export default Index;
