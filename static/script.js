/* Battleship Elite - Logic Refactor */
const pGrid = document.getElementById('player-grid'), 
      eGrid = document.getElementById('enemy-grid'),
      statusText = document.getElementById('status-text'),
      startBtn = document.getElementById('start-btn'),
      turnDisp = document.getElementById('turn-count');

let horizontal = true, currentSize = 0, currentBtnId = null, currentShipName = '', 
    placedCount = 0, isTurn = false, turns = 0;
let pShips = {}, eShips = {}, pShipCoords = [], eShipCoords = [];

function init() {
    for(let i=0; i<100; i++){
        let pCell = document.createElement('div'); pCell.className = 'cell';
        pCell.onmouseover = () => { if(currentSize) showPreview(i); };
        pCell.onclick = () => placeShip(i);
        pGrid.appendChild(pCell);

        let eCell = document.createElement('div'); eCell.className = 'cell';
        eCell.onclick = () => playerAttack(i); 
        eGrid.appendChild(eCell);
    }
}

function showPreview(idx) {
    Array.from(pGrid.children).forEach(c => c.classList.remove('preview'));
    const path = getPath(idx, currentSize);
    if(path) path.forEach(i => pGrid.children[i].classList.add('preview'));
}

function getPath(idx, size) {
    let path = [];
    for(let i=0; i<size; i++){
        let n = horizontal ? idx + i : idx + (i*10);
        if(n > 99 || (horizontal && Math.floor(n/10) !== Math.floor(idx/10))) return null;
        path.push(n);
    }
    return path;
}

function placeShip(idx) {
    if(!currentSize) return;
    const path = getPath(idx, currentSize);
    if(!path || path.some(p => pShipCoords.includes(p))) return;
    
    pShipCoords.push(...path);
    path.forEach(i => pGrid.children[i].classList.add('ship'));
    document.getElementById(currentBtnId).style.display = 'none';
    currentSize = 0; placedCount++;
    if(placedCount === 5) startBtn.style.display = 'block';
}

function lockIn() {
    document.getElementById('sidebar').style.display = 'none';
    document.getElementById('enemy-section').classList.remove('hidden-section');
    document.getElementById('enemy-section').style.opacity = '1';
    generateEnemy(); isTurn = true; 
    statusText.innerText = "COMMANDER, ENGAGE THE ENEMY";
}

function generateEnemy() {
    const ships = [{n:'Carrier', s:5}, {n:'Battleship', s:4}, {n:'Submarine', s:3}, {n:'Destroyer', s:3}, {n:'Patrol', s:2}];
    ships.forEach(sh => {
        let placed = false;
        while(!placed) {
            let h = Math.random() > 0.5, start = Math.floor(Math.random()*100), path = [];
            for(let i=0; i<sh.s; i++){
                let n = h ? start + i : start + (i*10);
                if(n < 100 && (!h || Math.floor(n/10) === Math.floor(start/10)) && !eShipCoords.includes(n)) path.push(n);
            }
            if(path.length === sh.s) { eShips[sh.n] = path; eShipCoords.push(...path); placed = true; }
        }
    });
}

function playerAttack(i) {
    if(!isTurn || eGrid.children[i].classList.contains('hit') || eGrid.children[i].classList.contains('miss')) return;
    turns++; turnDisp.innerText = turns;
    let hit = eShipCoords.includes(i);
    eGrid.children[i].classList.add(hit ? 'hit' : 'miss');
    if(hit) {
        eShipCoords = eShipCoords.filter(c => c !== i);
        if(eShipCoords.length === 0) return end("VICTORY");
    }
    isTurn = false; setTimeout(aiMove, 600);
}

function aiMove() {
    let r;
    do { r = Math.floor(Math.random()*100); } while(pGrid.children[r].classList.contains('hit') || pGrid.children[r].classList.contains('miss'));
    let hit = pShipCoords.includes(r);
    pGrid.children[r].classList.add(hit ? 'hit' : 'miss');
    if(pShipCoords.filter(c => !pGrid.children[c].classList.contains('hit')).length === 0) return end("DEFEAT");
    isTurn = true;
}

function end(m) { document.getElementById('win-modal').style.display = 'flex'; document.getElementById('winner-msg').innerText = m; }
function rotate() { horizontal = !horizontal; }
function pickShip(s, id, n) { currentSize = s; currentBtnId = id; currentShipName = n; }

init();