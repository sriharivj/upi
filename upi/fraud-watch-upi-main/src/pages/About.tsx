
import React from "react";
import { Shield, Users, Server, ArrowRight } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <div className="rounded-full p-3 bg-purple-100 shadow-md inline-flex mb-6">
            <Shield className="text-purple-600" size={36} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About UPI Fraud Watch</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            We're committed to making digital payments safer for everyone in India by providing
            free fraud detection tools and educational resources.
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-6">
              UPI Fraud Watch was created to address the growing concern of digital payment frauds in India. 
              As UPI transactions become increasingly common, so do the sophisticated scams targeting users. 
              Our mission is to provide accessible tools that help everyday citizens protect themselves from 
              financial fraud through education and real-time verification.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="flex flex-col items-center text-center p-4 bg-purple-50 rounded-lg">
                <div className="rounded-full bg-purple-100 p-3 mb-3">
                  <Shield className="text-purple-600" size={24} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Protection</h3>
                <p className="text-sm text-gray-700">Helping users verify transactions before sending money</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4 bg-blue-50 rounded-lg">
                <div className="rounded-full bg-blue-100 p-3 mb-3">
                  <Users className="text-blue-600" size={24} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Education</h3>
                <p className="text-sm text-gray-700">Raising awareness about common UPI scams and prevention</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4 bg-green-50 rounded-lg">
                <div className="rounded-full bg-green-100 p-3 mb-3">
                  <Server className="text-green-600" size={24} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Technology</h3>
                <p className="text-sm text-gray-700">Using pattern detection to identify suspicious UPI IDs</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Help</h2>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-purple-100 p-2 rounded-full mr-3 mt-1">
                  <ArrowRight className="text-purple-600" size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Real-time UPI Verification</h3>
                  <p className="text-gray-700">Our tool instantly analyzes UPI IDs for suspicious patterns and known fraud indicators.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-purple-100 p-2 rounded-full mr-3 mt-1">
                  <ArrowRight className="text-purple-600" size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Batch Transaction Analysis</h3>
                  <p className="text-gray-700">Check multiple UPI IDs at once to identify potentially suspicious accounts in bulk.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-purple-100 p-2 rounded-full mr-3 mt-1">
                  <ArrowRight className="text-purple-600" size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Educational Resources</h3>
                  <p className="text-gray-700">Comprehensive guides on recognizing and avoiding UPI scams to keep you informed.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-purple-100 p-2 rounded-full mr-3 mt-1">
                  <ArrowRight className="text-purple-600" size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Free Access</h3>
                  <p className="text-gray-700">All our tools and resources are completely free to use for everyone, with no registration required.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm overflow-hidden p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Disclaimer</h2>
            <p className="text-gray-700">
              UPI Fraud Watch is an educational tool designed to help identify potentially suspicious UPI IDs and transactions.
              While we strive for accuracy, we cannot guarantee that all fraudulent accounts will be detected or that all 
              legitimate accounts will be verified as safe. Always exercise caution when making digital payments and verify
              the recipient through other means when in doubt. UPI Fraud Watch is not affiliated with any bank, NPCI, or 
              payment service provider.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
