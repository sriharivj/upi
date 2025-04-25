
import React from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Info, Shield, AlertTriangle } from "lucide-react";

export default function EducationalInfo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          aria-label="UPI Safety Info"
          className="ml-1 p-1.5 rounded-full bg-yellow-100 hover:bg-yellow-200 hover:scale-110 transition-all duration-200 shadow-sm"
        >
          <Info className="text-yellow-700" size={22} />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-80 bg-white border-2 border-yellow-200 shadow-lg rounded-lg">
        <div className="flex items-center gap-2 mb-3">
          <Shield className="text-yellow-700" size={20} />
          <span className="font-semibold text-yellow-950 text-lg">UPI Safety Tips</span>
        </div>
        
        <div className="mb-3 flex items-start gap-2 p-2 bg-yellow-50 rounded-md">
          <AlertTriangle className="text-yellow-700 mt-0.5 flex-shrink-0" size={16} />
          <p className="text-yellow-800 text-sm">
            Always verify before sending money to unknown UPI IDs
          </p>
        </div>
        
        <ol className="text-yellow-900 text-sm space-y-2 pl-4 list-decimal">
          <li className="pl-1">Double-check the UPI ID before sending money, especially for new recipients.</li>
          <li className="pl-1">Never share OTPs or banking passwords with anyone, including bank officials.</li>
          <li className="pl-1">If unsure, confirm with the recipient by call or SMS first.</li>
          <li className="pl-1">Be wary of UPI IDs with random digits, words like "test", "fake", or unusual bank handles.</li>
          <li className="pl-1">Report fraudulent transactions to your bank and on NPCI immediately!</li>
        </ol>
        
        <div className="mt-3 text-xs text-yellow-800 bg-yellow-50 p-2 rounded-md">
          Call <span className="font-semibold">1930</span> (Cybercrime Helpline) or visit <span className="font-semibold">cybercrime.gov.in</span> to report UPI fraud
        </div>
      </PopoverContent>
    </Popover>
  );
}
