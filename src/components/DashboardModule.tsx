import React, { useState, useEffect, useRef } from "react";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  TrendingDown,
  Eye,
  MousePointer,
  AlertCircle,
  Play,
  RotateCw,
  Clock,
  Mail,
  X,
  FileText,
  Bookmark,
  Sparkles,
  Award,
  ChevronDown,
  ChevronUp,
  Inbox,
  Send,
  HelpCircle
} from "lucide-react";

interface DashboardModuleProps {
  onSwitchToCampaign?: (scenario: "overage" | "churn", prefillSegment: string) => void;
  onAskWizbot?: (question: string) => void;
}

export default function DashboardModule({ onSwitchToCampaign, onAskWizbot }: DashboardModuleProps) {
  // Navigation states for date picker
  const [selectedWeekStart, setSelectedWeekStart] = useState<Date>(new Date(2026, 5, 15)); // Monday June 15, 2026
  const [selectedDayOffset, setSelectedDayOffset] = useState<number>(3); // 3 = Thursday (June 18)
  const [isAnalysisOpen, setIsAnalysisOpen] = useState(false);
  
  // Custom dialogs
  const [activeDialog, setActiveDialog] = useState<string | null>(null);
  const [selectedCampaignForDetail, setSelectedCampaignForDetail] = useState<any | null>(null);

  // Helper inside chart for resize observer
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 500, height: 260 });

  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({
          width: Math.max(width, 300),
          height: Math.max(height, 220)
        });
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Format week label: e.g., "JUN 15 - 21, 2026"
  const getWeekLabel = () => {
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const start = new Date(selectedWeekStart);
    const end = new Date(selectedWeekStart);
    end.setDate(start.getDate() + 6);
    
    // Check if spans across months
    if (start.getMonth() === end.getMonth()) {
      return `${monthNames[start.getMonth()]} ${start.getDate()} - ${end.getDate()}, ${start.getFullYear()}`;
    } else {
      return `${monthNames[start.getMonth()]} ${start.getDate()} - ${monthNames[end.getMonth()]} ${end.getDate()}, ${start.getFullYear()}`;
    }
  };

  // Move week offset
  const handlePrevWeek = () => {
    const prev = new Date(selectedWeekStart);
    prev.setDate(prev.getDate() - 7);
    setSelectedWeekStart(prev);
  };

  const handleNextWeek = () => {
    const next = new Date(selectedWeekStart);
    next.setDate(next.getDate() + 7);
    setSelectedWeekStart(next);
  };

  // Static list of campaigns for the currently chosen day
  // Days of week index: 0=Mon, 1=Tue, 2=Wed, 3=Thu, 4=Fri, 5=Sat, 6=Sun
  const campaignsByDay: Record<number, Array<{
    time: string;
    name: string;
    status: "Running" | "Upcoming" | "Completed" | "Suspended";
    type: "Event" | "Offer" | "Info";
    delivery: "Trigger" | "Scheduled" | "Instant";
    channel: "Email" | "SMS" | "App Push" | "Multichannel";
    audience: number;
    description: string;
  }>> = {
    0: [
      { time: "All Day", name: "system_heartbeat_check", status: "Running", type: "Event", delivery: "Trigger", channel: "Email", audience: 14500, description: "Automated daily infrastructure validation email flows." },
      { time: "10:15", name: "Welcome Pack New Subscribers", status: "Completed", type: "Offer", delivery: "Scheduled", channel: "Email", audience: 1240, description: "Welcome kit with special double quota promo for newly registered users." }
    ],
    1: [
      { time: "All Day", name: "Roaming Auto Trigger Base", status: "Running", type: "Event", delivery: "Trigger", channel: "Email", audience: 9280, description: "Triggers on border crossings to recommend custom day-pass adapters." },
      { time: "11:30", name: "Overage Prevention Warnings", status: "Completed", type: "Info", delivery: "Scheduled", channel: "Email", audience: 43900, description: "Notification and smart booster upsell for mid-period high spenders." }
    ],
    2: [
      { time: "14:00", name: "Mid-tier Speed Booster Pack", status: "Completed", type: "Offer", delivery: "Scheduled", channel: "Email", audience: 12800, description: "Upgrade offer targeted at users with 95% speed cap exhaustion." }
    ],
    3: [
      { time: "All Day", name: "event12", status: "Running", type: "Event", delivery: "Trigger", channel: "Email", audience: 8900, description: "Event triggered automated transactional system notifications." },
      { time: "All Day", name: "test event", status: "Running", type: "Event", delivery: "Trigger", channel: "Email", audience: 12000, description: "Testing system configurations for real-time CRM marketing rules." },
      { time: "15:10", name: "Schedule Campaing One", status: "Upcoming", type: "Offer", delivery: "Scheduled", channel: "Email", audience: 45220, description: "First wave of scheduled CLV retention campaigns with 10% coupon." },
      { time: "15:12", name: "Schedule Campaing One", status: "Upcoming", type: "Offer", delivery: "Scheduled", channel: "Email", audience: 14500, description: "A/B variant offering free secondary device line setup trial." },
      { time: "15:46", name: "Schedule Campaing two", status: "Upcoming", type: "Offer", delivery: "Scheduled", channel: "Email", audience: 89120, description: "Mass email targeting stable churn profiles with tenure gift packs." }
    ],
    4: [
      { time: "09:00", name: "Weekend Plan Starter Warm", status: "Upcoming", type: "Offer", delivery: "Scheduled", channel: "Email", audience: 34000, description: "Pre-empting weekend roaming behavior with specialized sport package vouchers." }
    ],
    5: [],
    6: [
      { time: "19:00", name: "Weekly KPI Recap Dispatch", status: "Upcoming", type: "Info", delivery: "Scheduled", channel: "Email", audience: 300, description: "Executive statistics broadcast and system monitoring updates." }
    ]
  };

  const activeDeliveriesList = campaignsByDay[selectedDayOffset] || [];

  // Generate date labels based on starting Monday date
  const getDayDetails = (offset: number) => {
    const d = new Date(selectedWeekStart);
    d.setDate(selectedWeekStart.getDate() + offset);
    return {
      dayNum: d.getDate(),
      dayName: ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"][offset]
    };
  };

  // KPI metadata cards matching user's visual exactly
  const kpiCards = [
    {
      id: "sent",
      title: "SENT",
      value: "301",
      sub: "Campaign Recipients",
      accentColor: "border-l-4 border-l-[#3B82F6]",
      icon: Send,
      iconColor: "text-[#3B82F6] bg-[#EFF6FF]",
      description: "Total unique marketing communication messages pushed to subscribers across active queues during the session."
    },
    {
      id: "delivered",
      title: "DELIVERED",
      value: "96%",
      sub: "Successfully sent messages",
      accentColor: "border-l-4 border-l-[#10B981]",
      icon: Award,
      iconColor: "text-[#10B981] bg-[#ECFDF5]",
      description: "Percentage of sent envelopes acknowledging positive carrier receipt (delivery status receipts received correctly)."
    },
    {
      id: "opened",
      title: "OPENED",
      value: "0%",
      sub: "Unique opens on links",
      accentColor: "border-l-4 border-l-[#8B5CF6]",
      icon: Eye,
      iconColor: "text-[#8B5CF6] bg-[#F5F3FF]",
      description: "No tracked email header pixel activations recorded in the control group for these test variants."
    },
    {
      id: "clicked",
      title: "CLICKED",
      value: "0%",
      sub: "Unique clicks on links",
      accentColor: "border-l-4 border-l-[#F97316]",
      icon: MousePointer,
      iconColor: "text-[#F97316] bg-[#FFF7ED]",
      description: "Proportion of delivered subscribers clicking the call-to-action redirect link back into the self-service web app."
    },
    {
      id: "bounced",
      title: "BOUNCED",
      value: "0%",
      sub: "Bounced messages",
      accentColor: "border-l-4 border-l-[#EF4444]",
      icon: AlertCircle,
      iconColor: "text-[#EF4444] bg-[#FEF2F2]",
      description: "Undelivered messages rejected by target mail servers due to expired accounts, network timeouts, or inbox quotas."
    }
  ];

  // Interactive Double-Axis Visual Chart Simulation using premium custom SVG rendering
  // Coordinates are computed dynamically using Dimensions.
  const chartPoints = [
    { label: "Mon", campaign: 6, delivery: 4, audience: 110, sent: 3, open: 1, click: 0 },
    { label: "Tue", campaign: 8, delivery: 3, audience: 30, sent: 4, open: 0, click: 0 },
    { label: "Wed", campaign: 11, delivery: 9, audience: 85, sent: 7, open: 2, click: 1 },
    { label: "Thu", campaign: 13, delivery: 9, audience: 40, sent: 5, open: 0, click: 0 },
    { label: "Fri", campaign: 9, delivery: 6, audience: 50, sent: 4, open: 1, click: 0 },
    { label: "Sat", campaign: 5, delivery: 2, audience: 10, sent: 2, open: 0, click: 0 },
    { label: "Sun", campaign: 3, delivery: 1, audience: 15, sent: 1, open: 0, click: 0 },
  ];

  // State to track hover over a specific data node
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  // SVG Calculation Helpers
  const paddingX = 45;
  const paddingY = 30;
  const chartWidth = dimensions.width - paddingX * 2;
  const chartHeight = dimensions.height - paddingY * 2;

  // X Coordinates of nodes
  const getX = (idx: number) => {
    return paddingX + (idx / (chartPoints.length - 1)) * chartWidth;
  };

  // Left scale maxes out at 15 (Campaign / Delivery)
  const getYLeft = (val: number) => {
    return paddingY + chartHeight - (val / 15) * chartHeight;
  };

  // Right scale maxes out at 130 (Audience size)
  const getYRight = (val: number) => {
    return paddingY + chartHeight - (val / 130) * chartHeight;
  };

  // Path generator for line chart (Audience)
  const getLinePath = () => {
    return chartPoints.map((p, idx) => {
      const x = getX(idx);
      const y = getYRight(p.audience);
      return `${idx === 0 ? "M" : "L"} ${x} ${y}`;
    }).join(" ");
  };

  return (
    <div id="executive-dashboard" className="space-y-5 select-none font-sans text-slate-800">
      
      {/* BREADCRUMB HEADER */}
      <div className="flex items-center gap-1.5 text-[10.5px] font-black uppercase tracking-wider text-[#A6AEBD]">
        <span>Favorites</span>
        <ChevronRight size={10} className="stroke-[3] text-slate-300" />
        <span className="text-[#64748B]">Dashboard</span>
      </div>

      {/* CAMPAIGN TIMELINE CARD */}
      <div className="bg-white border border-[#EEF2F7] rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.02)] overflow-hidden">
        
        {/* TIMELINE TABS BAR */}
        <div className="p-4.5 border-b border-[#F1F4F8] flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Deliveries Badge */}
          <div className="flex items-center gap-2.5">
            <h3 className="text-[13.5px] font-black text-[#1E293B] tracking-tight">Today's Deliveries</h3>
            <span className="bg-[#EFF6FF] text-[#3B82F6] font-bold text-[10.5px] px-2.5 py-0.5 rounded-full border border-[#DBEAFE]">
              {activeDeliveriesList.length} Deliveries
            </span>
          </div>

          {/* Date Picker Switcher */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Week navigation */}
            <div className="flex items-center gap-1 bg-slate-50 border border-slate-200/80 px-2 py-1 rounded-lg">
              <button
                onClick={handlePrevWeek}
                className="text-slate-500 hover:text-slate-800 p-0.5 rounded transition-colors cursor-pointer"
                title="Önceki Hafta"
              >
                <ChevronLeft size={13} className="stroke-[2.5]" />
              </button>
              
              <span className="text-[10.5px] font-extrabold text-slate-600 font-mono px-1">
                {getWeekLabel()}
              </span>

              <button
                onClick={handleNextWeek}
                className="text-slate-500 hover:text-slate-800 p-0.5 rounded transition-colors cursor-pointer"
                title="Sonraki Hafta"
              >
                <ChevronRight size={13} className="stroke-[2.5]" />
              </button>
            </div>

            {/* Days selection row (MONDAY 15 TO SUNDAY 21 STYLE) */}
            <div className="flex bg-slate-50 border border-slate-200/80 p-0.5 rounded-lg overflow-x-auto scrollbar-none">
              {[0, 1, 2, 3, 4, 5, 6].map((offset) => {
                const isSelected = selectedDayOffset === offset;
                const details = getDayDetails(offset);
                return (
                  <button
                    key={offset}
                    onClick={() => setSelectedDayOffset(offset)}
                    className={`flex flex-col items-center justify-center px-3.5 py-1.5 rounded-md min-w-[58px] transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#F97316] text-white shadow-xs"
                        : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                    }`}
                  >
                    <span className="text-[8.5px] font-extrabold tracking-tight block opacity-90 scale-90 mb-0.5">
                      {details.dayName.substring(0, 3)}
                    </span>
                    <span className="text-[13px] font-black leading-none block">
                      {details.dayNum}
                    </span>
                  </button>
                );
              })}
            </div>

          </div>

        </div>

        {/* DELIVERIES LIST TABLE (EXACTLY MATCHING USER'S SCREENSHOT COLUMNS) */}
        <div className="overflow-x-auto">
          {activeDeliveriesList.length > 0 ? (
            <table className="w-full text-left text-xs text-slate-600 border-collapse select-none">
              <thead>
                <tr className="bg-slate-50/50 border-b border-[#F1F4F8] text-[#7E8A9A] font-bold uppercase text-[9px] tracking-wider">
                  <th className="p-4 pl-6 text-[#505B79] font-black">START TIME</th>
                  <th className="p-4 text-[#505B79] font-black">CAMPAIGN NAME</th>
                  <th className="p-4 text-[#505B79] font-black">STATUS</th>
                  <th className="p-4 text-[#505B79] font-black">CAMPAIGN TYPE</th>
                  <th className="p-4 text-[#505B79] font-black">DELIVERY TYPE</th>
                  <th className="p-4 pr-6 text-[#505B79] font-black">CHANNEL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F4F8]">
                {activeDeliveriesList.map((delivery, idx) => (
                  <tr 
                    key={idx} 
                    onClick={() => {
                      setSelectedCampaignForDetail(delivery);
                      setActiveDialog("campaign_detail");
                    }}
                    className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                  >
                    {/* START TIME */}
                    <td className="p-4 pl-6 font-semibold text-[11.5px] text-slate-400 group-hover:text-slate-600">
                      {delivery.time}
                    </td>

                    {/* CAMPAIGN NAME */}
                    <td className="p-4 font-extrabold text-[12.5px] text-[#F97316] group-hover:text-amber-600 transition-colors">
                      {delivery.name}
                    </td>

                    {/* STATUS */}
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                        delivery.status === "Running"
                          ? "bg-blue-50 text-blue-600 border border-blue-100"
                          : "bg-orange-50 text-orange-600 border border-orange-100"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          delivery.status === "Running" ? "bg-blue-500" : "bg-orange-400"
                        }`} />
                        <span>{delivery.status}</span>
                      </span>
                    </td>

                    {/* CAMPAIGN TYPE */}
                    <td className="p-4">
                      <span className="flex items-center gap-1.5 text-[11px] text-slate-600 font-medium">
                        {delivery.type === "Event" ? (
                          <Calendar size={11.5} className="text-[#F97316]" />
                        ) : (
                          <Clock size={11.5} className="text-[#F97316]" />
                        )}
                        <span>{delivery.type}</span>
                      </span>
                    </td>

                    {/* DELIVERY TYPE */}
                    <td className="p-4">
                      <span className="flex items-center gap-1.5 text-[11px] text-slate-600 font-medium">
                        {delivery.delivery === "Trigger" ? (
                          <span className="text-[10px]">⚡ Trigger</span>
                        ) : (
                          <span className="text-[10px]">⏰ Scheduled</span>
                        )}
                      </span>
                    </td>

                    {/* CHANNEL */}
                    <td className="p-4 pr-6">
                      <span className="flex items-center gap-1.5 text-[11.5px] font-semibold text-[#F97316]">
                        <Mail size={12} className="text-[#F97316]" />
                        <span>{delivery.channel}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-10 text-slate-400">
              <Calendar size={28} className="mx-auto text-slate-200 mb-2 animate-pulse" />
              <p className="text-[11.5px] font-bold">Today has zero configured campaign deliveries.</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Please check dates on top or choose another week offset.</p>
            </div>
          )}
        </div>

      </div>

      {/* ANALYSIS ACCORDION COLLAPSED OR OPEN */}
      <div className="bg-white border border-[#EEF2F7] rounded-xl overflow-hidden shadow-2xs">
        <button
          onClick={() => setIsAnalysisOpen(!isAnalysisOpen)}
          className="w-full hover:bg-slate-50 px-4.5 py-3 flex items-center justify-between cursor-pointer select-none"
        >
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-black text-[#F97316] tracking-tight">Analysis</span>
            <span className="bg-[#FFF7ED] text-[#F97316] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-[#FFEDD5]">
              Last 7 Days
            </span>
          </div>
          {isAnalysisOpen ? (
            <ChevronUp size={15} className="text-slate-400 stroke-[3]" />
          ) : (
            <ChevronDown size={15} className="text-slate-400 stroke-[3]" />
          )}
        </button>

        {isAnalysisOpen && (
          <div className="p-5 border-t border-[#F1F4F8] bg-slate-50/55 text-xs text-slate-600 space-y-4 animate-slide-down">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white border border-slate-200/70 p-4 rounded-lg shadow-3xs">
                <div className="font-bold text-[#1E293B] mb-1 flex items-center gap-1.5">
                  <span className="text-indigo-400">🔥</span>
                  <span>Overage Alerts Trend</span>
                </div>
                <p className="text-[10.5px] text-slate-500 leading-relaxed">
                  Data overages triggered on Thursday represent a critical <strong>+18%</strong> surge compared to last week. The highest density of signals occurred within the 15:00 - 16:00 window.
                </p>
              </div>

              <div className="bg-white border border-slate-200/70 p-4 rounded-lg shadow-3xs">
                <div className="font-bold text-[#1E293B] mb-1 flex items-center gap-1.5">
                  <span className="text-[#62AB47]">🌿</span>
                  <span>Conversion Delivery Index</span>
                </div>
                <p className="text-[10.5px] text-slate-500 leading-relaxed">
                  Campaign deliveries via email are currently operating with an average delivery latency of <strong>82ms</strong>. Queue processing remains compliant with national subscriber privacy windows.
                </p>
              </div>

              <div className="bg-white border border-slate-200/70 p-4 rounded-lg shadow-3xs">
                <div className="font-bold text-[#1E293B] mb-1 flex items-center gap-1.5">
                  <span className="text-violet-400">🤖</span>
                  <span>AI Copilot Diagnostics</span>
                </div>
                <p className="text-[10.5px] text-slate-500 leading-relaxed">
                  Recommended pacing triggers for high churn risk customers show a <strong>34%</strong> reduction in friction when backing off email deliveries during peak travel.
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => {
                  if (onAskWizbot) {
                    onAskWizbot("Bana son 7 günlük dijital ikiz pazarlama analizlerini özetle.");
                  }
                }}
                className="bg-[#1E293B] hover:bg-slate-850 text-white font-extrabold text-[11px] px-4 py-2 rounded-lg cursor-pointer transition-colors"
              >
                Let Wizbot Deeply Analyze This
              </button>
            </div>
          </div>
        )}
      </div>

      {/* LOWER GRIDS ROW: MARKETING ACTIVITY SVG CHART & KEY PERFORMANCE INDICATORS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* MARKETING ACTIVITY CHART SECTION */}
        <div className="lg:col-span-7 bg-white border border-[#EEF2F7] rounded-xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div>
            <span className="text-[12.5px] font-black text-[#1E293B] tracking-tight block">
              Marketing Activity
            </span>
          </div>

          {/* Double Axis SVGs Chart container */}
          <div ref={containerRef} className="relative w-full h-[220px] my-3 select-none">
            <svg width={dimensions.width} height={dimensions.height} className="overflow-visible">
              
              {/* Grids rendering */}
              {[0, 1, 2, 3].map((g) => {
                const y = paddingY + (g / 3) * chartHeight;
                return (
                  <line
                    key={g}
                    x1={paddingX}
                    y1={y}
                    x2={dimensions.width - paddingX}
                    y2={y}
                    stroke="#F1F5F9"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                );
              })}

              {/* Vertical separators for the 7 days */}
              {chartPoints.map((p, idx) => {
                const x = getX(idx);
                return (
                  <line
                    key={idx}
                    x1={x}
                    y1={paddingY}
                    x2={x}
                    y2={paddingY + chartHeight}
                    stroke="#F8FAFC"
                    strokeWidth="1.5"
                  />
                );
              })}

              {/* DRAW BARS - Campaign (blue) and Delivery (green) on the background */}
              {chartPoints.map((p, idx) => {
                const x = getX(idx);
                const barWidth = 10;
                
                // Left offset for the blue Campaign bar
                const xCamp = x - barWidth - 1;
                // Height left relative to Left axis
                const yCampBase = paddingY + chartHeight;
                const yCampHeight = (p.campaign / 15) * chartHeight;
                
                // Right offset for the green Delivery bar
                const xDel = x + 1;
                const yDelHeight = (p.delivery / 15) * chartHeight;

                return (
                  <g key={idx}>
                    {/* Campaign bar (Blue: #4F46E5 / #1E3A8A opacity) */}
                    <rect
                      x={xCamp}
                      y={yCampBase - yCampHeight}
                      width={barWidth}
                      height={yCampHeight}
                      fill="#4F46E5"
                      fillOpacity="0.8"
                      rx="2"
                    />

                    {/* Delivery bar (Green: #62AB47) */}
                    <rect
                      x={xDel}
                      y={yCampBase - yDelHeight}
                      width={barWidth}
                      height={yDelHeight}
                      fill="#62AB47"
                      fillOpacity="0.8"
                      rx="2"
                    />
                  </g>
                );
              })}

              {/* DRAW LINES - Audience (yellow trend line) */}
              <path
                d={getLinePath()}
                fill="none"
                stroke="#FBBF24"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Markers & Hover circle triggers */}
              {chartPoints.map((p, idx) => {
                const x = getX(idx);
                const yAud = getYRight(p.audience);
                const isHovered = hoveredNode === idx;

                return (
                  <g key={idx}>
                    <circle
                      cx={x}
                      cy={yAud}
                      r={isHovered ? 6 : 4}
                      fill="#FFFFFF"
                      stroke="#FBBF24"
                      strokeWidth={isHovered ? 3.5 : 2.5}
                      className="transition-all duration-150 cursor-pointer"
                      onMouseEnter={() => setHoveredNode(idx)}
                      onMouseLeave={() => setHoveredNode(null)}
                    />
                    
                    {/* Render helper text labels on X Axis */}
                    <text
                      x={x}
                      y={dimensions.height - 8}
                      textAnchor="middle"
                      fontSize="9.5"
                      fill="#94A3B8"
                      fontWeight="bold"
                    >
                      {p.label}
                    </text>
                  </g>
                );
              })}

              {/* LEFT AXIS LABELS: 0 to 14, 15 */}
              <text x={paddingX - 10} y={getYLeft(14)} textAnchor="end" fontSize="9" fill="#94A3B8" fontWeight="bold">14</text>
              <text x={paddingX - 10} y={getYLeft(12)} textAnchor="end" fontSize="9" fill="#94A3B8" fontWeight="bold">12</text>
              <text x={paddingX - 10} y={getYLeft(9)} textAnchor="end" fontSize="9" fill="#94A3B8" fontWeight="bold">9</text>
              <text x={paddingX - 10} y={getYLeft(6)} textAnchor="end" fontSize="9" fill="#94A3B8" fontWeight="bold">6</text>
              <text x={paddingX - 10} y={getYLeft(3)} textAnchor="end" fontSize="9" fill="#94A3B8" fontWeight="bold">3</text>
              
              {/* RIGHT AXIS LABELS: 0 to 120 */}
              <text x={dimensions.width - paddingX + 10} y={getYRight(120)} textAnchor="start" fontSize="9" fill="#94A3B8" fontWeight="bold">120</text>
              <text x={dimensions.width - paddingX + 10} y={getYRight(100)} textAnchor="start" fontSize="9" fill="#94A3B8" fontWeight="bold">100</text>
              <text x={dimensions.width - paddingX + 10} y={getYRight(80)} textAnchor="start" fontSize="9" fill="#94A3B8" fontWeight="bold">80</text>
              <text x={dimensions.width - paddingX + 10} y={getYRight(60)} textAnchor="start" fontSize="9" fill="#94A3B8" fontWeight="bold">60</text>
              <text x={dimensions.width - paddingX + 10} y={getYRight(40)} textAnchor="start" fontSize="9" fill="#94A3B8" fontWeight="bold">40</text>
              
            </svg>

            {/* CHART TOOLTIP OVERLAY */}
            {hoveredNode !== null && (
              <div
                className="absolute bg-slate-900 text-white p-2.5 rounded-lg text-[9.5px] shadow-lg pointer-events-none z-10 space-y-1 font-mono leading-none flex flex-col"
                style={{
                  left: `${Math.min(getX(hoveredNode) - 40, dimensions.width - 120)}px`,
                  top: `${Math.max(getYRight(chartPoints[hoveredNode].audience) - 80, 5)}px`
                }}
              >
                <div className="font-bold border-b border-slate-700 pb-1 mb-1 text-amber-400">
                  Day: {chartPoints[hoveredNode].label}
                </div>
                <div>Audience: <span className="text-[#FBBF24] font-bold">{chartPoints[hoveredNode].audience}k</span></div>
                <div>Campaigns: <span className="text-[#A78BFA] font-bold">{chartPoints[hoveredNode].campaign}</span></div>
                <div>Deliveries: <span className="text-[#34D399] font-bold">{chartPoints[hoveredNode].delivery}</span></div>
              </div>
            )}
          </div>

          {/* Legends matched exactly */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-1 border-t border-slate-100 pt-3.5">
            <div className="flex items-center gap-1.5 text-[9.5px] font-black text-[#505B79] uppercase">
              <span className="w-2.5 h-2.5 inline-block bg-[#4F46E5] rounded-xs" />
              <span>Campaign</span>
            </div>
            <div className="flex items-center gap-1.5 text-[9.5px] font-black text-[#505B79] uppercase">
              <span className="w-2.5 h-2.5 inline-block bg-[#62AB47] rounded-xs" />
              <span>Delivery</span>
            </div>
            <div className="flex items-center gap-1.5 text-[9.5px] font-black text-[#505B79] uppercase">
              <span className="w-3.5 h-0.5 inline-block bg-[#FBBF24] relative"><span className="w-1.5 h-1.5 rounded-full bg-white border border-[#FBBF24] absolute -top-0.5 left-1" /></span>
              <span>Audience</span>
            </div>
            <div className="flex items-center gap-1.5 text-[9.5px] font-black text-[#505B79] uppercase">
              <span className="w-2.5 h-2.5 rounded-full border border-red-500 inline-block" />
              <span>Sent</span>
            </div>
            <div className="flex items-center gap-1.5 text-[9.5px] font-black text-[#505B79] uppercase">
              <span className="w-2.5 h-2.5 rounded-full border border-[#8B5CF6] inline-block" />
              <span>Open</span>
            </div>
            <div className="flex items-center gap-1.5 text-[9.5px] font-black text-[#505B79] uppercase">
              <span className="w-2.5 h-2.5 rounded-full border border-[#62AB47] inline-block" />
              <span>Click</span>
            </div>
          </div>
        </div>

        {/* KEY PERFORMANCE INDICATORS SECTION */}
        <div className="lg:col-span-5 bg-white border border-[#EEF2F7] rounded-xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div>
            <span className="text-[12.5px] font-black text-[#1E293B] tracking-tight block mb-4">
              Key Performance Indicators
            </span>
          </div>

          {/* Cards vertical stack */}
          <div className="space-y-3 flex-1 flex flex-col justify-between">
            {kpiCards.map((kpi) => {
              const Icon = kpi.icon;
              return (
                <div
                  key={kpi.id}
                  onClick={() => {
                    setSelectedCampaignForDetail({
                      name: `KPI Summary: ${kpi.title}`,
                      description: kpi.description,
                      time: "Real-time sync",
                      status: "Healthy",
                      type: kpi.value,
                      delivery: "Live telemetry",
                      channel: kpi.sub
                    });
                    setActiveDialog("kpi_detail");
                  }}
                  className={`bg-slate-50/50 hover:bg-slate-50 p-3.5 rounded-xl border border-slate-100 flex items-center justify-between cursor-pointer transition-all hover:scale-101 hover:shadow-2xs ${kpi.accentColor}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${kpi.iconColor}`}>
                      <Icon size={15} />
                    </div>
                    <div>
                      <span className="text-[9.5px] text-[#A6AEBD] font-black tracking-widest block uppercase">
                        {kpi.title}
                      </span>
                      <span className="text-[11px] text-slate-500 font-bold block leading-none mt-1">
                        {kpi.sub}
                      </span>
                    </div>
                  </div>

                  <div className="text-xl font-black text-[#1E293B] font-mono leading-none pr-1">
                    {kpi.value}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* FOOTER WIZBOT PROMPT HELPER */}
      <div className="bg-[#1E293B] border border-slate-800 rounded-xl p-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-amber-300">
            <Sparkles size={16} className="animate-spin-slow" />
          </div>
          <div>
            <div className="text-xs font-black text-white">Ask Wizbot about current Dashboard metrics</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Let Gemini analyze current latency bounds or schedule waves.</div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={() => {
              if (onAskWizbot) {
                onAskWizbot("Haftalık gönderim performans raporunu çıkar.");
              }
            }}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-extrabold text-[10.5px] px-3.5 py-1.5 rounded-md transition-colors cursor-pointer"
          >
            Weekly Dispatch performance
          </button>
          <button
            onClick={() => {
              if (onAskWizbot) {
                onAskWizbot("Neden Opened ve Clicked %0 gözüküyor?");
              }
            }}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-extrabold text-[10.5px] px-3.5 py-1.5 rounded-md transition-colors cursor-pointer"
          >
            Why is Click Rate 0%?
          </button>
        </div>
      </div>

      {/* DIALOG DETAILS MODAL */}
      {activeDialog && (
        <div className="fixed inset-0 bg-slate-950/70 p-4 z-50 flex items-center justify-center backdrop-blur-xs select-none">
          <div className="bg-white border border-slate-200 rounded-xl w-full max-w-md p-6 relative shadow-2xl animate-fade-in text-slate-800">
            <button
              onClick={() => setActiveDialog(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer bg-slate-100 hover:bg-slate-100/80 p-1.5 rounded-md"
              title="Kapat"
            >
              <X size={14} />
            </button>

            {activeDialog === "campaign_detail" && selectedCampaignForDetail && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded bg-orange-100 flex items-center justify-center text-[#F97316]">
                    <Clock size={14} className="stroke-[2.5]" />
                  </div>
                  <h3 className="font-extrabold text-sm uppercase text-slate-800 tracking-tight">Campaign Detail Viewer</h3>
                </div>

                <div className="bg-slate-50 border border-slate-100 p-4 rounded-lg space-y-3">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">CAMPAIGN NAME</span>
                    <span className="text-sm font-black text-[#F97316]">{selectedCampaignForDetail.name}</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">LAUNCH DETAIL & PACING</span>
                    <span className="text-xs font-semibold text-slate-700">{selectedCampaignForDetail.time} — {selectedCampaignForDetail.delivery} triggers</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">CHANNELS UTILIZED</span>
                    <span className="text-xs font-semibold text-slate-700 font-mono text-[11px]">{selectedCampaignForDetail.channel} automated broadcast</span>
                  </div>

                  {selectedCampaignForDetail.description && (
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">CAMPAIGN DESCRIPTION</span>
                      <p className="text-[11px] text-slate-500 leading-relaxed font-semibold italic mt-0.5">
                        "{selectedCampaignForDetail.description}"
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => {
                      if (onAskWizbot) {
                        onAskWizbot(`Describe marketing optimization tactics for ${selectedCampaignForDetail.name}.`);
                      }
                      setActiveDialog(null);
                    }}
                    className="flex-1 bg-[#F97316] hover:bg-amber-600 text-white font-extrabold text-xs py-2.5 rounded-md transition-colors"
                  >
                    Consult AI Strategy
                  </button>
                  <button
                    onClick={() => setActiveDialog(null)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-2.5 rounded-md"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            {activeDialog === "kpi_detail" && selectedCampaignForDetail && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded bg-indigo-100 flex items-center justify-center text-indigo-500">
                    <Inbox size={14} className="stroke-[2.5]" />
                  </div>
                  <h3 className="font-extrabold text-sm uppercase text-slate-800 tracking-tight">{selectedCampaignForDetail.name}</h3>
                </div>

                <div className="bg-slate-50 border border-slate-100 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-250">
                    <span className="text-[10px] text-slate-400 font-bold">TELEMETRY KEY:</span>
                    <span className="font-black text-slate-700">{selectedCampaignForDetail.channel}</span>
                  </div>

                  <div className="flex justify-between items-center pt-1.5 pb-2 border-b border-slate-250">
                    <span className="text-[10px] text-slate-400 font-bold">CURRENT LEVEL:</span>
                    <span className="font-black text-rose-600 font-mono tracking-tight text-[15px]">{selectedCampaignForDetail.type}</span>
                  </div>

                  <div className="pt-2">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">TECHNICAL SUMMARY</span>
                    <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                      {selectedCampaignForDetail.description}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveDialog(null)}
                  className="w-full bg-[#1E293B] hover:bg-slate-850 text-white font-extrabold text-xs py-2.5 rounded-md transition-colors"
                >
                  Acknowledge Telemetry
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
