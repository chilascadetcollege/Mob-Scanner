"use client";
import Script from 'next/script';

export default function AiAgentWidget({ settings }: { settings: any }) {
  const aiSettings = settings?.ai_agent_settings || {};
  const tenantId = aiSettings.tenant_id || 'tenant_7KVx7XX7RM';
  const agentId = aiSettings.agent_id || 'ag_8f7995f9178e4a37a96d1088c3725392';

  if (!tenantId || !agentId) return null;

  return (
    <Script
      src={`https://agent.vertexsolve.com/wp-content/plugins/AI%20Agent/assets/js/widget.js?id=${tenantId}&agent_id=${agentId}&v=1785269000`}
      strategy="lazyOnload"
    />
  );
}