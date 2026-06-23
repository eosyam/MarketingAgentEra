import React, { useState } from "react";
import { AlertCircle, ArrowRight, ShieldCheck, Mail, Smartphone, HelpCircle, Check, Award, Eye, Calendar, Sparkles } from "lucide-react";

interface CampaignFormProps {
  formStep: number;
  setFormStep: (step: number) => void;
  formState: any;
  setFormState: React.Dispatch<React.SetStateAction<any>>;
  audienceSize: number;
  setAudienceSize: (size: number) => void;
  onActivateCampaign: () => void;
}

export default function CampaignFormFlow({
  formStep,
  setFormStep,
  formState,
  setFormState,
  audienceSize,
  setAudienceSize,
  onActivateCampaign
}: CampaignFormProps) {
  const [selectedOffer, setSelectedOffer] = useState<string>("B");
  const [revisedCS, setRevisedCS] = useState<number>(0);
  const [revisedTenure, setRevisedTenure] = useState<number>(0);
  const [revisedDecline, setRevisedDecline] = useState<number>(0);
  const [showReviseModal, setShowReviseModal] = useState<boolean>(false);
  const [revisionRound, setRevisionRound] = useState<number>(0);

  // Stepper Header
  const stepsList = [
    { num: 1, label: "Campaign Info" },
    { num: 2, label: "Audience Filters" },
    { num: 3, label: "Offers & Channels" },
    { num: 4, label: "Timing & Scheduling" },
    { num: 5, label: "Review & Deploy" }
  ];

  const handleApplyRevisions = () => {
    // dynamically approximate audience size based on loosened inputs
    const base = 300;
    const addedCs = revisedCS === 1 ? 150 : revisedCS === 2 ? 320 : 0;
    const addedTenure = revisedTenure === 1 ? 90 : revisedTenure === 2 ? 220 : 0;
    const addedDecline = revisedDecline === 1 ? 140 : revisedDecline === 2 ? 280 : 0;
    const calculatedSize = base + addedCs + addedTenure + addedDecline;
    setAudienceSize(calculatedSize);
    setFormState((prev: any) => ({
      ...prev,
      datamart: `Budget Conscious — ${calculatedSize} Match`
    }));
    setRevisionRound((prev) => prev + 1);
    setShowReviseModal(false);
  };

  const currentYear = new Date().getFullYear();

  const handleNext = () => {
    if (formStep === 1) {
      setFormState((prev: any) => ({
        ...prev,
        datamart: `Budget Conscious — ${audienceSize} Members`
      }));
    }
    if (formStep === 2) {
      const offerLabel = selectedOffer === "A" ? "Offer A (20% Off - 159 TL)" : selectedOffer === "C" ? "Offer C (Extra 5GB data)" : "Offer B (30% Off - 139 TL)";
      setFormState((prev: any) => ({
        ...prev,
        offer: offerLabel,
        channel: "SMS + Email",
        contentTemplate: "Retention Special SMS + Email Bundle"
      }));
    }
    if (formStep === 3) {
      setFormState((prev: any) => ({
        ...prev,
        startDate: `${currentYear}-06-17`,
        endDate: `${currentYear}-09-17`
      }));
    }
    if (formStep === 5) {
      onActivateCampaign();
      return;
    }
    setFormStep(formStep + 1);
  };

  const handleBack = () => {
    setFormStep(Math.max(0, formStep - 1));
  };


  /* ── STEP 0: Teams Active alert ── */
  if (formStep === 0) {
    return (
      <div className="space-y-4 animate-fade-in font-sans">
        {/* Teams branding notification banner */}
        <div className="bg-white border border-[#DDD8FF] border-l-4 border-l-[#6264A7] rounded-lg p-5 shadow-md max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <div className="w-[30px] h-[30px] bg-[#6264A7] text-white font-black rounded flex items-center justify-center text-xs shrink-0 select-none">
              T
            </div>
            <span className="font-bold text-xs text-[#6264A7]">Microsoft Teams Alert</span>
            <span className="text-gray-300">•</span>
            <span className="text-xs text-[#505B79] font-medium">Marketing Master Agent</span>
            <span className="text-gray-300">•</span>
            <span className="text-xs text-[#A6AEBD]">Digital Twin Community Agent</span>
            <span className="bg-red-500 text-white text-[9px] font-black tracking-widest px-2 py-0.5 rounded ml-auto">UNREAD</span>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block animate-ping shrink-0" />
            <h3 className="text-base font-extrabold text-[#2B3445]">Churn Risk Warning — Budget Conscious segment reached alert threshold</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-4">
            {[
              { label: "Vulnerable Cohort", val: "Budget Conscious", color: "#2B3445" },
              { label: "Active Churn Score", val: "0.65 → 0.78", color: "#E5484D" },
              { label: "Subscribers at Risk", val: "300–450 estimated", color: "#E5484D" },
              { label: "Priority / Urgency", val: "⚡ CRITICAL", color: "#C55A00" }
            ].map((stat, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-100 p-2.5 rounded text-left">
                <span className="text-[9px] text-[#A6AEBD] font-bold uppercase tracking-wider block mb-1">{stat.label}</span>
                <span className="font-black text-xs" style={{ color: stat.color }}>{stat.val}</span>
              </div>
            ))}
          </div>

          <p className="text-xs text-[#505B79] leading-relaxed mb-4">
            Atya Digital Twin models identified custom behavioral patterns matching our <strong className="text-slate-800">Jul 2024 churn wave (91% similarity)</strong>. Furthermore, we detected that <strong className="text-[#C55A00]">Competitor C launched a no-contract 99 TL plan</strong> directly targeting our price-sensitive subscriber base this week. Immediate retention Campaign setup strongly advised.
          </p>

          <div className="flex gap-2.5 pt-2 border-t border-[#EEF2F7]">
            <button
              onClick={() => setFormStep(1)}
              className="bg-[#6264A7] hover:bg-[#525596] text-white text-xs font-bold py-2 px-4 rounded shadow-md cursor-pointer transition-all flex items-center gap-1.5"
            >
              <Sparkles size={13} />
              <span>Build Campaign with Agent</span>
            </button>
            <button
              onClick={() => alert("Digital twin detailed diagnostic report is shown below inside the active console!")}
              className="bg-white border border-[#DDD8FF] text-[#6264A7] text-xs font-semibold py-2 px-3 rounded hover:bg-slate-50 cursor-pointer"
            >
              View Alert Diagnoses
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 animate-fade-in font-sans">
      {/* Step Progress Indicators */}
      <div className="bg-white border border-[#E3E8EF] rounded-md p-4 flex items-center justify-between shadow-xs select-none">
        {stepsList.map((step, idx) => {
          const isDone = idx + 1 < formStep;
          const isActive = idx + 1 === formStep;
          return (
            <React.Fragment key={step.num}>
              <div className="flex items-center gap-2 shrink-0">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs border ${
                  isDone
                    ? "bg-[#62AB47] text-white border-transparent"
                    : isActive
                    ? "bg-[#6264A7] text-white border-transparent shadow-[0_0_0_3px_rgba(98,100,167,0.18)]"
                    : "bg-white text-[#A6AEBD] border-[#C9D2DE]"
                }`}>
                  {isDone ? "✓" : step.num}
                </div>
                <span className={`text-[12.5px] font-bold ${
                  isActive ? "text-[#2B3445]" : isDone ? "text-[#62AB47]" : "text-[#A6AEBD]"
                }`}>{step.label}</span>
              </div>
              {idx < stepsList.length - 1 && (
                <div className={`flex-1 h-[1.5px] mx-3 ${isDone ? "bg-[#62AB47]" : "bg-[#E3E8EF]"} transition-all`} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Main Form Fields wrapper */}
      <div className="bg-white border border-[#E3E8EF] rounded-md p-6 shadow-xs min-h-[290px]">
        {/* Step Header */}
        <div className="border-b border-[#F1F4F8] pb-3.5 mb-5">
          <div className="text-sm font-bold text-[#62AB47] mb-1">
            {formStep === 1 && "Campaign General Information"}
            {formStep === 2 && "Customer Segment Filters"}
            {formStep === 3 && "Offers, Channels & copywriting template"}
            {formStep === 4 && "Campaign Schedules & pacing parameters"}
            {formStep === 5 && "Retrospective Review & Launch"}
          </div>
          <p className="text-[11.5px] text-[#7E8A9A]">
            {formStep === 1 && "Basic descriptors for this proactive retention action, automatically generated by Marketing Master Agent."}
            {formStep === 2 && "Audience criteria matched from real-time customer data profiles. Change parameters to change reach sizes."}
            {formStep === 3 && "Strategic action offers optimized to counter the competitor's 99 TL threat with a lock-in advantage."}
            {formStep === 4 && "Scheduling timelines of automated waves. STO is active by default to prioritize open rates."}
            {formStep === 5 && "Verify campaign attributes before firing across communication pipelines."}
          </p>
        </div>

        {/* Form Body based on Steps */}
        {formStep === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-in max-w-xxl">
            <div>
              <label className="text-[11.5px] text-[#505B79] font-bold block mb-1">Campaign Name <span className="text-red-500">*</span></label>
              <div className="border border-[#C8E6B8] rounded bg-[#FAFFF7] px-3 py-2 text-xs font-semibold text-[#2B3445] flex items-center justify-between">
                <span>{formState.name}</span>
                <span className="bg-[#62AB47] text-white text-[8px] font-black px-1.5 py-0.5 rounded uppercase font-mono">AGENT PREFILL</span>
              </div>
            </div>
            <div>
              <label className="text-[11.5px] text-[#505B79] font-bold block mb-1">Campaign Code</label>
              <div className="border border-[#E3E8EF] rounded px-3 py-2 text-xs text-[#2B3445] bg-[#FAFAFC]">
                {formState.code}
              </div>
            </div>
            <div>
              <label className="text-[11.5px] text-[#505B79] font-bold block mb-1">Vertical Category</label>
              <div className="border border-[#E3E8EF] rounded px-3 py-2 text-xs text-[#2B3445] bg-[#FAFAFC]">
                {formState.category}
              </div>
            </div>
            <div>
              <label className="text-[11.5px] text-[#505B79] font-bold block mb-1">Subcategory Type</label>
              <div className="border border-[#E3E8EF] rounded px-3 py-2 text-xs text-[#2B3445] bg-[#FAFAFC]">
                {formState.subCategory}
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="text-[11.5px] text-[#505B79] font-bold block mb-1">General Description</label>
              <textarea
                value={formState.description}
                disabled
                className="w-full border border-slate-200 rounded p-2.5 text-xs text-slate-700 bg-slate-50 min-h-[70px] resize-none"
              />
            </div>
          </div>
        )}

        {formStep === 2 && (
          <div className="space-y-4 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[11.5px] text-[#505B79] font-bold block mb-1">Target Datamart</label>
                <div className="border border-[#E3E8EF] rounded px-3 py-2 text-xs text-[#2B3445] bg-slate-50 font-bold font-mono">
                  {formState.datamart}
                </div>
              </div>
              <div>
                <label className="text-[11.5px] text-[#505B79] font-bold block mb-1">Target Cluster Label</label>
                <div className="border border-[#E3E8EF] rounded px-3 py-2 text-xs text-[#2B3445] bg-slate-50 font-bold">
                  {formState.label}
                </div>
              </div>
            </div>

            <div className="border border-[#E3E8EF] rounded-md p-4 bg-slate-50">
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-xs text-[#505B79] uppercase tracking-wider">Active Cohort filter metrics</span>
                <span className="text-[10px] text-gray-400 font-bold">REVISION ROUND: {revisionRound} / 2</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div className="bg-white border border-[#E3E8EF] p-2.5 rounded">
                  <span className="text-[9px] text-[#A6AEBD] font-bold block mb-1">Churn Score limit</span>
                  <div className="text-xs font-bold text-[#E5484D]">{revisedCS === 1 ? "> 0.68" : revisedCS === 2 ? "> 0.60" : "> 0.75 strict"}</div>
                </div>
                <div className="bg-white border border-[#E3E8EF] p-2.5 rounded">
                  <span className="text-[9px] text-[#A6AEBD] font-bold block mb-1">Customer Tenure limit</span>
                  <div className="text-xs font-bold text-slate-700">{revisedTenure === 1 ? "18+ calendar months" : revisedTenure === 2 ? "12+ calendar months" : "24+ calendar months loyal"}</div>
                </div>
                <div className="bg-white border border-[#E3E8EF] p-2.5 rounded">
                  <span className="text-[9px] text-[#A6AEBD] font-bold block mb-1">Data Usage reduction slope</span>
                  <div className="text-xs font-bold text-slate-700">{revisedDecline === 1 ? "> 20% in past 30 days" : revisedDecline === 2 ? "> 15% in past 30 days" : "> 30% in past 30 days drop"}</div>
                </div>
              </div>

              <button
                onClick={() => setShowReviseModal(true)}
                className="bg-[#6264A7] hover:bg-[#525596] text-white font-bold text-xs py-1.5 px-3 rounded transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                <Sparkles size={11} className="stroke-[2.5]" />
                <span>Adjust thresholds & widen scope</span>
              </button>
            </div>
          </div>
        )}

        {formStep === 3 && (
          <div className="space-y-4 animate-fade-in">
            <label className="text-[11.5px] text-[#505B79] font-bold block">Defensive Campaign Offer</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { id: "A", name: "Offer A (20% Off)", desc: "159 TL fixed per month · 3 months lock-in", color: "bg-[#7E8A9A]", match: false },
                { id: "B", name: "Offer B (30% Off)", desc: "139 TL fixed per month · 3 months lock-in", color: "bg-[#6264A7]", match: true },
                { id: "C", name: "Offer C (Extra 5GB)", desc: "Mevcut fiyat · Ekstra 5GB data eklentisi", color: "bg-[#7E8A9A]", match: false }
              ].map((opt) => {
                const isSelected = selectedOffer === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => {
                      setSelectedOffer(opt.id);
                      setFormState((prev: any) => ({
                        ...prev,
                        offer: opt.id === "A" ? "Offer A (20% Off - 159 TL)" : opt.id === "C" ? "Offer C (Extra 5GB)" : "Offer B (30% Off - 139 TL)"
                      }));
                    }}
                    className={`p-4 border rounded-md cursor-pointer transition-all relative ${
                      isSelected
                        ? "border-[#6264A7] bg-[#F7F7FF]"
                        : "border-[#E3E8EF] bg-white hover:border-slate-300"
                    }`}
                  >
                    {opt.match && (
                      <span className="absolute top-2.5 right-2.5 bg-[#6264A7] text-white text-[8px] font-black px-1.5 py-0.5 rounded uppercase select-none">
                        BEST SHIELD VS COMP C
                      </span>
                    )}
                    <div className="font-bold text-sm text-[#2B3445] mb-1">{opt.name}</div>
                    <div className="text-xs text-[#7E8A9A]">{opt.desc}</div>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3.5 border-t border-[#EEF2F7]">
              <div>
                <label className="text-[11.5px] text-[#505B79] font-bold block mb-1">Target communication Channel</label>
                <div className="border border-[#C8E6B8] rounded bg-[#FAFFF7] px-3 py-2 text-xs font-semibold text-[#3E9232] flex items-center justify-between">
                  <span>SMS + Email (Omnichannel pacing)</span>
                  <span className="bg-[#62AB47] text-white text-[7.5px] font-black px-1 py-0.5 rounded">AUTO PREFILL</span>
                </div>
              </div>
              <div>
                <label className="text-[11.5px] text-[#505B79] font-bold block mb-1">Assigned content layout</label>
                <div className="border border-[#E3E8EF] rounded bg-slate-50 px-3 py-2 text-xs text-slate-700">
                  Retention Special SMS + Email Template
                </div>
              </div>
            </div>
          </div>
        )}

        {formStep === 4 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-in max-w-xxl">
            <div>
              <label className="text-[11.5px] text-[#505B79] font-bold block mb-1">Campaign launch date</label>
              <div className="border border-[#E3E8EF] rounded px-3 py-2 text-xs text-[#2B3445] bg-[#FAFAFC] flex items-center justify-between">
                <span>{formState.startDate || `${currentYear}-06-17`}</span>
                <Calendar size={13} className="text-[#A6AEBD]" />
              </div>
            </div>
            <div>
              <label className="text-[11.5px] text-[#505B79] font-bold block mb-1">Contract extension duration</label>
              <div className="border border-[#E3E8EF] rounded px-3 py-2 text-xs text-[#2B3445] bg-[#FAFAFC] flex items-center justify-between">
                <span>{formState.endDate || `${currentYear}-09-17`} (3 Months)</span>
                <Calendar size={13} className="text-[#A6AEBD]" />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="text-[11.5px] text-[#505B79] font-bold block mb-1">Delivery pacing mechanics</label>
              <div className="border border-[#C8E6B8] rounded bg-[#FAFFF7] px-3 py-2 text-xs font-semibold text-[#3E9232] flex items-center justify-between">
                <span>Send Time Optimization (STO) Active · Paced waves</span>
                <span className="bg-[#62AB47] text-white text-[7.5px] font-black px-1 py-0.5 rounded">AUTO CONFIGURED</span>
              </div>
            </div>
          </div>
        )}

        {formStep === 5 && (
          <div className="space-y-4 animate-fade-in">
            <p className="text-xs text-[#62AB47] font-extrabold uppercase tracking-wide">Review Campaign Summary</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-xs">
              {[
                { label: "Campaign Name", val: formState.name },
                { label: "Ref Code", val: formState.code },
                { label: "Vertical Category", val: formState.category },
                { label: "Target Datamart", val: formState.datamart || `Budget Conscious — ${audienceSize} Members` },
                { label: "Cluster Label", val: formState.label },
                { label: "Target Offer Tactic", val: formState.offer || "Offer B (30% Off - 139 TL)" },
                { label: "Fired Channel", val: "SMS + Email Omnibus" },
                { label: "Start Date", val: formState.startDate || `${currentYear}-06-17` },
                { label: "End Date", val: formState.endDate || `${currentYear}-09-17` },
                { label: "Delivery profile", val: formState.deliveryType }
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between py-1.5 border-b border-[#F1F4F8] items-center">
                  <span className="text-[#7E8A9A]">{item.label}</span>
                  <span className="font-bold text-[#2B3445] text-right font-mono">{item.val}</span>
                </div>
              ))}
            </div>
            
            <div className="p-3 bg-amber-50 text-[#B8620A] rounded border border-amber-200 text-[11px] leading-relaxed flex items-center gap-2 mt-4">
              <ShieldCheck size={18} className="shrink-0 text-[#F7941D]" />
              <span>
                Prioritization checks passed. Fatigue and subscriber overlap parameters are fully compliant. Ready to launch.
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons footer */}
      <div className="flex justify-between items-center select-none pt-2">
        {formStep > 1 ? (
          <button
            onClick={handleBack}
            className="bg-white border border-[#E3E8EF] text-[#505B79] font-bold text-xs py-2 px-4 rounded hover:bg-slate-50 cursor-pointer text-center"
          >
            ← Back
          </button>
        ) : (
          <div />
        )}

        <button
          onClick={handleNext}
          className={`font-bold text-xs py-2 px-6 rounded transition-all cursor-pointer shadow-sm text-center text-white ${
            formStep === 5 ? "bg-[#F7941D] hover:bg-[#db7a0f]" : "bg-[#62AB47] hover:bg-[#52933d]"
          }`}
        >
          {formStep === 5 ? "✓ Deploy Campaign" : "Continue →"}
        </button>
      </div>

      {/* FILTER REVISION DIALOG MODAL */}
      {showReviseModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white border border-[#EEF2F7] rounded-lg shadow-xl max-w-lg w-full p-6 space-y-4 animate-scale-up">
            <div className="flex justify-between items-start border-b border-[#F1F4F8] pb-3">
              <div>
                <h4 className="font-black text-sm text-[#2B3445] uppercase tracking-wide flex items-center gap-1.5">
                  <Sparkles size={15} className="text-[#6264A7]" />
                  <span>Interactive threshold tuning</span>
                </h4>
                <p className="text-[10.5px] text-[#7E8A9A] mt-1">Loosen filter tolerances to expand campaign reach size dynamically.</p>
              </div>
              <button onClick={() => setShowReviseModal(false)} className="text-gray-400 hover:text-gray-600 text-lg">&times;</button>
            </div>

            <div className="space-y-4">
              {/* CS */}
              <div>
                <label className="text-[11.5px] text-slate-700 font-extrabold block mb-1.5">Churn Score cut-off</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { val: 0, label: "> 0.75 strict", sub: "300 matches" },
                    { val: 1, label: "> 0.68 moderate", sub: "450 matches" },
                    { val: 2, label: "> 0.60 loose", sub: "620 matches" }
                  ].map((opt) => (
                    <div
                      key={opt.val}
                      onClick={() => setRevisedCS(opt.val)}
                      className={`p-2 border rounded cursor-pointer text-center text-xs transition-all ${
                        revisedCS === opt.val ? "border-[#6264A7] bg-[#F7F7FF] font-bold text-[#6264A7]" : "border-slate-200 bg-white hover:bg-slate-50"
                      }`}
                    >
                      <div>{opt.label}</div>
                      <div className="text-[9px] text-[#A6AEBD] font-normal font-mono mt-0.5">{opt.sub}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tenure */}
              <div>
                <label className="text-[11.5px] text-slate-700 font-extrabold block mb-1.5">Minimum Subscriber Tenure</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { val: 0, label: "24+ months", sub: "300 matches" },
                    { val: 1, label: "18+ months", sub: "390 matches" },
                    { val: 2, label: "12+ months", sub: "520 matches" }
                  ].map((opt) => (
                    <div
                      key={opt.val}
                      onClick={() => setRevisedTenure(opt.val)}
                      className={`p-2 border rounded cursor-pointer text-center text-xs transition-all ${
                        revisedTenure === opt.val ? "border-[#6264A7] bg-[#F7F7FF] font-bold text-[#6264A7]" : "border-slate-200 bg-white hover:bg-slate-50"
                      }`}
                    >
                      <div>{opt.label}</div>
                      <div className="text-[9px] text-[#A6AEBD] font-normal font-mono mt-0.5">{opt.sub}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decline */}
              <div>
                <label className="text-[11.5px] text-slate-700 font-extrabold block mb-1.5">Monthly Data Usage Decline Rate</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { val: 0, label: "> 30% drop", sub: "300 matches" },
                    { val: 1, label: "> 20% drop", sub: "440 matches" },
                    { val: 2, label: "> 15% drop", sub: "580 matches" }
                  ].map((opt) => (
                    <div
                      key={opt.val}
                      onClick={() => setRevisedDecline(opt.val)}
                      className={`p-2 border rounded cursor-pointer text-center text-xs transition-all ${
                        revisedDecline === opt.val ? "border-[#6264A7] bg-[#F7F7FF] font-bold text-[#6264A7]" : "border-slate-200 bg-white hover:bg-slate-50"
                      }`}
                    >
                      <div>{opt.label}</div>
                      <div className="text-[9px] text-[#A6AEBD] font-normal font-mono mt-0.5">{opt.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#F1F4F8] flex justify-end gap-2 bg-slate-50 p-4 -mx-6 -mb-6 rounded-b-lg">
              <button
                onClick={() => setShowReviseModal(false)}
                className="bg-white border border-[#E3E8EF] text-[#505B79] font-bold text-xs py-1.5 px-3 rounded hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyRevisions}
                className="bg-[#62AB47] text-white font-bold text-xs py-1.5 px-4 rounded hover:bg-[#54933d] transition-all cursor-pointer shadow-sm"
              >
                Apply Revisions
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
