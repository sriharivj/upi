
import { ShieldCheck, ShieldAlert, AlertTriangle } from "lucide-react";

interface ResultCardProps {
  status: "safe" | "fraud" | "unknown";
  message: string;
}

const statusProps = {
  safe: {
    icon: <ShieldCheck className="text-green-600" size={42} />,
    label: "No Fraud Detected",
    bg: "bg-green-50 border-green-400",
  },
  fraud: {
    icon: <ShieldAlert className="text-red-500" size={42} />,
    label: "Potential Fraud",
    bg: "bg-red-50 border-red-400",
  },
  unknown: {
    icon: <AlertTriangle className="text-yellow-500" size={42} />,
    label: "Review Needed",
    bg: "bg-yellow-50 border-yellow-400",
  },
};

export default function ResultCard({ status, message }: ResultCardProps) {
  // Validate status and default to "unknown" if invalid
  const validStatus = statusProps[status] ? status : "unknown";
  const { icon, label, bg } = statusProps[validStatus];
  
  return (
    <div
      className={`w-full max-w-md mx-auto my-4 border-2 rounded-lg p-6 flex flex-col items-center shadow-lg animate-fade-in ${bg}`}
    >
      <div className="mb-2">{icon}</div>
      <div className="text-xl font-semibold mb-1">{label}</div>
      <div className="text-gray-700 text-center">{message}</div>
    </div>
  );
}
