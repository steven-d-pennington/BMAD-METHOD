# SMAD Method - Streamlined MAD Orchestration

**Version:** 1.0.0
**Framework:** BMAD Method v6.0.0-alpha.7
**Created:** November 8, 2025

---

## Overview

**SMAD (Streamlined MAD)** provides automated orchestration for the complete BMAD (Build Method for AI-Driven Development) workflow. It eliminates manual workflow progression steps by automatically routing through the correct agents and workflows in the prescribed sequence.

### What SMAD Does

SMAD orchestrates your project from ideation to implementation:

1. **Ideation Phase** - Interactive CIS workflows for brainstorming and problem-solving
2. **Analysis Phase** - Research and product brief creation
3. **Planning Phase** - PRD and epic/story breakdown
4. **Solutioning Phase** - Architecture and technical decisions
5. **Implementation Phase** - Automated sprint execution with all stories

### Key Features

- **Automated Workflow Sequencing**: Executes workflows in correct order with proper dependencies
- **Context Injection**: Passes outputs from each phase to subsequent workflows
- **Agent Coordination**: Routes to correct agents (PM, Analyst, Architect, SM, DEV)
- **Status Tracking**: Maintains workflow status and enables resume from checkpoints
- **Multi-Mode Support**: Automated mode or interactive mode with approval gates
- **Quality Gates**: Validates outputs before proceeding to next phase

---

## Quick Start

### Installation

1. **Copy SMAD_METHOD folder** to your BMAD installation:
   ```bash
   cp -r SMAD_METHOD /path/to/your/bmad/installation/
   ```

2. **Install Skills** (for Claude Code):
   ```bash
   # For personal skills
   cp -r SMAD_METHOD/skills/bmad-orchestrator ~/.claude/skills/
   cp -r SMAD_METHOD/skills/bmad-orchestrator-interactive ~/.claude/skills/

   # For project skills
   cp -r SMAD_METHOD/skills/bmad-orchestrator .claude/skills/
   cp -r SMAD_METHOD/skills/bmad-orchestrator-interactive .claude/skills/
   ```

### Usage

#### Automated Mode

Start complete orchestration from ideation to implementation:

```bash
# Invoke the orchestrator skill
claude orchestrate

# Or use the agent directly
bmad-orchestrator orchestrate
```

#### Interactive Mode

Get approval gates at each phase transition:

```bash
# Invoke interactive skill
claude orchestrate-interactive

# Or use the agent
bmad-orchestrator orchestrate-interactive
```

#### Partial Orchestration

Start from specific phases:

```bash
# Skip ideation, start from analysis
bmad-orchestrator orchestrate-from-analysis

# Have analysis, start from planning
bmad-orchestrator orchestrate-from-planning

# Have PRD/epics, start implementation
bmad-orchestrator orchestrate-from-implementation
```

#### Check Status

See current orchestration status and next steps:

```bash
bmad-orchestrator orchestration-status
```

#### Resume

Continue from last checkpoint:

```bash
bmad-orchestrator resume-orchestration
```

---

## Architecture

### Components

```
SMAD_METHOD/
├── skills/                          # Claude Code skills
│   ├── bmad-orchestrator/           # Automated orchestration skill
│   │   └── SKILL.md
│   └── bmad-orchestrator-interactive/  # Interactive orchestration skill
│       └── SKILL.md
│
├── agents/                          # SMAD agents
│   └── orchestrator.agent.yaml     # Orchestration Master agent
│
├── workflows/                       # Orchestration workflows
│   └── orchestrate-full/            # Main automated orchestration
│       ├── workflow.yaml            # Workflow configuration
│       └── instructions.md          # XML-based execution flow
│
└── docs/                            # Documentation
    ├── REFERENCE.md                 # Detailed reference
    ├── ORCHESTRATION_PATTERNS.md   # Pattern catalog
    └── EXAMPLES.md                  # Usage examples
```

### Workflow Sequence

**Automated Mode:**
```
Interactive Ideation
  ↓
Automated Analysis
  ↓
Automated Planning (PRD + Epics)
  ↓
Facilitated Architecture
  ↓
Automated Implementation Loop
  ↓
Interactive Retrospectives
```

**Interactive Mode:**
```
Interactive Ideation
  ↓
[CHECKPOINT 1: Review brainstorming]
  ↓
Guided Analysis
  ↓
[CHECKPOINT 2: Review research/brief]
  ↓
PRD Creation
  ↓
[CHECKPOINT 3: Approve PRD]
  ↓
Epic/Story Breakdown
  ↓
[CHECKPOINT 4: Approve epics/stories]
  ↓
Architecture
  ↓
[CHECKPOINT 5: Approve architecture]
  ↓
Sprint Planning
  ↓
[CHECKPOINT 6: Approve sprint plan]
  ↓
For Each Epic:
  [CHECKPOINT 7: Approve epic context]
  For Each Story:
    [CHECKPOINT 8: Approve story context]
    Implementation
    [CHECKPOINT 9: Review code]
  [CHECKPOINT 10: Review retrospective]
```

---

## Configuration

### Project Configuration

SMAD uses existing BMAD configuration:

**BMM Config:** `/bmad/bmm/config.yaml`
```yaml
project_name: "Your Project Name"
output_folder: "./output/your-project"
user_name: "Your Name"
communication_language: "English"
```

**CIS Config:** `/bmad/cis/config.yaml`
```yaml
# CIS module configuration
output_folder: "./output/your-project"
```

### Orchestration Status

SMAD creates and maintains:

**Status File:** `{output_folder}/bmm-workflow-status.yaml`
```yaml
metadata:
  project_name: "..."
  project_level: 1-3
  planning_track: quick-flow | bmad-method | enterprise
  current_phase: 0-4
  orchestration_mode: auto | interactive
  orchestrator_version: "1.0.0"

workflow_status:
  brainstorming: "path/to/output.md"
  prd: "in-progress"
  architecture: "pending"
  # ... etc

context_files:
  brainstorming: "..."
  prd: "..."
  architecture: "..."

implementation_status:
  current_epic: "epic-1"
  current_story: "1-2-feature"
  completed_epics: ["epic-1", "epic-2"]
  completed_stories: ["1-1-story", "1-2-story"]
```

---

## Orchestration Modes

### Automated Mode

**Use When:**
- You trust the BMAD process
- Requirements are clear
- Want fastest execution
- Minimal interaction needed

**Characteristics:**
- Runs all workflows in sequence
- Only interactive at ideation and retrospectives
- Automatic context injection
- Fastest completion time

### Interactive Mode

**Use When:**
- Learning BMAD methodology
- Requirements uncertain
- Want control at each phase
- Need stakeholder approvals

**Characteristics:**
- Approval gates at 10 checkpoints
- Review outputs before proceeding
- Can request changes at any point
- Learning annotations available
- Can switch to automated mid-stream

---

## Planning Tracks

SMAD supports all BMAD planning tracks:

### Quick Flow Track

**Best For:** Simple features, bug fixes, clear scope
**Workflows:** Tech Spec → Implementation
**Stories:** 1-15 typically
**Time:** Hours to 1 day

### BMad Method Track (Recommended)

**Best For:** Products, platforms, complex features
**Workflows:** PRD → Epics → Architecture → Implementation
**Stories:** 10-50 typically
**Time:** 1-3 days

### Enterprise Method Track

**Best For:** Enterprise requirements, compliance, multi-tenant
**Workflows:** PRD → Epics → Extended Architecture → Implementation
**Stories:** 30+ typically
**Time:** 3-7 days

The orchestrator recommends a track based on your project level (1-3).

---

## Agents Coordinated

SMAD coordinates these BMAD agents:

**CIS Agents:**
- Carson (Brainstorming Specialist)
- Dr. Quinn (Problem Solver)
- Victor (Innovation Strategist)
- Maya (Design Thinking Maestro)
- Sophia (Storyteller)

**BMM Agents:**
- PM (Product Manager) - Planning workflows
- Analyst - Research and analysis
- Architect - Architecture and technical decisions
- SM (Scrum Master) - Sprint and story management
- DEV (Developer) - Implementation and code review
- UX Designer - User experience design (optional)
- TEA (Test Engineer) - Test architecture (optional)
- Tech Writer - Documentation (optional)

---

## Outputs

After orchestration, you'll have:

**Ideation & Analysis:**
- `brainstorming-session-results.md` - All ideation outputs
- `problem-solving-results.md` - Problem analysis (if run)
- `research-[type].md` - Research findings
- `product-brief.md` - Product vision and strategy
- `domain-brief.md` - Domain research (if applicable)

**Planning & Solutioning:**
- `PRD.md` or `tech-spec.md` - Requirements document
- `epics.md` - Epic and story breakdown
- `architecture.md` - Architecture decisions

**Implementation:**
- `sprint-status.yaml` - Sprint tracking
- `tech-spec-epic-{id}.md` - Epic context (per epic)
- `{story-key}.md` - Story files (per story)
- `{story-key}.context.xml` - Story context (per story)
- `code-review-{story-key}.md` - Code reviews (per story)
- `retrospective-epic-{id}.md` - Epic retrospectives

**Summary:**
- `orchestration-summary.md` - Complete orchestration report
- `bmm-workflow-status.yaml` - Final status

---

## Examples

### Example 1: New SaaS Application

```
User: Create a collaborative task management SaaS app

Orchestrator Flow:
1. CIS Brainstorming → 15 feature ideas from 5 techniques
2. Research → Market analysis, competitor review
3. Product Brief → Vision, personas, success metrics
4. PRD → Comprehensive requirements (8 epics, 45 stories)
5. Architecture → Microservices, React, PostgreSQL
6. Implementation → All 45 stories with code reviews
7. Retrospectives → Lessons learned per epic

Result: Fully implemented SaaS MVP with documentation
Time: ~3 days
```

### Example 2: API Integration

```
User: Integrate Stripe payment processing

Orchestrator Flow:
1. Problem Solving → Payment flow analysis
2. Research → Stripe API, security requirements
3. Tech Spec → Integration requirements (3 epics, 12 stories)
4. Architecture → API design, webhooks, error handling
5. Implementation → All 12 stories with tests
6. Retrospectives → Integration pattern insights

Result: Production-ready Stripe integration
Time: ~1 day
```

### Example 3: Enterprise Feature

```
User: Add multi-tenant SSO with SAML

Orchestrator Flow:
1. Domain Research → SSO protocols, SAML, compliance
2. Innovation Strategy → Competitive SSO features
3. Product Brief → Enterprise SSO vision
4. PRD → Enterprise requirements (5 epics, 28 stories)
5. Extended Architecture → Security, compliance, audit
6. Solutioning Gate Check → Readiness validation
7. Implementation → All 28 stories with security reviews
8. Retrospectives → Security and compliance learnings

Result: Enterprise-grade SSO with full documentation
Time: ~5 days
```

---

## Stopping and Resuming

### Pause Orchestration

Orchestration can be paused at any time:
- Status automatically saved to `bmm-workflow-status.yaml`
- All context files preserved
- Resume from exact checkpoint

### Resume

```bash
bmad-orchestrator resume-orchestration
```

The orchestrator will:
1. Load status file
2. Determine current phase and workflow
3. Continue from last checkpoint
4. Maintain all context

### Mid-Stream Changes

If requirements change:
```bash
bmad-orchestrator correct-course
```

The orchestrator will:
1. Understand the change
2. Update affected artifacts
3. Adapt remaining workflows
4. Continue with new direction

---

## Advanced Features

### Party Mode Integration

For complex decisions, the orchestrator can invoke Party Mode:
- Assembles relevant agents for discussion
- Facilitates multi-agent collaboration
- Captures collaborative decisions
- Returns to orchestration flow

### Adaptive Routing

The orchestrator adapts based on:
- Project complexity (level 1-3)
- Existing materials
- User preferences
- Mid-stream changes

### Context Management

Sophisticated context handling:
- Input file pattern discovery (whole vs sharded docs)
- Context XML generation for dev workflows
- Prior story pattern injection
- Architecture decision mapping

### Quality Assurance

Built-in quality gates:
- Validate outputs against templates
- Run validation checklists
- Ensure prerequisite completion
- Check for missing outputs

---

## Troubleshooting

### Common Issues

**Issue:** Orchestrator can't find workflow files
**Solution:** Ensure BMAD modules (core, cis, bmm) are installed

**Issue:** Configuration not loading
**Solution:** Check `/bmad/bmm/config.yaml` and `/bmad/cis/config.yaml` exist

**Issue:** Status file conflicts
**Solution:** Remove old `bmm-workflow-status.yaml` or use resume

**Issue:** Agent not available
**Solution:** Ensure agent is installed and registered in agent manifest

### Debug Mode

Enable verbose logging:
```bash
bmad-orchestrator orchestrate --debug
```

Shows:
- Workflow loading and validation
- Variable resolution
- Context injection details
- Agent routing decisions

---

## Development

### Extending SMAD

Add new orchestration workflows:

1. Create workflow directory in `SMAD_METHOD/workflows/`
2. Add `workflow.yaml` configuration
3. Create `instructions.md` with XML flow
4. Register in orchestrator agent menu

### Custom Checkpoints

Add checkpoints in interactive mode:

```xml
<template-output>
  CHECKPOINT X: Custom Gate
  ========================
  [Your checkpoint logic]
</template-output>

<ask>Your choice?</ask>
```

### Integration Points

SMAD integrates with:
- All BMAD core workflows
- All CIS module workflows
- All BMM module workflows
- Custom workflows in project

---

## Best Practices

### For First-Time Users

1. Start with **interactive mode** to learn the flow
2. Use **Quick Flow** for simple projects first
3. Review outputs at each checkpoint
4. Read learning annotations
5. Graduate to automated mode when comfortable

### For Teams

1. Share orchestration summary with stakeholders
2. Get approvals at major checkpoints
3. Use interactive mode for uncertain requirements
4. Document decisions at each phase
5. Review retrospectives as a team

### For Large Projects

1. Use **Enterprise Method** track
2. Run domain research for specialized domains
3. Take time on architecture phase
4. Review epic contexts before implementation
5. Conduct thorough retrospectives

---

## Support

### Documentation

- **REFERENCE.md** - Detailed technical reference
- **ORCHESTRATION_PATTERNS.md** - Pattern catalog
- **EXAMPLES.md** - Complete usage examples

### BMAD Resources

- **Core Workflows:** `/bmad/core/workflows/`
- **CIS Workflows:** `/bmad/cis/workflows/`
- **BMM Workflows:** `/bmad/bmm/workflows/`
- **Agent Manifest:** `/bmad/_cfg/agent-manifest.csv`

### Issues

Report issues to the BMAD team or create custom overrides in:
- `SMAD_METHOD/agents/orchestrator.customize.yaml`

---

## Roadmap

### Planned Features

- [ ] Multi-project orchestration
- [ ] Team collaboration mode
- [ ] Custom workflow templates
- [ ] Metrics and analytics
- [ ] Integration with CI/CD
- [ ] Cloud deployment orchestration
- [ ] Multi-language support

### Contribution

To contribute to SMAD:
1. Fork SMAD_METHOD
2. Create feature branch
3. Add workflows or improvements
4. Submit for review

---

## License

SMAD follows the same license as BMAD Method.

---

## Credits

**Created By:** BMAD Community
**Framework:** BMAD Method v6.0.0-alpha.7
**Orchestration Engine:** BMAD Core Task Framework
**Agent System:** BMAD Agent Manifest

**Special Thanks:**
- BMAD Core Team
- CIS Module Contributors
- BMM Module Contributors
- Claude Code Team

---

**Version:** 1.0.0
**Last Updated:** November 8, 2025

*Orchestrate with confidence. Build with intelligence.*
