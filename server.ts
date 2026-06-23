import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const myFilename = typeof import.meta !== "undefined" && import.meta.url ? fileURLToPath(import.meta.url) : "";
const myDirname = myFilename ? path.dirname(myFilename) : process.cwd();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // AI Client Initializer (Lazy-loaded to prevent startup crashes when API key is missing)
  let aiClient: GoogleGenAI | null = null;
  function getAiClient(): GoogleGenAI {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        throw new Error("GEMINI_API_KEY environment variable is not configured.");
      }
      aiClient = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
    return aiClient;
  }

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // Wizbot & Agentic AI help chat handler
  app.post("/api/wizbot", async (req: express.Request, res: express.Response) => {
    try {
      const message = req.body.message || req.body.prompt || "";
      const { history, context } = req.body;

      // Generate dynamic agent steps to show "contemporary AI sub-agent/tool process"
      const msgLower = message.toLowerCase();
      let steps = [];

      if (msgLower.includes("competitor") || msgLower.includes("rakip") || msgLower.includes("c") || msgLower.includes("offer") || msgLower.includes("teklif")) {
        steps = [
          {
            subAgent: "Competitor Intelligence Agent",
            toolUsed: "fetchCompetitorDeals()",
            status: "success" as const,
            description: "Scraped market rates. Found Competitor C offering no-contract 99 TL plan vs our default tier.",
            durationMs: 320
          },
          {
            subAgent: "Microeconomic Feasibility Agent",
            toolUsed: "calculateSubsidyImpact()",
            status: "success" as const,
            description: "Compared ARPU retention profile. Offer B (139 TL/mo with 20GB) preserves 34% more margin than a simple free cellular data boost.",
            durationMs: 450
          },
          {
            subAgent: "Offer Selection Optimizer",
            toolUsed: "recommendPromoBundle()",
            status: "success" as const,
            description: "Matched premium subscribers' daily download averages and recommended 20GB value bundle option to counter attrition.",
            durationMs: 210
          }
        ];
      } else if (msgLower.includes("churn") || msgLower.includes("risk") || msgLower.includes("kayıp") || msgLower.includes("prevent")) {
        steps = [
          {
            subAgent: "Machine Learning Twin Predictor",
            toolUsed: "queryChurnProbability()",
            status: "success" as const,
            description: "Scanned telemetry models of 12,892 active subscriber contracts. Spotted 450 high Churn Score nodes of >0.75 classification.",
            durationMs: 410
          },
          {
            subAgent: "Subscriber Loyalty Analyzer",
            toolUsed: "getTenureSplits()",
            status: "success" as const,
            description: "Classified subscriber cohort duration profiles. Confirmed that members with <12 months of service are 2.4x more price sensitive.",
            durationMs: 180
          },
          {
            subAgent: "Omnichannel Priority Coordinator",
            toolUsed: "buildPreventiveRoute()",
            status: "success" as const,
            description: "Orchestrated active-response pathways to deploy Wave 2 and Wave 3 automated fallback triggers.",
            durationMs: 310
          }
        ];
      } else if (msgLower.includes("clv") || msgLower.includes("split") || msgLower.includes("customer lifetime") || msgLower.includes("revenue")) {
        steps = [
          {
            subAgent: "Subscriber CDP Demographics Agent",
            toolUsed: "getCohortMetrics()",
            status: "success" as const,
            description: "Loaded demographic metrics, average tenure patterns, and ARPU histories from core billing storage.",
            durationMs: 250
          },
          {
            subAgent: "Value Clustering Model",
            toolUsed: "generateKMeansClusters()",
            status: "success" as const,
            description: "Computed 3 distinctive retention paths: Low CLV (Basic 5GB boost), Mid CLV (30% discount), and High CLV (Premium Concierge + Loyalty Points).",
            durationMs: 380
          },
          {
            subAgent: "Budget Arbitrage Engine",
            toolUsed: "testControlGroupSplits()",
            status: "success" as const,
            description: "Allocated a strict 10% control group to precisely isolate campaign lift metrics in upcoming iterations.",
            durationMs: 190
          }
        ];
      } else if (msgLower.includes("sto") || msgLower.includes("send time") || msgLower.includes("channel") || msgLower.includes("kanal") || msgLower.includes("sms") || msgLower.includes("email")) {
        steps = [
          {
            subAgent: "Omnichannel Engagement Auditor",
            toolUsed: "getPreferredChannel()",
            status: "success" as const,
            description: "Evaluated historical open rates. Determined SMS provides immediate 85% reach while Email ensures detailed fine-print legality.",
            durationMs: 150
          },
          {
            subAgent: "Cognitive Dispatch Scheduling Agent",
            toolUsed: "predictOptimalInteractionTime()",
            status: "success" as const,
            description: "Analysed phone activation timings. Recommended scheduling SMS dispatch at exactly 18:30 (post-commute peak).",
            durationMs: 220
          }
        ];
      } else {
        steps = [
          {
            subAgent: "Cognitive Dispatcher Agent",
            toolUsed: "parseNaturalLanguageIntent()",
            status: "success" as const,
            description: `Identified general consulting intent related to: "${message.substring(0, 30)}..."`,
            durationMs: 120
          },
          {
            subAgent: "Knowledge Grounding Agent",
            toolUsed: "retrieveMarketingBestPractices()",
            status: "success" as const,
            description: "Searched internal Atya consulting playbook for churn-reduction and campaign management metrics.",
            durationMs: 290
          }
        ];
      }

      try {
        const ai = getAiClient();
        
        let systemInstruction = `You are Wizbot, the agentic telco consulting brain inside the Atya Customer Marketing Cloud (including CDP, Digital Twin, Agentic AI, Journey Builder, and Wizbot).
You speak with professional, helpful intelligence, giving concise, direct replies using telco terminology (ARPU, NPS, churn rate, retention, STO - Send Time Optimization, SMS/Email fallbacks, and control groups).
Context about what the user is looking at: ${JSON.stringify(context || {})}.
Answer user questions regarding campaign structures, marketing simulations, segmentation filters (like churn thresholds or min tenure), or offer catalogs, and suggest clever next steps.
Keep responses concise, conversational, and direct (under 3 or 4 sentences). Avoid markdown headings unless requested.`;

        const contents = [];
        if (history && Array.isArray(history)) {
          for (const turn of history) {
            contents.push({
              role: turn.role === "user" ? "user" : "model",
              parts: [{ text: turn.text }]
            });
          }
        }
        contents.push({
          role: "user",
          parts: [{ text: message }]
        });

        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: contents,
          config: {
            systemInstruction,
            temperature: 0.7,
          }
        });

        res.json({
          text: response.text,
          steps: steps
        });
      } catch (gemIniError: any) {
        console.info("Using automated playbook engine fallback response (live key temporarily unavailable).");
        
        // Provide rich mock responses when API key is unconfigured so the app flows perfectly
        let responseText = "As a telco-focused suite, I recommend targeting this cohort with high data overage risk. By applying Offer B (30% discount at 139 TL/mo) rather than a simple 5GB boost, we can achieve an estimated 34% ARPU retention lift while locking customers in for 3 calendar months to mitigate direct competitor threats.";
        
        if (msgLower.includes("competitor") || msgLower.includes("rakip") || msgLower.includes("netcell") || msgLower.includes("c")) {
          responseText = "Competitor C launched a disruptive 99 TL/mo no-contract threat this week. To prevent migration from our Budget Conscious community (estimated 300-450 members at immediate risk), we must trigger our proactive Campaign to lock them into three months of stabilized subscriptions at 139 TL/mo with a 20GB value advantage.";
        } else if (msgLower.includes("filter") || msgLower.includes("segment") || msgLower.includes("loos")) {
          responseText = "Loosening the Churn Score filter to >0.68 incorporates customers in early warning zones, broadening the pool to 450 members. In contrast, strict filters at >0.75 focus cleanly on high-risk users with 91% resemblance to historical profiles, maximizing instant retention ROI.";
        } else if (msgLower.includes("channel") || msgLower.includes("kanal") || msgLower.includes("sms")) {
          responseText = "The multi-channel blend (SMS + Email) achieves the highest predicted lift (34% retention) in simulation. SMS excels in prompt conversion, while Email offers clear legal details of the 3-month contract extension to avoid subscriber friction.";
        } else if (msgLower.includes("how") || msgLower.includes("how does") || msgLower.includes("nasıl")) {
          responseText = "This flows through all five modules: CDP unifies the account variables; Digital Twin models behavior to output high Churn Scores; Agentic AI structures optimal splits (Low/Mid/High CLV); Journey Builder builds and fires the journey wave triggers; and Wizbot measures incremental lift over the control group.";
        }
        
        res.json({ 
          text: responseText, 
          steps: steps,
          note: "Offline Mode (Mock Active). Configure GEMINI_API_KEY in secrets for full live capability." 
        });
      }
    } catch (err: any) {
      console.error("API endpoint error:", err);
      res.status(500).json({ error: "Internal Server Error", message: err.message });
    }
  });

  // Serve Vite app in development, static build in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Atya Server] Running on http://localhost:${PORT} in ${process.env.NODE_ENV || "development"} mode`);
  });
}

startServer();
