/* Custom Game Logic for Battleship Elite - Callum Byrne */
<script>
    const pGrid = document.getElementById('player-grid'), eGrid = document.getElementById('enemy-grid'), statusText = document.getElementById('status-text'), startBtn = document.getElementById('start-btn'), music = document.getElementById('bg-music'), turnDisp = document.getElementById('turn-count');
    let horizontal = true, currentSize = 0, currentBtnId = null, currentShipName = '', placedCount = 0, isTurn = false, musicOn = false, turns = 0;
    let pShips = {}, eShips = {}, pShipCoords = [], eShipCoords = [];

    // AI Hunting State
    let aiHuntMode = false, aiTargets = [];

    function init() {
        for(let i=0; i<100; i++){
            let pCell = document.createElement('div'); pCell.className = 'cell';
            pCell.onmouseover = () => { if(currentSize) showPreview(i); };
            pCell.onmouseleave = clearPreview; pCell.onclick = () => placeShip(i);
            pGrid.appendChild(pCell);
            let eCell = document.createElement('div'); eCell.className = 'cell';
            eCell.onclick = () => playerAttack(i); eGrid.appendChild(eCell);
        }
    }

    function toggleMusic() { musicOn = !musicOn; musicOn ? music.play() : music.pause(); document.getElementById('mute-btn').innerText = musicOn ? "🎵 MUSIC: ON" : "🎵 MUSIC: OFF"; }
    function toggleHelp(s) { document.getElementById('help-modal').style.display = s ? 'flex' : 'none'; }
    function rotate() { horizontal = !horizontal; }
    function pickShip(s, id, n) { currentSize = s; currentBtnId = id; currentShipName = n; }
    function clearPreview() { Array.from(pGrid.children).forEach(c => c.classList.remove('preview')); }

    function showPreview(idx) {
        clearPreview();
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
        let key = currentShipName.split(' ')[0];
        pShips[key] = path; pShipCoords.push(...path);
        path.forEach(i => pGrid.children[i].classList.add('ship'));
        document.getElementById(currentBtnId).style.display = 'none';
        currentSize = 0; placedCount++;
        if(placedCount === 5) startBtn.style.display = 'block';
    }

    function lockIn() {
        document.getElementById('sidebar').style.display = 'none';
        document.getElementById('enemy-section').style.opacity = '1';
        document.getElementById('enemy-section').style.pointerEvents = 'auto';
        generateEnemy(); isTurn = true; statusText.innerText = "COMMANDER, TAKE YOUR SHOT.";
    }

    function generateEnemy() {
        const d = [{n:'Carrier', s:5}, {n:'Battleship', s:4}, {n:'Submarine', s:3}, {n:'Destroyer', s:3}, {n:'Patrol', s:2}];
        d.forEach(sh => {
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
        let hit = false;
        for(let n in eShips) {
            if(eShips[n].includes(i)) {
                eGrid.children[i].classList.add('hit');
                eShips[n] = eShips[n].filter(c => c !== i);
                if(eShips[n].length === 0) { document.getElementById(`e-track-${n}`).classList.add('sunk'); triggerShake(); }
                hit = true; break;
            }
        }
        if(!hit) eGrid.children[i].classList.add('miss');
        if(Object.values(eShips).flat().length === 0) return end("VICTORY!");
        isTurn = false; statusText.innerText = "ENEMY IS FIRING...";
        setTimeout(aiMove, 800);
    }

    function aiMove() {
        let r;
        if(aiHuntMode && aiTargets.length > 0) {
            r = aiTargets.shift();
        } else {
            do { r = Math.floor(Math.random()*100); } while(pGrid.children[r].classList.contains('hit') || pGrid.children[r].classList.contains('miss'));
        }

        let hit = false;
        for(let n in pShips) {
            if(pShips[n].includes(r)) {
                pGrid.children[r].classList.add('hit');
                pShips[n] = pShips[n].filter(c => c !== r);
                if(pShips[n].length === 0) { 
                    document.getElementById(`p-track-${n}`).classList.add('sunk'); 
                    triggerShake(); aiHuntMode = false; aiTargets = [];
                } else {
                    aiHuntMode = true;
                    [r-10, r+10, r-1, r+1].forEach(t => {
                        if(t >= 0 && t < 100 && !pGrid.children[t].classList.contains('hit') && !pGrid.children[t].classList.contains('miss') && !aiTargets.includes(t)) aiTargets.push(t);
                    });
                }
                hit = true; break;
            }
        }
        if(!hit) pGrid.children[r].classList.add('miss');
        if(Object.values(pShips).flat().length === 0) return end("DEFEAT!");
        isTurn = true; statusText.innerText = "YOUR TURN, COMMANDER.";
    }

    function triggerShake() {
        document.getElementById('game-body').classList.add('shake');
        setTimeout(() => document.getElementById('game-body').classList.remove('shake'), 400);
    }

    function end(m) {
        document.getElementById('winner-msg').innerText = m;
        document.getElementById('final-stats').innerText = `MISSION COMPLETE IN ${turns} TURNS.`;
        document.getElementById('win-modal').style.display = 'flex';
    }

    init();
</script>