/* Battleships - Final Distinction Logic */
const pGrid = document.getElementById('player-grid');
const eGrid = document.getElementById('enemy-grid');
const statusText = document.getElementById('status-text');
const startBtn = document.getElementById('start-btn');
const bgMusic = document.getElementById('bg-music');
const muteBtn = document.getElementById('mute-btn');

// Game State
let horizontal = true;
let currentShip = null; 
let placedCount = 0;
let isTurn = false;
let gameActive = false;
let turns = 0;

// Data Models for Sinking Logic
// Maps cell Index -> Ship Name (e.g., 42: "Carrier")
let pShipMap = {}; 
let eShipMap = {}; 

// Maps Ship Name -> Remaining Health
let pFleetHealth = { 'Carrier': 5, 'Battleship': 4, 'Submarine': 3, 'Destroyer': 3, 'Patrol': 2 };
let eFleetHealth = { 'Carrier': 5, 'Battleship': 4, 'Submarine': 3, 'Destroyer': 3, 'Patrol': 2 };

// Arrays to track hit coordinates to prevent duplicates
let pShots = [];
let eShots = [];

function init() {
    createGrid(pGrid, 'p');
    createGrid(eGrid, 'e');
}

function createGrid(gridEl, type) {
    for(let i=0; i<100; i++) {
        let cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.idx = i;
        if(type === 'p') {
            cell.onmouseover = () => previewShip(i);
            cell.onclick = () => placeShip(i);
        } else {
            cell.onclick = () => playerAttack(i);
        }
        gridEl.appendChild(cell);
    }
}

// --- SETUP PHASE ---
function pickShip(size, name) {
    // Hide the button for the ship we just picked
    if(pFleetHealth[name] === 0) return; // Already placed check
    currentShip = { size: size, name: name };
    // Highlight active button logic could go here
}

function rotate() { horizontal = !horizontal; }

function previewShip(idx) {
    if(!currentShip) return;
    Array.from(pGrid.children).forEach(c => c.classList.remove('preview'));
    const path = getPath(idx, currentShip.size);
    if(path) path.forEach(i => pGrid.children[i].classList.add('preview'));
}

function getPath(idx, size) {
    let path = [];
    let row = Math.floor(idx / 10);
    for(let i=0; i<size; i++) {
        let n = horizontal ? idx + i : idx + (i*10);
        // Boundary Checks
        if(n > 99) return null;
        if(horizontal && Math.floor(n/10) !== row) return null;
        // Collision Check
        if(pShipMap[n]) return null;
        path.push(n);
    }
    return path;
}

function placeShip(idx) {
    if(!currentShip) return;
    const path = getPath(idx, currentShip.size);
    
    if(path) {
        path.forEach(i => {
            pGrid.children[i].classList.add('ship');
            pShipMap[i] = currentShip.name; // Map index to Name
        });
        
        // Hide button
        document.getElementById('btn-' + currentShip.name).style.display = 'none';
        
        placedCount++;
        currentShip = null;
        
        if(placedCount === 5) {
            statusText.innerText = "FLEET READY. AWAITING ORDERS.";
            startBtn.style.display = 'block';
        }
    }
}

// --- GAME LOGIC ---
function lockIn() {
    document.getElementById('sidebar').style.display = 'none';
    document.getElementById('enemy-section').classList.remove('hidden-section');
    document.getElementById('enemy-section').style.display = 'flex'; // Ensure flex for alignment
    generateEnemyFleet();
    gameActive = true;
    isTurn = true;
    statusText.innerText = "COMMANDER, FIRE AT WILL!";
}

function generateEnemyFleet() {
    const ships = [
        {n:'Carrier', s:5}, {n:'Battleship', s:4}, {n:'Submarine', s:3}, {n:'Destroyer', s:3}, {n:'Patrol', s:2}
    ];
    
    ships.forEach(sh => {
        let placed = false;
        while(!placed) {
            let h = Math.random() > 0.5;
            let idx = Math.floor(Math.random() * 100);
            let path = [];
            let valid = true;
            let row = Math.floor(idx / 10);

            for(let i=0; i<sh.s; i++) {
                let n = h ? idx + i : idx + (i*10);
                if(n > 99 || (h && Math.floor(n/10) !== row) || eShipMap[n]) {
                    valid = false; break;
                }
                path.push(n);
            }

            if(valid) {
                path.forEach(i => eShipMap[i] = sh.n);
                placed = true;
            }
        }
    });
}

function playerAttack(idx) {
    if(!gameActive || !isTurn || eShots.includes(idx)) return;
    
    eShots.push(idx);
    turns++;
    document.getElementById('turn-count').innerText = turns;

    const cell = eGrid.children[idx];
    const shipName = eShipMap[idx];

    if(shipName) {
        // HIT
        cell.classList.add('hit');
        triggerShake(); // Screen Shake
        statusText.innerText = "DIRECT HIT!";
        statusText.style.color = "#ef4444";
        
        eFleetHealth[shipName]--;
        if(eFleetHealth[shipName] === 0) {
            statusText.innerText = "ENEMY " + shipName.toUpperCase() + " SUNK!";
            document.getElementById('e-stat-' + shipName).classList.add('sunk');
            checkWin();
        }
    } else {
        // MISS
        cell.classList.add('miss');
        statusText.innerText = "MISSED!";
        statusText.style.color = "white";
    }

    isTurn = false;
    setTimeout(aiTurn, 800);
}

function aiTurn() {
    if(!gameActive) return;
    
    let idx;
    do { idx = Math.floor(Math.random()*100); } while(pShots.includes(idx));
    
    pShots.push(idx);
    const cell = pGrid.children[idx];
    const shipName = pShipMap[idx];

    if(shipName) {
        cell.classList.add('hit');
        triggerShake(); // Screen Shake on taking damage
        pFleetHealth[shipName]--;
        
        if(pFleetHealth[shipName] === 0) {
            document.getElementById('p-stat-' + shipName).classList.add('sunk');
            checkLoss();
        }
    } else {
        cell.classList.add('miss');
    }
    
    isTurn = true;
    statusText.innerText = "PLAYER TURN";
    statusText.style.color = "#10b981";
}

// --- UTILS & FX ---
function triggerShake() {
    document.body.classList.add('shake-screen');
    setTimeout(() => document.body.classList.remove('shake-screen'), 500);
}

function checkWin() {
    if(Object.values(eFleetHealth).every(h => h === 0)) endGame("VICTORY - ENEMY ELIMINATED");
}

function checkLoss() {
    if(Object.values(pFleetHealth).every(h => h === 0)) endGame("DEFEAT - FLEET DESTROYED");
}

function endGame(msg) {
    gameActive = false;
    document.getElementById('win-modal').style.display = 'flex';
    document.getElementById('winner-msg').innerText = msg;
}

// --- UI CONTROLS ---
function toggleHelp(show) {
    document.getElementById('help-modal').style.display = show ? 'flex' : 'none';
}

function toggleMusic() {
    if(bgMusic.paused) {
        bgMusic.play().then(() => {
            muteBtn.innerText = "🎵 MUSIC: ON";
            muteBtn.style.background = "#10b981";
        }).catch(e => alert("Please interact with the page first!"));
    } else {
        bgMusic.pause();
        muteBtn.innerText = "🎵 MUSIC: OFF";
        muteBtn.style.background = "#334155";
    }
}

init();