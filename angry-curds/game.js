// Matter.js module aliases
const { Engine, Render, Runner, World, Bodies, Body, Events, Constraint, Composite, Mouse, MouseConstraint } = Matter;

// Game configuration
const CONFIG = {
    width: 1100,
    height: 600,
    gravity: 1,
    slingshotPosition: { x: 150, y: 400 },
    slingshotLength: 100,
    maxCurds: 3
};

// Game state
let gameState = {
    engine: null,
    render: null,
    world: null,
    currentCurd: null,
    slingshotConstraint: null,
    isLaunched: false,
    curdsUsed: 0,
    score: 0,
    level: 1,
    mice: [],
    structures: [],
    ground: null,
    walls: [],
    slingshot: null
};

// Initialize the game
function init() {
    // Create engine
    gameState.engine = Engine.create();
    gameState.world = gameState.engine.world;
    gameState.engine.world.gravity.y = CONFIG.gravity;

    // Create renderer
    const canvas = document.getElementById('gameCanvas');
    gameState.render = Render.create({
        canvas: canvas,
        engine: gameState.engine,
        options: {
            width: CONFIG.width,
            height: CONFIG.height,
            wireframes: false,
            background: '#87CEEB'
        }
    });

    Render.run(gameState.render);
    const runner = Runner.create();
    Runner.run(runner, gameState.engine);

    // Setup mouse control
    setupMouseControl();

    // Create game world
    createWorld();
    createLevel(gameState.level);

    // Setup event listeners
    setupEventListeners();

    // Update UI
    updateUI();
}

function setupMouseControl() {
    const mouse = Mouse.create(gameState.render.canvas);
    const mouseConstraint = MouseConstraint.create(gameState.engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: { visible: false }
        }
    });

    World.add(gameState.world, mouseConstraint);
    gameState.render.mouse = mouse;

    // Handle drag events for slingshot
    Events.on(mouseConstraint, 'startdrag', function(event) {
        if (event.body === gameState.currentCurd && !gameState.isLaunched) {
            gameState.isDragging = true;
        }
    });

    Events.on(mouseConstraint, 'enddrag', function(event) {
        if (event.body === gameState.currentCurd && !gameState.isLaunched) {
            launchCurd();
        }
    });
}

function createWorld() {
    // Ground
    gameState.ground = Bodies.rectangle(CONFIG.width / 2, CONFIG.height - 25, CONFIG.width, 50, {
        isStatic: true,
        render: {
            fillStyle: '#8B4513'
        },
        label: 'ground'
    });

    // Walls (invisible boundaries)
    const leftWall = Bodies.rectangle(-25, CONFIG.height / 2, 50, CONFIG.height, {
        isStatic: true,
        render: { visible: false }
    });

    const rightWall = Bodies.rectangle(CONFIG.width + 25, CONFIG.height / 2, 50, CONFIG.height, {
        isStatic: true,
        render: { visible: false }
    });

    gameState.walls = [leftWall, rightWall];
    World.add(gameState.world, [gameState.ground, ...gameState.walls]);

    // Slingshot base
    const slingshotBase = Bodies.rectangle(
        CONFIG.slingshotPosition.x,
        CONFIG.slingshotPosition.y + 30,
        20,
        60,
        {
            isStatic: true,
            render: {
                fillStyle: '#8B4513'
            }
        }
    );

    gameState.slingshot = slingshotBase;
    World.add(gameState.world, slingshotBase);
}

function createLevel(level) {
    // Clear existing structures and mice
    gameState.structures.forEach(structure => World.remove(gameState.world, structure));
    gameState.mice.forEach(mouse => World.remove(gameState.world, mouse));
    gameState.structures = [];
    gameState.mice = [];

    // Position for structures (right side of screen)
    const baseX = 700;
    const baseY = CONFIG.height - 75;

    if (level === 1) {
        // Simple tower with one mouse on top
        createTower(baseX, baseY, 3, 1);
    } else if (level === 2) {
        // Two towers with mice
        createTower(baseX - 100, baseY, 4, 1);
        createTower(baseX + 100, baseY, 3, 1);
    } else {
        // Complex structure with multiple mice
        createTower(baseX - 150, baseY, 5, 2);
        createTower(baseX + 50, baseY, 4, 1);
        createPlatform(baseX, baseY - 200, 2);
    }

    // Create new curd
    createCurd();
    gameState.curdsUsed = 0;
    updateUI();
}

function createTower(x, y, height, numMice) {
    const blockWidth = 60;
    const blockHeight = 20;

    // Build tower
    for (let i = 0; i < height; i++) {
        const block = Bodies.rectangle(x, y - i * blockHeight, blockWidth, blockHeight, {
            density: 0.001,
            friction: 0.8,
            render: {
                fillStyle: i % 2 === 0 ? '#FFD700' : '#FFA500'
            },
            label: 'block'
        });
        gameState.structures.push(block);
        World.add(gameState.world, block);
    }

    // Place mice on top
    for (let i = 0; i < numMice; i++) {
        const mouse = Bodies.circle(
            x + (i * 30) - (numMice * 15) + 15,
            y - height * blockHeight - 20,
            15,
            {
                density: 0.002,
                friction: 0.5,
                render: {
                    fillStyle: '#808080'
                },
                label: 'mouse'
            }
        );
        gameState.mice.push(mouse);
        World.add(gameState.world, mouse);
    }
}

function createPlatform(x, y, numMice) {
    const blockWidth = 100;
    const blockHeight = 20;

    const platform = Bodies.rectangle(x, y, blockWidth, blockHeight, {
        density: 0.001,
        friction: 0.8,
        render: {
            fillStyle: '#8B4513'
        },
        label: 'block'
    });
    gameState.structures.push(platform);
    World.add(gameState.world, platform);

    // Place mice on platform
    for (let i = 0; i < numMice; i++) {
        const mouse = Bodies.circle(x + (i * 30) - (numMice * 15) + 15, y - 20, 15, {
            density: 0.002,
            friction: 0.5,
            render: {
                fillStyle: '#808080'
            },
            label: 'mouse'
        });
        gameState.mice.push(mouse);
        World.add(gameState.world, mouse);
    }
}

function createCurd() {
    if (gameState.currentCurd) {
        World.remove(gameState.world, gameState.currentCurd);
    }

    const curd = Bodies.circle(
        CONFIG.slingshotPosition.x,
        CONFIG.slingshotPosition.y,
        20,
        {
            density: 0.004,
            friction: 0.5,
            restitution: 0.8,
            render: {
                fillStyle: '#FFEB3B'
            },
            label: 'curd'
        }
    );

    gameState.currentCurd = curd;
    gameState.isLaunched = false;
    World.add(gameState.world, curd);

    // Create slingshot constraint
    gameState.slingshotConstraint = Constraint.create({
        pointA: CONFIG.slingshotPosition,
        bodyB: curd,
        stiffness: 0.05,
        length: 1,
        render: {
            strokeStyle: '#8B4513',
            lineWidth: 3
        }
    });

    World.add(gameState.world, gameState.slingshotConstraint);
}

function launchCurd() {
    if (!gameState.isLaunched && gameState.slingshotConstraint) {
        gameState.isLaunched = true;
        gameState.isDragging = false;

        // Remove constraint to launch
        setTimeout(() => {
            World.remove(gameState.world, gameState.slingshotConstraint);
            gameState.slingshotConstraint = null;
        }, 50);

        gameState.curdsUsed++;
        updateUI();

        // Check for next curd or game over after a delay
        setTimeout(() => {
            checkGameState();
        }, 4000);
    }
}

function checkGameState() {
    // Remove mice that fell off screen or are destroyed
    const activeMice = gameState.mice.filter(mouse => {
        if (!Composite.get(gameState.world, mouse.id, 'body')) {
            return false;
        }
        if (mouse.position.y > CONFIG.height + 100) {
            World.remove(gameState.world, mouse);
            gameState.score += 100;
            return false;
        }
        return true;
    });

    gameState.mice = activeMice;

    // Check win condition
    if (gameState.mice.length === 0) {
        gameState.score += 500;
        gameState.score += (CONFIG.maxCurds - gameState.curdsUsed) * 100;
        updateUI();
        showGameOver(true);
        return;
    }

    // Check if player has curds left
    if (gameState.curdsUsed >= CONFIG.maxCurds) {
        showGameOver(false);
        return;
    }

    // Create new curd
    createCurd();
}

function showGameOver(won) {
    const modal = document.getElementById('game-over-modal');
    const title = document.getElementById('game-over-title');
    const message = document.getElementById('game-over-message');
    const finalScore = document.getElementById('final-score');

    if (won) {
        title.textContent = '🎉 Level Complete! 🎉';
        message.textContent = 'You destroyed all the mice!';
        document.getElementById('next-level-btn').style.display = 'inline-block';
    } else {
        title.textContent = '😢 Level Failed';
        message.textContent = 'Out of cheese curds! Try again!';
        document.getElementById('next-level-btn').style.display = 'none';
    }

    finalScore.textContent = gameState.score;
    modal.style.display = 'flex';
}

function restartLevel() {
    gameState.score = 0;
    gameState.curdsUsed = 0;
    createLevel(gameState.level);
    document.getElementById('game-over-modal').style.display = 'none';
    updateUI();
}

function nextLevel() {
    gameState.level++;
    gameState.curdsUsed = 0;
    createLevel(gameState.level);
    document.getElementById('game-over-modal').style.display = 'none';
    updateUI();
}

function updateUI() {
    document.getElementById('score').textContent = gameState.score;
    document.getElementById('curds-left').textContent = CONFIG.maxCurds - gameState.curdsUsed;
    document.getElementById('level').textContent = gameState.level;
}

function setupEventListeners() {
    document.getElementById('restart-btn').addEventListener('click', restartLevel);
    document.getElementById('play-again-btn').addEventListener('click', restartLevel);
    document.getElementById('next-level-btn').addEventListener('click', nextLevel);

    // Listen for collisions to add score
    Events.on(gameState.engine, 'collisionStart', function(event) {
        const pairs = event.pairs;

        pairs.forEach(pair => {
            const { bodyA, bodyB } = pair;

            // Check if curd hit a mouse
            if ((bodyA.label === 'curd' && bodyB.label === 'mouse') ||
                (bodyA.label === 'mouse' && bodyB.label === 'curd')) {
                const mouse = bodyA.label === 'mouse' ? bodyA : bodyB;

                // Check if it's a strong collision
                const relativeVelocity = Body.getVelocity(bodyA).x - Body.getVelocity(bodyB).x;
                if (Math.abs(relativeVelocity) > 2) {
                    gameState.score += 50;
                    updateUI();
                }
            }

            // Check if structure is hit
            if ((bodyA.label === 'curd' && bodyB.label === 'block') ||
                (bodyA.label === 'block' && bodyB.label === 'curd')) {
                gameState.score += 10;
                updateUI();
            }
        });
    });
}

// Start the game when page loads
window.addEventListener('load', init);
