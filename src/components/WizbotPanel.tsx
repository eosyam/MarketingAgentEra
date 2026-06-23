import React, { useState, useRef, useEffect } from "react";
import { Send, Sparkles, ChevronRight, ChevronLeft, Lightbulb, Bot, User, Volume2, Cpu, Wrench, CheckCircle, Play, AlertCircle, Terminal, HelpCircle, RotateCcw } from "lucide-react";
import { ChatMessage, AgenticStep } from "../types";

interface WizbotProps {
  currentStage: number;
  activeScenario: "overage" | "churn";
  campaignFormStep: number;
  audienceSize: number;
  activeSidebarTab?: string;
  onSelectSidebarTab?: (tab: any) => void;
  onChangeScenario?: (scenario: any) => void;
  onSelectComponent?: (idx: any) => void;
  setCampaignFormStep?: (step: any) => void;
}

const DEFAULT_SUGGESTIONS = [
  "C Rakiplerine Karşı Nasıl Korunuruz?",
  "CLV Kırılımlarını Açıkla",
  "Açılma Oranları Nasıl Artırılır?",
  "STO (Send Time Optimization) Nedir?"
];

// Data flows matching user intent keywords
interface ScenarioFlow {
  steps: {
    subAgent: string;
    toolUsed: string;
    pendingDesc: string;
    resolvedDesc: string;
  }[];
  defaultReply: string;
  customType?: 'overage' | 'churn' | 'pricing' | 'kpi' | 'community' | 'elasticity' | 'visual' | 'content' | 'competitor' | 'clv' | 'sto';
}

const getScenarioFlow = (text: string): ScenarioFlow => {
  const low = text.toLowerCase();
  
  if (low.includes("overage") || low.includes("aşırı veri") || low.includes("veri kullanımı") || low.includes("overuse")) {
    return {
      customType: "overage",
      steps: [
        {
          subAgent: "CDP Veri Kümesi Sinyal Tarayıcısı",
          toolUsed: "scanCellularOverage()",
          pendingDesc: "CDP veri tabanındaki hücresel veri tüketim limitleri analiz ediliyor...",
          resolvedDesc: "Faturalı hat limit aşımı yapan 12,500 abone tahlil edildi. Günlük ortalama tüketim +%45 oranında arttı."
        },
        {
          subAgent: "Digital Twin Demografi Kümeleyici",
          toolUsed: "clusterHighUseCommunities()",
          pendingDesc: "Aşırı veri kullanan aktif topluluklar modelleniyor...",
          resolvedDesc: "Genç Profesyoneller ve Sık Seyahat Edenler (4,750 abone) topluluklarında yüksek korelasyon tespit edildi."
        },
        {
          subAgent: "Otonom Akış Devreye Alıcı",
          toolUsed: "dispatchOveragePlaybook()",
          pendingDesc: "Aşırı Veri Kullanım playbook akışı hazır hale getiriliyor...",
          resolvedDesc: "Digital Twin üzerinde playbook tetiklendi. Otonom kampanya adımları ilk aşamaya konumlandırıldı."
        }
      ],
      defaultReply: "Aşırı Veri Kullanım Sinyali (Data Overage) playbook'unu başarıyla aktifleştirdim ve soldaki panele yükledim. 📈 \n\nŞu anda Digital Twin ilk aşamasındayız. Sistem, paket aşımı riski bulunan 4.750 aboneyi analiz ediyor. Adım adım ilerleyerek bu kitleye akıllı ek paket tekliflerimizi ileteceğimiz otomatik kampanya akışını kontrol edebilirsiniz."
    };
  } else if (low.includes("churn") || low.includes("kayıp") || low.includes("risk") || low.includes("prevent")) {
    return {
      customType: "churn",
      steps: [
        {
          subAgent: "Machine Learning Kayıp Eğilimi Hesaplayıcı",
          toolUsed: "runChurnPredictor()",
          pendingDesc: "Makine öğrenmesi modelleri abonelerin iptal eğilimlerini hesaplıyor...",
          resolvedDesc: "12,892 aboneden Churn skoru >0.75 olan 450 yüksek riskli müşteri tespit edildi."
        },
        {
          subAgent: "Rakip Analiz Dedektörü",
          toolUsed: "checkCompetitorCounterOffers()",
          pendingDesc: "Rakiplerin (özellikle Rakip C) güncel taahhütsüz kampanyaları taranıyor...",
          resolvedDesc: "Rakip C'nin 99 TL tutarındaki agresif taahhütsüz teklifi doğrulandı."
        },
        {
          subAgent: "Form Sihirbazı Yapılandırıcı",
          toolUsed: "initializeChurnWizard()",
          pendingDesc: "Otomatik Churn önleme sihirbazı parametreleri dolduruluyor...",
          resolvedDesc: "Sihirbaz aktif edildi ve Churn Sinyali stand-by pozisyonuna getirildi."
        }
      ],
      defaultReply: "Müşteri Kayıp Riski (Churn Alert) kampanyasını koruma altına almak üzere adım adım sihirbazı devreye aldım. 🛡️\n\nSoldaki sihirbaza doğrudan yönlendirildiniz. Şu an Churn riski taşıyan Budget-Conscious Streamers topluluğunun filtrelenmesi ve Rakip C'ye karşı en kârlı teklif (Öneri B - 139 TL) adımlarını soldaki sihirbazı kullanarak tamamlayabiliriz."
    };
  } else if (low.includes("teklif") || low.includes("offer") || low.includes("dağıtım") || low.includes("pricing") || low.includes("uygun teklif")) {
    return {
      customType: "pricing",
      steps: [
        {
          subAgent: "Bilişsel Marj Karşılaştırıcı",
          toolUsed: "calculateSubsidyImpact()",
          pendingDesc: "Şirket kâr marjını koruyacak optimum teklif baremleri simüle ediliyor...",
          resolvedDesc: "Şirket marjını en iyi koruyan seçeneğin 139 TL (Offer B - 20GB) olduğu hesaplandı (%34 marj koruma)."
        },
        {
          subAgent: "Müşteri Memnuniyet Simülatörü",
          toolUsed: "predictUpgradePropensity()",
          pendingDesc: "Hedef kitlenin 139 TL'lik paketi kabul etme eğilimi hesaplanıyor...",
          resolvedDesc: "Grup içi kabul etme olasılığı %88 olarak tahmin edildi."
        },
        {
          subAgent: "Sihirbaz Teklif Atama Ajanı",
          toolUsed: "setWizardOfferStep()",
          pendingDesc: "Kampanya sihirbazındaki teklif tercihi güncelleniyor...",
          resolvedDesc: "Teklif adımına geçildi ve Kampanya Teklif olarak 'Offer B' seçildi."
        }
      ],
      defaultReply: "Akıllı fiyat optimizasyon motorumuz çalıştırıldı! Rekabetçi taahhüt simülasyonları analiz edildi. 🎯\n\nRakip C'nin 99 TL planına karşı kâr marjınızı en yüksek seviyede tutacak alternatifin **139 TL (Offer B)** olduğu doğrulandı. Kampanya sihirbazını doğrudan **Step 3 (Offer Decider)** aşamasına getirdim ve sunduğumuz paketi otomatik olarak 'Offer B' olarak işledim."
    };
  } else if (low.includes("kpi") || low.includes("başarı") || low.includes("simülasyon") || low.includes("elasticity") || low.includes("sim")) {
    return {
      customType: "kpi",
      steps: [
        {
          subAgent: "Etiya Esneklik Modeli",
          toolUsed: "runElasticitySimulation()",
          pendingDesc: "Tarihsel kampanya verileri ve churn önleme çarpanları yükleniyor...",
          resolvedDesc: "Tahmini Kampanya Başarı Oranı %88 olarak modellendi. Abonelerin 3 aylık ARPU kaybı sıfırlandı."
        },
        {
          subAgent: "Dağıtım Kanal Pacing Planlayıcı",
          toolUsed: "optimizePacingWaves()",
          pendingDesc: "Gönderim dalgaları kuyruk analizleri tamamlanıyor...",
          resolvedDesc: "Optimum gönderim zamanı olarak akşam saatleri (18:30) SMS + Push belirlendi."
        },
        {
          subAgent: "KPI Rapor Oluşturucu",
          toolUsed: "compileSummaryMetrics()",
          pendingDesc: "Nihai kampanya özet kartı verileri doğrulanıyor...",
          resolvedDesc: "Sihirbaz Step 5 (Launch Card) aşamasına getirildi. Kampanya yayına hazır."
        }
      ],
      defaultReply: "Metrik ve başarı simülasyonumuz tamamlandı! 📈\n\nTarihsel başarı verilerine göre bu kurgumuzla **%88 başarıyla müşteri kaybını engelleyebileceğimizi** öngörüyoruz. Kampanyanızı son adıma (**Launch Card**) getirdim. Aşağıdaki özet değerlerini onaylayarak otonom retention kampanyasını canlıya alabilirsiniz!"
    };
  } else if (low.includes("community") || low.includes("twin community") || low.includes("insights")) {
    return {
      customType: "community",
      steps: [
        {
          subAgent: "Twin Community Mapper",
          toolUsed: "mapCommunityClusters()",
          pendingDesc: "Mapping neural subscriber clusters from Digital Twin database...",
          resolvedDesc: "Mapped 'Budget Network Streamers' cluster containing 47,500 active subscribers."
        },
        {
          subAgent: "Propensity Heat Engine",
          toolUsed: "evaluateChurnRiskHeat()",
          pendingDesc: "Analyzing propensity regression scores across cohort...",
          resolvedDesc: "Identified high 72% average Churn propensity risk due to competitor 99 TL rates."
        }
      ],
      defaultReply: "Here is the active Digital Twin signal telemetry and historical campaign performance for the Budget Network Streamers cohort (#BNS-47):"
    };
  } else if (low.includes("visual") || low.includes("offer design") || low.includes("tasarım")) {
    return {
      customType: "visual",
      steps: [
        {
          subAgent: "Adaptive Preview Engine",
          toolUsed: "constructVisualMockup()",
          pendingDesc: "Generating high-fidelity smartphone notification mockup rendering...",
          resolvedDesc: "Successfully rendered mobile layout matching brand standards."
        }
      ],
      defaultReply: "I have compiled a gorgeous high-fidelity visual preview of the offer campaign! Toggle layout view to check live subscriber rendering:"
    };
  } else if (low.includes("sms & push") || low.includes("push content") || low.includes("sms") || low.includes("email") || low.includes("içerik")) {
    return {
      customType: "content",
      steps: [
        {
          subAgent: "Messaging Copy Architect",
          toolUsed: "synthesizeCopywriting()",
          pendingDesc: "Processing natural language persuasive parameters...",
          resolvedDesc: "Formulated highly appealing value-driven copywriting templates."
        }
      ],
      defaultReply: "Here is the approved copy variants for the 139 TL campaign. Direct integration with the outbound gateway is ready:"
    };
  } else if (low.includes("competitor") || low.includes("rakip") || low.includes("c")) {
    return {
      customType: "competitor",
      steps: [
        {
          subAgent: "Competitor Intelligence Agent",
          toolUsed: "fetchCompetitorDeals()",
          pendingDesc: "Scanning market rates of competitor networks...",
          resolvedDesc: "Scraped market rates. Found Competitor C offering no-contract 99 TL plan vs our default tier."
        }
      ],
      defaultReply: "Competitor C has launched a disruptive 99 TL/mo no-contract threat this week. To prevent migration from our Budget Conscious community (estimated 300-450 members at immediate risk), we must trigger our proactive Campaign to lock them into three months of stabilized subscriptions at 139 TL/mo with a 20GB value advantage."
    };
  } else if (low.includes("clv") || low.includes("split") || low.includes("customer lifetime") || low.includes("revenue")) {
    return {
      customType: "clv",
      steps: [
        {
          subAgent: "Subscriber CDP Demographics Agent",
          toolUsed: "getCohortMetrics()",
          pendingDesc: "Loading demographic metrics and core billing information...",
          resolvedDesc: "Loaded demographic metrics, average tenure patterns, and ARPU histories from core billing storage."
        }
      ],
      defaultReply: "Customer Lifetime Value (CLV) splits allow us to distribute marketing subsidies dynamically. Rather than offering the same high-cost incentive to all, we guard margins by matching incentives directly to of the user profile, guaranteeing maximum defense at minimum cost."
    };
  } else if (low.includes("sto") || low.includes("send time") || low.includes("channel") || low.includes("kanal")) {
    return {
      customType: "sto",
      steps: [
        {
          subAgent: "Omnichannel Engagement Auditor",
          toolUsed: "getPreferredChannel()",
          pendingDesc: "Evaluating customer preference trends and historical open rates...",
          resolvedDesc: "Evaluated historical open rates. Determined SMS provides immediate 85% reach while Email ensures detailed fine-print legality."
        }
      ],
      defaultReply: "Send Time Optimization (STO) matches the outbound trigger to the subscriber's historical interaction spike. For SMS, this is strategically scheduled at 18:30 to align with high smartphone screen-time averages in the post-commute slot, boosting response rates."
    };
  } else {
    return {
      steps: [
        {
          subAgent: "Cognitive Dispatcher Agent",
          toolUsed: "parseNaturalLanguageIntent()",
          pendingDesc: "Mapping natural language query to execution playbooks...",
          resolvedDesc: "Identified general consulting intent and categorized parameters for the marketing optimization modules."
        },
        {
          subAgent: "Knowledge Grounding Agent",
          toolUsed: "retrieveMarketingBestPractices()",
          pendingDesc: "Searching internal playbook references for active retention targets...",
          resolvedDesc: "Searched internal Atya consulting playbook for optimal churn-reduction, CLV analysis, and campaign management metrics."
        }
      ],
      defaultReply: "I advise launching a retention campaign to secure high-risk subscriber segments. To protect your monthly margins, we can deploy a targeted Send Time Optimized SMS series offering Offer B value upgrades, mitigating competitor attrition risks."
    };
  }
};

// Sub-component to render the beautiful modern process trace for agent steps, similar to Claude/ChatGPT thought process
interface AgenticTraceProps {
  steps: AgenticStep[];
  isThinking?: boolean;
}

function AgenticTrace({ steps, isThinking }: AgenticTraceProps) {
  const [userToggled, setUserToggled] = useState<boolean | null>(null);

  // Auto-expand during thought-process execution, collapse or let user decide once complete
  const isExpanded = userToggled !== null ? userToggled : (isThinking ? true : false);

  if (!steps || steps.length === 0) return null;

  return (
    <div className="text-[11px] font-sans">
      <button 
        onClick={() => setUserToggled(!isExpanded)}
        className="flex items-center gap-1.5 text-slate-500 hover:text-[#62AB47] transition-colors font-semibold text-[11px] cursor-pointer focus:outline-hidden"
      >
        <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center">
          {isThinking ? (
            <span className="w-1.5 h-1.5 bg-[#62AB47] rounded-full animate-ping" />
          ) : (
            <Terminal size={10} className="text-slate-500" />
          )}
        </div>
        <span className="font-semibold text-slate-500 tracking-wide text-[10px] uppercase">
          {isThinking ? "Thinking Process..." : "Thought Process"}
        </span>
        <ChevronRight className={`transition-transform duration-200 shrink-0 text-slate-400 ${isExpanded ? "rotate-90 text-[#62AB47]" : ""}`} size={11} />
      </button>

      {isExpanded && (
        <div className="mt-1.5 ml-2 pl-3 border-l-[1.5px] border-[#62AB47]/20 space-y-2.5 max-h-[220px] overflow-y-auto py-1">
          {steps.map((step, idx) => {
            const isWaiting = step.status === "waiting";
            const isActive = step.status === "thinking" || step.status === "executing";
            const isSuccess = step.status === "success";

            return (
              <div key={idx} className={`text-left transition-opacity duration-300 ${isWaiting ? "opacity-35" : "opacity-100"}`}>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    {isActive ? (
                      <span className="inline-flex relative h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                      </span>
                    ) : isSuccess ? (
                      <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-slate-300 inline-block" />
                    )}
                    <span className={`font-semibold text-[10.5px] ${isActive ? "text-amber-600" : isSuccess ? "text-slate-700" : "text-slate-400"}`}>
                      {step.subAgent}
                    </span>
                  </div>

                  {step.toolUsed && (
                    <span className={`text-[9px] font-mono border rounded-sm px-1.5 py-0.5 leading-none ${
                      isActive 
                        ? "text-[#F7941D] bg-amber-50 border-amber-100 animate-pulse" 
                        : isSuccess 
                          ? "text-slate-500 bg-slate-50 border-slate-200" 
                          : "text-slate-400 bg-slate-50 border-slate-100"
                    }`}>
                      {step.toolUsed}
                    </span>
                  )}
                </div>
                
                <p className={`mt-0.5 leading-relaxed text-[10.5px] ${isActive ? "text-amber-700 font-medium animate-pulse" : isSuccess ? "text-slate-500" : "text-slate-300"}`}>
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
export default function WizbotPanel({
  currentStage,
  activeScenario,
  campaignFormStep,
  audienceSize,
  activeSidebarTab,
  onSelectSidebarTab,
  onChangeScenario,
  onSelectComponent,
  setCampaignFormStep
}: WizbotProps) {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"master" | "segment" | "comp">("master");

  const getInitialMessage = () => {
    if (activeSidebarTab === "campaign") {
      return {
        role: "bot" as const,
        text: `Heads up — Digital Twin is flagging a rising churn signal in the Budget-Conscious Streamers community (now 72%, up 18% MoM). It's a high-value group worth saving.\n\nWant me to walk the team through a retention play? Just say "act on it" (or ask me for the details and I'll open the analysis).`
      };
    }
    return { 
      role: "bot" as const, 
      text: "Tekrar hoş geldiniz 👋 Bugün hangi otonom playbook akışını başlatmak istersiniz? Bana bir sinyal veya hedef belirtin, uzman yapay zeka ajanlarımızı hemen devreye alayım."
    };
  };

  const [messages, setMessages] = useState<ChatMessage[]>([getInitialMessage()]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const handleResetChat = () => {
    setMessages([getInitialMessage()]);
    setInputValue("");
    setIsTyping(false);
  };

  useEffect(() => {
    setMessages([getInitialMessage()]);
    setInputValue("");
    setIsTyping(false);
  }, [activeSidebarTab]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, collapsed]);

  useEffect(() => {
    const handleAskWizbotEvent = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setCollapsed(false);
        handleSendMessage(customEvent.detail);
      }
    };
    window.addEventListener("ask-wizbot", handleAskWizbotEvent);
    return () => {
      window.removeEventListener("ask-wizbot", handleAskWizbotEvent);
    };
  }, [isTyping, activeScenario, currentStage, campaignFormStep, audienceSize, messages]);

  // Performs Claude-style responsive word-by-word streaming typewriter animation
  const streamBotText = (messageIndex: number, fullText: string) => {
    let currentWordIndex = 0;
    const words = fullText.split(" ");
    
    const intervalId = setInterval(() => {
      setMessages((prev) => {
        const copy = [...prev];
        if (copy[messageIndex]) {
          copy[messageIndex].text = words.slice(0, currentWordIndex + 1).join(" ");
        }
        return copy;
      });

      currentWordIndex++;
      if (currentWordIndex >= words.length) {
        clearInterval(intervalId);
      }
    }, 45);
  };

  const handleSendMessage = async (text: string) => {
    const cleanText = text.trim();
    if (!cleanText || isTyping) return;

    // Add user message & clear input
    setInputValue("");
    setIsTyping(true);

    // Formulate flow based on text keywords
    const flow = getScenarioFlow(cleanText);

    // Apply state changes instantly so the left pane reacts as the thoughts are spun up!
    if (flow.customType === "overage") {
      onChangeScenario?.("overage");
      onSelectSidebarTab?.("");
      onSelectComponent?.(0);
    } else if (flow.customType === "churn") {
      onChangeScenario?.("churn");
      onSelectSidebarTab?.("");
      setCampaignFormStep?.(0);
    } else if (flow.customType === "pricing") {
      onChangeScenario?.("churn");
      onSelectSidebarTab?.("");
      setCampaignFormStep?.(3); // Bring user directly to Offer Decider stage!
    } else if (flow.customType === "kpi") {
      onChangeScenario?.("churn");
      onSelectSidebarTab?.("");
      setCampaignFormStep?.(5); // Bring user directly to Summary/Launch stage!
    }

    // Initial steps: first is executing, others are waiting
    const initialStepsState: AgenticStep[] = flow.steps.map((step, idx) => ({
      subAgent: step.subAgent,
      toolUsed: step.toolUsed,
      status: idx === 0 ? "thinking" : "waiting",
      description: step.pendingDesc
    }));

    let botMsgIndexVal = -1;
    setMessages((prev) => {
      const updated = [
        ...prev,
        { role: "user", text: cleanText },
        {
          role: "bot",
          text: "",
          isThinking: true,
          steps: initialStepsState,
          customType: flow.customType
        }
      ];
      botMsgIndexVal = updated.length - 1;
      return updated;
    });

    // Query backend in parallel
    let fetchedResponse = flow.defaultReply;
    try {
      const historyPayload = [
        ...messages.slice(-5).map(m => ({ role: m.role, text: m.text })),
        { role: "user", text: cleanText }
      ];

      const fetchPromise = fetch("/api/wizbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: cleanText,
          prompt: cleanText,
          history: historyPayload,
          context: {
            activeScenario,
            currentStage,
            campaignFormStep,
            audienceSize
          }
        })
      });

      // Simple handling: get response text
      fetchPromise.then(async (r) => {
        if (r.ok) {
          const data = await r.json();
          fetchedResponse = data.text;
        }
      }).catch((e) => {
        console.warn("Wizbot API failed, using accurate local intelligence:", e);
      });
    } catch (err) {
      // safe fallback
    }

    // Step-by-step progressive animation trace executor over exactly 10 seconds (10000ms)
    let currentStepIdx = 0;
    const totalSteps = flow.steps.length;
    const stepDuration = 10000 / totalSteps;

    const runStepTransition = () => {
      setTimeout(() => {
        setMessages((prev) => {
          const copy = [...prev];
          const msg = copy[botMsgIndexVal];
          if (msg && msg.steps) {
            const draftSteps = [...msg.steps];
            
            // Resolve current active step to complete/success
            draftSteps[currentStepIdx] = {
              ...draftSteps[currentStepIdx],
              status: "success",
              description: flow.steps[currentStepIdx].resolvedDesc
            };

            // Advance to next step
            if (currentStepIdx + 1 < totalSteps) {
              draftSteps[currentStepIdx + 1] = {
                ...draftSteps[currentStepIdx + 1],
                status: "thinking"
              };
              msg.steps = draftSteps;
              setTimeout(() => {
                currentStepIdx++;
                runStepTransition();
              }, 40); // small status transition gap to make ui feels alive
            } else {
              // All steps completed successfully! Transition thinking state to done.
              msg.steps = draftSteps;
              msg.isThinking = false;
              setIsTyping(false);
              
              // Begin stream word typewriter effect
              streamBotText(botMsgIndexVal, fetchedResponse);
            }
          }
          return copy;
        });
      }, stepDuration);
    };

    // Begin execution loop
    runStepTransition();
  };

  if (collapsed) {
    return (
      <div className="w-[45px] bg-[#121626] border-l border-slate-200 flex flex-col items-center py-4 shrink-0 transition-all select-none h-full rounded-r-2xl">
        <button
          onClick={() => setCollapsed(false)}
          className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center cursor-pointer mb-6"
          title="Expand Agent Panel"
        >
          <ChevronLeft size={16} />
        </button>
        <div className="writing-mode-vertical text-[10px] text-gray-300 font-extrabold uppercase tracking-widest flex items-center gap-2 transform rotate-180">
          <Sparkles size={11} className="text-[#F7941D]" />
          <span>Etiya Marketing AI</span>
        </div>
      </div>
    );
  }

  const tagChips = [
    { text: "Aşırı Veri Kullanım Sinyali", color: "border-teal-200 hover:border-teal-400 text-teal-700 bg-teal-50/50" },
    { text: "Müşteri Kayıp Riski", color: "border-purple-200 hover:border-purple-400 text-purple-700 bg-purple-50/50" },
    { text: "En Uygun Teklif Dağıtımı", color: "border-amber-200 hover:border-amber-400 text-amber-700 bg-amber-50/50" },
    { text: "KPI & Başarı Simülasyonu", color: "border-blue-200 hover:border-blue-400 text-blue-700 bg-blue-50/50" }
  ];

  return (
    <div className="w-[360px] bg-white border border-slate-200/60 shadow-xxs rounded-2xl flex flex-col shrink-0 select-none font-sans relative z-30 h-full overflow-hidden">
      {/* Panel Header */}
      <div className="p-4 flex items-center justify-between border-b border-slate-100 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#FFEAD1] text-[#F7941D] flex items-center justify-center font-bold text-lg border border-orange-100 select-none">
            🤖
          </div>
          <div className="text-left">
            <h3 className="font-bold text-sm text-[#101828]">Etiya Marketing AI</h3>
            <div className="text-[10px] text-emerald-600 font-medium flex items-center gap-1 mt-0.5">
              <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
              <span>Online • Multi-Agent AI</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleResetChat}
            className="text-[11px] text-slate-600 hover:text-rose-600 px-2 py-1 rounded-lg cursor-pointer bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-all flex items-center gap-1 font-bold shadow-xxxs"
            title="Sohbeti Sıfırla (Demo)"
          >
            <RotateCcw size={11} />
            <span>Sıfırla</span>
          </button>
          <button
            onClick={() => setCollapsed(true)}
            className="text-[#98A2B3] hover:text-[#475467] p-1.5 rounded-lg cursor-pointer hover:bg-slate-50 transition-all"
            title="Minimize Chat"
          >
            <span className="text-sm font-semibold">✕</span>
          </button>
        </div>
      </div>

      {/* Multi-Agent Role Selector Tabs */}
      <div className="px-4 py-2 border-b border-slate-100 flex gap-2 shrink-0 select-none bg-slate-50/50">
        <button
          onClick={() => setActiveTab("master")}
          className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all flex items-center gap-1 border cursor-pointer ${
            activeTab === "master"
              ? "bg-[#101828] text-white border-transparent shadow-xxs"
              : "bg-white text-[#475467] border-slate-200 hover:bg-slate-50"
          }`}
        >
          <span>● Marketing Master</span>
        </button>
        <button
          onClick={() => setActiveTab("segment")}
          className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all flex items-center gap-1 border cursor-pointer ${
            activeTab === "segment"
              ? "bg-[#101828] text-white border-transparent"
              : "bg-white text-[#475467] border-slate-200 hover:bg-slate-50"
          }`}
        >
          <span>Segmentation</span>
        </button>
        <button
          onClick={() => setActiveTab("comp")}
          className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all flex items-center gap-1 border cursor-pointer ${
            activeTab === "comp"
              ? "bg-[#101828] text-white border-transparent"
              : "bg-white text-[#475467] border-slate-200 hover:bg-slate-50"
          }`}
        >
          <span>Comp</span>
        </button>
      </div>

      {/* Message List Area */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5 bg-slate-50/20 no-scrollbar">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex gap-3 max-w-[95%] items-start ${msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto text-left"}`}
          >
            {msg.role === "user" ? (
              <div className="w-8 h-8 rounded-full bg-[#6264A7] text-white flex items-center justify-center text-xs shrink-0 select-none font-bold">
                U
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#101828] text-white flex items-center justify-center text-xs shrink-0 select-none font-bold">
                <Bot size={14} className="text-orange-400" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              {msg.role === "bot" && (
                <div className="flex items-baseline gap-1.5 mb-1 flex-wrap">
                  <span className="font-bold text-[12px] text-[#101828]">Marketing Master Agent</span>
                  <span className="text-[9.5px] text-[#98A2B3] px-1.5 py-0.5 rounded-md bg-slate-100 font-medium">Orchestrator</span>
                </div>
              )}

              {/* If bot has agentic steps, render them beautiful and collapsible above the message text */}
              {msg.role === "bot" && msg.steps && msg.steps.length > 0 && (
                <div className="mb-2.5">
                  <AgenticTrace steps={msg.steps} isThinking={msg.isThinking} />
                </div>
              )}

              {/* Message text bubble (hidden if bot is thinking and has no text yet) */}
              {(msg.role === "user" || msg.text) && (
                <div className={`p-3.5 rounded-2xl text-[12px] leading-relaxed shadow-xxs ${
                  msg.role === "user"
                    ? "bg-[#6264A7] text-white rounded-tr-none"
                    : "bg-white text-[#344054] border border-[#F2F4F7] rounded-tl-none"
                }`}>
                  {msg.text}
                </div>
              )}

              {/* RENDER THE DIGITAL TWIN COHORT PROFILE & KPI METRICS (COMMUNITY) */}
              {msg.role === "bot" && !msg.isThinking && msg.customType === "community" && (
                <div className="mt-3.5 bg-[#FAF9F5] border border-[#EBE7DF] rounded-2xl p-4 space-y-4 shadow-xxxs animate-fade-in text-left">
                  <div className="flex justify-between items-center border-b border-[#E1DBCE] pb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="bg-amber-100 border border-amber-200/60 rounded px-1.5 py-0.5 text-[9.5px] font-black text-amber-800 uppercase tracking-wider font-mono">
                        Twin Community
                      </span>
                      <span className="text-slate-400 text-xs">•</span>
                      <span className="text-slate-700 font-extrabold text-[11px] font-sans">#BNS-47 Cluster</span>
                    </div>
                    <span className="text-[10px] text-emerald-600 font-black tracking-wide font-mono flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      TELEMETRY READY
                    </span>
                  </div>

                  {/* High level stats panel */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-white border border-slate-200/50 rounded-xl p-2.5 flex flex-col justify-center">
                      <span className="text-[9.5px] text-slate-400 font-bold uppercase tracking-wider">Matched Nodes</span>
                      <span className="text-sm font-black text-slate-900 mt-1">47,500</span>
                    </div>
                    <div className="bg-white border border-slate-200/50 rounded-xl p-2.5 flex flex-col justify-center">
                      <span className="text-[9.5px] text-rose-500 font-bold uppercase tracking-wider">Churn Risk</span>
                      <span className="text-sm font-black text-rose-600 mt-1">72.4% Average</span>
                    </div>
                  </div>

                  {/* Historical campaign KPI analytics */}
                  <div className="space-y-2 mt-3 text-xs">
                    <label className="text-[9.5px] text-slate-400 font-extrabold uppercase tracking-wider block">
                      Historical KPI & Playbook Runs
                    </label>

                    {/* Run 1 */}
                    <div className="bg-white border border-slate-200 p-2.5 rounded-xl shadow-xxs space-y-1.5 hover:border-amber-400 transition-colors">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-[#101828] text-[11px]">Q1 Budget Care Plan Campaign</span>
                        <span className="bg-teal-50 text-teal-700 text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase">Passed</span>
                      </div>
                      <div className="text-[10.5px] text-slate-500 flex justify-between">
                        <span>Cohort targeted size</span>
                        <strong className="text-slate-700">12,600 users</strong>
                      </div>
                      <div className="text-[10.5px] text-slate-500 flex justify-between">
                        <span>Targeted churn drop</span>
                        <strong className="text-emerald-600">↘ -14.2% Churn</strong>
                      </div>
                      <div className="text-[10.5px] text-slate-500 flex justify-between">
                        <span>Attained ARPU recovery</span>
                        <strong className="text-slate-800 font-mono font-bold">120 TL/mo</strong>
                      </div>
                    </div>

                    {/* Run 2 */}
                    <div className="bg-white border border-slate-200 p-2.5 rounded-xl shadow-xxs space-y-1.5 hover:border-amber-400 transition-colors">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-[#101828] text-[11px]">Q2 Streamer Special Promo</span>
                        <span className="bg-teal-50 text-teal-700 text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase">Passed</span>
                      </div>
                      <div className="text-[10.5px] text-slate-500 flex justify-between">
                        <span>Cohort targeted size</span>
                        <strong className="text-slate-700">8,400 users</strong>
                      </div>
                      <div className="text-[10.5px] text-slate-500 flex justify-between">
                        <span>Targeted churn drop</span>
                        <strong className="text-emerald-600">↘ -18.5% Churn</strong>
                      </div>
                      <div className="text-[10.5px] text-slate-500 flex justify-between">
                        <span>Attained ARPU recovery</span>
                        <strong className="text-slate-800 font-mono font-bold">115 TL/mo</strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* RENDER THE INTERACTIVE KPI PRICE ELASTICITY SIMULATIONS (ELASTICITY) */}
              {msg.role === "bot" && !msg.isThinking && msg.customType === "elasticity" && (
                <div className="mt-3.5 bg-[#FAF8FE] border border-[#E9E4F5] rounded-2xl p-4 space-y-4 shadow-xxxs animate-fade-in text-left">
                  <div className="flex justify-between items-center border-b border-[#E1D9F1] pb-2">
                    <span className="text-purple-700 font-extrabold text-[10px] uppercase tracking-widest font-mono">
                      KPI Elasticity Sims
                    </span>
                    <span className="text-[9.5px] text-purple-400 font-bold font-mono">
                      PREDICTION ENGINE
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    {/* Scenario A */}
                    <div className="bg-white border border-slate-200 rounded-xl p-2.5 flex justify-between items-center transition-all hover:bg-slate-50">
                      <div>
                        <div className="font-bold text-slate-700 text-[11px]">Option A: 99 TL Tariff</div>
                        <span className="text-[10px] text-slate-400 font-medium">Aggressive Subsidy (10GB)</span>
                      </div>
                      <div className="text-right flex flex-col leading-tight">
                        <span className="text-[11.5px] font-extrabold text-teal-600">↘ 94% Retained</span>
                        <span className="text-[9.5px] text-slate-400 mt-1">-25% ARPU Margin</span>
                      </div>
                    </div>

                    {/* Scenario B: Recommended Optimal */}
                    <div className="bg-violet-50/70 border-[1.5px] border-violet-400 rounded-xl p-3 flex justify-between items-center relative">
                      <span className="absolute -top-1.5 -right-1.5 bg-[#F7941D] text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase leading-none shadow-xxs">
                        Wizbot Optimal Choice
                      </span>
                      <div>
                        <div className="font-bold text-violet-950 text-[11.5px]">Option B: 139 TL Tariff</div>
                        <span className="text-[10px] text-violet-600 font-bold">Balanced Bundle (20GB Option)</span>
                      </div>
                      <div className="text-right flex flex-col leading-tight">
                        <span className="text-[11.5px] font-extrabold text-violet-900">↘ 87% Retained</span>
                        <span className="text-[9.5px] text-emerald-600 font-black mt-1">+24.8% ARPU Cashflow</span>
                      </div>
                    </div>

                    {/* Scenario C */}
                    <div className="bg-white border border-slate-200 rounded-xl p-2.5 flex justify-between items-center transition-all hover:bg-slate-50">
                      <div>
                        <div className="font-bold text-slate-700 text-[11px]">Option C: 169 TL Tariff</div>
                        <span className="text-[10px] text-slate-400 font-medium">Conservative Price Boost</span>
                      </div>
                      <div className="text-right flex flex-col leading-tight">
                        <span className="text-[11.5px] font-extrabold text-rose-500">↘ 42% Retained</span>
                        <span className="text-[9.5px] text-rose-600 font-medium mt-1">-48% Failure Risk</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* RENDER DYNAMIC VISUAL SCREEN PHONES MOCK PREVIEW (VISUAL) */}
              {msg.role === "bot" && !msg.isThinking && msg.customType === "visual" && (
                <div className="mt-3.5 bg-slate-900 rounded-2xl p-4 space-y-3 shadow-md animate-fade-in text-left">
                  <div className="flex justify-between items-center border-b border-white/10 pb-2">
                    <span className="text-amber-400 font-bold text-[10.5px] tracking-widest uppercase font-mono">
                      Smartphone Preview
                    </span>
                    <span className="text-[9.5px] text-white/35 font-semibold font-mono">
                      SMS OUTBOUND SCREENER
                    </span>
                  </div>

                  {/* Device shell mockup box */}
                  <div className="bg-black/35 border border-white/5 rounded-xl p-3 font-sans relative">
                    <div className="flex justify-between items-center text-[9px] text-white/30 mb-2 select-none">
                      <span>Carrier TR 5G</span>
                      <span>10:45 AM</span>
                    </div>

                    {/* SMS Message block inside cell phone */}
                    <div className="bg-[#1C2030]/90 border border-white/5 rounded-xl p-3 space-y-1.5 shadow-sm text-xs">
                      <div className="flex justify-between items-center text-[9.5px] text-amber-300 font-extrabold">
                        <span>Fatura Koruyucu 💡</span>
                        <span className="text-[8px] bg-amber-400/15 px-1 py-0.2 rounded text-amber-200 font-mono">RELIABLE GATEWAY</span>
                      </div>
                      <p className="text-[10.5px] text-white/90 leading-relaxed font-sans">
                        Değerli Müşterimiz, size özel limitsiz eğlence paketi yayında! Paket hız aşımınız faturanıza yansımadan sadece faturanıza ek <strong>139 TL</strong>'ye 20GB internet ve hediye TV! Cayma bedeli olmadan hemen yükseltin: <strong className="text-sky-300 underline font-mono">etiya.co/BNS-47</strong>
                      </p>
                    </div>
                  </div>

                  {/* User integration action button */}
                  <button
                    onClick={() => alert("Creative gateway sync achieved! Offers mapped directly to active campaigns database.")}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-[10.5px] py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    🚀 Lock Creative SMS Into Active Campaign
                  </button>
                </div>
              )}

              {/* RENDER THE PERSUASIVE SMS COPY GATEWAY COPIES (CONTENT) */}
              {msg.role === "bot" && !msg.isThinking && msg.customType === "content" && (
                <div className="mt-3.5 bg-[#FAFBFD] border border-slate-200 rounded-2xl p-4 space-y-4 shadow-xxxs animate-fade-in text-left">
                  <div className="flex justify-between items-center border-b border-slate-150 pb-2">
                    <span className="text-sky-700 font-extrabold text-[10px] uppercase tracking-widest font-mono">
                      Outbound Copilot Variations
                    </span>
                    <span className="text-[9.5px] text-slate-400 font-semibold font-mono">
                      MULTI-CHANNEL RELEASES
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    {/* Copy Variant 1 */}
                    <div className="bg-white border border-slate-150 rounded-xl p-3 space-y-2 text-left relative shadow-xxs hover:border-sky-400 transition-colors">
                      <div className="flex justify-between items-center">
                        <span className="text-[9.5px] bg-sky-100 text-sky-800 font-extrabold px-2 py-0.5 rounded-full uppercase font-mono">
                          Triggers Gateway v1 (TR)
                        </span>
                        <span className="text-[9px] text-slate-400 font-medium">142 Chars</span>
                      </div>
                      <p className="text-[11px] text-slate-700 leading-normal italic font-medium font-sans">
                        "Atya Özel: Paket hız aşımınız son buluyor! Faturanıza ek sadece 139 TL'ye 20GB Premium İnternet ve hediye TV. Geçmek için EVET yazın."
                      </p>
                    </div>

                    {/* Copy Variant 2 */}
                    <div className="bg-white border border-slate-150 rounded-xl p-3 space-y-2 text-left relative shadow-xxs hover:border-sky-400 transition-colors">
                      <div className="flex justify-between items-center">
                        <span className="text-[9.5px] bg-teal-100 text-teal-800 font-extrabold px-2 py-0.5 rounded-full uppercase font-mono">
                          Push Notification v2 (EN)
                        </span>
                        <span className="text-[9px] text-slate-400 font-medium font-mono">Instant draw</span>
                      </div>
                      <p className="text-[11px] text-slate-700 leading-normal italic font-medium font-sans">
                        "Upgrade now 🚀 Secure 20GB premium download quota + free video streaming channels for only 139 TL. Instant, zero overhead."
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Specific interactive suggestion pills shown strictly under the very first message */}
              {idx === 0 && msg.role === "bot" && (
                <div className="flex flex-col gap-1.5 mt-3 select-none">
                  {tagChips.map((chip, cIdx) => (
                    <button
                      key={cIdx}
                      onClick={() => handleSendMessage(chip.text)}
                      className={`px-3 py-2 rounded-xl text-[11px] font-bold border transition-all text-left cursor-pointer ${chip.color}`}
                    >
                      <span>🗲 {chip.text}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-3 max-w-[80%] items-center text-slate-400 text-xs pl-2">
            <span className="text-[10px] font-mono animate-pulse">Agent is thinking...</span>
          </div>
        )}
        <div ref={chatBottomRef} />
      </div>

      {/* Suggested prompts pills - secondary category */}
      <div className="p-2 border-t border-[#F2F4F7] bg-white flex flex-wrap gap-1 shrink-0 max-h-16 overflow-y-auto no-scrollbar">
        {DEFAULT_SUGGESTIONS.map((sug, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(sug)}
            className="text-[10.5px] text-[#475467] font-semibold bg-[#F9FAFB] hover:bg-[#F2F4F7] border border-slate-200/60 rounded-lg px-2.5 py-1 transition-all cursor-pointer truncate max-w-[48%]"
          >
            {sug}
          </button>
        ))}
      </div>

      {/* Input container */}
      <div className="p-3 bg-white border-t border-[#F2F4F7] shrink-0">
        <div className="flex items-center gap-2 border border-slate-200 rounded-xl px-2.5 py-1.5 focus-within:border-[#F7941D] transition-all bg-[#FCFCFD]">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && inputValue.trim()) handleSendMessage(inputValue);
            }}
            placeholder="Ask anything — the right agent answers automatically..."
            className="flex-1 text-xs text-[#344054] outline-none font-sans bg-transparent py-1"
          />
          <button
            onClick={() => inputValue.trim() && handleSendMessage(inputValue)}
            disabled={!inputValue.trim() || isTyping}
            className="w-8 h-8 rounded-full bg-[#101828] hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed justify-center text-white flex items-center transition-all cursor-pointer shrink-0"
          >
            <Send size={12} className="stroke-[2.5]" />
          </button>
        </div>

        <div className="text-[9.5px] text-slate-400 font-medium text-center mt-2 font-mono">
          Powered by Digital Twin Community signals • illustrative demo
        </div>
      </div>
    </div>
  );
}
