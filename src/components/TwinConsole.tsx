import React from "react";
import { Users, TrendingUp, ArrowRight, ArrowLeft, Send, ShieldAlert, Cpu } from "lucide-react";
import ComponentLabel from "./ComponentLabel";

interface TwinConsoleProps {
  currentStage: number; // 0 for Community Console, 1 for Signal Detail
  onStageChange: (stage: number) => void;
  onAdvanceToInbox: () => void;
}

const COMMUNITIES = [
  { id: "youth", name: "High Data Usage Youth", size: "14,470", arpu: "189 TL", trend: "+32%", risk: "High Overage Risk", riskColor: "text-[#F7941D]" },
  { id: "budget", name: "Budget Conscious Community", size: "1,000", arpu: "141 TL", trend: "-38% Data", risk: "Critical Churn Threat", riskColor: "text-[#E5484D]" },
  { id: "roaming", name: "Roaming Power Users", size: "2,140", arpu: "410 TL", trend: "+120% Roam", risk: "Medium Anomaly", riskColor: "text-[#3E7FD4]" },
  { id: "fiber", name: "Fiber Triple-Play Elite", size: "3,042", arpu: "520 TL", trend: "Stable", risk: "Low Risk", riskColor: "text-green-500" }
];

export default function TwinConsole({ currentStage, onStageChange, onAdvanceToInbox }: TwinConsoleProps) {
  const [selectedComm, setSelectedComm] = React.useState("youth");

  if (currentStage === 0) {
    // Stage 0: Community Console
    return (
      <div className="space-y-5 animate-fade-in font-sans">
        <div className="flex items-center gap-3">
          <ComponentLabel component="twin" />
          <h2 className="text-xl font-bold text-[#2B3445] tracking-tight">Digital Twin Console</h2>
          <div className="bg-[#EEF3FA] text-[#3E5280] text-[10px] px-2 py-0.5 rounded font-black font-mono">
            COHORT PREDICTOR ACTIVE
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Left panel: List of subscriber segments/communities */}
          <div className="bg-white border border-[#EEF2F7] rounded-md shadow-xs">
            <div className="p-3 border-b border-[#F1F4F8] flex items-center justify-between">
              <span className="font-semibold text-xs text-[#505B79] uppercase tracking-wider">Monitored Clusters</span>
              <span className="bg-slate-100 text-[#7E8A9A] text-[10.5px] px-1.5 py-0.5 rounded-full font-bold">4 Active</span>
            </div>
            <div className="divide-y divide-[#F1F4F8]">
              {COMMUNITIES.map((c) => {
                const isSel = c.id === selectedComm;
                return (
                  <div
                    key={c.id}
                    onClick={() => setSelectedComm(c.id)}
                    className={`p-3.5 cursor-pointer transition-all border-l-4 ${
                      isSel ? "bg-[#EEF3FA] border-[#62AB47]" : "border-transparent hover:bg-slate-50"
                    }`}
                  >
                    <div className="font-semibold text-[13px] text-[#2B3445] mb-1">{c.name}</div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#7E8A9A]">{c.size} members</span>
                      <span className={`font-bold ${c.riskColor}`}>{c.risk}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right panel: Cohort Depth Details */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white border border-[#EEF2F7] rounded-md p-5 shadow-xs">
              <div className="flex justify-between items-start border-b border-dashed border-[#F1F4F8] pb-4 mb-4">
                <div>
                  <h3 className="text-lg font-bold text-[#2B3445] mb-1">
                    {selectedComm === "youth" ? "High Data Usage Youth" : selectedComm === "budget" ? "Budget Conscious Community" : selectedComm === "roaming" ? "Roaming Power Users" : "Fiber Triple-Play Elite"}
                  </h3>
                  <p className="text-xs text-[#7E8A9A]">
                    {selectedComm === "youth" && "Ages 18–25 · Postpaid · Monthly cellular plan exhaustion > 80% with promo latency threshold."}
                    {selectedComm === "budget" && "Ages 25–45 · Low-mid plan tiers · Showing significant high-elasticity churning flags."}
                    {selectedComm === "roaming" && "Frequent travelers · Business class profiles · Showing international data roaming drops."}
                    {selectedComm === "fiber" && "Premium bundle subscribers · Quad-play customers with static contract horizons."}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-[#2B3445]">
                    {selectedComm === "youth" ? "45,230" : selectedComm === "budget" ? "1,000" : selectedComm === "roaming" ? "2,140" : "3,042"}
                  </div>
                  <div className="text-[10px] text-[#7E8A9A] uppercase tracking-wider font-bold">Subscribers</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-3 bg-slate-50 border border-[#EEF2F7] rounded">
                  <div className="text-[10px] text-[#7E8A9A] uppercase font-bold tracking-wider mb-1">Normalized ARPU</div>
                  <div className="text-xl font-bold text-[#2B3445]">
                    {selectedComm === "youth" ? "₺189" : selectedComm === "budget" ? "₺141" : selectedComm === "roaming" ? "₺410" : "₺520"}
                    <span className="text-xs text-gray-400 font-normal"> /mo</span>
                  </div>
                </div>
                <div className="p-3 bg-slate-50 border border-[#EEF2F7] rounded">
                  <div className="text-[10px] text-[#7E8A9A] uppercase font-bold tracking-wider mb-1">Avg Cellular Data</div>
                  <div className="text-xl font-bold text-[#2B3445]">
                    {selectedComm === "youth" ? "18.4 GB" : selectedComm === "budget" ? "6.8 GB" : selectedComm === "roaming" ? "12.5 GB" : "35.0 GB"}
                  </div>
                </div>
                <div className="p-3 bg-slate-50 border border-[#EEF2F7] rounded">
                  <div className="text-[10px] text-[#7E8A9A] uppercase font-bold tracking-wider mb-1">Active Risk Factor</div>
                  <div className="text-xl font-bold text-red-500 flex items-center gap-1.5">
                    <ShieldAlert size={16} />
                    <span>
                      {selectedComm === "youth" ? "82%" : selectedComm === "budget" ? "91%" : selectedComm === "roaming" ? "58%" : "12%"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Signals trigger */}
            <div className="bg-white border border-[#EEF2F7] rounded-md p-4 shadow-xs">
              <h4 className="text-xs font-bold text-[#62AB47] uppercase tracking-wider mb-3">Live Anomaly Signals Detected</h4>
              
              {selectedComm === "youth" && (
                <div
                  onClick={() => onStageChange(1)}
                  className="p-4 border border-[#FFE6CC] rounded bg-amber-50/50 flex hover:shadow-md cursor-pointer transition-all items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-full bg-[#FFE6CC] flex items-center justify-center text-[#B8620A] shrink-0">
                    <TrendingUp size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-bold text-[#2B3445]">Data Overage Risk — Next 10 Days</span>
                      <span className="bg-[#F7941D] text-white text-[9px] font-bold px-1.5 py-0.5 rounded">DETECTED ANOMALY</span>
                    </div>
                    <p className="text-xs text-[#505B79]">14,470 customers heading toward plan limit. High customer care volume threat.</p>
                  </div>
                  <button className="text-[#F7941D] group-hover:translate-x-1 transition-transform bg-white border border-[#FFE6CC] p-1.5 rounded-full shrink-0">
                    <ArrowRight size={15} />
                  </button>
                </div>
              )}

              {selectedComm === "budget" && (
                <div className="p-4 border border-rose-200 rounded bg-rose-50/50 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-700 shrink-0">
                    <ShieldAlert size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-bold text-[#2B3445]">Disruptive Competitor C Threat (99 TL)</span>
                      <span className="bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">NEW ENTRANT</span>
                    </div>
                    <p className="text-xs text-[#505B79]">Competitor launched a budget plan at 99 TL. Churn propensity score up to 0.78.</p>
                  </div>
                  <button onClick={() => alert("Switch to the 'CHURN ALERT' scenario on the top left scenario toggle to resolve this case study!")} className="text-rose-600 bg-white border border-rose-200 text-xs px-2.5 py-1.5 font-bold rounded">
                    Toggle Churn Scenario
                  </button>
                </div>
              )}

              {selectedComm !== "youth" && selectedComm !== "budget" && (
                <div className="p-4 text-center text-[#7E8A9A] text-xs">
                  Atya Digital Twin community models are stable. No critical behavioral anomalies currently triggered.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    // Stage 1: Signal Detail page
    return (
      <div className="space-y-4 animate-fade-in font-sans">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onStageChange(0)}
              className="text-xs text-[#505B79] bg-white border border-[#E3E8EF] px-2.5 py-1.5 rounded flex items-center gap-1.5 cursor-pointer hover:bg-slate-50"
            >
              <ArrowLeft size={13} />
              <span>Back to Console</span>
            </button>
            <ComponentLabel component="twin" />
          </div>
        </div>

        <div className="flex gap-4 items-start">
          <div className="w-11 h-11 rounded-full bg-[#FFE6CC] text-[#B8620A] flex items-center justify-center shrink-0">
            <TrendingUp size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h3 className="text-lg font-bold text-[#2B3445]">Data Overage Risk — Next 10 Days</h3>
              <span className="bg-[#FFF6E6] text-[#B8620A] text-xs px-2 py-0.5 rounded border border-[#FFE6CC] font-semibold">
                High Priority Signal
              </span>
              <span className="bg-[#EEF3FA] text-[#3E5280] text-xs px-2 py-0.5 rounded border border-[#D8E4F0] font-semibold">
                Cohort: High Data Usage Youth
              </span>
            </div>
            <p className="text-xs text-[#505B79] max-w-3xl mt-1.5 leading-relaxed">
              Abrupt cellular data exhaustion observed in 32% of community members over the past 14 days. Extrapolated projection indicates 60% of the active cohort will exceed their tier caps, triggering overage bills and critical customer satisfaction (NPS) falls.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Custom Trend Chart container */}
          <div className="lg:col-span-2 bg-white border border-[#EEF2F7] rounded-md p-5 shadow-xs">
            <h4 className="text-xs font-bold text-[#62AB47] uppercase tracking-wider mb-4">
              Community Cellular Data Overhang (Last 30 Days + Projection)
            </h4>
            
            {/* Crisp responsive SVG chart */}
            <div className="w-full h-42 bg-slate-50 border border-slate-100 rounded p-1 select-none relative">
              <svg width="100%" height="100%" viewBox="0 0 600 150" preserveAspectRatio="none" className="overflow-visible">
                {/* Horizontal reference grids */}
                <line x1="40" y1="20" x2="580" y2="20" stroke="#EEF2F7" strokeWidth="1" />
                <line x1="40" y1="60" x2="580" y2="60" stroke="#EEF2F7" strokeWidth="1" />
                <line x1="40" y1="100" x2="580" y2="100" stroke="#EEF2F7" strokeWidth="1" />
                <line x1="40" y1="130" x2="580" y2="130" stroke="#E3E8EF" strokeWidth="1.5" />

                {/* Y Axes labels */}
                <text x="30" y="23" textAnchor="end" fontSize="9" fill="#A6AEBD" fontWeight="600">100%</text>
                <text x="30" y="63" textAnchor="end" fontSize="9" fill="#A6AEBD" fontWeight="600">60%</text>
                <text x="30" y="103" textAnchor="end" fontSize="9" fill="#A6AEBD" fontWeight="600">30%</text>
                
                {/* Solid actual curve area */}
                <path d="M 40,110 L 80,105 L 120,115 L 160,100 L 200,90 L 240,110 L 280,95 L 320,80 L 360,70 L 400,60 L 400,130 L 40,130 Z" fill="url(#actualGrad)" opacity="0.15" />
                
                {/* Gradient definitions */}
                <defs>
                  <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F7941D" />
                    <stop offset="100%" stopColor="#F7941D" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Solid actual line */}
                <path d="M 40,110 L 80,105 L 120,115 L 160,100 L 200,90 L 240,110 L 280,95 L 320,80 L 360,70 L 400,60" fill="none" stroke="#F7941D" strokeWidth="3" strokeLinecap="round" />
                
                {/* Projected dashed line */}
                <path d="M 400,60 L 440,50 L 480,35 L 520,25 L 560,15 L 580,10" fill="none" stroke="#F7941D" strokeWidth="2.5" strokeDasharray="5,4" />

                {/* Vertical Divider line */}
                <line x1="400" y1="10" x2="400" y2="130" stroke="#A6AEBD" strokeWidth="1.5" strokeDasharray="3,2" />
                <text x="405" y="24" fontSize="9.5" fill="#505B79" fontWeight="700">TODAY (OCT 20)</text>
                <text x="530" y="24" fontSize="9.5" fill="#B8620A" fontWeight="700">PROJECTED</text>
              </svg>
            </div>
            
            <div className="flex gap-4 justify-end mt-2 text-[11px] text-[#7E8A9A]">
              <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-[#F7941D] inline-block" /> Actual Data Plan Stress</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 border-t border-dashed border-[#F7941D] inline-block" /> Forecast Path</span>
            </div>
          </div>

          {/* Core impact summary card */}
          <div className="bg-white border border-[#EEF2F7] rounded-md p-4 shadow-xs flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold text-[#62AB47] uppercase tracking-wider mb-3">Anomaly Impact Matrix</h4>
              <div className="space-y-2">
                {[
                  { label: "Target Cohort Size", val: "14,470 subscribers" },
                  { label: "Anomaly Detected At", val: "Oct 6, 2026" },
                  { label: "Projected Limit Drops", val: "~8,200 members" },
                  { label: "Estimated Lost Value", val: "₺1.2M ARPU stress" },
                  { label: "Predicted Call Spike", val: "320% escalation" },
                  { label: "NPS / Care Vulnerability", val: "Critical" }
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs py-1.5 border-b border-[#F1F4F8] last:border-0">
                    <span className="text-[#7E8A9A]">{item.label}</span>
                    <span className="font-semibold text-[#2B3445]">{item.val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#EEF2F7] flex gap-2">
              <button
                onClick={() => onStageChange(0)}
                className="flex-1 bg-white border border-[#E3E8EF] text-[#505B79] font-bold text-xs py-2 rounded-md hover:bg-slate-50 cursor-pointer text-center"
              >
                Dismiss
              </button>
              <button
                onClick={onAdvanceToInbox}
                className="flex-1 bg-[#62AB47] text-white font-bold text-xs py-2 rounded-md hover:bg-[#54933d] transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Send size={12} className="stroke-[2.5]" />
                <span>Send to Journey</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
