import React from "react";
import { Sparkles, SlidersHorizontal, ArrowRight, Check, Eye } from "lucide-react";
import ComponentLabel from "./ComponentLabel";

interface AgenticAIProps {
  onAdvanceToCanvas: () => void;
}

const CLV_SPLITS = [
  { tier: "Low CLV Cohort", count: "4,048", pct: "28%", arpu: "₺52", color: "bg-[#7E8A9A]", text: "#7E8A9A", offer: "1 GB Free Data Top-off (Retention focus)", propensity: "22%" },
  { tier: "Mid CLV Cohort", count: "7,380", pct: "51%", arpu: "₺87", color: "bg-[#3E7FD4]", text: "#3E7FD4", offer: "Next Tier Upgrade (20% Off / 3 Months)", propensity: "31%" },
  { tier: "High CLV Cohort", count: "3,042", pct: "21%", arpu: "₺148", color: "bg-[#62AB47]", text: "#62AB47", offer: "Curated Postpaid Match + 500 Legacy Points", propensity: "41%" }
];

export default function AgenticAI({ onAdvanceToCanvas }: AgenticAIProps) {
  return (
    <div className="space-y-4 animate-fade-in font-sans">
      <div className="flex items-center gap-3">
        <ComponentLabel component="ai" />
        <h2 className="text-xl font-bold text-[#2B3445] tracking-tight">Agentic AI Copilot Recommendations</h2>
        <span className="bg-[#F5F0FF] text-[#7E4FCF] text-[10px] px-2 py-0.5 rounded font-black">
          STRATEGY + CLV COGNITIVE AGENTS ACTIVE
        </span>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded p-3 text-[11.5px] text-[#505B79] leading-relaxed flex items-center gap-2">
        <Sparkles size={14} className="text-[#7E4FCF]" />
        <span>
          Atya Intelligent Copilot agents have evaluated active variables. Recommendation finalized below based on elastic subscriber propensities.
        </span>
      </div>

      {/* CLV splits */}
      <h3 className="text-xs font-bold text-[#62AB47] uppercase tracking-wider mb-2 mt-4">1. Smart Customer Segmentation splits</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {CLV_SPLITS.map((split, idx) => (
          <div key={idx} className="bg-white border border-[#EEF2F7] rounded-md p-4.5 shadow-xs relative">
            <div className="flex items-center gap-2 mb-2">
              <span className={`w-2.5 h-2.5 rounded-full ${split.color}`} />
              <span className="font-bold text-xs uppercase text-[#505B79] tracking-wider">{split.tier}</span>
              <span className="text-[10px] text-[#A6AEBD] font-black font-mono ml-auto">{split.pct} of group</span>
            </div>
            <div className="text-2xl font-black text-[#2B3445] tracking-tight">{split.count}</div>
            <div className="text-[10.5px] text-[#7E8A9A] mt-1 mb-3">Subscribers · average ARPU: <strong className="text-slate-700">{split.arpu}</strong></div>
            
            <div className="border-t border-[#EEF2F7] pt-2 mb-2">
              <div className="text-[10px] text-[#A6AEBD] font-bold uppercase tracking-wider mb-1">Assigned Offer</div>
              <div className="text-xs font-bold text-[#2B3445] line-clamp-1">{split.offer}</div>
            </div>
            
            <div className="flex justify-between items-center text-[10.5px] text-[#7E8A9A] font-medium pt-1 border-t border-dashed border-[#F1F4F8]">
              <span>Acceptance Propensity</span>
              <span className="text-[#3E9232] font-black">{split.propensity}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
        {/* Delivery setups */}
        <div className="lg:col-span-2 bg-white border border-[#EEF2F7] rounded-md p-4 shadow-xs">
          <h4 className="text-xs font-bold text-[#62AB47] uppercase tracking-wider mb-3">2. Delivery configurations & Guardrails</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-[#505B79]">
            {[
              { label: "Optimal Channels", value: "Primary App Push, SMS fallback after 24 hrs" },
              { label: "Delivery Timing", value: "STO (Send Time Optimization) model enabled" },
              { label: "Holdout Control Group", value: "10% separated for strict metrics validation" },
              { label: "Fatigue policy applied", value: "Max 2 messages per subscriber per week" },
              { label: "Campaign wave pacing", value: "3 wave steps (Day 0, Day 3, Day 7 recall)" },
              { label: "Valid consents", value: "13,920 out of 14,470 subscribers eligible" }
            ].map((prop, idx) => (
              <div key={idx} className="flex justify-between py-2 border-b border-[#F1F4F8] items-center">
                <span>{prop.label}</span>
                <span className="font-bold text-[#2B3445] text-right max-w-xs">{prop.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action card */}
        <div className="bg-white border border-[#EEF2F7] rounded-md p-4 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#62AB47] uppercase tracking-wider">3. Predicted Outcome Matrix</h4>
            <div className="space-y-1.5 opacity-90">
              {[
                { label: "Forecast reach", val: "12,892 subscribers" },
                { label: "Predicted conversions", val: "~2,830 customers" },
                { label: "Predicted churn saved", val: "72% conversion lift" },
                { label: "Total saved value", val: "₺890K recovered ARPU" }
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs py-1 border-b border-[#F1F4F8] last:border-0">
                  <span className="text-[#7E8A9A]">{item.label}</span>
                  <span className="font-bold text-[#2B3445]">{item.val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#EEF2F7] flex gap-2">
            <button className="flex-1 bg-white border border-[#E3E8EF] text-[#505B79] font-bold text-xs py-2 rounded-md hover:bg-slate-50 cursor-pointer flex items-center justify-center gap-1">
              <SlidersHorizontal size={12} />
              <span>Customize</span>
            </button>
            <button
              onClick={onAdvanceToCanvas}
              className="flex-1 bg-[#62AB47] text-white font-bold text-xs py-2 rounded-md hover:bg-[#54933d] transition-all cursor-pointer flex items-center justify-center gap-1 shadow-sm"
            >
              <Check size={12} className="stroke-[2.5]" />
              <span>Build Journey</span>
              <ArrowRight size={12} className="stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
