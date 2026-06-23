import React from "react";
import { Check, X, Shield, ChevronRight, Inbox, Plus, Sliders } from "lucide-react";
import ComponentLabel from "./ComponentLabel";

interface SignalInboxProps {
  onAdvanceToCopilot: () => void;
}

const SIGNALS = [
  { id: "s1", name: "Data Overage Risk", source: "Digital Twin", count: "14,470", priority: "High", score: 87, active: true },
  { id: "s2", name: "Upgrade Propensity Rising", source: "Digital Twin", count: "6,230", priority: "Med", score: 62, active: false },
  { id: "s3", name: "Roaming Anomaly — Europe", source: "Digital Twin", count: "2,140", priority: "Med", score: 58, active: false },
  { id: "s4", name: "Churn Window — 7 days", source: "CDP Engine", count: "11,450", priority: "High", score: 79, active: false },
  { id: "s5", name: "Winback Opportunity — Prepaid", source: "CDP Engine", count: "28,910", priority: "Low", score: 41, active: false }
];

interface CheckProps {
  label: string;
  pass: boolean;
  value: string;
}

const CheckRow = ({ label, pass, value }: CheckProps) => (
  <div className="flex items-center gap-2.5 py-2 border-b border-[#F1F4F8] text-xs">
    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
      pass ? "bg-[#E4F2DC] text-[#4F9138]" : "bg-rose-100 text-rose-600"
    }`}>
      {pass ? <Check size={11} className="stroke-[3]" /> : <X size={11} className="stroke-[3]" />}
    </div>
    <span className="text-[#505B79] flex-1 font-medium">{label}</span>
    <span className="font-bold text-[#2B3445] text-[11.5px] font-mono">{value}</span>
  </div>
);

export default function SignalInbox({ onAdvanceToCopilot }: SignalInboxProps) {
  const [selectedSignal, setSelectedSignal] = React.useState("s1");

  return (
    <div className="space-y-4 animate-fade-in font-sans">
      <div className="flex items-center gap-3">
        <ComponentLabel component="ecm" />
        <h2 className="text-xl font-bold text-[#2B3445] tracking-tight">Signal Prioritization Inbox</h2>
        <span className="bg-[#E4F2DC] text-[#4F9138] text-[10px] px-2 py-0.5 rounded font-black">
          PRIORITIZATION ENGINE ACTIVE
        </span>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Left Side: Incoming prioritized anomalies */}
        <div className="xl:col-span-2 bg-white border border-[#EEF2F7] rounded-md shadow-xs">
          <div className="p-4 border-b border-[#F1F4F8] flex items-center justify-between">
            <span className="font-semibold text-xs text-[#505B79] uppercase tracking-wider">Prioritized Signals</span>
            <span className="text-xs text-[#7E8A9A]">5 active anomalies waiting</span>
          </div>

          <div className="overflow-x-auto text-[12.5px]">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#F8FAFC]">
                  <th className="text-left font-bold text-[#7E8A9A] uppercase text-[10px] tracking-wider p-3 pl-4 border-b border-[#E3E8EF]">Score</th>
                  <th className="text-left font-bold text-[#7E8A9A] uppercase text-[10px] tracking-wider p-3 border-b border-[#E3E8EF]">Source</th>
                  <th className="text-left font-bold text-[#7E8A9A] uppercase text-[10px] tracking-wider p-3 border-b border-[#E3E8EF]">Anomaly Name</th>
                  <th className="text-left font-bold text-[#7E8A9A] uppercase text-[10px] tracking-wider p-3 border-b border-[#E3E8EF]">Audience</th>
                  <th className="text-left font-bold text-[#7E8A9A] uppercase text-[10px] tracking-wider p-3 pr-4 border-b border-[#E3E8EF]">Priority</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F4F8]">
                {SIGNALS.map((s) => {
                  const isSel = s.id === selectedSignal;
                  return (
                    <tr
                      key={s.id}
                      onClick={() => setSelectedSignal(s.id)}
                      className={`cursor-pointer transition-all hover:bg-slate-50 ${isSel ? "bg-[#EEF3FA]" : ""}`}
                    >
                      <td className="p-3 pl-4 font-black text-[#62AB47] text-sm">
                        {s.score}
                        <span className="text-[10px] text-gray-400 font-normal">/100</span>
                      </td>
                      <td className="p-3 text-[#7E8A9A] font-mono text-[11px]">{s.source}</td>
                      <td className="p-3 font-semibold text-[#2B3445]">
                        <span className="flex items-center gap-1.5">
                          {s.name}
                          {s.active && (
                            <span className="bg-[#F7941D] text-white text-[8px] font-black px-1.5 py-0.5 rounded tracking-wide leading-none">NEW</span>
                          )}
                        </span>
                      </td>
                      <td className="p-3 font-mono font-semibold text-[#2B3445]">{s.count}</td>
                      <td className="p-3 pr-4">
                        <span className={`inline-block text-[10px] font-black px-2 py-0.5 rounded-full ${
                          s.priority === "High" ? "bg-rose-100 text-rose-600" : "bg-amber-100 text-amber-700"
                        }`}>
                          {s.priority}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Selected Signal deep validations & compliance checking */}
        <div className="bg-white border border-[#EEF2F7] rounded-md p-4 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-sm font-black text-[#2B3445] border-b border-[#F1F4F8] pb-2 mb-3 uppercase tracking-wider flex items-center gap-1.5">
              <Inbox size={15} className="text-[#62AB47]" />
              <span>Prioritization Details</span>
            </h3>

            {selectedSignal === "s1" ? (
              <div className="space-y-4 animate-fade-in">
                {/* Score bar */}
                <div className="bg-[#FAFBFC] border border-[#EEF2F7] rounded-lg p-3">
                  <div className="text-[10px] text-[#7E8A9A] font-bold uppercase tracking-wider mb-1.5">Composite Score</div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-[#62AB47]">87</span>
                    <span className="text-xs text-gray-400">/100</span>
                  </div>
                  {/* Progress line */}
                  <div className="h-1.5 bg-[#E3E8EF] rounded-full overflow-hidden mt-2 relative">
                    <div className="h-full bg-gradient-to-r from-[#62AB47] to-[#8FCB6F] rounded-full" style={{ width: "87%" }} />
                  </div>
                  <p className="text-[10.5px] text-[#A6AEBD] mt-2 font-medium">Recommended response timeframe: <strong className="text-[#2B3445]">Within 24 hours</strong></p>
                </div>

                {/* Checks */}
                <div className="space-y-1">
                  <div className="text-[10px] text-[#7E8A9A] font-bold uppercase tracking-wider mb-2">Automated Policy Validations</div>
                  <CheckRow label="Collision check · Active marketing conflicts" pass={true} value="Zero Collisions" />
                  <CheckRow label="Journey subscriber fatigue caps · Contact pressure rules" pass={true} value="Compliant" />
                  <CheckRow label="Opt-in consent checking · General data governance" pass={true} value="13,920 of 14,470" />
                  <CheckRow label="Recommended campaign strategy template" pass={true} value="Twin triggered promo" />
                </div>
              </div>
            ) : (
              <div className="text-center py-10 text-[#7E8A9A] text-xs space-y-2">
                <Sliders size={24} className="mx-auto text-gray-300 animate-pulse" />
                <p>Select another prioritisated anomaly to evaluate automated policy and segmentation compliance flags.</p>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-[#EEF2F7] flex gap-2">
            <button className="flex-1 bg-white border border-[#E3E8EF] text-[#505B79] font-bold text-xs py-2 rounded-md hover:bg-slate-50 cursor-pointer">
              Hold For Review
            </button>
            <button
              onClick={onAdvanceToCopilot}
              disabled={selectedSignal !== "s1"}
              className={`flex-1 text-white font-bold text-xs py-2 rounded-md transition-all flex items-center justify-center gap-1 cursor-pointer shadow-sm ${
                selectedSignal === "s1" ? "bg-[#2A3252] hover:bg-[#1D243F]" : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              <Plus size={13} className="stroke-[2.5]" />
              <span>Create Journey</span>
              <ChevronRight size={13} className="stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
