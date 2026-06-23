import React, { useState } from "react";
import {
  LayoutDashboard,
  BarChart3,
  Layers,
  Megaphone,
  FileText,
  Users,
  Database,
  SlidersHorizontal,
  ChevronDown,
  ChevronRight,
  GitBranch,
  Inbox,
  AlertCircle,
  Menu
} from "lucide-react";

interface SidebarProps {
  currentSuiteIdx: number;
  onSelectComponent: (component: any) => void;
  activeSidebarTab: string; // "dashboard" | "operation" | "program" | "campaign" | "datamart" | "params" | "segment" | "content"
  onSelectSidebarTab: (tab: string) => void;
  activeScenario: "overage" | "churn";
  onChangeScenario: (scenario: "overage" | "churn") => void;
  campaignFormStep: number;
  setCampaignFormStep: (step: number) => void;
}

export const TOUR_STEPS = [
  { idx: 0, label: "Community", sub: "Digital Twin", icon: Users },
  { idx: 1, label: "Signal Detail", sub: "Digital Twin", icon: AlertCircle },
  { idx: 2, label: "Signal Inbox", sub: "Journey Prioritization", icon: Inbox },
  { idx: 3, label: "Agentic Copilot", sub: "Agentic AI", icon: SlidersHorizontal },
  { idx: 4, label: "Journey Canvas", sub: "Journey Builder", icon: GitBranch },
  { idx: 5, label: "Monitoring", sub: "Live Telemetry", icon: BarChart3 },
  { idx: 6, label: "Wizbot Insights", sub: "Analytics Loop", icon: FileText }
];

const STATIC_LINKS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "operation", label: "Operation Analysis", icon: BarChart3, hasSub: true },
  { id: "program", label: "Program", icon: Layers },
  { id: "campaign", label: "Campaign", icon: Megaphone },
  { id: "content", label: "Content", icon: FileText, hasSub: true },
  { id: "segment", label: "Segmentation", icon: Users },
  { id: "datamart", label: "Datamart", icon: Database },
  { id: "params", label: "Parameters", icon: SlidersHorizontal, hasSub: true },
  { id: "journey", label: "Journey Builder", icon: GitBranch }
];

export default function Sidebar({
  currentSuiteIdx,
  onSelectComponent,
  activeSidebarTab,
  onSelectSidebarTab,
  activeScenario,
  onChangeScenario,
  campaignFormStep,
  setCampaignFormStep
}: SidebarProps) {
  const [suiteOpen, setSuiteOpen] = useState(false);
  const [wizardOpen, setWizardOpen] = useState(false);

  return (
    <div className="w-[240px] bg-white border border-slate-200/60 shadow-xxs rounded-2xl py-5 px-3 flex flex-col justify-between shrink-0 select-none font-sans h-full">
      
      <div className="flex flex-col flex-1 overflow-y-auto no-scrollbar gap-2">
        {/* LOGO AREA */}
        <div className="px-3 pb-5 mb-3 border-b border-slate-100 flex items-center gap-2">
          {/* 3 custom Etiya logo blocks */}
          <div className="flex gap-0.5 items-end">
            <div className="w-1.5 h-4 bg-[#F7941D] rounded-[1.5px]" />
            <div className="w-2.5 h-4 bg-[#F7941D] rounded-[1.5px]" />
            <div className="w-4 h-4 bg-[#F7941D] rounded-[2px]" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-[15px] tracking-wider text-[#101828] leading-none">ETIYA</span>
            <span className="font-bold text-[7.5px] tracking-[0.16em] text-[#F7941D] leading-none mt-1 uppercase">MARKETING CLOUD</span>
          </div>
        </div>

        {/* SCENARIOS CHOOSER (Overage vs Churn Campaigns, hidden when standard tabs are picked, or left elegant) */}
        <div className="px-2 mb-2 pb-2 border-b border-slate-50">
          <label className="text-[9px] text-[#A6AEBD] font-bold uppercase tracking-wider block mb-1">Active Scenario Playbook</label>
          <div className="grid grid-cols-2 gap-1 bg-slate-100/70 p-0.5 rounded-lg border border-slate-200/30">
            <button
              onClick={() => {
                onChangeScenario("overage");
                onSelectSidebarTab(""); // open digital twin
                setSuiteOpen(true);
              }}
              className={`text-[9.5px] font-bold py-1 px-1 rounded-md text-center transition-all cursor-pointer ${
                activeScenario === "overage" && !activeSidebarTab
                  ? "bg-[#62AB47] text-white shadow-xxs"
                  : "text-[#505B79] hover:bg-slate-200/50"
              }`}
            >
              DATA OVERAGE
            </button>
            <button
              onClick={() => {
                onChangeScenario("churn");
                onSelectSidebarTab(""); // open Churn Alert
                setSuiteOpen(false);
                setWizardOpen(true);
              }}
              className={`text-[9.5px] font-bold py-1 px-1 rounded-md text-center transition-all cursor-pointer ${
                activeScenario === "churn" && !activeSidebarTab
                  ? "bg-[#6264A7] text-white shadow-xxs"
                  : "text-[#505B79] hover:bg-slate-200/50"
              }`}
            >
              CHURN ALERT
            </button>
          </div>
        </div>

        {/* FAVORITES HEADER */}
        <div className="text-[10px] text-[#98A2B3] font-bold tracking-wider px-3 pt-2 pb-1 uppercase">
          Favorites
        </div>
        
        {STATIC_LINKS.filter(link => ["dashboard", "operation"].includes(link.id)).map((link) => {
          const Icon = link.icon;
          const isActive = activeSidebarTab === link.id;
          return (
            <div
              key={link.id}
              onClick={() => {
                onSelectSidebarTab(link.id);
                setSuiteOpen(false);
              }}
              className={`px-3 py-2 rounded-xl text-[12.5px] flex items-center justify-between transition-all cursor-pointer ${
                isActive
                  ? "text-[#F7941D] font-bold bg-[#FFF9F2]"
                  : "text-[#475467] hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon size={15} className={`shrink-0 ${isActive ? "text-[#F7941D]" : "text-[#98A2B3]"}`} />
                <span>{link.label}</span>
              </div>
              {link.hasSub && (
                <ChevronRight size={12} className={isActive ? "text-[#F7941D]" : "text-[#98A2B3]"} />
              )}
            </div>
          );
        })}

        {/* PAGES HEADER */}
        <div className="text-[10px] text-[#98A2B3] font-bold tracking-wider px-3 pt-3 pb-1 uppercase">
          Pages
        </div>

        {STATIC_LINKS.filter(link => !["dashboard", "operation"].includes(link.id)).map((link) => {
          const Icon = link.icon;
          const isActive = activeSidebarTab === link.id;
          return (
            <div
              key={link.id}
              onClick={() => {
                onSelectSidebarTab(link.id);
                setSuiteOpen(false);
              }}
              className={`px-3 py-2 rounded-xl text-[12.5px] flex items-center justify-between transition-all cursor-pointer ${
                isActive
                  ? "text-[#F7941D] font-bold bg-[#FFF9F2]"
                  : "text-[#475467] hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon size={15} className={`shrink-0 ${isActive ? "text-[#F7941D]" : "text-[#98A2B3]"}`} />
                <span>{link.label}</span>
              </div>
              {link.hasSub && (
                <ChevronRight size={12} className={isActive ? "text-[#F7941D]" : "text-[#98A2B3]"} />
              )}
            </div>
          );
        })}

        {/* INTERACTIVE DIGITAL TWIN TOUR LINKS */}
        <div className="mt-1 pt-1 border-t border-slate-100">
          <div
            onClick={() => setSuiteOpen(!suiteOpen)}
            className="text-[10px] text-[#62AB47] font-bold tracking-wider px-3 py-2 uppercase flex items-center justify-between cursor-pointer hover:bg-slate-50 rounded-lg"
          >
            <div className="flex items-center gap-1.5">
              <span>Digital Twin Playbooks</span>
            </div>
            <span className="bg-[#E6F4EA] text-[#137333] text-[8.5px] px-1.5 py-0.5 rounded-full font-bold">
              7 STAGES
            </span>
          </div>

          {suiteOpen && (
            <div className="flex flex-col gap-0.5 mt-1 pl-1">
              {TOUR_STEPS.map((step) => {
                const Icon = step.icon;
                const isSelected = activeSidebarTab === "" && activeScenario === "overage" && currentSuiteIdx === step.idx;
                return (
                  <div
                    key={step.idx}
                    onClick={() => {
                      onSelectComponent(step.idx);
                    }}
                    className={`px-2.5 py-1.5 rounded-lg text-[11.5px] flex items-center gap-2.5 transition-all cursor-pointer ${
                      isSelected
                        ? "text-[#62AB47] font-bold bg-[#E6F4EA]/35"
                        : "text-slate-500 hover:bg-slate-50"
                    }`}
                  >
                    <Icon size={13} className={`shrink-0 ${isSelected ? "text-[#62AB47]" : "text-[#98A2B3]"}`} />
                    <div className="flex-1 leading-none text-left">
                      <div className="font-semibold text-[11px]">{step.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* CHURN WIZARD DRAFT STEPS */}
        {activeScenario === "churn" && (
          <div className="mt-1 pt-1 border-t border-slate-100">
            <div
              onClick={() => setWizardOpen(!wizardOpen)}
              className="text-[10px] text-[#6264A7] font-bold tracking-wider px-3 py-2 uppercase flex items-center justify-between cursor-pointer hover:bg-slate-50 rounded-lg"
            >
              <span>Churn Config Steps</span>
              <span className="bg-slate-100 text-[#6264A7] text-[8.5px] px-1.5 py-0.5 rounded-full font-bold">
                WIZARD
              </span>
            </div>

            {wizardOpen && (
              <div className="flex flex-col gap-0.5 mt-1 pl-1">
                {[
                  { step: 0, label: "Alert Standby" },
                  { step: 1, label: "Segmentation" },
                  { step: 2, label: "Competitor" },
                  { step: 3, label: "Offer Decider" },
                  { step: 4, label: "Pacing config" },
                  { step: 5, label: "Launch Card" }
                ].map((ws) => {
                  const isSelected = activeSidebarTab === "" && activeScenario === "churn" && campaignFormStep === ws.step;
                  return (
                    <div
                      key={ws.step}
                      onClick={() => {
                        setCampaignFormStep(ws.step);
                        onSelectSidebarTab(""); // opens the campaign form flow
                      }}
                      className={`px-2.5 py-1.5 rounded-lg text-[11px] flex items-center gap-2 transition-all cursor-pointer ${
                        isSelected
                          ? "text-[#6264A7] font-bold bg-[#F4F4FA]"
                          : "text-slate-500 hover:bg-slate-50"
                      }`}
                    >
                      <div className={`w-3.5 h-3.5 rounded-full text-[8.5px] font-bold flex items-center justify-center border ${
                        isSelected ? "bg-[#6264A7] text-white border-transparent" : "bg-white text-slate-400 border-slate-200"
                      }`}>
                        {ws.step}
                      </div>
                      <span className="truncate text-[11px]">{ws.label}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* BOTTOM DIGITAL TWIN CONNECTED STATE CARD */}
      <div className="mt-auto pt-3">
        <div className="bg-[#EEF5FC] border border-blue-100/40 rounded-xl p-3 flex items-center justify-between">
          <div className="flex flex-col text-left">
            <span className="font-bold text-xs text-[#1D2939] leading-none">Digital Twin</span>
          </div>
          <div className="bg-white px-2 py-0.5 rounded-full flex items-center gap-1.5 border border-emerald-100 shadow-xxs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-[9px] font-black text-[#047857] uppercase tracking-wide">CONNECTED</span>
          </div>
        </div>
      </div>

    </div>
  );
}
