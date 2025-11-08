# SMAD Method Installation Guide

**Version:** 1.0.0
**Last Updated:** November 8, 2025

---

## Prerequisites

Before installing SMAD, ensure you have:

### Required

1. **BMAD Method** installed (v6.0.0-alpha.7 or later)
   - BMAD Core module
   - BMAD CIS module (Creative Intelligence System)
   - BMAD BMM module (BMad Method Module)

2. **Claude Code** or compatible AI environment
   - Claude Code CLI, or
   - Claude desktop app with skills support, or
   - Compatible AI agent framework

3. **Project Structure**
   - BMAD installed at `{project-root}/bmad/`
   - Configuration files:
     - `/bmad/bmm/config.yaml`
     - `/bmad/cis/config.yaml`

### Verification

Check BMAD installation:
```bash
# Verify BMAD structure
ls -la bmad/core/tasks/workflow.xml
ls -la bmad/cis/workflows/
ls -la bmad/bmm/workflows/

# Verify agent manifest
ls -la bmad/_cfg/agent-manifest.csv

# Check configurations
cat bmad/bmm/config.yaml
cat bmad/cis/config.yaml
```

---

## Installation Steps

### Step 1: Copy SMAD Files

#### Option A: Direct Copy (Recommended)

```bash
# Copy entire SMAD_METHOD to your project root
cp -r SMAD_METHOD /path/to/your/bmad/project/

# Verify installation
ls -la SMAD_METHOD/
```

#### Option B: Selective Installation

```bash
# Copy only specific components
mkdir -p SMAD_METHOD/{skills,agents,workflows,docs}

# Copy skills
cp -r SMAD_METHOD/skills/bmad-orchestrator SMAD_METHOD/skills/
cp -r SMAD_METHOD/skills/bmad-orchestrator-interactive SMAD_METHOD/skills/

# Copy agents
cp SMAD_METHOD/agents/orchestrator.agent.yaml SMAD_METHOD/agents/

# Copy workflows
cp -r SMAD_METHOD/workflows/orchestrate-full SMAD_METHOD/workflows/

# Copy docs
cp SMAD_METHOD/docs/* SMAD_METHOD/docs/
```

### Step 2: Install Skills (Claude Code)

Skills can be installed at **user level** (all projects) or **project level** (current project only).

#### User-Level Installation (All Projects)

```bash
# Create skills directory if needed
mkdir -p ~/.claude/skills

# Copy skills
cp -r SMAD_METHOD/skills/bmad-orchestrator ~/.claude/skills/
cp -r SMAD_METHOD/skills/bmad-orchestrator-interactive ~/.claude/skills/

# Verify
ls -la ~/.claude/skills/
```

#### Project-Level Installation (Current Project)

```bash
# Create project skills directory
mkdir -p .claude/skills

# Copy skills
cp -r SMAD_METHOD/skills/bmad-orchestrator .claude/skills/
cp -r SMAD_METHOD/skills/bmad-orchestrator-interactive .claude/skills/

# Verify
ls -la .claude/skills/
```

### Step 3: Register Orchestrator Agent (Optional)

To make the orchestrator agent available system-wide:

#### Option A: Add to Agent Manifest

```bash
# Edit agent manifest
nano bmad/_cfg/agent-manifest.csv
```

Add this line:
```csv
orchestrator,BMAD Orchestrator,Workflow Orchestration Master,🎭,smad,You are the BMAD Orchestration Master...,"{project-root}/SMAD_METHOD/agents/orchestrator.agent.yaml"
```

#### Option B: Create Agent Override

```bash
# Create override directory
mkdir -p bmad/_cfg/agents/

# Create orchestrator override
cat > bmad/_cfg/agents/orchestrator.customize.yaml <<EOF
id: orchestrator
enabled: true
path: "{project-root}/SMAD_METHOD/agents/orchestrator.agent.yaml"
EOF
```

### Step 4: Configure Project

Update your BMAD configuration to recognize SMAD:

#### Update BMM Config

Edit `bmad/bmm/config.yaml`:
```yaml
# Add SMAD paths
smad_path: "{project-root}/SMAD_METHOD"
orchestrator_enabled: true

# Existing configuration
project_name: "Your Project"
output_folder: "./output/your-project"
user_name: "Your Name"
communication_language: "English"
```

#### Update CIS Config (if needed)

Edit `bmad/cis/config.yaml`:
```yaml
# Ensure output folder matches BMM
output_folder: "./output/your-project"
```

### Step 5: Verify Installation

Run verification checks:

```bash
# Test 1: Check SMAD structure
ls -la SMAD_METHOD/skills/bmad-orchestrator/SKILL.md
ls -la SMAD_METHOD/agents/orchestrator.agent.yaml
ls -la SMAD_METHOD/workflows/orchestrate-full/workflow.yaml

# Test 2: Verify skills (if using Claude Code)
claude skills list | grep bmad-orchestrator

# Test 3: Check workflow files
cat SMAD_METHOD/workflows/orchestrate-full/instructions.md

# Test 4: Validate YAML
yamllint SMAD_METHOD/agents/orchestrator.agent.yaml
yamllint SMAD_METHOD/workflows/orchestrate-full/workflow.yaml
```

---

## Post-Installation Configuration

### Configure Output Folder

1. Create output directory:
   ```bash
   mkdir -p output/your-project
   ```

2. Set permissions:
   ```bash
   chmod -R 755 output/
   ```

3. Verify write access:
   ```bash
   touch output/your-project/test.txt
   rm output/your-project/test.txt
   ```

### Initialize First Project

Test the installation:

```bash
# Using Claude Code skill
claude bmad-orchestrator

# Or invoke directly
# Follow the prompts to set up your first orchestrated project
```

---

## Installation for Different Environments

### Claude Code CLI

```bash
# Skills are automatically discovered from:
# - ~/.claude/skills/ (user-level)
# - .claude/skills/ (project-level)

# After copying skills, restart Claude Code:
claude restart  # If available

# Or just start using:
claude
```

### Claude Desktop App

1. **User-Level Skills:**
   - Copy to: `~/Documents/Claude/skills/` (or app-specific skills folder)

2. **Project-Level Skills:**
   - Copy to: `.claude/skills/` in project root
   - Claude Desktop automatically detects project skills

3. **Usage:**
   - Open project in Claude Desktop
   - Skills appear in skills menu
   - Invoke with skill name

### Custom AI Frameworks

If using a custom framework:

1. **Agent Integration:**
   - Load `SMAD_METHOD/agents/orchestrator.agent.yaml`
   - Parse YAML and create agent instance
   - Register agent with your framework

2. **Workflow Integration:**
   - Implement XML workflow executor
   - Support `<invoke-workflow>` tag
   - Handle variable resolution

3. **Skill Integration:**
   - Parse SKILL.md frontmatter
   - Register skills with your framework
   - Map skill invocation to workflow execution

---

## Updating SMAD

### Upgrade from Previous Version

```bash
# Backup existing installation
cp -r SMAD_METHOD SMAD_METHOD.backup

# Copy new version
cp -r /path/to/new/SMAD_METHOD ./

# Merge any customizations from backup
# (Check agents/*.customize.yaml files)

# Verify upgrade
diff -r SMAD_METHOD.backup SMAD_METHOD
```

### Preserve Customizations

Before upgrading:

1. **Backup customizations:**
   ```bash
   cp SMAD_METHOD/agents/orchestrator.customize.yaml ~/
   ```

2. **Upgrade SMAD**

3. **Restore customizations:**
   ```bash
   cp ~/orchestrator.customize.yaml SMAD_METHOD/agents/
   ```

---

## Uninstallation

To remove SMAD:

```bash
# Remove skills (user-level)
rm -rf ~/.claude/skills/bmad-orchestrator
rm -rf ~/.claude/skills/bmad-orchestrator-interactive

# Remove skills (project-level)
rm -rf .claude/skills/bmad-orchestrator
rm -rf .claude/skills/bmad-orchestrator-interactive

# Remove SMAD files
rm -rf SMAD_METHOD

# Remove from agent manifest (if added)
# Edit bmad/_cfg/agent-manifest.csv and remove orchestrator line

# Remove agent overrides
rm -f bmad/_cfg/agents/orchestrator.customize.yaml
```

---

## Troubleshooting Installation

### Issue: Skills Not Appearing

**Check:**
1. Skills folder location correct?
   ```bash
   ls ~/.claude/skills/bmad-orchestrator/SKILL.md
   ```

2. SKILL.md has proper frontmatter?
   ```bash
   head -10 ~/.claude/skills/bmad-orchestrator/SKILL.md
   ```

3. Restart Claude Code if needed

**Fix:**
```bash
# Verify SKILL.md format
cat ~/.claude/skills/bmad-orchestrator/SKILL.md
# Should start with:
# ---
# name: bmad-orchestrator
# description: ...
# ---
```

### Issue: Workflow Files Not Found

**Check:**
1. SMAD_METHOD in project root?
   ```bash
   ls SMAD_METHOD/workflows/orchestrate-full/
   ```

2. Paths use `{project-root}` variable?
   ```bash
   grep "project-root" SMAD_METHOD/workflows/orchestrate-full/workflow.yaml
   ```

**Fix:**
```bash
# Ensure SMAD_METHOD at project root
pwd
ls -la | grep SMAD_METHOD

# Verify workflow.yaml paths
cat SMAD_METHOD/workflows/orchestrate-full/workflow.yaml | grep installed_path
```

### Issue: Agent Not Loading

**Check:**
1. Agent YAML valid?
   ```bash
   yamllint SMAD_METHOD/agents/orchestrator.agent.yaml
   ```

2. Agent registered in manifest?
   ```bash
   grep orchestrator bmad/_cfg/agent-manifest.csv
   ```

**Fix:**
```bash
# Validate YAML syntax
python3 -c "import yaml; yaml.safe_load(open('SMAD_METHOD/agents/orchestrator.agent.yaml'))"

# Add to manifest if missing
echo 'orchestrator,BMAD Orchestrator,Workflow Orchestration Master,🎭,smad,...' >> bmad/_cfg/agent-manifest.csv
```

### Issue: Configuration Not Loading

**Check:**
1. Config files exist?
   ```bash
   ls bmad/bmm/config.yaml
   ls bmad/cis/config.yaml
   ```

2. Config files valid YAML?
   ```bash
   yamllint bmad/bmm/config.yaml
   ```

**Fix:**
```bash
# Verify config format
cat bmad/bmm/config.yaml

# Ensure required fields present:
# - project_name
# - output_folder
# - user_name
```

### Issue: Output Folder Permissions

**Check:**
```bash
# Test write access
touch output/test.txt
rm output/test.txt
```

**Fix:**
```bash
# Create folder with permissions
mkdir -p output/your-project
chmod -R 755 output/

# Verify
ls -la output/
```

---

## Installation Checklist

Use this checklist to verify complete installation:

- [ ] BMAD Core installed and working
- [ ] BMAD CIS module available
- [ ] BMAD BMM module available
- [ ] SMAD_METHOD folder copied to project root
- [ ] Skills installed (user-level or project-level)
- [ ] Orchestrator agent available
- [ ] Workflows accessible
- [ ] BMM config.yaml configured
- [ ] CIS config.yaml configured
- [ ] Output folder created with permissions
- [ ] Skills appear in Claude Code
- [ ] Test orchestration runs successfully

---

## Next Steps

After installation:

1. **Read Documentation:**
   - [README.md](../README.md) - Overview and quick start
   - [REFERENCE.md](REFERENCE.md) - Detailed reference
   - [EXAMPLES.md](EXAMPLES.md) - Usage examples

2. **Run Test Orchestration:**
   ```bash
   # Start simple test project
   claude bmad-orchestrator
   # Follow prompts with test data
   ```

3. **Explore Modes:**
   - Try automated mode for speed
   - Try interactive mode for learning

4. **Review Outputs:**
   - Check generated files in output folder
   - Review orchestration summary
   - Examine workflow status

5. **Customize:**
   - Adjust agent persona if needed
   - Configure workflow preferences
   - Set up project-specific overrides

---

## Support

For installation issues:

1. Check troubleshooting section above
2. Review BMAD documentation
3. Verify prerequisites
4. Check file permissions
5. Validate YAML syntax

For questions:
- Consult REFERENCE.md for detailed info
- Review EXAMPLES.md for usage patterns
- Check BMAD community resources

---

**Installation complete! Ready to orchestrate!** 🎭
