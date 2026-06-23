import React, { useState } from "react";
import { Campaign, SuiteComponent } from "./types";
import SuiteHeader from "./components/SuiteHeader";
import Sidebar, { TOUR_STEPS } from "./components/Sidebar";
import ComponentLabel from "./components/ComponentLabel";
import TwinConsole from "./components/TwinConsole";
import SignalInbox from "./components/SignalInbox";
import AgenticAI from "./components/AgenticAI";
import JourneyCanvas from "./components/JourneyCanvas";
import Monitoring from "./components/Monitoring";
import WizbotInsights from "./components/WizbotInsights";
import CampaignFormFlow from "./components/CampaignFormFlow";
import WizbotPanel from "./components/WizbotPanel";
import SegmentsModule from "./components/SegmentsModule";
import DashboardModule from "./components/DashboardModule";

import { Megaphone, Users, Sliders, Database, ArrowRight, Play, CheckCircle } from "lucide-react";

export default function App() {
  const [activeScenario, setActiveScenario] = useState<"overage" | "churn">("overage");
  const [currentSuiteIdx, setCurrentSuiteIdx] = useState<number>(0);
  const [campaignFormStep, setCampaignFormStep] = useState<number>(0);
  const [audienceSize, setAudienceSize] = useState<number>(300);
  
  // Left Sidebar non-tour tabs
  const [activeSidebarTab, setActiveSidebarTab] = useState<string>("campaign"); // "dashboard", "campaign", etc.
  
  // Active Campaigns State list (can be written to)
  const currentYear = new Date().getFullYear();
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    { name: "Summer Bundle Upsell Q2", type: "Up-sell Tactic", channel: "App Push + SMS", status: "Active", audience: 14470, start: `Jun 1`, end: `Jul 31`, community: "High Data Youth" },
    { name: "Network Recovery Retention Q1", type: "Service Care", channel: "SMS Only", status: "Completed", audience: 4210, start: "May 1", end: "May 31", community: "Istanbul Kadıköy" },
    { name: "Prepaid Top-up Push", type: "Monetization", channel: "Instant Push Notification", status: "Scheduled", audience: 28910, start: "Jun 28", end: "Jun 29", community: "Dormant Prepaid" },
    { name: "Family Pack Migration", type: "Postpaid Up", channel: "Omnichannel Wave", status: "Paused", audience: 19380, start: "Apr 15", end: "Jun 15", community: "Price Sensitive Family" }
  ]);

  const [formState, setFormState] = useState({
    name: "Budget Conscious Retention Jun 2026",
    code: "BCRET26",
    category: "Postpaid Retention",
    subCategory: "High Churn Propensity",
    type: "Defensive Discount Offer",
    datamart: "Budget Conscious — 300 Matching Customers",
    label: "Budget Conscious",
    description: "Retention campaign targeting Budget Conscious community members showing churn risk signals matched from the Jul 2024 wave.",
    channel: "SMS + Email",
    contentTemplate: "Retention Special SMS + Email Template",
    startDate: `${currentYear}-06-17`,
    endDate: `${currentYear}-09-17`,
    deliveryType: "Standard Paced Delivery",
    offer: "Offer B (30% Off - 139 TL/mo)"
  });

  // Calculate active header suite highlight component based on active stage
  const getActiveSuiteComponent = (): SuiteComponent => {
    if (activeScenario === "churn") {
      if (campaignFormStep === 0) return "twin";
      if (campaignFormStep === 1) return "cdp";
      if (campaignFormStep === 2) return "ai";
      if (campaignFormStep >= 3 && campaignFormStep <= 4) return "ecm";
      return "wizbot";
    }
    // Overage tour mapping
    switch (currentSuiteIdx) {
      case 0:
      case 1:
        return "twin";
      case 2:
        return "cdp";
      case 3:
        return "ai";
      case 4:
      case 5:
        return "ecm";
      case 6:
      default:
        return "wizbot";
    }
  };

  const handleSelectComponent = (comp: any) => {
    // If a top menu item or indexed step is clicked, make sure we direct appropriately
    if (typeof comp === "number") {
      setActiveScenario("overage");
      setCurrentSuiteIdx(comp);
      setActiveSidebarTab("");
    } else {
      // Suite component header buttons map directly to stage indexes
      setActiveScenario("overage");
      setActiveSidebarTab("");
      if (comp === "cdp") setCurrentSuiteIdx(2);
      if (comp === "twin") setCurrentSuiteIdx(0);
      if (comp === "ai") setCurrentSuiteIdx(3);
      if (comp === "ecm") setCurrentSuiteIdx(4);
      if (comp === "wizbot") setCurrentSuiteIdx(6);
    }
  };

  const handleWreckScenarioTransition = (scen: "overage" | "churn") => {
    setActiveScenario(scen);
    setActiveSidebarTab("");
    if (scen === "overage") {
      setCurrentSuiteIdx(0);
    } else {
      setCampaignFormStep(0);
    }
  };

  const handleDeployCampaign = () => {
    // Push new activated campaign to our list
    const newCampaign: Campaign = {
      name: formState.name,
      type: "Postpaid Retention",
      channel: "SMS + Email",
      status: "Active",
      audience: audienceSize,
      start: formState.startDate,
      end: formState.endDate,
      community: formState.label,
      agent: true
    };
    setCampaigns((prev) => [newCampaign, ...prev]);
    setCampaignFormStep(5); // Show finalized step
  };

  const handleSwitchToCampaign = (scenario: "overage" | "churn", prefillSegment: string) => {
    setActiveScenario(scenario);
    setActiveSidebarTab("");
    if (scenario === "overage") {
      setCurrentSuiteIdx(3); // Start agentic AI splits stage!
    } else {
      setCampaignFormStep(1); // Set to segmentation wizard step!
    }
    setFormState((prev) => ({
      ...prev,
      label: prefillSegment,
      name: `${prefillSegment} Retention Promo ${new Date().getFullYear()}`,
      datamart: `${prefillSegment} — Real-time Cohort`,
      description: `Targeted retention campaign for the digitally monitored ${prefillSegment} customer core.`
    }));
  };

  const handleAskWizbot = (question: string) => {
    window.dispatchEvent(new CustomEvent("ask-wizbot", { detail: question }));
  };

  return (
    <div className="h-screen w-screen bg-[#EEF2F6] p-4 flex flex-col gap-4 overflow-hidden text-[#2B3445] font-sans antialiased text-[13px]">
      
      {/* EXQUISITE FLOATING TOP APP BAR */}
      <SuiteHeader />

      {/* THREE-COLUMN BENTO GRID WORKSPACE BODY */}
      <div className="flex-1 flex gap-4 overflow-hidden min-h-0">
        
        {/* LEFT WORKSPACE NAVIGATION SIDEBAR */}
        <Sidebar
          currentSuiteIdx={currentSuiteIdx}
          onSelectComponent={handleSelectComponent}
          activeSidebarTab={activeSidebarTab}
          onSelectSidebarTab={(tab) => {
            setActiveSidebarTab(tab);
          }}
          activeScenario={activeScenario}
          onChangeScenario={handleWreckScenarioTransition}
          campaignFormStep={campaignFormStep}
          setCampaignFormStep={setCampaignFormStep}
        />

        {/* PRIMARY CONTAINER */}
        <div className="flex-1 flex flex-col gap-4 min-w-0 overflow-y-auto pr-1">
          
          {/* BREADCRUMB STRIP */}
          <div className="bg-transparent text-[11px] font-black tracking-wider uppercase select-none flex items-center gap-1.5 shrink-0 text-slate-400">
            <span>DASHBOARD</span>
            <span className="text-slate-300 font-normal">›</span>
            <span className="text-[#F7941D]">
              {activeSidebarTab ? activeSidebarTab.toUpperCase() : "PLAYBOOK FLOW"}
            </span>
            {activeSidebarTab === "campaign" && (
              <>
                <span className="text-slate-300 font-normal">›</span>
                <span className="text-[#F7941D]">SEARCH CAMPAIGN</span>
              </>
            )}
          </div>

          {/* DYNAMIC CANVAS AREA */}
          <div className="flex-1 min-h-0">
            {activeSidebarTab ? (
              // Active Standard Tab
              <div className="space-y-4 animate-fade-in pb-12">
                
                {/* Specific view for Campaign tab that matches the uploaded screenshot precisely */}
                {activeSidebarTab === "campaign" && (
                  <div className="space-y-4">
                    
                    {/* Pink Warning / Churn Risk Detected Alert Card */}
                    <div className="bg-[#FFF2F2] border border-red-200/50 rounded-2xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-xxs">
                      <div className="text-left max-w-2xl">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="w-2 h-2 rounded-full bg-red-600 animate-ping shrink-0" />
                          <h4 className="font-extrabold text-[#912020] text-[13.5px]">
                            Rising churn risk detected · Budget-Conscious Streamers
                          </h4>
                          <span className="bg-[#FCDDEC] text-[#AA2F6F] text-[10px] font-bold px-2 py-0.5 rounded-full">
                            ↘ 72% • +18% MoM
                          </span>
                        </div>
                        <p className="text-[#A25252] text-xs mt-1.5 leading-relaxed">
                          Twin Community signal — 47,500 subscribers showing high risk propensity matches. Let the 6 specialised AI agents compile a defensive offer campaign.
                        </p>
                      </div>

                      <button
                        onClick={() => handleWreckScenarioTransition("churn")}
                        className="bg-[#101828] hover:bg-slate-800 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-all shadow-sm shrink-0 flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>Create Retention Campaign with AI</span>
                        <ArrowRight size={13} className="text-[#F7941D]" />
                      </button>
                    </div>

                    {/* Highly Polished Search filters box in orange theme */}
                    <div className="bg-white rounded-2xl border border-slate-200/60 shadow-xxs p-6">
                      <div className="border-b border-slate-100 pb-3 mb-5 flex justify-between items-center">
                        <h2 className="text-[#F7941D] text-sm tracking-wider font-extrabold uppercase">
                          Search
                        </h2>
                        <span className="text-[10px] text-slate-400 font-mono">CAMPAIGN FILTER OPTIONS</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs text-left">
                        <div>
                          <label className="text-[10.5px] text-slate-500 font-bold block mb-1">Name</label>
                          <input type="text" placeholder="Enter name pattern..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 outline-none focus:border-[#F7941D]" />
                        </div>
                        <div>
                          <label className="text-[10.5px] text-slate-500 font-bold block mb-1">Campaign ID</label>
                          <input type="text" placeholder="e.g. BCRET26" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 outline-none focus:border-[#F7941D]" />
                        </div>
                        <div>
                          <label className="text-[10.5px] text-slate-500 font-bold block mb-1">Category</label>
                          <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 text-xs text-slate-600 outline-none focus:border-[#F7941D]">
                            <option>All Category</option>
                            <option>Postpaid Retention</option>
                            <option>Broadband</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10.5px] text-slate-500 font-bold block mb-1">Sub Category</label>
                          <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 text-xs text-slate-600 outline-none focus:border-[#F7941D]">
                            <option>All Sub Category</option>
                            <option>High Churn</option>
                            <option>Low ARPU</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10.5px] text-slate-500 font-bold block mb-1">Campaign Type</label>
                          <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 text-xs text-slate-600 outline-none focus:border-[#F7941D]">
                            <option>Select Option</option>
                            <option>Defensive Discount Tactic</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10.5px] text-slate-500 font-bold block mb-1">Campaign Label Name</label>
                          <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 text-xs text-slate-600 outline-none focus:border-[#F7941D]">
                            <option>Select Option</option>
                            <option>Budget Conscious</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10.5px] text-slate-500 font-bold block mb-1">Delivery Status</label>
                          <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 text-xs text-slate-600 outline-none focus:border-[#F7941D]">
                            <option>Select Option</option>
                            <option>Sent</option>
                            <option>In Progress</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10.5px] text-slate-500 font-bold block mb-1">Campaign Status</label>
                          <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 text-xs text-slate-600 outline-none focus:border-[#F7941D]">
                            <option>All Status</option>
                            <option>Active</option>
                            <option>Draft</option>
                          </select>
                        </div>
                      </div>

                      {/* Action buttons under form */}
                      <div className="flex justify-end gap-2.5 pt-4 border-t border-slate-100 mt-5">
                        <button className="px-4 py-2 text-[11.5px] font-bold text-slate-500 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-xl cursor-not-allowed">
                          Clear Filters
                        </button>
                        <button className="px-5 py-2 text-[11.5px] font-bold text-white bg-[#F7941D] hover:bg-[#db7a0f] rounded-xl shadow-xs transition-colors cursor-pointer">
                          Search Campaigns
                        </button>
                      </div>
                    </div>

                    {/* Campaigns Directory Listing */}
                    <div className="bg-white border border-slate-200/60 rounded-2xl shadow-xxs overflow-hidden text-left">
                      <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                        <span className="font-extrabold text-xs uppercase text-[#505B79] tracking-wider">Campaign Catalogue Directory</span>
                        <span className="text-[11px] text-slate-400 font-semibold">{campaigns.length} total entries</span>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-xs">
                          <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100 text-slate-400 font-bold uppercase text-[9px] tracking-wider">
                              <th className="p-3.5 pl-5">Campaign Name</th>
                              <th className="p-3.5">Assigned Segment</th>
                              <th className="p-3.5">Trigger Tactic</th>
                              <th className="p-3.5">Active Channels</th>
                              <th className="p-3.5">Target Audience</th>
                              <th className="p-3.5 pr-5">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {campaigns.map((camp, idx) => (
                              <tr key={idx} className="hover:bg-slate-50/20 transition-all">
                                <td className="p-3.5 pl-5">
                                  <div className="font-bold text-[#101828] text-[12.5px]">{camp.name}</div>
                                  {camp.agent && (
                                    <span className="inline-flex items-center gap-1 text-[8.5px] font-black text-[#6264A7] uppercase font-mono mt-0.5">
                                      <span className="w-1.5 h-1.5 rounded-full bg-[#6264A7] inline-block animate-ping" />
                                      <span>AI AGENT BUILT</span>
                                    </span>
                                  )}
                                </td>
                                <td className="p-3.5 text-slate-600 font-medium">{camp.community}</td>
                                <td className="p-3.5 text-slate-500">{camp.type}</td>
                                <td className="p-3.5 text-slate-400 font-mono text-[10.5px]">{camp.channel}</td>
                                <td className="p-3.5 font-bold font-mono text-[#101828]">
                                  {camp.audience ? camp.audience.toLocaleString() : "—"}
                                </td>
                                <td className="p-3.5 pr-5">
                                  <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                    camp.status === "Active"
                                      ? "bg-green-50 text-green-700 border border-green-200/50"
                                      : camp.status === "Completed"
                                      ? "bg-blue-50 text-blue-700 border border-blue-200/50"
                                      : "bg-slate-50 text-slate-600 border border-slate-200/50"
                                  }`}>
                                    <span>{camp.status}</span>
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {activeSidebarTab === "segment" && (
                  <SegmentsModule
                    onSwitchToCampaign={handleSwitchToCampaign}
                    onAskWizbot={handleAskWizbot}
                  />
                )}

                {activeSidebarTab === "dashboard" && (
                  <DashboardModule
                    onSwitchToCampaign={handleSwitchToCampaign}
                    onAskWizbot={handleAskWizbot}
                  />
                )}

                {activeSidebarTab !== "campaign" && activeSidebarTab !== "segment" && activeSidebarTab !== "dashboard" && (
                  <div className="bg-white border border-slate-200/60 rounded-2xl p-12 text-center text-slate-400 shadow-xxs space-y-4">
                    <Megaphone size={34} className="mx-auto text-slate-300 animate-pulse" />
                    <div>
                      <h3 className="text-sm font-black text-[#101828] mb-1">Standard Telco Variable Console</h3>
                      <p className="text-xs max-w-sm mx-auto leading-relaxed">
                        This section represents standard CRM logs. Switch Scenario playbooks on the sidebar to trigger autonomous AI agents!
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Active Scenario Playbook (Bento Box style panels)
              <div className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-xxs h-full overflow-y-auto">
                {activeScenario === "overage" ? (
                  <>
                    {currentSuiteIdx === 0 && (
                      <TwinConsole
                        currentStage={0}
                        onStageChange={setCurrentSuiteIdx}
                        onAdvanceToInbox={() => setCurrentSuiteIdx(2)}
                      />
                    )}
                    {currentSuiteIdx === 1 && (
                      <TwinConsole
                        currentStage={1}
                        onStageChange={setCurrentSuiteIdx}
                        onAdvanceToInbox={() => setCurrentSuiteIdx(2)}
                      />
                    )}
                    {isStageInbox(currentSuiteIdx) && (
                      <SignalInbox
                        onAdvanceToCopilot={() => setCurrentSuiteIdx(3)}
                      />
                    )}
                    {currentSuiteIdx === 3 && (
                      <AgenticAI
                        onAdvanceToCanvas={() => setCurrentSuiteIdx(4)}
                      />
                    )}
                    {currentSuiteIdx === 4 && (
                      <JourneyCanvas
                        onActivate={() => setCurrentSuiteIdx(5)}
                      />
                    )}
                    {currentSuiteIdx === 5 && (
                      <Monitoring
                        onAdvanceToWizbot={() => setCurrentSuiteIdx(6)}
                      />
                    )}
                    {currentSuiteIdx === 6 && (
                      <WizbotInsights
                        onRestartTour={() => setCurrentSuiteIdx(0)}
                      />
                    )}
                  </>
                ) : (
                  // Churn Flow
                  <CampaignFormFlow
                    formStep={campaignFormStep}
                    setFormStep={setCampaignFormStep}
                    formState={formState}
                    setFormState={setFormState}
                    audienceSize={audienceSize}
                    setAudienceSize={setAudienceSize}
                    onActivateCampaign={handleDeployCampaign}
                  />
                )}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT WIZBOT INTERACTIVE CONSULTING PANEL */}
        <WizbotPanel
          currentStage={currentSuiteIdx}
          activeScenario={activeScenario}
          campaignFormStep={campaignFormStep}
          audienceSize={audienceSize}
          activeSidebarTab={activeSidebarTab}
          onSelectSidebarTab={setActiveSidebarTab}
          onChangeScenario={handleWreckScenarioTransition}
          onSelectComponent={setCurrentSuiteIdx}
          setCampaignFormStep={setCampaignFormStep}
        />

      </div>
    </div>
  );
}

// Simple Helper
function isStageInbox(idx: number) {
  return idx === 2;
}
