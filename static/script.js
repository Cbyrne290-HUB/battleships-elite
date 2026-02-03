/* Battleships - Final Distinction Logic (Bug Fixes applied) */
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

// Data Models
let pShipMap = {}; 
let eShipMap = {}; 

// Track Health
let pFleetHealth = { 'Carrier': 5, 'Battleship': 4, 'Submarine': 3, 'Destroyer': 3, 'Patrol': 2 };
let eFleetHealth = { 'Carrier': 5, 'Battleship': 4, 'Submarine': 3, 'Destroyer': 3, 'Patrol': 2 };

// Track Placed Status (Prevents multiple placements)
let placedShips = { 'Carrier': false, 'Battleship': false, 'Submarine': false, 'Destroyer': false, 'Patrol': false };

// Shot History
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
    // BUG FIX: Prevent picking if already placed
    if(placedShips[name]) return; 
    
    currentShip = { size: size, name: name };
    statusText.innerText = "PLACING: " + name.toUpperCase();
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
        // Boundary & Collision Checks
        if(n > 99) return null;
        if(horizontal && Math.floor(n/10) !== row) return null;
        if(pShipMap[n]) return null;
        path.push(n);
    }
    return path;
}

function placeShip(idx) {
    if(!currentShip) return;
    const path = getPath(idx, currentShip.size);
    
    if(path) {
        // Place Ship in Data
        path.forEach(i => {
            pGrid.children[i].classList.add('ship');
            pShipMap[i] = currentShip.name; 
        });
        
        // BUG FIX: Mark as placed and Hide Button Immediately
        placedShips[currentShip.name] = true;
        document.getElementById('btn-' + currentShip.name).style.display = 'none';
        
        placedCount++;
        currentShip = null;
        statusText.innerText = "SHIP DEPLOYED.";
        
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
    // Force Flex to fix layout
    document.getElementById('enemy-section').style.display = 'flex'; 
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
        triggerShake(); 
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
        triggerShake();
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

// --- UTILS ---
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
    const modal = document.getElementById('help-modal');
    modal.style.display = show ? 'flex' : 'none';
}

function toggleMusic() {
    if(bgMusic.paused) {
        // Audio policy requires user interaction first
        bgMusic.play().then(() => {
            muteBtn.innerText = "🎵 MUSIC: ON";
            muteBtn.style.background = "#10b981";
        }).catch(e => {
            alert("Click the page once, then try the button again!");
        });
    } else {
        bgMusic.pause();
        muteBtn.innerText = "🎵 MUSIC: OFF";
        muteBtn.style.background = "#334155";
    }
}

init();