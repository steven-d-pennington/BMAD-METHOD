# BMAD Workflow Orchestrator

**Version:** 1.0.0
**Mode:** Automated Orchestration
**Orchestrator:** BMAD Master

---

## Orchestration Overview

This orchestrator automates the complete BMAD workflow from ideation through implementation. It follows the prescribed sequence of workflows, routes to the correct agents, and injects context at appropriate points.

**Workflow Sequence:**
```
Phase 0: Ideation (Interactive)
  → CIS Brainstorming
  → Problem Solving (if needed)

Phase 1: Analysis (Interactive/Guided)
  → Research
  → Product Brief
  → Domain Research (if needed)

Phase 2: Planning (Automated)
  → Workflow Init (track selection)
  → PRD Creation
  → Epic & Story Breakdown

Phase 3: Solutioning (Facilitated)
  → Architecture
  → Solutioning Gate Check

Phase 4: Implementation (Automated Loop)
  → Sprint Planning
  → For Each Epic:
      → Epic Tech Context
      → For Each Story:
          → Story Context
          → Develop Story
          → Code Review
          → Story Done
      → Epic Retrospective
```

---

<workflow>

<step n="1" goal="Initialize orchestration" tag="orchestration-init">
  <action>Display orchestrator welcome message</action>
  <action>Explain complete workflow sequence</action>
  <action>Load project configuration from {config_source}</action>
  <action>Initialize output folder: {output_folder}</action>
  <action>Set orchestration start time: {orchestration_start_time}</action>

  <ask>
    Project Name: {project_name}
    Output Folder: {output_folder}

    I'm the BMAD Orchestration Master, ready to guide your project from ideation to implementation.

    This orchestration will:
    1. **Ideation Phase**: Interactive brainstorming and problem-solving
    2. **Analysis Phase**: Research and product brief creation
    3. **Planning Phase**: PRD and epic/story breakdown
    4. **Solutioning Phase**: Architecture and technical decisions
    5. **Implementation Phase**: Automated sprint execution

    Would you like to:
    [A] Run complete orchestration (all phases)
    [I] Select specific phases to run
    [S] Skip ideation (have existing analysis)
    [Q] Quick mode (minimal ideation)

    Your choice?
  </ask>

  <check if="choice == 'S'">
    <goto step="10">Skip to planning phase</goto>
  </check>

  <check if="choice == 'Q'">
    <action>Set ideation_mode = "quick"</action>
  </check>

  <check if="choice == 'I'">
    <ask>Which phases would you like to run? (Select all that apply)
    - Ideation (CIS brainstorming)
    - Analysis (research, product brief)
    - Planning (PRD, epics)
    - Solutioning (architecture)
    - Implementation (sprints)
    </ask>
    <action>Store phase selections</action>
  </check>
</step>

<step n="2" goal="Gather project requirements" tag="requirements-gathering">
  <ask>
    Let's gather some information about your project:

    1. **Project Description**: What are you building? (Brief overview)
  </ask>

  <action>Store project description</action>

  <ask>
    2. **Project Complexity**:
       - Level 1: Simple feature/bug fix (1-15 stories)
       - Level 2: Standard product/feature (10-50 stories)
       - Level 3: Enterprise/complex platform (30+ stories)

    What level is your project?
  </ask>

  <action>Store project_level (1, 2, or 3)</action>

  <ask>
    3. **Existing Materials**: Do you have any existing:
       - Research documents?
       - Product requirements?
       - Technical specifications?
       - Architecture documents?

    (This helps determine starting phase)
  </ask>

  <action>Store existing materials information</action>
</step>

<step n="3" goal="Create orchestration status file" tag="status-init">
  <action>Create {status_file} with structure:</action>
  <action>
    metadata:
      project_name: {project_name}
      project_level: {project_level}
      planning_track: to-be-determined
      current_phase: 0
      created_date: {date}
      orchestration_mode: automated
      orchestrator_version: {orchestrator_version}
      start_time: {orchestration_start_time}

    workflow_status:
      # Will be populated as workflows complete

    context_files:
      # Will track all output files

    implementation_status:
      current_epic: null
      current_story: null
      completed_epics: []
      completed_stories: []
  </action>

  <action>Display: Orchestration initialized. Status tracking: {status_file}</action>
</step>

<step n="4" goal="Phase 0: Ideation - CIS Brainstorming" tag="phase-ideation-brainstorm">
  <action>Update status: current_phase = 0</action>

  <action>Display:
    ═══════════════════════════════════════════════════════════
    PHASE 0: IDEATION - BRAINSTORMING
    ═══════════════════════════════════════════════════════════

    Let's start by exploring your project idea through structured brainstorming.
    I'll invoke the CIS Brainstorming workflow with Carson, the Elite Brainstorming Specialist.
  </action>

  <invoke-workflow path="{core_brainstorming}" data="">
    **CIS Brainstorming Workflow**

    Carson will guide you through interactive brainstorming using 36+ proven techniques across 7 categories:
    - Collaborative (Brainwriting, Round Robin, etc.)
    - Structured (SCAMPER, Morphological Analysis, etc.)
    - Creative (Random Word, Provocation, etc.)
    - Deep (First Principles, Systems Thinking, etc.)
    - Theatrical (Role Playing, Scenario Planning, etc.)
    - Wild (Crazy 8s, Worst Idea, etc.)
    - Introspective (Solo Brainstorming, Mind Mapping, etc.)

    Output: brainstorming-session-results.md
  </invoke-workflow>

  <action>Update status: workflow_status.brainstorming = "{output_folder}/brainstorming-session-results.md"</action>
  <action>Update status: context_files.brainstorming = "{output_folder}/brainstorming-session-results.md"</action>

  <action>Display: ✓ Brainstorming complete. Insights captured.</action>
</step>

<step n="5" goal="Phase 0: Ideation - Problem Solving (Optional)" tag="phase-ideation-problem-solving" optional="true">
  <ask>
    Your brainstorming session revealed valuable insights.

    Would you like to dive deeper into problem-solving frameworks?
    Dr. Quinn can guide you through:
    - TRIZ (Theory of Inventive Problem Solving)
    - Theory of Constraints
    - Root Cause Analysis
    - Systems Thinking

    [Y] Yes, run problem-solving session
    [N] No, proceed to analysis
  </ask>

  <check if="choice == 'Y'">
    <action>Display: Invoking CIS Problem-Solving workflow with Dr. Quinn...</action>

    <invoke-workflow path="{problem_solving}" data="{output_folder}/brainstorming-session-results.md">
      **CIS Problem-Solving Workflow**

      Dr. Quinn will help you systematically analyze challenges and develop innovative solutions
      using proven problem-solving methodologies.

      Input Context: Brainstorming results
      Output: problem-solving-results.md
    </invoke-workflow>

    <action>Update status: workflow_status.problem_solving = "{output_folder}/problem-solving-results.md"</action>
    <action>Update status: context_files.problem_solving = "{output_folder}/problem-solving-results.md"</action>

    <action>Display: ✓ Problem-solving complete.</action>
  </check>
</step>

<step n="6" goal="Phase 1: Analysis - Research" tag="phase-analysis-research">
  <action>Update status: current_phase = 1</action>

  <action>Display:
    ═══════════════════════════════════════════════════════════
    PHASE 1: ANALYSIS - RESEARCH
    ═══════════════════════════════════════════════════════════

    Now let's conduct research to inform your product strategy.
    The Analyst will help gather market, technical, or domain-specific insights.
  </action>

  <ask>
    What type of research would you like to conduct?

    [M] Market Research - Competitors, trends, opportunities
    [T] Technical Research - Technologies, frameworks, patterns
    [D] Deep Prompt Research - Comprehensive multi-angle analysis
    [S] Skip research - Have sufficient information

    Your choice?
  </ask>

  <check if="choice == 'M' OR choice == 'T' OR choice == 'D'">
    <action if="choice == 'M'">Set research_type = "market"</action>
    <action if="choice == 'T'">Set research_type = "technical"</action>
    <action if="choice == 'D'">Set research_type = "deep-prompt"</action>

    <action>Prepare context file with brainstorming and problem-solving results</action>

    <invoke-workflow path="{research}" data="{output_folder}/brainstorming-session-results.md">
      **BMM Research Workflow**

      The Analyst will conduct {research_type} research using web search and analysis techniques.

      Input Context: Ideation results
      Output: research-{research_type}.md
    </invoke-workflow>

    <action>Update status: workflow_status.research = "{output_folder}/research-{research_type}.md"</action>
    <action>Update status: context_files.research = "{output_folder}/research-{research_type}.md"</action>

    <action>Display: ✓ Research complete. Findings documented.</action>
  </check>
</step>

<step n="7" goal="Phase 1: Analysis - Product Brief" tag="phase-analysis-product-brief">
  <action>Display:
    ═══════════════════════════════════════════════════════════
    PHASE 1: ANALYSIS - PRODUCT BRIEF
    ═══════════════════════════════════════════════════════════

    Let's synthesize your ideation and research into a strategic product brief.
    This will define your vision, strategy, and success metrics.
  </action>

  <action>Gather context files:</action>
  <action>- Brainstorming results: {context_files.brainstorming}</action>
  <action if="exists(context_files.problem_solving)">- Problem-solving results: {context_files.problem_solving}</action>
  <action if="exists(context_files.research)">- Research findings: {context_files.research}</action>

  <action>Prepare consolidated context for product brief</action>

  <invoke-workflow path="{product_brief}" data="{output_folder}/brainstorming-session-results.md">
    **BMM Product Brief Workflow**

    The PM/Analyst will create a comprehensive product brief including:
    - Product vision and mission
    - Target users and personas
    - Market opportunity
    - Success metrics and KPIs
    - Strategic positioning

    Input Context: All ideation and research outputs
    Output: product-brief.md
  </invoke-workflow>

  <action>Update status: workflow_status.product_brief = "{output_folder}/product-brief.md"</action>
  <action>Update status: context_files.product_brief = "{output_folder}/product-brief.md"</action>

  <action>Display: ✓ Product brief complete. Vision documented.</action>
</step>

<step n="8" goal="Phase 1: Analysis - Domain Research (Optional)" tag="phase-analysis-domain" optional="true">
  <ask>
    Does your project involve:
    - Regulated industries (healthcare, finance, legal)?
    - Complex technical domains (AI/ML, blockchain, etc.)?
    - Specialized business domains requiring deep expertise?

    [Y] Yes, conduct domain research
    [N] No, proceed to planning

    Your choice?
  </ask>

  <check if="choice == 'Y'">
    <action>Display: Invoking Domain Research workflow...</action>

    <invoke-workflow path="{domain_research}" data="{output_folder}/product-brief.md">
      **BMM Domain Research Workflow**

      The Analyst will guide you through collaborative domain exploration to understand:
      - Domain-specific constraints and requirements
      - Regulatory and compliance considerations
      - Industry best practices and standards
      - Specialized terminology and concepts

      Input Context: Product brief
      Output: domain-brief.md
    </invoke-workflow>

    <action>Update status: workflow_status.domain_research = "{output_folder}/domain-brief.md"</action>
    <action>Update status: context_files.domain_research = "{output_folder}/domain-brief.md"</action>

    <action>Display: ✓ Domain research complete.</action>
  </check>
</step>

<step n="9" goal="Determine planning track" tag="planning-track-selection">
  <action>Display:
    ═══════════════════════════════════════════════════════════
    PLANNING TRACK SELECTION
    ═══════════════════════════════════════════════════════════

    Based on your project level ({project_level}), I'll recommend a planning track.
  </action>

  <action>Analyze project_level and project description</action>

  <check if="project_level == 1">
    <action>Set recommended_track = "quick-flow"</action>
    <action>Display:
      **Recommendation: Quick Flow Track**
      - Best for: Simple features, bug fixes, clear scope
      - Workflows: Tech Spec → Implementation
      - Time: Hours to 1 day
    </action>
  </check>

  <check if="project_level == 2">
    <action>Set recommended_track = "bmad-method"</action>
    <action>Display:
      **Recommendation: BMad Method Track**
      - Best for: Products, platforms, complex features
      - Workflows: PRD → Epics → Architecture → Implementation
      - Time: 1-3 days
    </action>
  </check>

  <check if="project_level == 3">
    <action>Set recommended_track = "enterprise"</action>
    <action>Display:
      **Recommendation: Enterprise Method Track**
      - Best for: Enterprise requirements, compliance, multi-tenant
      - Workflows: PRD → Epics → Extended Architecture → Implementation
      - Time: 3-7 days
    </action>
  </check>

  <ask>
    Accept recommended track ({recommended_track})?

    [Y] Yes, use {recommended_track}
    [Q] Use Quick Flow instead
    [B] Use BMad Method instead
    [E] Use Enterprise Method instead

    Your choice?
  </ask>

  <action if="choice == 'Q'">Set planning_track = "quick-flow"</action>
  <action if="choice == 'B'">Set planning_track = "bmad-method"</action>
  <action if="choice == 'E'">Set planning_track = "enterprise"</action>
  <action if="choice == 'Y'">Set planning_track = {recommended_track}</action>

  <action>Update status: metadata.planning_track = {planning_track}</action>
  <action>Display: Planning track selected: {planning_track}</action>
</step>

<step n="10" goal="Phase 2: Planning - Initialize Workflow Status" tag="phase-planning-init">
  <action>Update status: current_phase = 2</action>

  <action>Display:
    ═══════════════════════════════════════════════════════════
    PHASE 2: PLANNING
    ═══════════════════════════════════════════════════════════

    Initializing {planning_track} planning workflow...
  </action>

  <invoke-workflow path="{workflow_init}" data="{output_folder}/product-brief.md">
    **BMM Workflow Init**

    The PM will initialize workflow status tracking and set up the planning sequence.

    Input Context: Product brief and analysis outputs
    Output: bmm-workflow-status.yaml (updated)
  </invoke-workflow>

  <action>Update status: workflow_status.workflow_init = "completed"</action>
  <action>Display: ✓ Workflow tracking initialized.</action>
</step>

<step n="11" goal="Phase 2: Planning - PRD or Tech Spec" tag="phase-planning-document">
  <check if="planning_track == 'quick-flow'">
    <action>Display: Creating Technical Specification for Quick Flow...</action>

    <invoke-workflow path="{tech_spec}" data="{output_folder}/product-brief.md">
      **BMM Tech Spec Workflow**

      The PM will create a technical specification including:
      - Technical requirements
      - Implementation approach
      - Story breakdown
      - Acceptance criteria

      Input Context: Product brief
      Output: tech-spec.md
    </invoke-workflow>

    <action>Update status: workflow_status.tech_spec = "{output_folder}/tech-spec.md"</action>
    <action>Update status: context_files.tech_spec = "{output_folder}/tech-spec.md"</action>
    <action>Display: ✓ Tech spec complete.</action>

    <goto step="15">Skip to solutioning</goto>
  </check>

  <check if="planning_track == 'bmad-method' OR planning_track == 'enterprise'">
    <action>Display: Creating Product Requirements Document...</action>

    <action>Gather all analysis context:</action>
    <action>- Product brief: {context_files.product_brief}</action>
    <action if="exists(context_files.research)">- Research: {context_files.research}</action>
    <action if="exists(context_files.domain_research)">- Domain research: {context_files.domain_research}</action>

    <invoke-workflow path="{prd}" data="{output_folder}/product-brief.md">
      **BMM PRD Workflow** (with child: create-epics-and-stories)

      The PM will create a comprehensive PRD including:
      - Product overview and vision
      - User stories and personas
      - Functional and non-functional requirements
      - Success criteria and metrics

      Then automatically invoke child workflow to:
      - Break PRD into epics
      - Break epics into user stories
      - Define acceptance criteria

      Input Context: Product brief and all analysis outputs
      Outputs:
        - PRD.md
        - epics.md (from child workflow)
    </invoke-workflow>

    <action>Update status: workflow_status.prd = "{output_folder}/PRD.md"</action>
    <action>Update status: workflow_status.create_epics_and_stories = "{output_folder}/epics.md"</action>
    <action>Update status: context_files.prd = "{output_folder}/PRD.md"</action>
    <action>Update status: context_files.epics = "{output_folder}/epics.md"</action>

    <action>Display: ✓ PRD and epic/story breakdown complete.</action>
  </check>
</step>

<step n="12" goal="Phase 3: Solutioning - Architecture" tag="phase-solutioning-architecture">
  <action>Update status: current_phase = 3</action>

  <action>Display:
    ═══════════════════════════════════════════════════════════
    PHASE 3: SOLUTIONING - ARCHITECTURE
    ═══════════════════════════════════════════════════════════

    Now let's define the technical architecture for your project.
    Winston, the System Architect, will facilitate key architectural decisions.
  </action>

  <action>Prepare architecture context:</action>
  <action if="exists(context_files.prd)">- PRD: {context_files.prd}</action>
  <action if="exists(context_files.epics)">- Epics: {context_files.epics}</action>
  <action if="exists(context_files.tech_spec)">- Tech Spec: {context_files.tech_spec}</action>

  <invoke-workflow path="{architecture}" data="{context_files.prd}">
    **BMM Architecture Workflow**

    Winston will facilitate collaborative architectural decision-making:
    - System architecture and components
    - Technology stack selection (with version verification)
    - Data architecture and patterns
    - Integration architecture
    - Security and scalability considerations
    - Starter template evaluation (if applicable)

    This is an interactive, decision-focused workflow rather than template-driven.

    Input Context: PRD and epics
    Output: architecture.md
  </invoke-workflow>

  <action>Update status: workflow_status.architecture = "{output_folder}/architecture.md"</action>
  <action>Update status: context_files.architecture = "{output_folder}/architecture.md"</action>

  <action>Display: ✓ Architecture complete. Technical decisions documented.</action>
</step>

<step n="13" goal="Phase 3: Solutioning - Gate Check (Optional)" tag="phase-solutioning-gate" optional="true">
  <check if="planning_track == 'enterprise'">
    <action>Display: Running Solutioning Gate Check for Enterprise track...</action>

    <invoke-workflow path="{solutioning_gate}" data="{output_folder}/architecture.md">
      **BMM Solutioning Gate Check**

      Winston will validate that planning and solutioning are complete before implementation:
      - PRD completeness
      - Epic/story readiness
      - Architecture decisions finalized
      - Implementation readiness

      Input Context: All planning and solutioning outputs
      Output: implementation-readiness-report.md
    </invoke-workflow>

    <action>Update status: workflow_status.solutioning_gate_check = "{output_folder}/implementation-readiness-report.md"</action>
    <action>Display: ✓ Solutioning gate check passed.</action>
  </check>
</step>

<step n="14" goal="Phase 4: Implementation - Sprint Planning" tag="phase-implementation-sprint-planning">
  <action>Update status: current_phase = 4</action>

  <action>Display:
    ═══════════════════════════════════════════════════════════
    PHASE 4: IMPLEMENTATION - SPRINT PLANNING
    ═══════════════════════════════════════════════════════════

    Let's initialize sprint planning and prepare for implementation.
    The Scrum Master will organize epics and stories into sprint structure.
  </action>

  <action>Prepare sprint planning context:</action>
  <action>- Epics: {context_files.epics}</action>
  <action>- Architecture: {context_files.architecture}</action>

  <invoke-workflow path="{sprint_planning}" data="{context_files.epics}">
    **BMM Sprint Planning Workflow**

    The Scrum Master will:
    - Analyze epic and story breakdown
    - Determine sprint structure
    - Prioritize implementation order
    - Create sprint status tracking file

    Input Context: Epics and architecture
    Output: sprint-status.yaml
  </invoke-workflow>

  <action>Update status: workflow_status.sprint_planning = "{output_folder}/sprint-status.yaml"</action>
  <action>Load sprint-status.yaml to get epic list and story counts</action>

  <action>Display: ✓ Sprint planning complete. Ready for implementation.</action>
  <action>Display:
    Epic Summary:
    {list_all_epics_with_story_counts}

    Beginning implementation loop...
  </action>
</step>

<step n="15" goal="Phase 4: Implementation - Epic Loop" tag="phase-implementation-epic-loop">
  <action>Load sprint-status.yaml</action>
  <action>Get list of all epics</action>
  <action>Initialize epic_index = 0</action>

  <action>Display: Starting epic implementation loop...</action>
</step>

<step n="16" goal="Process Epic: Tech Context" tag="epic-tech-context" repeat="for-each-epic">
  <action>Get current epic from sprint-status.yaml at epic_index</action>
  <action>Set current_epic = epic</action>

  <check if="current_epic == null">
    <action>Display: All epics complete!</action>
    <goto step="21">Jump to completion</goto>
  </check>

  <action>Update status: implementation_status.current_epic = {current_epic.id}</action>

  <action>Display:
    ───────────────────────────────────────────────────────────
    EPIC {epic_index + 1}: {current_epic.name}
    ───────────────────────────────────────────────────────────
    Stories: {current_epic.story_count}

    Generating epic technical context...
  </action>

  <invoke-workflow path="{epic_tech_context}" data="{context_files.epics}">
    **BMM Epic Tech Context Workflow**

    The Scrum Master will generate comprehensive technical context for this epic:
    - Relevant PRD sections for this epic
    - Architecture decisions applicable to epic
    - Technical patterns and approaches
    - Implementation guidance

    Input Context: PRD, Architecture, Epic definition
    Output: tech-spec-epic-{current_epic.id}.md
  </invoke-workflow>

  <action>Set epic_tech_context_file = "{output_folder}/tech-spec-epic-{current_epic.id}.md"</action>
  <action>Update status: context_files.epic_{current_epic.id}_context = {epic_tech_context_file}</action>

  <action>Display: ✓ Epic tech context generated.</action>
</step>

<step n="17" goal="Process Epic: Story Loop" tag="epic-story-loop" repeat="for-each-epic">
  <action>Get stories for current epic from sprint-status.yaml</action>
  <action>Initialize story_index = 0</action>

  <action>Display: Processing {current_epic.story_count} stories for {current_epic.name}...</action>
</step>

<step n="18" goal="Process Story: Full Development Cycle" tag="story-development-cycle" repeat="for-each-story">
  <action>Get current story from epic's story list at story_index</action>
  <action>Set current_story = story</action>

  <check if="current_story == null">
    <action>Display: All stories for {current_epic.name} complete!</action>
    <goto step="20">Jump to epic retrospective</goto>
  </check>

  <action>Update status: implementation_status.current_story = {current_story.key}</action>

  <action>Display:
    Story {story_index + 1}/{current_epic.story_count}: {current_story.key}
    {current_story.title}
  </action>

  <!-- Create Story -->
  <invoke-workflow path="{create_story}" data="{epic_tech_context_file}">
    **BMM Create Story Workflow**

    The Scrum Master creates the story file with:
    - Story details and acceptance criteria
    - Epic context reference
    - Story status initialization

    Input Context: Epic tech context
    Output: {current_story.key}.md
  </invoke-workflow>

  <action>Set story_file = "{output_folder}/{current_story.key}.md"</action>

  <!-- Story Context -->
  <invoke-workflow path="{story_context}" data="{story_file}">
    **BMM Story Context Workflow**

    The Scrum Master generates comprehensive story context XML:
    - PRD excerpt relevant to this story
    - Architecture decisions for this story
    - Epic context
    - Prior story context (for pattern consistency)
    - Code references from existing implementation

    Input Context: Story file, PRD, Architecture, Epic context, Prior stories
    Output: {current_story.key}.context.xml
  </invoke-workflow>

  <action>Set story_context_file = "{output_folder}/{current_story.key}.context.xml"</action>
  <action>Display: ✓ Story context generated.</action>

  <!-- Develop Story -->
  <action>Display: Implementing {current_story.key}...</action>

  <invoke-workflow path="{develop_story}" data="{story_context_file}">
    **BMM Develop Story Workflow**

    Amelia (Senior Dev) will implement the story using context as single source of truth:
    - Implement all functionality per acceptance criteria
    - Write comprehensive tests
    - Follow architecture patterns
    - Refuse to invent solutions not in context
    - Document implementation decisions

    Input Context: Story context XML (authoritative)
    Output: Working code implementation
  </invoke-workflow>

  <action>Display: ✓ Story implementation complete.</action>

  <!-- Code Review -->
  <action>Display: Running code review for {current_story.key}...</action>

  <invoke-workflow path="{code_review}" data="{story_file}">
    **BMM Code Review Workflow**

    Senior Dev performs comprehensive code review:
    - Verify acceptance criteria met
    - Check code quality and patterns
    - Validate tests and coverage
    - Ensure architecture compliance
    - Identify potential issues

    Input Context: Story requirements, Implementation
    Output: code-review-{current_story.key}.md
  </invoke-workflow>

  <action>Set code_review_file = "{output_folder}/code-review-{current_story.key}.md"</action>
  <action>Display: ✓ Code review complete.</action>

  <!-- Story Done -->
  <invoke-workflow path="{story_done}" data="{story_file}">
    **BMM Story Done Workflow**

    Mark story as complete:
    - Update sprint status
    - Record completion
    - Advance story queue

    Input Context: Story file, Code review
    Output: Updated sprint-status.yaml
  </invoke-workflow>

  <action>Update status: implementation_status.completed_stories += [{current_story.key}]</action>
  <action>Display: ✓ Story {current_story.key} done!</action>

  <action>Increment story_index</action>
  <goto step="18">Next story</goto>
</step>

<step n="19" goal="Epic Retrospective" tag="epic-retrospective" repeat="for-each-epic">
  <action>Display:
    ═══════════════════════════════════════════════════════════
    EPIC RETROSPECTIVE: {current_epic.name}
    ═══════════════════════════════════════════════════════════

    All stories complete for this epic. Let's conduct a retrospective.
  </action>

  <invoke-workflow path="{epic_retrospective}" data="{epic_tech_context_file}">
    **BMM Epic Retrospective Workflow**

    The Scrum Master facilitates retrospective discussion:
    - What went well?
    - What could be improved?
    - Lessons learned for next epic
    - Process adjustments needed
    - Technical insights gained

    This is an INTERACTIVE workflow requiring your participation.

    Input Context: Epic context, completed stories
    Output: retrospective-epic-{current_epic.id}.md
  </invoke-workflow>

  <action>Set retrospective_file = "{output_folder}/retrospective-epic-{current_epic.id}.md"</action>
  <action>Update status: workflow_status.epic_{current_epic.id}_retrospective = {retrospective_file}</action>
  <action>Update status: implementation_status.completed_epics += [{current_epic.id}]</action>

  <action>Display: ✓ Epic {current_epic.name} complete with retrospective!</action>

  <action>Increment epic_index</action>
  <goto step="16">Next epic</goto>
</step>

<step n="20" goal="Orchestration Complete" tag="orchestration-complete">
  <action>Update status: current_phase = "complete"</action>
  <action>Set orchestration_end_time = system-generated</action>

  <action>Display:
    ═══════════════════════════════════════════════════════════
    🎉 ORCHESTRATION COMPLETE! 🎉
    ═══════════════════════════════════════════════════════════

    Your project has been orchestrated from ideation through implementation!
  </action>

  <action>Generate orchestration summary with:
    - All workflow outputs
    - Epic and story completion stats
    - Key decisions made
    - Retrospective highlights
    - Total orchestration time
  </action>

  <template-output>
# BMAD Orchestration Summary

**Project:** {project_name}
**Planning Track:** {planning_track}
**Orchestration Mode:** Automated
**Start Time:** {orchestration_start_time}
**End Time:** {orchestration_end_time}

---

## Orchestration Phases Completed

### Phase 0: Ideation
- ✓ CIS Brainstorming: {context_files.brainstorming}
- ✓ Problem Solving: {context_files.problem_solving} (if exists)

### Phase 1: Analysis
- ✓ Research: {context_files.research}
- ✓ Product Brief: {context_files.product_brief}
- ✓ Domain Research: {context_files.domain_research} (if exists)

### Phase 2: Planning
- ✓ PRD: {context_files.prd}
- ✓ Epics & Stories: {context_files.epics}

### Phase 3: Solutioning
- ✓ Architecture: {context_files.architecture}

### Phase 4: Implementation
- ✓ Sprint Planning: Completed
- ✓ Epics Implemented: {count(completed_epics)}
- ✓ Stories Completed: {count(completed_stories)}
- ✓ Epic Retrospectives: {count(retrospective_files)}

---

## Implementation Statistics

**Total Epics:** {total_epic_count}
**Total Stories:** {total_story_count}
**Completed Epics:** {completed_epic_count}
**Completed Stories:** {completed_story_count}

### Epic Breakdown
{list_each_epic_with_story_count_and_retrospective}

---

## Key Artifacts

### Ideation & Analysis
1. Brainstorming Results: `{context_files.brainstorming}`
2. Product Brief: `{context_files.product_brief}`
3. Research: `{context_files.research}`

### Planning & Solutioning
4. PRD: `{context_files.prd}`
5. Epics & Stories: `{context_files.epics}`
6. Architecture: `{context_files.architecture}`

### Implementation
7. Sprint Status: `sprint-status.yaml`
8. Story Context Files: `{count(story_context_files)} generated`
9. Code Review Reports: `{count(code_review_files)} completed`
10. Epic Retrospectives: `{retrospective_files}`

---

## Retrospective Highlights

{aggregate_key_learnings_from_all_retrospectives}

---

## Next Steps

Your project is now fully implemented! Consider:

1. **Deployment Planning**: Plan production deployment
2. **Documentation**: Generate user and technical documentation
3. **Testing**: Conduct end-to-end testing
4. **Demo Preparation**: Prepare demo for stakeholders
5. **Maintenance Planning**: Set up monitoring and support processes

---

## Orchestration Metadata

- **Status File:** `{status_file}`
- **Output Folder:** `{output_folder}`
- **Orchestrator Version:** {orchestrator_version}
- **Total Duration:** {calculate_duration(start_time, end_time)}

**Orchestrated by:** BMAD Orchestration Master
**Framework:** BMAD Method v6.0.0-alpha.7

---

*Generated by SMAD (Streamlined MAD) Orchestrator*
  </template-output>

  <action>Save orchestration summary to: {output_folder}/orchestration-summary.md</action>

  <action>Display:
    ✓ Orchestration summary saved: {output_folder}/orchestration-summary.md

    All workflows executed successfully!
    Review outputs in: {output_folder}

    Thank you for using BMAD Orchestration! 🎭
  </action>
</step>

</workflow>
