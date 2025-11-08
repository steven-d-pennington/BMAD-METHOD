# SMAD Quick Start Guide

**Get orchestrating in 5 minutes!**

---

## 1. Install (30 seconds)

```bash
# For Claude Code - install skills
cp -r SMAD_METHOD/skills/bmad-orchestrator ~/.claude/skills/
cp -r SMAD_METHOD/skills/bmad-orchestrator-interactive ~/.claude/skills/

# Verify
ls ~/.claude/skills/bmad-orchestrator/
```

---

## 2. Configure (1 minute)

Ensure your BMAD config is set:

```bash
# Edit bmad/bmm/config.yaml
cat > bmad/bmm/config.yaml <<EOF
project_name: "My Awesome Project"
output_folder: "./output/my-project"
user_name: "Your Name"
communication_language: "English"
EOF

# Create output folder
mkdir -p output/my-project
```

---

## 3. Run Your First Orchestration (3 minutes)

### Automated Mode (Fastest)

```bash
# Start Claude Code
claude

# Invoke orchestrator
orchestrate

# Follow prompts:
# 1. Describe your project
# 2. Select complexity level (1-3)
# 3. Answer a few questions
# 4. Let it run!
```

### Interactive Mode (Learning)

```bash
# Start Claude Code
claude

# Invoke interactive orchestrator
orchestrate-interactive

# You'll get approval gates at each phase
# Review outputs and approve to continue
```

---

## 4. What Happens

The orchestrator will:

**Phase 0: Ideation (5-15 min)**
- Guide you through brainstorming
- Capture your ideas and insights

**Phase 1: Analysis (10-20 min)**
- Conduct research
- Create product brief

**Phase 2: Planning (15-30 min)**
- Generate PRD
- Break into epics and stories

**Phase 3: Architecture (20-40 min)**
- Define technical decisions
- Select tech stack

**Phase 4: Implementation (Automated)**
- Implement all stories
- Code reviews
- Retrospectives

---

## 5. Check Your Results

```bash
# See all outputs
ls -la output/my-project/

# Key files:
# - brainstorming-session-results.md
# - product-brief.md
# - PRD.md
# - epics.md
# - architecture.md
# - orchestration-summary.md

# Read summary
cat output/my-project/orchestration-summary.md
```

---

## Common First-Time Patterns

### Pattern 1: Simple Feature

```
Project: "Add password reset to my app"
Complexity: Level 1 (Simple)
Track: Quick Flow
Time: ~1 hour
Output: Tech spec + working implementation
```

### Pattern 2: New Product

```
Project: "Build a habit tracking mobile app"
Complexity: Level 2 (Standard)
Track: BMad Method
Time: ~3 hours
Output: Complete app with 20-30 stories
```

### Pattern 3: Enterprise Feature

```
Project: "Add SSO authentication to platform"
Complexity: Level 3 (Complex)
Track: Enterprise Method
Time: ~1 day
Output: Enterprise-grade feature with security reviews
```

---

## Quick Tips

1. **First time?** Use interactive mode to learn the flow
2. **Simple project?** Choose level 1 for Quick Flow
3. **Unsure?** Let the orchestrator recommend the track
4. **Need to pause?** Just stop - resume with `resume-orchestration`
5. **Things change?** Use `correct-course` to adapt mid-stream

---

## Next Steps

- Read [README.md](README.md) for full overview
- Check [EXAMPLES.md](docs/EXAMPLES.md) for detailed examples
- Review [REFERENCE.md](docs/REFERENCE.md) for deep dive
- See [INSTALLATION.md](docs/INSTALLATION.md) for advanced setup

---

## Help

```bash
# Check status anytime
orchestration-status

# Resume if interrupted
resume-orchestration

# Get help
claude --help
```

---

**That's it! You're orchestrating!** 🎭

The orchestrator will guide you through the rest. Just answer questions and review outputs.

For questions or issues, see [README.md](README.md) or [INSTALLATION.md](docs/INSTALLATION.md).
