import React from "react";
import { MessageSquare, RefreshCw, BarChart2, ShieldAlert, Sparkles, TrendingDown, ArrowRightCircle } from "lucide-react";
import ComponentLabel from "./ComponentLabel";

interface WizbotInsightsProps {
  onRestartTour: () => void;
}

export default function WizbotInsights({ onRestartTour }: WizbotInsightsProps) {
  return (
    <div className="space-y-4 animate-fade-in font-sans">
      <div className="flex items-center gap-3">
        <ComponentLabel component="wizbot" />
        <h2 className="text-xl font-bold text-[#2B3445] tracking-tight">Suite Closed-Loop Insights</h2>
        <span className="bg-[#F5F0FF] text-[#7E4FCF] text-[10px] px-2 py-0.5 rounded font-black">
          CLOSED-LOOP SYSTEM VALIDATED
        </span>
        <button
          onClick={onRestartTour}
          className="ml-auto bg-white border border-[#E3E8EF] text-[#505B79] font-bold text-xs px-3 py-1.5 rounded hover:bg-slate-50 cursor-pointer flex items-center gap-1 shadow-xs transition-all"
        >
          <RefreshCw size={12} />
          <span>Reset Twin Cycle</span>
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* Left Side: Summary and Comparison details */}
        <div className="space-y-4">
          <div className="bg-white border border-[#EEF2F7] rounded-md p-5 shadow-xs">
            <h3 className="text-sm font-black text-[#62AB47] uppercase tracking-wider mb-4">Core Retrospective Outcomes</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border-l-4 border-[#62AB47] bg-[#F2F9EC] rounded">
                <span className="text-[10px] text-[#7E8A9A] font-bold uppercase tracking-wider block mb-1">Target Test Group</span>
                <div className="text-3xl font-black text-[#3E9232]">18%</div>
                <span className="text-[11px] text-[#A6AEBD]">overage exhaustion rate</span>
              </div>
              
              <div className="p-4 border-l-4 border-[#7E8A9A] bg-slate-50 rounded">
                <span className="text-[10px] text-[#7E8A9A] font-bold uppercase tracking-wider block mb-1">Holdout Control Group</span>
                <div className="text-3xl font-black text-[#505B79]">54%</div>
                <span className="text-[11px] text-[#A6AEBD]">overage exhaustion rate</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-4 text-center">
              <div className="p-2 border border-[#EEF2F7] rounded">
                <span className="text-[9px] text-[#a6aebd] font-bold uppercase block">Risk Reduction</span>
                <strong className="text-[#3E9232] text-sm">-36 pp Lift</strong>
              </div>
              <div className="p-2 border border-[#EEF2F7] rounded">
                <span className="text-[9px] text-[#a6aebd] font-bold uppercase block">Saved Revenue</span>
                <strong className="text-slate-800 text-sm">₺890,000</strong>
              </div>
              <div className="p-2 border border-[#EEF2F7] rounded">
                <span className="text-[9px] text-[#a6aebd] font-bold uppercase block">Acceptance Rate</span>
                <strong className="text-[#F7941D] text-sm">34% Rate</strong>
              </div>
            </div>
          </div>

          {/* Segment convert rating */}
          <div className="bg-white border border-[#EEF2F7] rounded-md p-5 shadow-xs">
            <h4 className="text-xs font-bold text-[#62AB47] uppercase tracking-wider mb-4">Acceptance Lift by CLV Segment</h4>
            <div className="space-y-3">
              {[
                { label: "High CLV", pct: 41, width: "w-[41%]", bg: "bg-[#62AB47]" },
                { label: "Mid CLV", pct: 33, width: "w-[33%]", bg: "bg-[#3E7FD4]" },
                { label: "Low CLV", pct: 19, width: "w-[19%]", bg: "bg-slate-400" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="w-16 text-xs text-[#505B79] font-medium">{item.label}</span>
                  <div className="flex-1 h-5 bg-slate-50 border border-slate-100 rounded overflow-hidden">
                    <div className={`h-full ${item.bg} flex items-center justify-end pr-2 text-white font-black text-[10px]`} style={{ width: `${item.pct}%` }}>
                      {item.pct}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3.5 p-3.5 bg-amber-50 rounded border-l-4 border-[#F7941D] text-xs text-[#B8620A] leading-relaxed">
              <strong>Optimization Lesson:</strong> High CLV responded 2.2× better than Low CLV. For the next monthly iteration, consider increasing the premium incentive for High CLV of subscribers.
            </div>
          </div>
        </div>

        {/* Right Side: Closed loop diagram */}
        <div className="bg-white border border-[#EEF2F7] rounded-md p-5 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-black text-[#2B3445] border-b border-[#F1F4F8] pb-2 mb-4 uppercase tracking-wider flex items-center gap-1.5">
              <BarChart2 size={16} className="text-[#7E4FCF]" />
              <span>Telco Marketing Closed-Loop Workspace</span>
            </h3>

            <p className="text-xs text-[#505B79] mb-4 leading-relaxed">
              Instead of firing independent campaigns, Atya unifies measurements across five distinct cognitive segments to feedback real conversion thresholds into our predictive Digital Twin.
            </p>

            {/* Custom SVG Closed-loop diagram */}
            <div className="relative border border-slate-100 rounded-lg p-5 bg-[#FAFBFC] overflow-hidden select-none">
              <svg width="100%" height="110" viewBox="0 0 460 110" className="mx-auto block overflow-visible">
                {/* Connecting pipeline lines */}
                <line x1="45" y1="40" x2="135" y2="40" stroke="#C9D2DE" strokeWidth="2" />
                <line x1="135" y1="40" x2="225" y2="40" stroke="#C9D2DE" strokeWidth="2" />
                <line x1="225" y1="40" x2="315" y2="40" stroke="#C9D2DE" strokeWidth="2" />
                <line x1="315" y1="40" x2="405" y2="40" stroke="#C9D2DE" strokeWidth="2" />
                
                {/* Feedback dashed loop */}
                <path d="M 405,55 C 405,95 45,95 45,55" fill="none" stroke="#F7941D" strokeWidth="1.5" strokeDasharray="4 3" />
                
                {/* Vector connectors arrows */}
                <polygon points="135,40 128,36 128,44" fill="#C9D2DE" />
                <polygon points="225,40 218,36 218,44" fill="#C9D2DE" />
                <polygon points="315,40 308,36 308,44" fill="#C9D2DE" />
                <polygon points="405,40 398,36 398,44" fill="#C9D2DE" />
                <polygon points="45,50 49,60 41,60" fill="#F7941D" />

                {/* Segment nodes */}
                {/* CDP */}
                <circle cx="45" cy="40" r="16" fill="white" stroke="#E3E8EF" strokeWidth="1.5" />
                <text x="45" y="44" textAnchor="middle" fontSize="10" fill="#505B79" fontWeight="bold">CDP</text>
                
                {/* TWIN */}
                <circle cx="135" cy="40" r="16" fill="white" stroke="#E3E8EF" strokeWidth="1.5" />
                <text x="135" y="44" textAnchor="middle" fontSize="10" fill="#505B79" fontWeight="bold">TWIN</text>
                
                {/* AI */}
                <circle cx="225" cy="40" r="16" fill="#F5F0FF" stroke="#DDD8FF" strokeWidth="1.5" />
                <text x="225" y="44" textAnchor="middle" fontSize="10" fill="#7E4FCF" fontWeight="bold">AI</text>
                
                {/* JB */}
                <circle cx="315" cy="40" r="16" fill="#F2F9EC" stroke="#C8E6B8" strokeWidth="1.5" />
                <text x="315" y="44" textAnchor="middle" fontSize="10" fill="#62AB47" fontWeight="bold">JB</text>
                
                {/* BOT */}
                <circle cx="405" cy="40" r="16" fill="#FFE6CC" stroke="#FFE6CC" strokeWidth="1.5" />
                <text x="405" y="44" textAnchor="middle" fontSize="10" fill="#B8620A" fontWeight="bold">BOT</text>
              </svg>
              
              <div className="text-center text-[10px] text-[#A6AEBD] font-medium tracking-wide uppercase">
                Campaign conversions automatically feedback as a secondary Twin learning factor
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#EEF2F7]">
            <button className="w-full bg-[#62AB47] text-white font-bold text-xs py-2 rounded-md hover:bg-[#54933d] cursor-pointer flex items-center justify-center gap-1.5">
              <ArrowRightCircle size={14} />
              <span>Apply to Next Iteration</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
