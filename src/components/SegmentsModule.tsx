import React, { useState } from "react";
import {
  Gem,
  Crown,
  Medal,
  ChevronRight,
  Target,
  FileText,
  Link as LinkIcon,
  Lightbulb,
  X,
  Sparkles,
  Inbox,
  AlertTriangle,
  RotateCw,
  Search,
  ArrowRight,
  TrendingDown,
  Percent,
  CheckCircle2,
  ListPlus
} from "lucide-react";

interface SegmentsModuleProps {
  onSwitchToCampaign: (scenario: "overage" | "churn", prefillSegment: string) => void;
  onAskWizbot: (question: string) => void;
}

export default function SegmentsModule({ onSwitchToCampaign, onAskWizbot }: SegmentsModuleProps) {
  const [activeTab, setActiveTab] = useState<"clv" | "churn">("clv");
  const [selectedCLVCard, setSelectedCLVCard] = useState<"PLATINUM" | "GOLD" | "SILVER" | "BRONZE">("PLATINUM");
  const [selectedChurnCard, setSelectedChurnCard] = useState<"CRITICAL" | "HIGH" | "MEDIUM" | "STABLE">("CRITICAL");
  const [isDetailOpen, setIsDetailOpen] = useState(true);
  
  // Interactive UI action notifications / modals
  const [modalType, setModalType] = useState<"analysis" | "export" | "marketList" | "addCampaign" | "aiOffer" | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const clvData = {
    PLATINUM: {
      id: "PLATINUM",
      emoji: "👑",
      color: "#A78BFA", // lavender/indigo-400
      title: "PLATINUM",
      count: "12.450",
      ratio: "4.1%",
      threshold: "₺2,458+",
      avgClv: "3.240",
      avgTenure: "4.2",
      activeProducts: ["Premium+", "Fiber 100", "Netflix Bundle", "Unlimited Data", "International Pack"],
      channels: [
        { name: "Email", pct: 68, color: "bg-blue-500" },
        { name: "App Push", pct: 24, color: "bg-purple-500" },
        { name: "SMS", pct: 8, color: "bg-emerald-500" }
      ],
      aiAdvice: "Platinum üyeler için öncelikli teklif: 1 Gbps Fiber yükseltme ve özel müşteri hizmetleri hattı tanımlaması. Bu grup, SMS yerine interaktif App Push mesajlarına %30 daha yüksek yanıt veriyor."
    },
    GOLD: {
      id: "GOLD",
      emoji: "🥇",
      color: "#FBBF24", // yellow-400
      title: "GOLD",
      count: "45.230",
      ratio: "14.9%",
      threshold: "₺1,280 - ₺2,449",
      avgClv: "1,850",
      avgTenure: "3.1",
      activeProducts: ["Fiber 100", "Mobile Voice Plus", "Netflix Bundle", "Roaming Premium"],
      channels: [
        { name: "Email", pct: 38, color: "bg-blue-500" },
        { name: "App Push", pct: 20, color: "bg-purple-500" },
        { name: "SMS", pct: 42, color: "bg-emerald-500" }
      ],
      aiAdvice: "Gold segmenti için en başarılı kampanya kombini: Red Plus Tarifesi + Ücretsiz Youtube Premium hediyesi. Bu grup, %42 oranında SMS ile dönüşüm sağlamaktadır."
    },
    SILVER: {
      id: "SILVER",
      emoji: "🥈",
      color: "#9CA3AF", // gray-400
      title: "SILVER",
      count: "89.120",
      ratio: "29.4%",
      threshold: "₺580 - ₺1,199",
      avgClv: "890",
      avgTenure: "2.4",
      activeProducts: ["Fiber 50", "Mobile Voice Family", "SMS Booster Pack"],
      channels: [
        { name: "Email", pct: 17, color: "bg-blue-500" },
        { name: "App Push", pct: 25, color: "bg-purple-500" },
        { name: "SMS", pct: 58, color: "bg-emerald-500" }
      ],
      aiAdvice: "Silver segmentinde hedeflenecek operasyon: Akıllı Veri Aşım koruması teklif ederek, ek veri paketlerini indirimli sunmak. SMS üzerinden gönderilen STO (Send Time Optimization) kampanya başarısı %18 daha yüksek."
    },
    BRONZE: {
      id: "BRONZE",
      emoji: "🥉",
      color: "#D97706", // amber-600
      title: "BRONZE",
      count: "156.340",
      ratio: "51.6%",
      threshold: "< ₺580",
      avgClv: "390",
      avgTenure: "1.2",
      activeProducts: ["Mobile Voice Starter", "Prepaid Fast Pass", "Social Media Pack"],
      channels: [
        { name: "Email", pct: 10, color: "bg-blue-500" },
        { name: "App Push", pct: 12, color: "bg-purple-500" },
        { name: "SMS", pct: 78, color: "bg-emerald-500" }
      ],
      aiAdvice: "Bronze segmenti için maliyet-duyarlı teklifler tercih edilmelidir. Prepaid'den Faturalı'ya geçiş (Pre-to-Post) kampanyalarıyla ARPU değerini artırmaya yönelik 49 TL'lik ek paketler önerilebilir."
    }
  };

  const churnData = {
    CRITICAL: {
      id: "CRITICAL",
      emoji: "🚨",
      color: "#EF4444", // red-500
      title: "CRITICAL CHURN",
      count: "14.820",
      ratio: "4.9%",
      threshold: "Risk Index > 85%",
      avgClv: "2,910",
      avgTenure: "1.8",
      activeProducts: ["Premium+", "Overage Cost Spike", "Support Ticket Open", "Contract End"],
      channels: [
        { name: "App Push", pct: 54, color: "bg-purple-500" },
        { name: "SMS", pct: 36, color: "bg-emerald-500" },
        { name: "Email", pct: 10, color: "bg-blue-500" }
      ],
      aiAdvice: "Kritik kayıp riskindeki bu grup için 139 TL Retention B Teklifi (3 Ay Cezai Şartsız) hemen uygulanmalıdır. Destek talepleri son 3 günde çözülmeyenler için müşteri temsilcisi araması planlanmalıdır."
    },
    HIGH: {
      id: "HIGH",
      emoji: "⚠️",
      color: "#F97316", // orange-500
      title: "HIGH RISK",
      count: "38.450",
      ratio: "12.7%",
      threshold: "Risk Index 60% - 84%",
      avgClv: "1,750",
      avgTenure: "2.1",
      activeProducts: ["Roaming Drop Offset", "Speed Limit Breached", "Competitor Promo Search"],
      channels: [
        { name: "SMS", pct: 48, color: "bg-emerald-500" },
        { name: "App Push", pct: 32, color: "bg-purple-500" },
        { name: "Email", pct: 20, color: "bg-blue-500" }
      ],
      aiAdvice: "Yüksek kayıp riskindeki müşterilerinize 99 TL BudgetNet karşı teklifi (%38 indirimli limitsiz) önerilmelidir. Dijital ikiz davranış desenleri, rakip tarife aramalarını takip eden günlerde churn ihtimalinin %77 arttığını gösteriyor."
    },
    MEDIUM: {
      id: "MEDIUM",
      emoji: "📊",
      color: "#FACC15", // yellow-400
      title: "MEDIUM RISK",
      count: "74.190",
      ratio: "24.5%",
      threshold: "Risk Index 30% - 59%",
      avgClv: "1,120",
      avgTenure: "3.3",
      activeProducts: ["Fiber 50", "Voice Bundle Regular", "Roaming Starter"],
      channels: [
        { name: "Email", pct: 46, color: "bg-blue-500" },
        { name: "SMS", pct: 34, color: "bg-emerald-500" },
        { name: "App Push", pct: 20, color: "bg-purple-500" }
      ],
      aiAdvice: "Orta riskli müşterileriniz için akıllı paket optimizasyonları ve tenure-sadakat hediyeleri sunulmalıdır. Aylık kullanım sınırları dolmak üzere olanlara ek 15GB paket hediyesi churn riskini %22 azaltmaktadır."
    },
    STABLE: {
      id: "STABLE",
      emoji: "✅",
      color: "#10B981", // emerald-500
      title: "STABLE / LOW RISK",
      count: "175.440",
      ratio: "57.9%",
      threshold: "Risk Index < 30%",
      avgClv: "3,480",
      avgTenure: "4.9",
      activeProducts: ["Fiber Quad-Play Elite", "Static Contract Long", "Multi-Line Premium"],
      channels: [
        { name: "Email", pct: 72, color: "bg-blue-500" },
        { name: "App Push", pct: 18, color: "bg-purple-500" },
        { name: "SMS", pct: 10, color: "bg-emerald-500" }
      ],
      aiAdvice: "Kayıp riski bulunmayan yüksek sadakatli kitle. Bu grup için çapraz satış (cross-sell) ve yeni akıllı ev/asistan çözümleri gibi ek servis satışı kampanyaları kurgulanabilir."
    }
  };

  const getActiveData = () => {
    if (activeTab === "clv") {
      return clvData[selectedCLVCard];
    } else {
      return churnData[selectedChurnCard];
    }
  };

  const activeSegment = getActiveData();

  const handleLaunchCampaign = () => {
    // Determine target scenario
    const targetScenario = activeTab === "clv" ? "overage" : "churn";
    const segmentName = activeSegment.title;
    onSwitchToCampaign(targetScenario, segmentName);
  };

  return (
    <div id="segments-module" className="space-y-6 font-sans">
      
      {/* TABS SELECTOR & SUBTITLE STRIP */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/40 p-4 rounded-xl border border-slate-800 backdrop-blur-xs">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#3C4257] flex items-center justify-center border border-slate-700 shadow-sm">
              <Gem size={18} className="text-violet-400 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                {activeTab === "clv" ? "CLV Segments" : "Churn Risk Segments"}
                <span className="text-xs font-mono font-normal text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                  Digital Twin Integrated
                </span>
              </h2>
              <p className="text-[11.5px] text-slate-300 mt-0.5">
                {activeTab === "clv" 
                  ? "Customer Lifetime Value segmentasyonu • Digital Twin entegrasyonu" 
                  : "Müşteri Kayıp Riski ve Davranışsal Churn analizi • Digital Twin entegrasyonu"}
              </p>
            </div>
          </div>
        </div>

        {/* Sync panel / active selector */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 bg-[#1E293B]/80 px-2.5 py-1 rounded-full text-[10.5px] text-[#A78BFA] font-bold border border-[#7C3AED]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>Sync: 2 dakika önce</span>
          </div>

          <div className="bg-slate-950 p-1 rounded-lg border border-slate-800 flex gap-1">
            <button
              onClick={() => {
                setActiveTab("clv");
                setIsDetailOpen(true);
              }}
              className={`text-[11px] font-bold py-1.5 px-3.5 rounded-md transition-all cursor-pointer ${
                activeTab === "clv"
                  ? "bg-[#62AB47] text-white shadow-xs"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              CLV Segments
            </button>
            <button
              onClick={() => {
                setActiveTab("churn");
                setIsDetailOpen(true);
              }}
              className={`text-[11px] font-bold py-1.5 px-3.5 rounded-md transition-all cursor-pointer ${
                activeTab === "churn"
                  ? "bg-rose-600 text-white shadow-xs"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Churn Risk
            </button>
          </div>
        </div>
      </div>

      {/* SEARCH BAR (Simulated but fully interactive filter styling) */}
      <div className="flex items-center gap-2 bg-white/75 border border-slate-200 rounded-lg px-3 py-1.5 shadow-2xs max-w-sm">
        <Search size={14} className="text-slate-400 shrink-0" />
        <input
          type="text"
          placeholder="Cohort araması yapın... (Örn: Platinum, High)"
          className="bg-transparent text-xs text-slate-800 outline-hidden w-full placeholder-slate-400 font-medium"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <X size={12} className="text-gray-400 hover:text-gray-600 cursor-pointer" onClick={() => setSearchQuery("")} />
        )}
      </div>

      {/* CLV SEGMENT CARDS GRID - Matching user's exact UI */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {activeTab === "clv" ? (
          <>
            {(Object.keys(clvData) as Array<keyof typeof clvData>)
              .filter(key => key.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((key) => {
                const item = clvData[key];
                const isSelected = selectedCLVCard === key;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSelectedCLVCard(key);
                      setIsDetailOpen(true);
                    }}
                    className={`p-5 rounded-xl transition-all cursor-pointer border relative overflow-hidden select-none ${
                      isSelected
                        ? "bg-[#161B2B] border-violet-500/80 shadow-md ring-1 ring-violet-500/20"
                        : "bg-slate-900/90 hover:bg-slate-900 border-slate-800 hover:border-slate-700 hover:shadow-xs"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3.5">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{item.emoji}</span>
                        <span className="text-[11px] font-black tracking-widest text-[#94A3B8]" style={{ color: isSelected ? "#C084FC" : "#94A3B8" }}>
                          {item.title}
                        </span>
                      </div>
                      {isSelected && (
                        <div className="w-2 h-2 rounded-full bg-violet-400 ring-2 ring-violet-400/20" />
                      )}
                    </div>

                    <div className="text-2xl font-black text-white tracking-tight mb-2.5">
                      {item.count}
                    </div>

                    <div className="flex justify-between items-center text-[11px] font-bold border-t border-slate-800/60 pt-2.5 mt-1.5">
                      <span className="text-emerald-400">
                        Oran: <span className="font-extrabold">{item.ratio}</span>
                      </span>
                      <span className="text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800/80 font-mono">
                        {item.threshold}
                      </span>
                    </div>

                    {/* Left aesthetic bar */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-violet-500/30" style={{ backgroundColor: item.color + "40" }} />
                  </div>
                );
              })}
          </>
        ) : (
          <>
            {(Object.keys(churnData) as Array<keyof typeof churnData>)
              .filter(key => key.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((key) => {
                const item = churnData[key];
                const isSelected = selectedChurnCard === key;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSelectedChurnCard(key);
                      setIsDetailOpen(true);
                    }}
                    className={`p-5 rounded-xl transition-all cursor-pointer border relative overflow-hidden select-none ${
                      isSelected
                        ? "bg-[#1E1116] border-rose-500/80 shadow-md ring-1 ring-rose-500/20"
                        : "bg-slate-900/90 hover:bg-slate-900 border-slate-800 hover:border-slate-700 hover:shadow-xs"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3.5">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{item.emoji}</span>
                        <span className="text-[11px] font-black tracking-widest" style={{ color: isSelected ? "#F43F5E" : "#94A3B8" }}>
                          {item.title}
                        </span>
                      </div>
                      {isSelected && (
                        <div className="w-2 h-2 rounded-full bg-rose-400 ring-2 ring-rose-400/20" />
                      )}
                    </div>

                    <div className="text-2xl font-black text-white tracking-tight mb-2.5 animate-pulse">
                      {item.count}
                    </div>

                    <div className="flex justify-between items-center text-[11px] font-bold border-t border-slate-800/60 pt-2.5 mt-1.5">
                      <span className="text-rose-400">
                        Oran: <span className="font-extrabold">{item.ratio}</span>
                      </span>
                      <span className="text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800/80 font-mono">
                        {item.threshold}
                      </span>
                    </div>

                    {/* Left aesthetic bar */}
                    <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: item.color + "40" }} />
                  </div>
                );
              })}
          </>
        )}
      </div>

      {/* QUICK WORKFLOW TOOLS BAR */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={handleLaunchCampaign}
          className="bg-[#6366F1] hover:bg-[#4F46E5] text-white text-[11px] font-extrabold px-4.5 py-2.5 rounded-lg flex items-center gap-1.5 cursor-pointer transition-all shadow-md active:scale-97"
        >
          <Target size={13} className="stroke-[2.5]" />
          <span>+ Segmente Kampanya Oluştur</span>
        </button>

        <button
          onClick={() => setModalType("analysis")}
          className="bg-[#1E293B] hover:bg-[#334155] border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-[11px] font-bold px-4 py-2.5 rounded-lg flex items-center gap-1.5 cursor-pointer transition-all"
        >
          <Inbox size={13} className="text-violet-400" />
          <span>Detaylı Analiz</span>
        </button>

        <button
          onClick={() => setModalType("export")}
          className="bg-[#1E293B] hover:bg-[#334155] border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-[11px] font-bold px-4 py-2.5 rounded-lg flex items-center gap-1.5 cursor-pointer transition-all animate-fade-in"
        >
          <FileText size={13} className="text-emerald-400" />
          <span>Export (.CSV)</span>
        </button>
      </div>

      {/* SEGMENT DETAILS CARD (REPLICATING THE SPECIFIED LAYOUT) */}
      {isDetailOpen && (
        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 shadow-xl relative animate-slide-up select-none">
          {/* Close button */}
          <button
            onClick={() => setIsDetailOpen(false)}
            className="absolute top-4 right-4 bg-slate-900/80 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer border border-slate-800"
            title="Kapat"
          >
            <X size={14} />
          </button>

          {/* Heading with pill */}
          <div className="flex items-center gap-2 pb-4 border-b border-slate-800/80 mb-5">
            <span className="text-sm font-black text-slate-200">Segment Detayı:</span>
            <span 
              className="text-[10px] font-extrabold font-mono tracking-wider px-2.5 py-0.5 rounded-full text-white"
              style={{ backgroundColor: activeSegment.color }}
            >
              {activeSegment.title}
            </span>
          </div>

          {/* Grid Layout of parameters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4.5 mb-5.5">
            {/* Average CLV/churn block */}
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 flex flex-col justify-between min-h-[90px]">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                {activeTab === "clv" ? "ORTALAMA CLV" : "ORTALAMA CHURN RISKI"}
              </span>
              <div className="text-2xl font-black text-white my-1 tracking-tight">
                {activeTab === "clv" ? `₺${activeSegment.avgClv}` : `%${activeSegment.avgClv}`}
              </div>
              <span className="text-[10px] text-slate-500 font-medium">Aylık değer</span>
            </div>

            {/* Tenure block */}
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 flex flex-col justify-between min-h-[90px]">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">ORTALAMA TENURE</span>
              <div className="text-2xl font-black text-white my-1 tracking-tight">
                {activeSegment.avgTenure}
              </div>
              <span className="text-[10px] text-slate-500 font-medium font-bold font-sans">Yıl</span>
            </div>
          </div>

          {/* Tag labels container: MONITORED CORE SIGNS / MOST COMMONLY HELD PRODUCTS */}
          <div className="mb-5.5">
            <div className="text-[10.5px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1.5 mb-2.5">
              <span className="text-amber-500">🛡️</span>
              <span>
                {activeTab === "clv" ? "EN ÇOK SAHİP OLUNAN ÜRÜNLER" : "MONİTÖR EDİLEN KRİTİK CHURN SİNYALLERİ"}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {activeSegment.activeProducts.map((p, idx) => (
                <span
                  key={idx}
                  className="text-[11px] font-extrabold bg-[#1F2937] hover:bg-slate-800 text-slate-200 px-3 py-1 rounded-md border border-slate-700/60 transition-colors"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* PREFERRED DELIVERY CHANNELS WITH BAR GRAPH */}
          <div className="mb-6.5">
            <div className="text-[10.5px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1.5 mb-3.5">
              <span className="text-indigo-400">📊</span>
              <span>TERCİH EDİLEN KANALLAR</span>
            </div>
            <div className="space-y-3">
              {activeSegment.channels.map((ch, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between items-center text-[11px] font-bold">
                    <span className="text-slate-300">{ch.name}</span>
                    <span className="text-slate-200 font-mono">{ch.pct}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div className={`h-full ${ch.color}`} style={{ width: `${ch.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* LOWER ACTION BUTTONS ROW */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-5 border-t border-slate-800/80">
            <button
              onClick={handleLaunchCampaign}
              className="bg-indigo-600/90 hover:bg-indigo-600 text-white font-extrabold text-[11px] py-3 rounded-lg hover:shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 text-center"
            >
              <Target size={13} className="stroke-[2.5]" />
              <span>Bu Segmente Kampanya</span>
            </button>

            <button
              onClick={() => setModalType("marketList")}
              className="bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white font-bold text-[11px] py-3 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 text-center"
            >
              <FileText size={13} className="text-amber-400" />
              <span>Marketing List Oluştur</span>
            </button>

            <button
              onClick={() => setModalType("addCampaign")}
              className="bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white font-bold text-[11px] py-3 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 text-center"
            >
              <LinkIcon size={13} className="text-emerald-400" />
              <span>Mevcut Kampanyaya Ekle</span>
            </button>

            <button
              onClick={() => setModalType("aiOffer")}
              className="bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white font-bold text-[11px] py-3 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 text-center"
            >
              <Lightbulb size={13} className="text-amber-300 animate-pulse" />
              <span>AI Teklif Önerisi Al</span>
            </button>
          </div>
        </div>
      )}

      {/* DETAIL WORKFLOW ACTION MODALS */}
      {modalType && (
        <div className="fixed inset-0 bg-slate-950/70 py-10 px-4 overflow-y-auto z-50 flex items-center justify-center backdrop-blur-xs select-none">
          <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-md p-6 relative shadow-2xl animate-fade-in text-slate-100">
            <button
              onClick={() => setModalType(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer bg-slate-850 p-1 rounded-md"
            >
              <X size={15} />
            </button>

            {modalType === "analysis" && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-violet-400">
                  <Inbox size={20} />
                  <span className="font-extrabold text-sm uppercase tracking-wide">DETAYLI REKABET VE COHORT ANALİZİ</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  {activeSegment.title} segmentinin son 30 günlük churn ivmesi ve rakip tekliflere hassasiyeti çıkarıldı. Operatör pazar araştırmalarına göre bu grubun Turkcell veya Vodafone'a geçiş yapma bariyeri, internet hızı memnuniyetsizliklerinde %40 oranında azalıyor.
                </p>
                <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 text-[11.5px] font-bold space-y-2 font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Cohort Churn Hassasiyeti:</span>
                    <span className="text-rose-450">%78.2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Kullanım İçi Aşım İhtimali:</span>
                    <span className="text-emerald-400">%89.1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Ortalama STO Saati:</span>
                    <span className="text-violet-450">17:30 - 19:00</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    onAskWizbot(`${activeSegment.title} cohort analizi detaylarını açıkla.`);
                    setModalType(null);
                  }}
                  className="w-full bg-[#62AB47] text-white font-extrabold text-xs py-2.5 rounded-md hover:bg-[#54933d] transition-all"
                >
                  Analizi Wizbot'a Danış
                </button>
              </div>
            )}

            {modalType === "export" && (
              <div className="space-y-4 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-400">
                  <CheckCircle2 size={24} className="animate-bounce" />
                </div>
                <h3 className="font-bold text-sm text-slate-100 uppercase">Veri Dışa Aktarıldı (Export)</h3>
                <p className="text-xs text-slate-300">
                  <strong>{activeSegment.count}</strong> adet aboneyi içeren model verisi ve kontak detayları <code>atya_segment_{activeSegment.title.toLowerCase()}_export.csv</code> olarak başarıyla hazırlandı.
                </p>
                <button
                  onClick={() => setModalType(null)}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs py-2 rounded"
                >
                  Tamam, Kapat
                </button>
              </div>
            )}

            {modalType === "marketList" && (
              <div className="space-y-4 text-left">
                <div className="flex items-center gap-2 text-amber-400">
                  <ListPlus size={18} />
                  <span className="font-extrabold text-xs uppercase tracking-wide">MARKETING LIST OLUŞTURULDU</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  <strong>{activeSegment.count}</strong> benzersiz MSISDN numarası, Atya SMS/Email otomasyon havuzuna <code>List_{activeSegment.title}</code> ismiyle aktarıldı. Bu listeye anında toplu gönderim şablonları bağlayabilirsiniz.
                </p>
                <div className="border border-slate-800 rounded bg-slate-950 p-2.5 text-[10.5px] text-slate-400 font-mono">
                  Havuz Adresi: <code>atya://campaign/list_{activeSegment.title.toLowerCase()}</code>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setModalType(null);
                      handleLaunchCampaign();
                    }}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-2 rounded transition-all"
                  >
                    Kampanyaya Geç
                  </button>
                  <button
                    onClick={() => setModalType(null)}
                    className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs px-4 py-2 rounded"
                  >
                    Kapat
                  </button>
                </div>
              </div>
            )}

            {modalType === "addCampaign" && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-emerald-400">
                  <LinkIcon size={18} />
                  <span className="font-extrabold text-xs uppercase tracking-wide">MEVCUT KAMPANYAYA COHORT EKLEME</span>
                </div>
                <p className="text-xs text-slate-300">
                  Aşağıdaki etkin kampanyalardan hangisinin hedef kitlesine <strong>{activeSegment.title}</strong> segmentini dahil etmek istersiniz?
                </p>

                <div className="space-y-2 text-xs">
                  <div className="bg-slate-950 p-2.5 rounded border border-slate-800 flex justify-between items-center hover:bg-slate-900 cursor-pointer">
                    <div>
                      <div className="font-bold text-slate-200">Ramp Up Postpaid Promo</div>
                      <div className="text-[10px] text-slate-400">Active · SMS fallback</div>
                    </div>
                    <span className="bg-indigo-900/40 text-indigo-400 border border-indigo-800 text-[9px] px-2 py-0.5 rounded font-bold">Ekle</span>
                  </div>

                  <div className="bg-slate-950 p-2.5 rounded border border-slate-800 flex justify-between items-center hover:bg-slate-900 cursor-pointer">
                    <div>
                      <div className="font-bold text-slate-200">Fiber Retention Trial A</div>
                      <div className="text-[10px] text-slate-400">Standby · Email flow</div>
                    </div>
                    <span className="bg-indigo-900/40 text-indigo-400 border border-indigo-800 text-[9px] px-2 py-0.5 rounded font-bold">Ekle</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setModalType(null);
                  }}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs py-2 rounded"
                >
                  Vazgeç
                </button>
              </div>
            )}

            {modalType === "aiOffer" && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-amber-300">
                  <Sparkles size={18} className="animate-pulse" />
                  <span className="font-extrabold text-xs uppercase tracking-wide">AI ALGORİTMA TEKLİF ÖNERİSİ</span>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-dashed border-violet-500/30 text-rose-50/90 text-xs">
                  <div className="font-normal leading-relaxed italic text-slate-200 mb-2">
                    "{activeSegment.aiAdvice}"
                  </div>
                  <div className="text-[9.5px] text-slate-400 font-bold border-t border-slate-800/80 pt-2 flex items-center justify-between">
                    <span>Model: Gemini 3.5 Flash</span>
                    <span className="text-[#62AB47]">Doğruluk Lifty: +3.8%</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      onAskWizbot(`${activeSegment.title} segmentine yönelik özel AI teklif stratejilerini detaylandır.`);
                      setModalType(null);
                    }}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-2 rounded cursor-pointer text-center"
                  >
                    Wizbot Chat'e Aktar
                  </button>
                  <button
                    onClick={() => setModalType(null)}
                    className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs px-4 py-2 rounded"
                  >
                    Kapat
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
