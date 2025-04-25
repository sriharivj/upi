
import React, { useState, useEffect, useRef } from "react";
import ResultCard from "./ResultCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { MapPinCheck, AlertTriangle, Search, Bot } from "lucide-react";
import TransactionAnalyzer from "./TransactionAnalyzer";
import EducationalInfo from "./EducationalInfo";
import { analyzeText } from "../services/aiService";

const BLACKLIST = [
  "fraud@upi", "scammer@ybl", "fakeupi@", "random303@ybl", 
  "paytm@scam", "wrong@upi", "test@ybl", "dummy@paytm"
];

const SUSPICIOUS_PATTERNS = [
  /test/i, /dummy/i, /paytm(00|999)/i, /upi123/i, /freegift/i,
  /fake/i, /wrong/i, /scam/i, /random\d+/i, /qwerty/i, /asdf/i
];

// Common names associated with UPI scams
const SUSPICIOUS_NAMES = [
  "wrong", "invalid", "test", "fake", "fraud", "scam", "random", "unknown", "dummy"
];

function isLocationSuspicious(text: string) {
  const locationPattern = /paytm\.me|bit\.ly|linktr\.ee|tinyurl\.com|up\.to/g;
  return locationPattern.test(text.toLowerCase());
}

function isValidUPIFormat(text: string): boolean {
  const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/;
  return upiRegex.test(text);
}

function hasSuspiciousName(text: string): boolean {
  const namePart = text.split('@')[0].toLowerCase();
  return SUSPICIOUS_NAMES.some(name => namePart.includes(name));
}

async function checkUPI(text: string): Promise<{ status: "safe" | "fraud" | "unknown"; message: string }> {
  if (!text || text.length < 5) {
    return { status: "unknown", message: "Please enter a valid UPI ID or link." };
  }
  
  if (BLACKLIST.some(bl => text.toLowerCase().includes(bl))) {
    return { status: "fraud", message: "This UPI ID matches a known fraud database." };
  }
  
  if (SUSPICIOUS_PATTERNS.some(rx => rx.test(text))) {
    return { status: "fraud", message: "This UPI ID or link looks suspicious. Avoid sending money before verification." };
  }
  
  // Check for suspicious names in UPI ID
  if (hasSuspiciousName(text)) {
    return { status: "fraud", message: "This UPI ID contains suspicious keywords. Verify before proceeding." };
  }

  try {
    const isAISuspicious = await analyzeText(text);
    if (isAISuspicious) {
      return { 
        status: "fraud", 
        message: "AI analysis indicates this UPI ID might be suspicious. Please verify carefully." 
      };
    }
  } catch (error) {
    console.error("AI analysis error:", error);
    // Continue with other checks if AI fails
  }
  
  if (!text.includes('@')) {
    return { status: "fraud", message: "Invalid UPI ID format. UPI IDs must contain '@' symbol." };
  }
  
  const bankPart = text.split('@')[1];
  if (bankPart) {
    const validBankHandles = ['sbi', 'hdfc', 'icici', 'axis', 'kotak', 'ybl', 'okicici', 'okhdfcbank', 'upi'];
    if (!validBankHandles.some(handle => bankPart.toLowerCase().includes(handle))) {
      return { 
        status: "fraud", 
        message: "Unusual bank handle detected. Verify this UPI ID before proceeding." 
      };
    }
  }
  
  return { status: "safe", message: "No fraud detected. Always double-check before transferring money." };
}

function useDebounce(value: string, delay: number) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

export default function FraudChecker() {
  const [upi, setUpi] = useState("");
  const [result, setResult] = useState<{ status: "safe"|"fraud"|"unknown", message: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [manualScan, setManualScan] = useState(false);
  const [locationAlert, setLocationAlert] = useState(false);
  const debouncedUpi = useDebounce(upi.trim(), 350);

  useEffect(() => {
    if (!manualScan) {
      if (debouncedUpi.length > 0) {
        setLoading(true);
        checkUPI(debouncedUpi).then(res => {
          setResult(res);
          setLoading(false);
          setLocationAlert(isLocationSuspicious(debouncedUpi));
        });
      } else {
        setResult(null);
        setLocationAlert(false);
      }
    }
  }, [debouncedUpi, manualScan]);

  async function handleCheck(e: React.FormEvent) {
    e.preventDefault();
    setManualScan(true);
    setLoading(true);
    try {
      const res = await checkUPI(upi.trim());
      setResult(res);
      toast({
        title: res.status === "fraud" ? "Fraud Alert!" : "Scan complete",
        description: res.message,
      });
      setLocationAlert(isLocationSuspicious(upi));
    } catch (error) {
      console.error("Error during scan:", error);
      toast({
        title: "Error",
        description: "An error occurred during the scan. Please try again.",
      });
    } finally {
      setLoading(false);
      setManualScan(false);
    }
  }

  return (
    <div className="w-full flex flex-col items-center max-w-xl">
      <div className="w-full mb-4 flex items-center justify-between gap-2">
        <h2 className="text-xl font-bold text-purple-800 flex items-center gap-2">
          <Search className="text-purple-500" size={24} />
          UPI Scam Detector
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <Bot size={14} /> AI-Powered
          </span>
        </h2>
        <EducationalInfo />
      </div>
      <TransactionAnalyzer />
      <form
        onSubmit={handleCheck}
        className="w-full flex flex-col gap-4 bg-white border rounded-xl shadow-sm p-6 mb-4"
      >
        <label htmlFor="upi" className="font-medium text-left flex gap-1">
          Enter UPI ID or payment link
          <span className="text-xs text-gray-400">(live check)</span>
        </label>
        <Input
          id="upi"
          type="text"
          value={upi}
          placeholder="e.g. name@bank or paytm.me/xxxx"
          onChange={e => {
            setUpi(e.target.value);
            setManualScan(false);
          }}
          className="text-lg"
          required
        />
        <Button
          disabled={loading || upi.trim().length < 5}
          className="hover-scale bg-purple-600 text-white text-base font-semibold mt-2"
        >
          {loading ? "Scanning..." : "Scan for Fraud"}
        </Button>
      </form>

      {locationAlert && (
        <div className="w-full my-2 max-w-md flex items-center gap-2 p-3 rounded-lg border-l-4 border-yellow-400 bg-yellow-50 animate-fade-in text-yellow-900">
          <MapPinCheck className="text-yellow-800" size={22} />
          <span>
            <b>Location-based alert:</b> This link or handle may use a short link or unusual domain. Double-check legitimacy!
          </span>
        </div>
      )}

      {result && (
        <div className="animate-fade-in">
          <ResultCard status={result.status} message={result.message} />
        </div>
      )}

      <div className="text-left w-full max-w-xl mt-6 px-2">
        <h3 className="font-semibold mb-2 text-lg text-gray-800 flex items-center gap-1">
          <AlertTriangle className="text-yellow-500" size={18} />
          How does it work?
        </h3>
        <ul className="list-disc list-inside text-gray-600 space-y-1 text-base">
          <li>Real-time checks against known fraud UPI IDs and suspicious keywords.</li>
          <li>Validates UPI format and legitimate bank handles.</li>
          <li>Warnings for suspicious or location-based payment links.</li>
          <li>Batch analyzer for large lists of UPI IDs.</li>
          <li>Does <b>not</b> connect to your bank or process any payment.</li>
          <li>Results are educational only — always verify with your bank!</li>
        </ul>
      </div>
    </div>
  );
}
