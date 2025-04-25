
import React from "react";
import { AlertTriangle, Shield, Info, Smartphone, CreditCard, Check } from "lucide-react";

const Education = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">UPI Safety Guide</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Learn how to protect yourself from UPI frauds and scams with these essential safety tips and guidelines.
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="bg-purple-600 text-white p-4 flex items-center">
              <AlertTriangle className="mr-2" size={20} />
              <h2 className="text-xl font-semibold">Common UPI Scams</h2>
            </div>
            <div className="p-6">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-red-100 p-2 rounded-full mr-3 mt-1">
                    <AlertTriangle className="text-red-500" size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Fake Payment Requests</h3>
                    <p className="text-gray-700">Scammers send money "request" notifications instead of payments. Always verify if you're sending or receiving money.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-red-100 p-2 rounded-full mr-3 mt-1">
                    <AlertTriangle className="text-red-500" size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">QR Code Scams</h3>
                    <p className="text-gray-700">Fraudsters ask you to scan QR codes to "receive" money, but they're actually designed to withdraw money from your account.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-red-100 p-2 rounded-full mr-3 mt-1">
                    <AlertTriangle className="text-red-500" size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Phishing Messages</h3>
                    <p className="text-gray-700">Messages claiming your UPI account will be blocked unless you update your KYC by following a malicious link.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="bg-green-600 text-white p-4 flex items-center">
              <Shield className="mr-2" size={20} />
              <h2 className="text-xl font-semibold">Safety Rules</h2>
            </div>
            <div className="p-6">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-3 mt-1">
                    <Check className="text-green-600" size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Verify UPI IDs</h3>
                    <p className="text-gray-700">Always double-check the UPI ID before sending money. Look for suspicious handles or unusual bank names.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-3 mt-1">
                    <Check className="text-green-600" size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Never Share OTPs</h3>
                    <p className="text-gray-700">No legitimate service will ever ask for your UPI PIN or OTP. Never share these with anyone, even if they claim to be bank officials.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-3 mt-1">
                    <Check className="text-green-600" size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Be Cautious with Payment Requests</h3>
                    <p className="text-gray-700">Always verify who is requesting money from you. If suspicious, contact the person directly through other means.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="bg-blue-600 text-white p-4 flex items-center">
              <Info className="mr-2" size={20} />
              <h2 className="text-xl font-semibold">If You've Been Scammed</h2>
            </div>
            <div className="p-6">
              <ol className="space-y-4 list-decimal pl-5">
                <li>
                  <p className="text-gray-700"><span className="font-semibold">Report to your bank immediately</span> - Call your bank's 24x7 helpline to report the fraudulent transaction.</p>
                </li>
                <li>
                  <p className="text-gray-700"><span className="font-semibold">File a complaint on NPCI</span> - Visit the NPCI website or use their official app to file a formal complaint.</p>
                </li>
                <li>
                  <p className="text-gray-700"><span className="font-semibold">Contact cybercrime helpline</span> - Call 1930 or visit cybercrime.gov.in to register a complaint.</p>
                </li>
                <li>
                  <p className="text-gray-700"><span className="font-semibold">File a police complaint</span> - Visit your local police station to file an FIR for financial fraud.</p>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
