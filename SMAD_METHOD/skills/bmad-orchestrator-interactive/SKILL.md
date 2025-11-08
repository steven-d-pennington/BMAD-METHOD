---
name: bmad-orchestrator-interactive
description: Interactive BMAD workflow orchestrator that guides you through each phase with approval gates. Starts with CIS ideation, then proceeds through development workflows with your involvement at key decision points. Use when you want more control over each workflow transition.
---

# BMAD Interactive Workflow Orchestrator

## Overview

This skill provides **interactive orchestration** of the complete BMAD workflow. Unlike the fully automated orchestrator, this version gives you control and visibility at each phase transition, allowing you to review outputs, adjust direction, and decide when to proceed.

## What This Skill Does

The interactive orchestrator guides you through the BMAD workflow with checkpoints:

1. **Phase 0: Ideation & Analysis** (Fully Interactive)
   - CIS brainstorming and problem-solving
   - Analysis workflows with your participation
   - Review and approval of findings

2. **Phase 1: Planning** (Interactive Approval)
   - PRD creation with your review
   - Epic/story breakdown approval
   - Architecture decisions with your input

3. **Phase 2: Implementation** (Checkpoint-Based)
   - Approval before each epic starts
   - Review story context before development
   - Approve code reviews before proceeding
   - Participate in retrospectives

## When to Use This Skill

Choose interactive mode when you want to:
- Have more control over workflow progression
- Review outputs before proceeding to next phase
- Make decisions at key transition points
- Learn the BMAD methodology step-by-step
- Adjust course based on intermediate results
- Work collaboratively with the orchestrator

## Differences from Automated Mode

| Aspect | Automated Mode | Interactive Mode |
|--------|----------------|------------------|
| Ideation | Interactive | Interactive |
| PRD Creation | Automatic | Review & Approve |
| Epic Breakdown | Automatic | Review & Approve |
| Architecture | Facilitated | Collaborative |
| Story Development | Automatic | Checkpoint Approval |
| Code Reviews | Automatic | Review Each One |
| Retrospectives | Facilitated | Full Participation |
| Speed | Fastest | Measured |
| Control | Minimal | Maximum |

## How It Works

### Interactive Flow

```
Phase 0: Ideation (You lead)
  ↓
[CHECKPOINT 1: Review brainstorming outputs]
  ↓
Phase 1: Analysis (Collaborative)
  ↓
[CHECKPOINT 2: Review research and product brief]
  ↓
Planning Track Selection (Your choice)
  ↓
PRD Creation (Orchestrator drafts)
  ↓
[CHECKPOINT 3: Review and approve PRD]
  ↓
Epic & Story Creation (Orchestrator drafts)
  ↓
[CHECKPOINT 4: Review and approve epics/stories]
  ↓
Architecture (Collaborative decisions)
  ↓
[CHECKPOINT 5: Approve architecture]
  ↓
Sprint Planning (Orchestrator plans)
  ↓
[CHECKPOINT 6: Approve sprint plan]
  ↓
For Each Epic:
  ↓
  [CHECKPOINT 7: Approve epic tech context]
  ↓
  For Each Story:
    ↓
    [CHECKPOINT 8: Approve story context]
    ↓
    Development (Orchestrator implements)
    ↓
    [CHECKPOINT 9: Review code]
    ↓
    Approve or request changes
  ↓
  Epic Retrospective (Full participation)
  ↓
  [CHECKPOINT 10: Review retrospective]
```

## Usage Instructions

### Starting Interactive Session

```
User: "Start interactive BMAD orchestration for [project]"

Orchestrator:
1. Explains the complete workflow
2. Shows all checkpoints you'll encounter
3. Starts CIS brainstorming session
4. Pauses at each checkpoint for your input
5. Proceeds only with your approval
6. Adapts based on your feedback
```

### Checkpoint Actions

At each checkpoint, you can:
- **Approve:** Proceed to next workflow
- **Request Changes:** Modify current output
- **Adjust Course:** Change workflow direction
- **Skip Phase:** Jump to different phase
- **Pause:** Save status and resume later
- **Switch Mode:** Move to automated mode

## Checkpoint Details

### Checkpoint 1: Brainstorming Review
**After:** CIS brainstorming completes
**You Review:** All ideation outputs, chosen techniques, key insights
**You Decide:** Proceed to analysis, run more brainstorming, or skip to planning

### Checkpoint 2: Research & Brief Review
**After:** Analysis workflows complete
**You Review:** Research findings, product brief, domain research
**You Decide:** Sufficient analysis, need more research, ready for planning

### Checkpoint 3: PRD Review
**After:** PRD workflow completes
**You Review:** Requirements, user stories, success criteria
**You Decide:** Approve PRD, request revisions, add requirements

### Checkpoint 4: Epics & Stories Review
**After:** Epic/story breakdown completes
**You Review:** Epic structure, story breakdown, acceptance criteria
**You Decide:** Approve breakdown, restructure epics, adjust stories

### Checkpoint 5: Architecture Review
**After:** Architecture workflow completes
**You Review:** Architectural decisions, tech stack, patterns
**You Decide:** Approve architecture, reconsider decisions, add requirements

### Checkpoint 6: Sprint Plan Review
**After:** Sprint planning completes
**You Review:** Sprint scope, epic order, story priorities
**You Decide:** Approve plan, reorder epics, adjust scope

### Checkpoint 7: Epic Context Review
**Before:** Each epic development starts
**You Review:** Epic technical context, implementation guidance
**You Decide:** Approve and start epic, adjust context, skip epic

### Checkpoint 8: Story Context Review
**Before:** Each story development starts
**You Review:** Story context XML, requirements, acceptance criteria
**You Decide:** Approve and develop, adjust context, skip story

### Checkpoint 9: Code Review Approval
**After:** Each story development completes
**You Review:** Implementation, tests, code quality
**You Decide:** Approve story, request changes, reject implementation

### Checkpoint 10: Retrospective Review
**After:** Each epic retrospective
**You Review:** Lessons learned, process improvements
**You Decide:** Apply learnings to next epic, adjust process

## Interactive Commands

During orchestration, you can use:

**Navigation:**
- `status` - Show current phase and progress
- `next` - Approve current checkpoint and proceed
- `back` - Return to previous checkpoint
- `skip to [phase]` - Jump to specific phase

**Control:**
- `pause` - Save status and pause orchestration
- `resume` - Continue from last checkpoint
- `switch to auto` - Complete remaining workflows automatically
- `restart [phase]` - Restart from beginning of phase

**Modifications:**
- `revise [item]` - Request changes to current output
- `add [requirement]` - Add new requirement
- `remove [item]` - Remove from current scope
- `correct course` - Invoke mid-stream correction workflow

**Information:**
- `show workflows` - Display all workflows in sequence
- `show agents` - List agents and their roles
- `explain [phase]` - Get details about phase
- `help` - Show all commands

## Example Interactive Session

```
User: Start interactive orchestration for "Mobile Expense Tracker App"

Orchestrator:
Starting Interactive BMAD Orchestration
=====================================

Project: Mobile Expense Tracker App
Mode: Interactive (10 checkpoints)

WORKFLOW SEQUENCE:
Phase 0: Ideation & Analysis
  ✓ CIS Brainstorming [CP1]
  ✓ Problem Solving
  ✓ Research & Product Brief [CP2]

Phase 1: Planning
  ✓ PRD Creation [CP3]
  ✓ Epic & Story Breakdown [CP4]
  ✓ Architecture [CP5]

Phase 2: Implementation
  ✓ Sprint Planning [CP6]
  ✓ Epic 1 [CP7-10]
  ✓ Epic 2 [CP7-10]
  ...

Let's begin with CIS Brainstorming...

[Runs brainstorming workflow]

CHECKPOINT 1: Brainstorming Review
================================

Output: brainstorming-session-results.md
Key Insights:
- 15 feature ideas from 5 techniques
- User personas defined
- Core problem: Manual expense tracking tedious
- Opportunity: AI-powered categorization

Actions:
  [A] Approve and proceed to analysis
  [M] Run more brainstorming techniques
  [S] Skip to planning (use existing research)
  [P] Pause orchestration

Your choice: A

Orchestrator: Proceeding to Analysis phase...

[Continues with checkpoints throughout]
```

## Learning Mode

Interactive mode includes **learning annotations**:

```
WHAT'S HAPPENING: Creating PRD from analysis outputs

WHY THIS MATTERS: PRD serves as contract between business and engineering

WHAT TO LOOK FOR:
- Clear user stories
- Measurable success criteria
- Complete functional requirements

NEXT WORKFLOW: Epic breakdown will decompose PRD into sprints
```

Enable with: `orchestrator --learning-mode on`

## Best Practices

**For Learning:**
- Use interactive mode for first 2-3 projects
- Read learning annotations
- Ask questions at checkpoints
- Review each output thoroughly

**For Control:**
- Use when requirements are uncertain
- Review architecture carefully
- Approve code reviews individually
- Participate in retrospectives actively

**For Collaboration:**
- Share outputs at checkpoints with team
- Get stakeholder approval at key phases
- Use correct-course when direction changes
- Document decisions at each checkpoint

## Technical Implementation

**Checkpoint Pattern:**
```xml
<step n="5" goal="Execute PRD workflow">
  <invoke-workflow path="{prd_workflow}" data="{product_brief}">
    Creates Product Requirements Document
  </invoke-workflow>

  <template-output>
    CHECKPOINT 3: PRD Review
    ========================
    Output: {prd_file}

    Please review the PRD and choose:
    [A] Approve - proceed to epic breakdown
    [R] Request revisions
    [M] Make manual edits
    [B] Back to analysis phase
  </template-output>

  <ask>Your choice (A/R/M/B)?</ask>

  <check if="choice == 'R'">
    <ask>What revisions do you need?</ask>
    <action>Update PRD based on feedback</action>
    <goto step="5">Re-run PRD workflow</goto>
  </check>

  <check if="choice == 'M'">
    <action>Pause for manual editing</action>
    <ask>Press Enter when edits complete</ask>
  </check>

  <check if="choice == 'B'">
    <goto step="2">Return to analysis</goto>
  </check>
</step>
```

**Status Tracking:**
- Saves checkpoint number in status YAML
- Records approval decisions
- Maintains audit trail
- Enables resume from any checkpoint

## Transitioning to Automated Mode

When comfortable with BMAD:

```
User: Switch to automated mode

Orchestrator:
Switching to automated orchestration...

Remaining workflows will execute automatically:
- Epic 3-8 development
- All code reviews
- Epic retrospectives

You'll still participate in:
- Final project retrospective
- Major course corrections

Status saved. Proceeding automatically...
```

## Reference

See the automated `bmad-orchestrator` skill for:
- Faster execution
- Minimal interaction
- Trusted workflow progression

---

**Interactive orchestration puts you in control while BMAD guides the way!**
