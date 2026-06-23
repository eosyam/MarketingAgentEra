import { Database, Users, Sparkles, GitBranch, MessageSquare } from "lucide-react";
import { SuiteComponent } from "../types";

interface Props {
  component: SuiteComponent;
  label?: string;
}

const config = {
  cdp: { name: "CDP", icon: "database", bg: "#EEF3FA", border: "#D8E4F0", color: "#3E5280" },
  twin: { name: "Digital Twin", icon: "users-round", bg: "#FFF0E6", border: '#FFD8A8', color: '#B8620A' },
  ai: { name: "Agentic AI", icon: "sparkles", bg: "#F5F0FF", border: '#DDD8FF', color: '#7E4FCF' },
  ecm: { name: "Journey Builder", icon: "git-branch", bg: "#F2F9EC", border: '#C8E6B8', color: '#3E9232' },
  wizbot: { name: "Wizbot", icon: "message-circle", bg: '#EEF3FA', border: '#D8E4F0', color: '#3E5280' }
};

export const ComponentLabel = ({ component, label }: Props) => {
  const c = config[component] || { name: component, icon: "sparkles", bg: "#F4F5F7", border: "#E3E4E6", color: "#4B5563" };
  const getIconElement = () => {
    switch (c.icon) {
      case "database": return <Database size={11} className="shrink-0" />;
      case "users-round": return <Users size={11} className="shrink-0" />;
      case "sparkles": return <Sparkles size={11} className="shrink-0" />;
      case "git-branch": return <GitBranch size={11} className="shrink-0" />;
      case "message-circle": return <MessageSquare size={11} className="shrink-0" />;
      default: return <Sparkles size={11} className="shrink-0" />;
    }
  };

  return (
    <div style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      background: c.bg,
      color: c.color,
      padding: "4px 10px",
      borderRadius: 999,
      fontSize: 11,
      fontWeight: 600,
      border: `1px solid ${c.border}`
    }}>
      {getIconElement()}
      <span>{label || c.name || component.toUpperCase()}</span>
    </div>
  );
};
  
export default ComponentLabel;
