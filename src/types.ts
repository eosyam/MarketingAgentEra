export interface Campaign {
  name: string;
  type: string;
  channel: string;
  status: 'Active' | 'Scheduled' | 'Draft' | 'Paused' | 'Completed';
  audience: number | null;
  start: string;
  end: string;
  community: string;
  agent?: boolean;
}

export type SuiteComponent = 'cdp' | 'twin' | 'ai' | 'ecm' | 'wizbot';

export interface AgenticStep {
  subAgent: string;
  toolUsed?: string;
  status: "waiting" | "thinking" | "executing" | "success" | "critical";
  description: string;
  durationMs?: number;
}

export interface ChatMessage {
  role: 'user' | 'bot';
  text: string;
  steps?: AgenticStep[];
  isThinking?: boolean;
  customType?: string;
}

export interface FilterSelections {
  churnScore: number;
  tenure: number;
  dataDecline: number;
  arpu: number;
}
