/* jshint esversion: 6 */
/* exported pickShip, rotate, lockIn, toggleHelp, toggleMusic */

const pGrid = document.getElementById('player-grid');
const eGrid = document.getElementById('enemy-grid');
const startBtn = document.getElementById('start-btn');
const bgMusic = document.getElementById('bg-music');
const muteBtn = document.getElementById('mute-btn');

let horizontal = true, currentShip = null, placedCount = 0, isTurn = false, gameActive = false;
let pShipMap = {}, eShipMap = {}, pShots = [], eShots = [];
let pFleetHealth = {'Carrier': 5, 'Battleship': 4, 'Submarine': 3, 'Destroyer': 3, 'Patrol': 2};
let eFleetHealth = {'Carrier': 5, 'Battleship': 4, 'Submarine': 3, 'Destroyer': 3, 'Patrol': 2};
let placedShips = {'Carrier': false, 'Battleship': false, 'Submarine': false, 'Destroyer': false, 'Patrol': false};

function init() {
    for (let i = 0; i < 100; i++) {
        setupPlayerCell(i);
        setupEnemyCell(i);
    }
}

function setupPlayerCell(i) {
    let pCell = document.createElement('div');
    pCell.className = 'cell';
    pCell.onmouseover = function() { if (currentShip) preview(i); };
    pCell.onclick = function() { place(i); };
    pGrid.appendChild(pCell);
}

function setupEnemyCell(i) {
    let eCell = document.createElement('div');
    eCell.className = 'cell';
    eCell.onclick = function() { attack(i); };
    eGrid.appendChild(eCell);
}

function preview(idx) {
    Array.from(pGrid.children).forEach(c => c.classList.remove('preview'));
    const path = getPath(idx, currentShip.size);
    if (path) path.forEach(i => pGrid.children[i].classList.add('preview'));
}

function getPath(idx, size) {
    let path = [], row = Math.floor(idx / 10);
    for (let i = 0; i < size; i++) {
        let n = horizontal ? idx + i : idx + (i * 10);
        if (n > 99 || (horizontal && Math.floor(n / 10) !== row) || pShipMap[n]) return null;
        path.push(n);
    }
    return path;
}

function pickShip(size, name) { if (!placedShips[name]) currentShip = {size, name}; }

function rotate() { horizontal = !horizontal; }

function place(idx) {
    if (!currentShip) return;
    const path = getPath(idx, currentShip.size);
    if (path) {
        path.forEach(i => { 
            pGrid.children[i].classList.add('ship'); 
            pShipMap[i] = currentShip.name; 
        });
        placedShips[currentShip.name] = true;
        document.getElementById('btn-' + currentShip.name).style.display = 'none';
        placedCount++;
        currentShip = null;
        if (placedCount === 5) startBtn.style.display = 'block';
    }
}

function lockIn() {
    document.getElementById('sidebar').style.display = 'none';
    document.getElementById('enemy-section').classList.remove('hidden-section');
    genEnemy();
    gameActive = true;
    isTurn = true;
}

function genEnemy() {
    const ships = [
        {n: 'Carrier', s: 5}, {n: 'Battleship', s: 4}, 
        {n: 'Submarine', s: 3}, {n: 'Destroyer', s: 3}, {n: 'Patrol', s: 2}
    ];
    
    for (let i = 0; i < ships.length; i++) {
        placeSingleEnemyShip(ships[i]);
    }
}

function placeSingleEnemyShip(sh) {
    let placed = false;
    while (!placed) {
        let h = Math.random() > 0.5;
        let start = Math.floor(Math.random() * 100);
        let path = [];
        let row = Math.floor(start / 10);
        
        for (let j = 0; j < sh.s; j++) {
            let n = h ? start + j : start + (j * 10);
            if (n < 100 && (!h || Math.floor(n / 10) === row) && !eShipMap[n]) {
                path.push(n);
            }
        }
        
        if (path.length === sh.s) {
            // FIX: Replaced .forEach with a standard for-loop to satisfy JSHint
            for (let k = 0; k < path.length; k++) {
                eShipMap[path[k]] = sh.n;
            }
            placed = true;
        }
    }
}

function attack(i) {
    if (!isTurn || !gameActive || eShots.includes(i)) return;
    eShots.push(i);
    let ship = eShipMap[i];
    if (ship) {
        eGrid.children[i].classList.add('hit');
        shake();
        eFleetHealth[ship]--;
        if (eFleetHealth[ship] === 0) {
            document.getElementById('e-stat-' + ship).classList.add('sunk');
        }
        if (Object.values(eFleetHealth).every(v => v === 0)) end("VICTORY");
    } else {
        eGrid.children[i].classList.add('miss');
    }
    isTurn = false;
    setTimeout(ai, 600);
}

function ai() {
    let i;
    do { i = Math.floor(Math.random() * 100); } while (pShots.includes(i));
    pShots.push(i);
    let ship = pShipMap[i];
    if (ship) {
        pGrid.children[i].classList.add('hit');
        shake();
        pFleetHealth[ship]--;
        if (pFleetHealth[ship] === 0) {
            document.getElementById('p-stat-' + ship).classList.add('sunk');
        }
        if (Object.values(pFleetHealth).every(v => v === 0)) end("DEFEAT");
    } else {
        pGrid.children[i].classList.add('miss');
    }
    isTurn = true;
}

function shake() {
    document.body.classList.add('shake-screen');
    setTimeout(() => document.body.classList.remove('shake-screen'), 300);
}

function end(m) {
    document.getElementById('win-modal').style.display = 'flex';
    document.getElementById('winner-msg').innerText = m;
    gameActive = false;
}

function toggleHelp(s) {
    document.getElementById('help-modal').style.display = s ? 'flex' : 'none';
}

function toggleMusic() {
    if (bgMusic.paused) {
        bgMusic.play().then(() => {
            muteBtn.innerText = "🎵 MUSIC: ON";
            muteBtn.style.background = "#10b981";
        }).catch(() => {});
    } else {
        bgMusic.pause();
        muteBtn.innerText = "🎵 MUSIC: OFF";
        muteBtn.style.background = "#334155";
    }
}

document.addEventListener('click', () => { bgMusic.load(); }, { once: true });
init();
