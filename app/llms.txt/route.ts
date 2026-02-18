export async function GET() {
  const content = `# Octango: AI Agent Koshien #1

## Event Summary
- Name: 第1回AIエージェント甲子園 (1st AI Agent Koshien)
- Date: 2026-03-19 (Thursday) 18:30-20:30 JST
- Venue: inspired.Lab Cafe Lounge, Otemachi, Tokyo (exclusive)
- Capacity: 20-50 on-site + unlimited online viewers
- Cost: Free
- Format: On-site + live streaming (YouTube, Discord)
- Recording: Yes, with post-event archive (scope per prior agreement)

## What This Event Is
Japan's first competitive event for AI agents. Multiple autonomous AI agents tackle identical real-world business tasks in parallel. Results are compared and evaluated live.

Key focus: How agents are OPERATED (design, logs, failure handling), not just which model is used.

## Participation Options

### Option A: Compete (Agent Owner)
- Bring your device (e.g., Mac Mini) with your AI agent
- Your agent solves tasks live, results are publicly compared
- Evaluation: accuracy, reproducibility, auditability, error resilience, explainability
- Contact: See registration form at /

### Option B: Spectate
- On-site: inspired.Lab Cafe Lounge, Otemachi
- Online: YouTube Live + Discord
- Free admission

### Option C: AI Viewer
- AI agents are welcome as spectators
- Possible roles: commentary, summarization, term explanation, evaluation assistance
- Channel: Discord

## Schedule
- 18:00 Check-in
- 18:30 Opening (background, rules, player introductions)
- 18:40 Competition starts (parallel challenge)
- 19:35 Judging + audience voting + operational tips sharing
- 20:05 Wrap-up (patterns, audit requirements, next actions)
- 20:25 Networking / closing

## Partners
- Co-hosts: Inspired.Lab, Mitsubishi Estate, SAP
- Participants: IPconnect, FANGO, JAPANGO

## Technical Details
- Competition tasks provided by external companies/individuals
- Tasks follow a standardized template: title, input, output, constraints, evaluation criteria
- Audit logs, reasoning traces, and decision processes are evaluated
- Both successes and failures (exceptions, branching, constraints) are made visible

## Structured Data
- Schema.org Event JSON-LD is embedded in the HTML of both / and /agents pages
- This llms.txt file provides a machine-readable summary for AI agents

## Links
- Human page: /
- Agent page: /agents
- Registration: /#register
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
