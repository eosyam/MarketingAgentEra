import React from "react";
import { BarChart3, AlertCircle, TrendingUp, Smartphone, Mail, RefreshCw, MessageSquare } from "lucide-react";
import ComponentLabel from "./ComponentLabel";

interface MonitoringProps {
  onAdvanceToWizbot: () => void;
}

const FUNNEL_STAGES = [
  { stage: "Entered Wave 1 Campaign", count: 12892, pct: 100, color: "bg-[#3E7FD4]" },
  { stage: "Responded to Wave 1", count: 3120, pct: 24, color: "bg-[#62AB47]" },
  { stage: "Wave 2 delivered (recall)", count: 9772, pct: 76, color: "bg-[#F7941D]" },
  { stage: "Wave 3 delivered (recall)", count: 5180, pct: 40, color: "bg-[#7E8A9A]" },
  { stage: "Converted & Saved", count: 2134, pct: 17, color: "bg-[#3E9232]" }
];

const CHANNELS = [
  { name: "App Push Channels", icon: Smartphone, delivery: 98, open: 42, ctr: 14, color: "#3E7FD4" },
  { name: "SMS Fallback Channels", icon: Mail, delivery: 96, open: 68, ctr: 9, color: "#62AB47" }
];

export default function Monitoring({ onAdvanceToWizbot }: MonitoringProps) {
  return (
    <div className="space-y-4 animate-fade-in font-sans">
      <div className="flex items-center gap-3">
        <ComponentLabel component="ecm" />
        <h2 className="text-xl font-bold text-[#2B3445] tracking-tight">Active Operation Monitoring</h2>
        <div className="flex items-center gap-1.5 ml-1">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse inline-block" />
          <span className="text-[10px] text-red-500 font-extrabold uppercase tracking-wider">Campaign Live</span>
        </div>

        <button
          onClick={onAdvanceToWizbot}
          className="ml-auto bg-[#2A3252] text-white font-bold text-xs px-4 py-1.5 rounded hover:bg-[#1D243F] cursor-pointer flex items-center gap-1.5 shadow-sm transition-all"
        >
          <MessageSquare size={13} className="stroke-[2.5]" />
          <span>Wizbot Report</span>
        </button>
      </div>

      {/* KPI grids */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Execution status", val: "Active Wave", sub: "Day 8 of 14 timeline", color: "text-[#62AB47]" },
          { label: "Active in Journey", val: "12,892", sub: "1,578 in Wave 2 queue", color: "text-[#2B3445]" },
          { label: "Current conversion", val: "2,134", sub: "16.6% retention rate", color: "text-[#F7941D]" },
          { label: "Control group", val: "4.1%", sub: "Uncontacted overage baseline", color: "text-[#7E8A9A]" }
        ].map((kpi, idx) => (
          <div key={idx} className="bg-white border border-[#EEF2F7] rounded-md p-4.5 shadow-xs">
            <span className="text-[9px] text-[#A6AEBD] font-bold uppercase tracking-wider block mb-1">{kpi.label}</span>
            <div className={`text-2xl font-black ${kpi.color} tracking-tight`}>{kpi.val}</div>
            <span className="text-[11px] text-[#7E8A9A] mt-1 block h-4">{kpi.sub}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
        {/* Campaign Funnel analysis */}
        <div className="bg-white border border-[#EEF2F7] rounded-md p-5 shadow-xs">
          <h4 className="text-xs font-bold text-[#62AB47] uppercase tracking-wider mb-4">Journey Wave conversion Funnel</h4>
          <div className="space-y-3.5">
            {FUNNEL_STAGES.map((stage, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between items-center text-xs text-[#505B79]">
                  <span className="font-semibold text-slate-700">{stage.stage}</span>
                  <span className="font-mono font-bold">
                    {stage.count.toLocaleString()}
                    <span className="text-gray-400 font-normal"> ({stage.pct}%)</span>
                  </span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden relative">
                  <div className={`h-full ${stage.color} rounded-full transition-all duration-300`} style={{ width: `${stage.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Acceptance by segments & Channel CTR */}
        <div className="flex flex-col gap-4">
          {/* Bar metrics */}
          <div className="bg-white border border-[#EEF2F7] rounded-md p-5 shadow-xs flex-1">
            <h4 className="text-xs font-bold text-[#62AB47] uppercase tracking-wider mb-4">Conversion by subscriber segment</h4>
            <div className="flex items-end gap-6 h-36 pt-4 border-b border-[#EEF2F7] pb-2">
              {[
                { label: "Low CLV", val: 19, color: "bg-[#7E8A9A]" },
                { label: "Mid CLV", val: 33, color: "bg-[#3E7FD4]" },
                { label: "High CLV", val: 41, color: "bg-[#62AB47]" }
              ].map((item, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                  <div className="text-xs font-bold text-slate-700">{item.val}%</div>
                  <div className={`w-full ${item.color} rounded-t`} style={{ height: `${item.val * 2}%` }} />
                  <span className="text-[10px] text-[#7E8A9A] uppercase tracking-wider font-bold mt-1">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Channel Rates */}
      <div className="bg-white border border-[#EEF2F7] rounded-md p-5 shadow-xs mt-4">
        <h4 className="text-xs font-bold text-[#62AB47] uppercase tracking-wider mb-4">Channel Performance telemetry</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CHANNELS.map((ch, idx) => {
            const Icon = ch.icon;
            return (
              <div key={idx} className="p-4 border border-[#F1F4F8] rounded-md bg-slate-50/50 flex flex-col justify-between">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-white border border-[#EEF2F7] flex items-center justify-center text-[#505B79]">
                    <Icon size={16} />
                  </div>
                  <span className="font-bold text-xs uppercase text-slate-700 tracking-wider">{ch.name}</span>
                </div>

                <div className="space-y-2 text-xs">
                  {/* Delivery */}
                  <div className="flex justify-between items-center text-[#505B79]">
                    <span>Delivery Rate</span>
                    <strong className="text-slate-800">{ch.delivery}%</strong>
                  </div>
                  <div className="h-1.5 bg-[#EEF2F7] rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${ch.delivery}%`, backgroundColor: ch.color }} />
                  </div>

                  {/* Open */}
                  <div className="flex justify-between items-center text-[#505B79] pt-1">
                    <span>Open Rate</span>
                    <strong className="text-slate-800">{ch.open}%</strong>
                  </div>
                  <div className="h-1.5 bg-[#EEF2F7] rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${ch.open}%`, backgroundColor: ch.color }} />
                  </div>

                  {/* CTR */}
                  <div className="flex justify-between items-center text-[#505B79] pt-1">
                    <span>Conversion (CTR)</span>
                    <strong className="text-slate-800">{ch.ctr}%</strong>
                  </div>
                  <div className="h-1.5 bg-[#EEF2F7] rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${ch.ctr}%`, backgroundColor: ch.color }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
