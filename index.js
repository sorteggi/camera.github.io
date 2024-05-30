const canvas = document.getElementById("block");
const ctx = canvas.getContext("2d");
const mass = document.getElementById("mass");
const mtx = mass.getContext("2d");
let popo=0;
let y=0;
let x=150;
let rotation=0;
mtx.fillStyle = "white";
mtx.fillRect(1, 1, 500, 1000);
const sequence = ['I', 'RL', 'L', 'O', 'S', 'RS', 'T'];
let Tetrimino=sequence[getRandomInt(0,7)];
if(Tetrimino=="L"){
    ctx.fillStyle = "orange";
}
else if(Tetrimino=="RL"){
    ctx.fillStyle = "blue";
}
else if(Tetrimino=="S"){
    ctx.fillStyle = "green";
}
else if(Tetrimino=="RS"){
    ctx.fillStyle = "red";
}
else if(Tetrimino=="T"){
    ctx.fillStyle = "purple";
}
else if(Tetrimino=="I"){
    ctx.fillStyle = "cyan";
}
else if(Tetrimino=="O"){
    ctx.fillStyle = "yellow";
}
let lastFrameTime = performance.now();
const playfield = [];
for (let row = -2; row < 20; row++) {
  playfield[row] = [1,0,0,0,0,0,0,0,0,0,0,1];
}
playfield[20] = [];
for (let col = 0; col < 12; col++) {
    playfield[20][col] = 1;
}
let lockDelayStart = null;
const lockDelayDuration = 500;
function draw() {
    const currentTime = performance.now();
    const elapsedTime = currentTime - lastFrameTime;
    if (elapsedTime >= 100) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        show();
        clear();
        if (check(x, y + 50,rotation, false)) {
            y = y + 50;
            lockDelayStart = null; 
        } else {
            if (lockDelayStart === null) {
                lockDelayStart = currentTime;
            }
            if (currentTime - lockDelayStart >= lockDelayDuration) {
                check(x, y + 50, rotation,true);
                mtx.drawImage(ctx.canvas, 0, 0);
                y = 0;
                x = 150;
                Tetrimino = sequence[getRandomInt(0, 7)];
                rotation = 0;
                if (Tetrimino == "L") {
                    ctx.fillStyle = "orange";
                } else if (Tetrimino == "RL") {
                    ctx.fillStyle = "blue";
                } else if (Tetrimino == "S") {
                    ctx.fillStyle = "green";
                } else if (Tetrimino == "RS") {
                    ctx.fillStyle = "red";
                } else if (Tetrimino == "T") {
                    ctx.fillStyle = "purple";
                } else if (Tetrimino == "I") {
                    ctx.fillStyle = "cyan";
                } else if (Tetrimino == "O") {
                    ctx.fillStyle = "yellow";
                }
                lockDelayStart = null; 
            }
        }
        lastFrameTime = currentTime;
    }
    window.requestAnimationFrame(draw);
}

function clear(){
    let isFilled;
    for (var row = 0; row < playfield.length-1; row++) {
        isFilled = true;
        for (var col = 0; col < playfield[row].length; col++) {
            if (playfield[row][col] == 0) {
                isFilled = false;
            }
        }
        if(isFilled){
            mtx.drawImage(mtx.canvas, 0 , 0 , 500 , row*50 , 0 , 50 , 500 ,(row)*50);
            mtx.globalCompositeOperation = "source-over";
            playfield.splice(row, 1);
            playfield.unshift([0,0,0,0,0,0,0,0,0,0]);  
        }
    }
}
function show(){
    if(Tetrimino=="L"){
        if(rotation == 0){
            ctx.fillRect(x+100, y, 50, 50);
            ctx.fillRect(x, y+50, 150, 50);
        }
        else if(rotation == 1){
            ctx.fillRect(x+50, y, 50, 150);
            ctx.fillRect(x+100, y+100, 50, 50);
        }
        else if(rotation == 2){
            ctx.fillRect(x, y+100, 50, 50);
            ctx.fillRect(x, y+50, 150, 50);
        }
        else if(rotation == 3){
            ctx.fillRect(x+50, y, 50, 150);
            ctx.fillRect(x, y, 50, 50);
        }
    }
    else if(Tetrimino=="RL"){
        if(rotation == 0){
            ctx.fillRect(x, y, 50, 50);
            ctx.fillRect(x, y+50, 150, 50);
        }
        else if(rotation == 1){
            ctx.fillRect(x+50, y, 50, 150);
            ctx.fillRect(x+100, y, 50, 50);
        }
        else if(rotation == 2){
            ctx.fillRect(x+100, y+100, 50, 50);
            ctx.fillRect(x, y+50, 150, 50);
        }
        else if(rotation == 3){
            ctx.fillRect(x+50, y, 50, 150);
            ctx.fillRect(x, y+100, 50, 50);
        }
    }
    else if(Tetrimino=="S"){
        if(rotation == 0 || rotation == 2){
            ctx.fillRect(x+50, y, 100, 50);
            ctx.fillRect(x, y+50, 100, 50);
        }
        else {
            ctx.fillRect(x, y, 50, 100);
            ctx.fillRect(x+50, y+50, 50, 100);
        }
    }
    else if(Tetrimino=="RS"){
        if(rotation == 0 || rotation == 2){
            ctx.fillRect(x, y, 100, 50);
            ctx.fillRect(x+50, y+50, 100, 50);
        }
        else {
            ctx.fillRect(x+50, y, 50, 100);
            ctx.fillRect(x, y+50, 50, 100);
        }
    }
    else if(Tetrimino=="T"){
        if(rotation == 0){
            ctx.fillRect(x+50, y, 50, 50);
            ctx.fillRect(x, y+50, 150, 50);
        }
        else if(rotation == 1){
            ctx.fillRect(x+100, y+50, 50, 50);
            ctx.fillRect(x+50, y, 50, 150);
        }
        else if(rotation == 2){
            ctx.fillRect(x, y+50, 150, 50);
            ctx.fillRect(x+50, y+100, 50, 50);
        }
        else if(rotation == 3){
            
            ctx.fillRect(x+50, y, 50, 150);
            ctx.fillRect(x, y+50, 50, 50);
        }
    }
    else if(Tetrimino=="I"){
        if(rotation == 0 || rotation == 2){
            ctx.fillRect(x, y,200, 50);
        }
        else {
            ctx.fillRect(x, y,50, 200);
        }
    }
    else if(Tetrimino=="O"){
        ctx.fillRect(x, y, 100, 100);
    }
}
function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}
function check(x1,y1,rotation,stop){
    let col = x1/50;col++;
    let row = y1/50;
    let tcol =x/50;tcol++;
    let trow= y/50;
    if(Tetrimino=="L"){
        if(rotation == 0){
            let tet = [
                [0, 0, 1],
                [1, 1, 1],
                [0, 0, 0],
            ];
            for(let i=0;i<3;i++){
                for(let j=0;j<3;j++){
                    if(tet[i][j]==1&&playfield[i+row][j+col]==1){
                        if(stop){
                            for(let a=0;a<3;a++){
                                for(let b=0;b<3;b++){
                                    if(tet[a][b]==1){
                                        playfield[a+trow][b+tcol]=1;
                                    }
                                }
                            }
                        }
                        return false;
                    }
                }
            }
            return true;
        }
        else if(rotation == 1){
            let tet = [
                [0, 1, 0],
                [0, 1, 0],
                [0, 1, 1],
            ];
            for(let i=0;i<3;i++){
                for(let j=0;j<3;j++){
                    if(tet[i][j]==1&&playfield[i+row][j+col]==1){
                        if(stop){
                            for(let a=0;a<3;a++){
                                for(let b=0;b<3;b++){
                                    if(tet[a][b]==1){
                                        playfield[a+trow][b+tcol]=1;
                                    }
                                }
                            }
                        }
                        return false;
                    }
                }
            }
            return true;
        }
        else if(rotation == 2){
            let tet = [
                [0, 0, 0],
                [1, 1, 1],
                [1, 0, 0],
            ];
            for(let i=0;i<3;i++){
                for(let j=0;j<3;j++){
                    if(tet[i][j]==1&&playfield[i+row][j+col]==1){
                        if(stop){
                            for(let a=0;a<3;a++){
                                for(let b=0;b<3;b++){
                                    if(tet[a][b]==1){
                                        playfield[a+trow][b+tcol]=1;
                                    }
                                }
                            }
                        }
                        return false;
                    }
                }
            }
            return true;
        }
        else if(rotation == 3){
            let tet = [
                [1, 1, 0],
                [0, 1, 0],
                [0, 1, 0],
            ];
            for(let i=0;i<3;i++){
                for(let j=0;j<3;j++){
                    if(tet[i][j]==1&&playfield[i+row][j+col]==1){
                        if(stop){
                            for(let a=0;a<3;a++){
                                for(let b=0;b<3;b++){
                                    if(tet[a][b]==1){
                                        playfield[a+trow][b+tcol]=1;
                                    }
                                }
                            }
                        }
                        return false;
                    }
                }
            }
            return true;
        }
    }
    else if(Tetrimino=="RL"){
        if(rotation == 0){
            let tet = [
                [1, 0, 0],
                [1, 1, 1],
                [0, 0, 0],
            ];
            for(let i=0;i<3;i++){
                for(let j=0;j<3;j++){
                    if(tet[i][j]==1&&playfield[i+row][j+col]==1){
                        if(stop){
                            for(let a=0;a<3;a++){
                                for(let b=0;b<3;b++){
                                    if(tet[a][b]==1){
                                        playfield[a+trow][b+tcol]=1;
                                    }
                                }
                            }
                        }
                        return false;
                    }
                }
            }
            return true;
        }
        else if(rotation == 1){
            let tet = [
                [0, 1, 1],
                [0, 1, 0],
                [0, 1, 0],
            ];
            for(let i=0;i<3;i++){
                for(let j=0;j<3;j++){
                    if(tet[i][j]==1&&playfield[i+row][j+col]==1){
                        if(stop){
                            for(let a=0;a<3;a++){
                                for(let b=0;b<3;b++){
                                    if(tet[a][b]==1){
                                        playfield[a+trow][b+tcol]=1;
                                    }
                                }
                            }
                        }
                        return false;
                    }
                }
            }
            return true;
        }
        else if(rotation == 2){
            let tet = [
                [0, 0, 0],
                [1, 1, 1],
                [0, 0, 1],
            ];
            for(let i=0;i<3;i++){
                for(let j=0;j<3;j++){
                    if(tet[i][j]==1&&playfield[i+row][j+col]==1){
                        if(stop){
                            for(let a=0;a<3;a++){
                                for(let b=0;b<3;b++){
                                    if(tet[a][b]==1){
                                        playfield[a+trow][b+tcol]=1;
                                    }
                                }
                            }
                        }
                        return false;
                    }
                }
            }
            return true;
        }
        else if(rotation == 3){
            let tet = [
                [0, 1, 0],
                [0, 1, 0],
                [1, 1, 0],
            ];
            for(let i=0;i<3;i++){
                for(let j=0;j<3;j++){
                    if(tet[i][j]==1&&playfield[i+row][j+col]==1){
                        if(stop){
                            for(let a=0;a<3;a++){
                                for(let b=0;b<3;b++){
                                    if(tet[a][b]==1){
                                        playfield[a+trow][b+tcol]=1;
                                    }
                                }
                            }
                        }
                        return false;
                    }
                }
            }
            return true;
        }
    }
    else if(Tetrimino=="S"){
        if(rotation == 0 || rotation == 2){
            let tet = [
                [0, 1, 1],
                [1, 1, 0],
                [0, 0, 0],
            ];
            for(let i=0;i<3;i++){
                for(let j=0;j<3;j++){
                    if(tet[i][j]==1&&playfield[i+row][j+col]==1){
                        if(stop){
                            for(let a=0;a<3;a++){
                                for(let b=0;b<3;b++){
                                    if(tet[a][b]==1){
                                        playfield[a+trow][b+tcol]=1;
                                    }
                                }
                            }
                        }
                        return false;
                    }
                }
            }
            return true;
        }
        else {
            let tet = [
                [1, 0, 0],
                [1, 1, 0],
                [0, 1, 0],
            ];
            for(let i=0;i<3;i++){
                for(let j=0;j<3;j++){
                    if(tet[i][j]==1&&playfield[i+row][j+col]==1){
                        if(stop){
                            for(let a=0;a<3;a++){
                                for(let b=0;b<3;b++){
                                    if(tet[a][b]==1){
                                        playfield[a+trow][b+tcol]=1;
                                    }
                                }
                            }
                        }
                        return false;
                    }
                }
            }
            return true;
        }
    }
    else if(Tetrimino=="RS"){
        if(rotation == 0 || rotation == 2){
            let tet = [
                [1, 1, 0],
                [0, 1, 1],
                [0, 0, 0],
            ];
            for(let i=0;i<3;i++){
                for(let j=0;j<3;j++){
                    if(tet[i][j]==1&&playfield[i+row][j+col]==1){
                        if(stop){
                            for(let a=0;a<3;a++){
                                for(let b=0;b<3;b++){
                                    if(tet[a][b]==1){
                                        playfield[a+trow][b+tcol]=1;
                                    }
                                }
                            }
                        }
                        return false;
                    }
                }
            }
            return true;
        }
        else {
            let tet = [
                [0, 1, 0],
                [1, 1, 0],
                [1, 0, 0],
            ];
            for(let i=0;i<3;i++){
                for(let j=0;j<3;j++){
                    if(tet[i][j]==1&&playfield[i+row][j+col]==1){
                        if(stop){
                            for(let a=0;a<3;a++){
                                for(let b=0;b<3;b++){
                                    if(tet[a][b]==1){
                                        playfield[a+trow][b+tcol]=1;
                                    }
                                }
                            }
                        }
                        return false;
                    }
                }
            }
            return true;
        }
    }
    else if(Tetrimino=="T"){
        if(rotation == 0){
            let tet = [
                [0, 1, 0],
                [1, 1, 1],
                [0, 0, 0],
            ];
            for(let i=0;i<3;i++){
                for(let j=0;j<3;j++){
                    if(tet[i][j]==1&&playfield[i+row][j+col]==1){
                        if(stop){
                            for(let a=0;a<3;a++){
                                for(let b=0;b<3;b++){
                                    if(tet[a][b]==1){
                                        playfield[a+trow][b+tcol]=1;
                                    }
                                }
                            }
                        }
                        return false;
                    }
                }
            }
            return true;
        }
        else if(rotation == 1){
            let tet = [
                [0, 1, 0],
                [0, 1, 1],
                [0, 1, 0],
            ];
            for(let i=0;i<3;i++){
                for(let j=0;j<3;j++){
                    if(tet[i][j]==1&&playfield[i+row][j+col]==1){
                        if(stop){
                            for(let a=0;a<3;a++){
                                for(let b=0;b<3;b++){
                                    if(tet[a][b]==1){
                                        playfield[a+trow][b+tcol]=1;
                                    }
                                }
                            }
                        }
                        return false;
                    }
                }
            }
            return true;
        }
        else if(rotation == 2){
            let tet = [
                [0, 0, 0],
                [1, 1, 1],
                [0, 1, 0],
            ];
            for(let i=0;i<3;i++){
                for(let j=0;j<3;j++){
                    if(tet[i][j]==1&&playfield[i+row][j+col]==1){
                        if(stop){
                            for(let a=0;a<3;a++){
                                for(let b=0;b<3;b++){
                                    if(tet[a][b]==1){
                                        playfield[a+trow][b+tcol]=1;
                                    }
                                }
                            }
                        }
                        return false;
                    }
                }
            }
            return true;
        }
        else if(rotation == 3){
            let tet = [
                [0, 1, 0],
                [1, 1, 0],
                [0, 1, 0],
            ];
            for(let i=0;i<3;i++){
                for(let j=0;j<3;j++){
                    if(tet[i][j]==1&&playfield[i+row][j+col]==1){
                        if(stop){
                            for(let a=0;a<3;a++){
                                for(let b=0;b<3;b++){
                                    if(tet[a][b]==1){
                                        playfield[a+trow][b+tcol]=1;
                                    }
                                }
                            }
                        }
                        return false;
                    }
                }
            }
            return true;
        }
    }
    else if(Tetrimino=="I"){
        if(rotation == 0 || rotation == 2){
            let tet = [
                [1, 1, 1, 1],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ];
            for(let i=0;i<4;i++){
                for(let j=0;j<4;j++){
                    if(tet[i][j]==1&&playfield[i+row][j+col]==1){
                        if(stop){
                            for(let a=0;a<4;a++){
                                for(let b=0;b<4;b++){
                                    if(tet[a][b]==1){
                                        playfield[a+trow][b+tcol]=1;
                                    }
                                }
                            }
                        }
                        return false;
                    }
                }
            }
            return true;
        }
        else {
            let tet = [
                [1, 0, 0, 0],
                [1, 0, 0, 0],
                [1, 0, 0, 0],
                [1, 0, 0, 0],
            ];
            for(let i=0;i<4;i++){
                for(let j=0;j<4;j++){
                    if(tet[i][j]==1&&playfield[i+row][j+col]==1){
                        if(stop){
                            for(let a=0;a<4;a++){
                                for(let b=0;b<4;b++){
                                    if(tet[a][b]==1){
                                        playfield[a+trow][b+tcol]=1;
                                    }
                                }
                            }
                        }
                        return false;
                    }
                }
            }
            return true;
        }
    }
    else if(Tetrimino=="O"){
        let tet = [
            [1, 1],
            [1, 1],
        ];
        for(let i=0;i<2;i++){
            for(let j=0;j<2;j++){
                if(tet[i][j]==1&&playfield[i+row][j+col]==1){
                    if(stop){
                        for(let a=0;a<2;a++){
                            for(let b=0;b<2;b++){
                                if(tet[a][b]==1){
                                    playfield[a+trow][b+tcol]=1;
                                }
                            }
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }
}
document.addEventListener('keydown', function(e) {
    if (e.key == 'd' && check(x+50,y,rotation,false)==true ) {
        x+=50;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        show();
        lockDelayStart = null;
    }
    else if (e.key == 'a' && check(x-50,y,rotation,false)==true) {
        x-=50;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        show();
        lockDelayStart = null;
    }
    else if (e.key == 's' && check(x,y+50,rotation,false)==true ) {
        y+=50;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        show();
        lockDelayStart = null;
    }
    else if (e.key == 'x' && check(x,y,(rotation+1)%4,false)==true) {
        rotation=(rotation+1)%4;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        show();
        lockDelayStart = null;
    }
});
const blockCanvas = document.getElementById('block');
let pointerStartX = 0;
let pointerCurrentX = 0;
let clickThreshold = 5; 

blockCanvas.addEventListener('pointerdown', function(event) {
    pointerStartX = event.screenX;
    pointerCurrentX = event.screenX;
    event.preventDefault(); // Prevent any default action
}, false);

blockCanvas.addEventListener('pointermove', function(event) {
    if (pointerStartX !== 0) {
        pointerCurrentX = event.screenX;
        event.preventDefault();
        handleSwipeWhileMoving();
    }
}, false);

blockCanvas.addEventListener('pointerup', function(event) {
    if (Math.abs(pointerStartX - pointerCurrentX) < clickThreshold) {
        handleShortClick();
    }
    pointerStartX = 0; // Reset pointer start position
    event.preventDefault(); // Prevent any default action
}, false);

function handleShortClick() {
    if(check(x,y,(rotation+1)%4,false)==true){
        rotation=(rotation+1)%4;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        show();
        lockDelayStart = null;
    }
}

function handleSwipeWhileMoving() {
    if (pointerCurrentX > pointerStartX + 50) {
        if (check(x + 50, y, rotation, false) === true) {
            x += 50;
            ctx.clearRect(0, 0, blockCanvas.width, blockCanvas.height);
            show();
            lockDelayStart = null;
        }
        pointerStartX = pointerCurrentX; // Reset start position to allow continuous swiping
    } 
    else if (pointerCurrentX < pointerStartX - 50) {
        if (check(x - 50, y, rotation, false) === true) {
            x -= 50;
            ctx.clearRect(0, 0, blockCanvas.width, blockCanvas.height);
            show();
            lockDelayStart = null;
        }
        pointerStartX = pointerCurrentX; // Reset start position to allow continuous swiping
    }
}

            
window.requestAnimationFrame(draw);
