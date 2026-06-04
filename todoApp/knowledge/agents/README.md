# Agents

This directory contains Kaddo agent prompt packs — versionable Markdown prompts you
use in your preferred LLM chat (Claude, ChatGPT, Cursor, Copilot, Windsurf…).

**Kaddo does not execute these agents.** The CLI prepares context; the LLM interprets.

## How to use

1. Run `kaddo scan` then `kaddo context` to generate `.kaddo/context-pack.md`.
2. Open your LLM chat.
3. Paste `.kaddo/context-pack.md` together with the agent prompt for your task.
4. Save the agent output to the location each prompt specifies.

## Recommended order by project state

- **new** → business-agent → bootstrap-agent → codebase-agent → roadmap-agent
- **pre-ai** → capability-agent → architecture-agent → roadmap-agent
- **legacy** → legacy-agent → architecture-agent → capability-agent → roadmap-agent

## Installed agents

### Bootstrap agents (new projects)

- `business-agent.md` — turn an idea into a business definition.
- `bootstrap-agent.md` — go from business to capabilities, quality attributes and roadmap.
- `codebase-agent.md` — propose a codebase foundation (no code).

### Understanding agents

- `capability-agent.md` — extract/propose system capabilities.
- `architecture-agent.md` — reconstruct/propose the architecture baseline.
- `roadmap-agent.md` — propose roadmap candidates.
- `legacy-agent.md` — analyze risks/unknowns before changing legacy code.
- `adr-agent.md` — propose candidate architecture decisions.

### Operational agents

- `work-item-agent.md` — refine roadmap candidates or existing Work Items.
- `git-strategy-agent.md` — define branch/commit/tag/release strategy.
- `security-agent.md` — document security considerations (no scanning).
- `standards-agent.md` — propose lightweight coding/docs/architecture standards.
- `stack-agent.md` — document technologies and stack decisions.
- `module-design-agent.md` — document the design of a mapped module.