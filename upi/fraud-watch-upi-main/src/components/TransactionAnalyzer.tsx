import React, { useState } from "react";
import { Search, TrendingDown, TrendingUp, Bot } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { analyzeText } from "../services/aiService";

const validBankHandles = ['sbi', 'hdfc', 'icici', 'axis', 'kotak', 'ybl', 'okicici', 'okhdfcbank', 'upi'];

async function isSuspect(upi: string) {
  if (!upi.includes('@')) return true;
  const bankPart = upi.split('@')[1];
  if (!validBankHandles.some(handle => bankPart?.toLowerCase().includes(handle))) return true;
  if (/(test|fake|scam|wrong|dummy|random|freegift)/i.test(upi)) return true;
  
  return await analyzeText(upi);
}

export default function TransactionAnalyzer() {
  const [batch, setBatch] = useState("");
  const [summary, setSummary] = useState<null|{safe: number, suspicious: number, details: Record<string, string[]>}>(
    null
  );
  const [analyzing, setAnalyzing] = useState(false);

  async function analyzeList(e: React.FormEvent) {
    e.preventDefault();
    setAnalyzing(true);
    try {
      const lines = batch.split(/\s|,|;/).map(v => v.trim()).filter(Boolean);
      let safe = 0, suspicious = 0, details: Record<string, string[]> = { safe: [], suspicious: [] };
      
      await Promise.all(lines.map(async (upi) => {
        if (await isSuspect(upi)) {
          suspicious++;
          details.suspicious.push(upi);
        } else {
          safe++;
          details.safe.push(upi);
        }
      }));

      setSummary({ safe, suspicious, details });
    } catch (error) {
      console.error("Analysis error:", error);
    } finally {
      setAnalyzing(false);
    }
  }

  return (
    <div className="w-full p-4 border rounded-xl bg-soft-blue shadow mb-8 mt-2">
      <h3 className="font-semibold text-base text-blue-900 flex items-center gap-2 mb-2">
        <TrendingUp size={20} className="text-green-700" />
        Quick Transaction Analyzer
        <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full flex items-center gap-1">
          <Bot size={14} /> AI-Enhanced
        </span>
      </h3>
      <form onSubmit={analyzeList} className="flex flex-col md:flex-row gap-2">
        <Input
          value={batch}
          onChange={e => setBatch(e.target.value)}
          placeholder="Paste comma/space separated UPI IDs or links"
          className="border-blue-300 flex-1"
        />
        <Button variant="secondary" className="bg-blue-100 text-blue-800 font-semibold" disabled={analyzing || !batch.trim()}>
          {analyzing ? "Analyzing..." : (<><Search size={18} /> Analyze</>)}
        </Button>
      </form>
      {summary && (
        <div className="mt-4 space-y-2">
          <div className="flex gap-4 items-center text-sm">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800"><TrendingUp size={16} /> Safe: {summary.safe}</span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-700"><TrendingDown size={16} /> Suspicious: {summary.suspicious}</span>
          </div>
          {summary.suspicious > 0 && (
            <div className="mt-2 text-red-500 text-sm">
              Suspicious IDs: {summary.details.suspicious.join(", ")}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
