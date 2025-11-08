---
name: bmad-orchestrator
description: Automated BMAD workflow orchestrator that guides through CIS ideation, then automatically executes the complete development workflow from PRD to Epic Retrospective using the correct agents in sequence. Use when you want to streamline the entire BMAD process from ideation to implementation.
---

# BMAD Workflow Orchestrator

## Overview

This skill provides automated orchestration of the complete BMAD (Build Method for AI-Driven Development) workflow. It starts with CIS (Creative Intelligence System) ideation and analysis, then automatically executes the full development lifecycle using the correct agents and workflows in the prescribed sequence.

## What This Skill Does

The orchestrator automates the entire BMAD workflow sequence:

1. **Phase 0: Ideation & Analysis** (Interactive with Human)
   - CIS brainstorming and problem-solving workflows
   - Analysis workflows (research, product brief, domain research)
   - Captures findings and research outputs

2. **Phase 1-4: Automated Development** (Orchestrated Execution)
   - PRD creation → Epic creation → Epic tech specs
   - Story creation → Story context → Dev story
   - Code review → Epic retrospective
   - Uses correct agents in proper order
   - Injects context at appropriate points

## When to Use This Skill

Use this orchestrator when you want to:
- Start a new project from ideation through implementation
- Follow the complete BMAD methodology automatically
- Eliminate manual workflow progression steps
- Ensure proper agent sequencing and context flow
- Work through a full development cycle systematically

## How It Works

### Automated Mode (This Skill)

```
Interactive Ideation Phase:
  ↓
CIS Brainstorming (with human)
  ↓
CIS Problem-Solving (with human)
  ↓
Analysis Workflows (with human)
  ↓
Automated Development Phase:
  ↓
PRD Creation (automated)
  ↓
Epic & Story Creation (automated)
  ↓
Architecture (facilitated)
  ↓
Sprint Planning (automated)
  ↓
Implementation Loop (automated)
  ↓
Epic Retrospective (facilitated)
```

### Orchestrator Capabilities

**Context Management:**
- Loads project configuration from BMAD config.yaml
- Resolves input file patterns (whole vs sharded docs)
- Passes context between workflow phases
- Maintains conversation history across workflows

**Agent Coordination:**
- Routes workflows to correct agents (PM, Analyst, Architect, SM, DEV)
- Loads agent personas and capabilities
- Manages agent handoffs with proper context
- Supports multi-agent collaboration when needed

**Workflow Execution:**
- Executes workflows in correct sequence
- Tracks workflow status via YAML status files
- Handles conditional routing based on project complexity
- Manages parent-child workflow relationships
- Injects context data between workflows

**Status Tracking:**
- Creates and maintains bmm-workflow-status.yaml
- Determines next workflow in sequence
- Handles mid-stream course corrections
- Provides "what next" recommendations

## Usage Instructions

### Starting a New Project

```
User: "I want to create a new [project description]"

Orchestrator:
1. Guides through CIS brainstorming workflow
2. Captures ideation outputs
3. Facilitates problem-solving session
4. Runs analysis workflows (research, product brief)
5. Documents all findings
6. Asks: "Ready to proceed with automated development?"
7. Executes full development workflow automatically
8. Returns final implementation and retrospective
```

### Execution Flow

The orchestrator will:

**Step 1: Interactive Ideation (You participate)**
- Run CIS brainstorming with your input
- Guide through problem-solving frameworks
- Conduct research and analysis sessions
- Create comprehensive product brief
- Save all outputs to project folder

**Step 2: Automated Planning (Orchestrator drives)**
- Analyze findings and create PRD
- Break PRD into epics and stories
- Generate epic technical context
- Create architecture decisions (with your review)
- Initialize sprint planning

**Step 3: Automated Implementation (Orchestrator drives)**
- For each epic:
  - Generate epic tech context
  - For each story:
    - Create story context XML
    - Execute development workflow
    - Perform code review
    - Mark story done
  - Conduct epic retrospective (with your participation)

**Step 4: Completion**
- Provide comprehensive project summary
- Document lessons learned
- Recommend next steps

## Configuration

The orchestrator uses:
- **Project Config:** `/bmad/bmm/config.yaml`
- **Status Tracking:** `{output_folder}/bmm-workflow-status.yaml`
- **CIS Config:** `/bmad/cis/config.yaml`

### Required Inputs

At minimum, provide:
1. Project name and description
2. Project complexity level (1-3)
3. Output folder location
4. Communication preferences

### Optional Inputs

You can provide:
- Existing research documents
- Prior brainstorming outputs
- Technical constraints
- Domain-specific requirements

## Examples

### Example 1: New SaaS Application

```
User: I want to build a collaborative task management SaaS app

Orchestrator:
- Runs CIS brainstorming: Uses 36+ ideation techniques
- Captures: User personas, feature ideas, competitive analysis
- Problem-solving: Identifies core jobs-to-be-done
- Research: Market analysis, technical stack evaluation
- Product Brief: Vision, strategy, success metrics

Then automatically:
- Creates comprehensive PRD
- Breaks into 8 epics, 45 stories
- Defines architecture (microservices, React, PostgreSQL)
- Executes sprint planning
- Implements all stories with code reviews
- Conducts epic retrospectives

Result: Fully implemented SaaS MVP with documentation
```

### Example 2: API Integration Project

```
User: Need to integrate Stripe payment processing into our platform

Orchestrator:
- Runs focused problem-solving session
- Research: Stripe API capabilities, security requirements
- Creates technical brief

Then automatically:
- Creates integration PRD
- Defines 3 epics, 12 stories
- Architecture: API design, error handling, webhooks
- Implements integration with tests
- Code review and quality checks
- Retrospective on integration patterns

Result: Production-ready Stripe integration
```

### Example 3: Enterprise Feature Addition

```
User: Add multi-tenant SSO with SAML to our enterprise platform

Orchestrator:
- Domain research: SSO protocols, SAML flow, security standards
- CIS innovation strategy: Competitive SSO features
- Product brief: Enterprise SSO vision

Then automatically:
- Creates enterprise-track PRD
- Defines 5 epics (auth, provisioning, admin, audit, docs)
- Extended architecture phase (security, compliance)
- Implements all stories
- Security code reviews
- Comprehensive retrospectives

Result: Enterprise-grade SSO with full documentation
```

## Orchestrator Agent Persona

The orchestrator takes on the role of **BMAD Master** - a strategic conductor who:

- **Understands context:** Analyzes your project needs and adapts workflow selection
- **Guides ideation:** Facilitates creative and strategic thinking sessions
- **Orchestrates agents:** Knows which agent to invoke for each phase
- **Manages progression:** Tracks status and determines next steps
- **Injects context:** Provides each agent with exactly the right information
- **Maintains quality:** Ensures each phase meets standards before proceeding
- **Learns and adapts:** Captures lessons learned for future improvements

## Technical Implementation

The orchestrator skill uses:

**Workflow Invocation Pattern:**
```xml
<invoke-workflow path="{workflow_path}" data="{context_path}">
  Description of workflow purpose
</invoke-workflow>
```

**Status-Based Routing:**
- Reads bmm-workflow-status.yaml
- Determines next workflow in sequence
- Routes to appropriate agent
- Updates status after completion

**Context Injection:**
- Loads outputs from prior workflows
- Creates context XML for dev workflows
- Passes data files via variable context
- Maintains conversation history

**Agent Coordination:**
- Loads agent manifest from `/bmad/_cfg/agent-manifest.csv`
- Routes workflows to specialized agents
- Manages agent handoffs
- Supports multi-agent collaboration (Party Mode when needed)

## Stopping and Resuming

You can stop at any time:
- Status is saved in bmm-workflow-status.yaml
- Use "what should I do now?" to resume
- Orchestrator will pick up where you left off
- All context is preserved

## Mid-Stream Changes

If requirements change:
- Use the correct-course workflow
- Orchestrator will adapt remaining workflows
- Updates status and context
- Continues with new direction

## Reference

For detailed information about:
- Individual workflows: See `/bmad/bmm/workflows/`
- Agent capabilities: See `/bmad/_cfg/agent-manifest.csv`
- CIS techniques: See `/bmad/cis/workflows/`
- Workflow engine: See `/bmad/core/tasks/workflow.xml`

For interactive mode with more human control at each phase, use the `bmad-orchestrator-interactive` skill instead.

---

**Ready to orchestrate your project from ideation to implementation!**
