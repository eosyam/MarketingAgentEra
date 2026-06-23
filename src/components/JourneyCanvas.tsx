import React from "react";
import { Zap, GitBranch, Send, Clock, HelpCircle, Shield, Play } from "lucide-react";
import ComponentLabel from "./ComponentLabel";

interface JourneyCanvasProps {
  onActivate: () => void;
}

interface NodeProps {
  type: 'trigger' | 'split' | 'delivery' | 'timer' | 'decision' | 'control' | 'exit';
  title: string;
  sub: string;
}

const NodeBlock = ({ type, title, sub }: NodeProps) => {
  const meta = {
    trigger: { bg: "bg-amber-50", text: "text-[#B8620A]", border: "border-amber-200", icon: Zap, label: "Trigger" },
    split: { bg: "bg-[#EEE4FB]", text: "text-[#6D3EB8]", border: "border-[#DCC8F5]", icon: GitBranch, label: "Split" },
    delivery: { bg: "bg-[#E4EFFB]", text: "text-[#2A6FB8]", border: "border-[#C6DDF7]", icon: Send, label: "Delivery" },
    timer: { bg: "bg-amber-50", text: "text-amber-700", border: "border-[#F5E3A8]", icon: Clock, label: "Timer" },
    decision: { bg: "bg-[#DFF6EF]", text: "text-[#1F9B7B]", border: "border-[#B8E6D4]", icon: HelpCircle, label: "Decision" },
    control: { bg: "bg-rose-50", text: "text-rose-700", border: "border-[#F5CCCE]", icon: Shield, label: "Control" },
    exit: { bg: "bg-slate-50", text: "text-slate-600", border: "border-slate-200", icon: HelpCircle, label: "Exit" }
  }[type];

  const Icon = meta.icon;

  return (
    <div className={`p-3 bg-white border ${meta.border} rounded-md shadow-xs w-48 shrink-0 text-left relative group hover:border-[#62AB47] hover:shadow-md transition-all`}>
      <span className={`inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${meta.bg} ${meta.text} mb-2`}>
        <Icon size={9} className="stroke-[2.5]" />
        <span>{meta.label}</span>
      </span>
      <div className="font-bold text-[#2B3445] text-xs divide-y leading-tight divide-[#F1F4F8]">{title}</div>
      <div className="text-[10px] text-[#7E8A9A] mt-1">{sub}</div>
    </div>
  );
};

const CustomArrow = () => (
  <div className="w-6 h-[1.5px] bg-[#C9D2DE] shrink-0 relative flex items-center">
    <div className="absolute right-0 w-0 h-0 border-t-[3.5px] border-t-transparent border-b-[3.5px] border-b-transparent border-l-[5.5px] border-l-[#C9D2DE]" />
  </div>
);

export default function JourneyCanvas({ onActivate }: JourneyCanvasProps) {
  return (
    <div className="space-y-4 animate-fade-in font-sans">
      <div className="flex items-center gap-3">
        <ComponentLabel component="ecm" />
        <h2 className="text-xl font-bold text-[#2B3445] tracking-tight">Active Journey Builder</h2>
        <span className="bg-[#E4F2DC] text-[#4F9138] text-[10px] px-2 py-0.5 rounded font-black">
          VALIDATED & READY TO LAUNCH
        </span>
        <div className="ml-auto flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1.5 text-xs text-[#7E8A9A] bg-[#FAFBFC] border border-[#EEF2F7] px-3 py-1.5 rounded">
            <Shield size={13} className="text-[#62AB47]" />
            <span>Pressure Policy Active</span>
          </div>
          <button
            onClick={onActivate}
            className="bg-[#62AB47] text-white font-bold text-xs px-4 py-1.5 rounded hover:bg-[#54933d] cursor-pointer flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Play size={12} className="fill-white stroke-none" />
            <span>Activate Journey</span>
          </button>
        </div>
      </div>

      {/* SVG flowchart grid */}
      <div className="bg-slate-50 border border-[#EEF2F7] rounded-md p-6 overflow-x-auto select-none relative md:min-h-[480px]">
        {/* Dynamic backdrop grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(227,232,239,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(227,232,239,0.3)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none rounded-md" />

        <div className="space-y-6 relative z-10 min-w-[1100px]">
          {/* Main starting node chain */}
          <div className="flex items-center">
            <NodeBlock type="trigger" title="Overage Alert Detected" sub="Digital Twin · 14,470 users" />
            <CustomArrow />
            <NodeBlock type="split" title="CLV Segment Split" sub="CDP Variables · 3-Way" />
            <CustomArrow />
            
            {/* 3 CLV branches split stacking */}
            <div className="flex flex-col gap-4 py-2 border-l border-dashed border-[#C9D2DE] pl-6 my-1">
              {/* Lane 1 */}
              <div className="flex items-center">
                <span className="text-[10px] text-gray-400 font-bold w-16 uppercase tracking-wider mr-2">Low CLV</span>
                <NodeBlock type="delivery" title="Wave 1: App Push" sub="+1 GB free utility bonus" />
                <CustomArrow />
                <NodeBlock type="timer" title="Delay: 3 Days" sub="Observation frame" />
                <CustomArrow />
                <NodeBlock type="decision" title="Converted Offer?" sub="No communication needed on YES" />
              </div>
              
              {/* Lane 2 */}
              <div className="flex items-center">
                <span className="text-[10px] text-[#3E7FD4] font-bold w-16 uppercase tracking-wider mr-2">Mid CLV</span>
                <NodeBlock type="delivery" title="Wave 1: App Push" sub="Upgrade to next tier -20%" />
                <CustomArrow />
                <NodeBlock type="timer" title="Delay: 3 Days" sub="Observation frame" />
                <CustomArrow />
                <NodeBlock type="decision" title="Converted Offer?" sub="No communication needed on YES" />
              </div>

              {/* Lane 3 */}
              <div className="flex items-center">
                <span className="text-[10px] text-[#62AB47] font-bold w-16 uppercase tracking-wider mr-2">High CLV</span>
                <NodeBlock type="delivery" title="Wave 1: App Push" sub="Curated postpaid + points" />
                <CustomArrow />
                <NodeBlock type="timer" title="Delay: 3 Days" sub="Observation frame" />
                <CustomArrow />
                <NodeBlock type="decision" title="Converted Offer?" sub="No communication needed on YES" />
              </div>
            </div>
          </div>

          <div className="h-[2px] bg-slate-200 border-none mx-2 my-1" />

          {/* Recall Waves on fallback NO responses */}
          <div className="flex items-center pl-28">
            <span className="text-[10.5px] text-[#A6AEBD] font-bold uppercase tracking-wider mr-4">Fallback Waves (If No Response)  → </span>
            <NodeBlock type="delivery" title="Wave 2: SMS Recall" sub="Contract details · Direct link" />
            <CustomArrow />
            <NodeBlock type="timer" title="Delay: 3 Days" sub="Final cap buffer" />
            <CustomArrow />
            <NodeBlock type="decision" title="Still at Risk?" sub="Verify billing date" />
            <CustomArrow />
            <NodeBlock type="delivery" title="Wave 3: Outbound/SMS" sub="Direct agent hot Dial" />
            <CustomArrow />
            <NodeBlock type="exit" title="Journey Complete" sub="Evaluate final lift metrics" />
          </div>

          {/* Control Group segment block */}
          <div className="pt-4 border-t border-[#E3E8EF] flex items-center gap-3">
            <NodeBlock type="control" title="Control Group (10% Holdout)" sub="No communication · Baseline drift" />
            <div className="text-[11px] text-[#7E8A9A] max-w-xl italic">
              * Automatically isolated by CDP logic. Used as the conversion control group inside Wizbot to isolate true incremental campaign uplift.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
