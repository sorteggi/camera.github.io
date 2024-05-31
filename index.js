const canvas = document.getElementById("block");
const ctx = canvas.getContext("2d");
const mass = document.getElementById("mass");
const mtx = mass.getContext("2d");
let popo=0;
let y=0;
let x=150;
let tet=[];
let rotation=0;
mtx.fillStyle = "white";
mtx.fillRect(1, 1, 500, 1000);
const sequence = ['I', 'RL', 'L', 'O', 'S', 'RS', 'T'];
let Tetrimino=sequence[getRandomInt(0,7)];
if(Tetrimino=="I"){
    x-=50;
    y-=100;
}
else if(Tetrimino=="O"){
    x+=50;
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
assign();
let lockDelayStart = null;
const lockDelayDuration = 500;
function draw() {
    const currentTime = performance.now();
    const elapsedTime = currentTime - lastFrameTime;
    if (elapsedTime >= 30) {
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
                if(Tetrimino=="I"){
                    x-=50;
                    y-=100;
                }
                else if(Tetrimino=="O"){
                    x+=50;
                }
                rotation = 0;
                assign();
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
            playfield.unshift([1,0,0,0,0,0,0,0,0,0,0,1]);  
        }
    }
}
function show(){
    for(let i=0;i<tet.length;i++){
        for(let j=0;j<tet[i].length;j++){
            if(tet[i][j]==1){
                ctx.fillRect(x+(j*50),y+(i*50),50,50);
            }
        }
    }
}
function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}
function check(x1,y1,rot,stop){
    let te=rotation;
    rotation=rot;
    assign();
    let col = x1/50;col++;
    let row = y1/50;
    let tcol =x/50;tcol++;
    let trow= y/50;
    for(let i=0;i<tet.length;i++){
        for(let j=0;j<tet[i].length;j++){
            if(tet[i][j]==1&&playfield[i+row][j+col]==1){
                if(stop){
                    for(let a=0;a<tet.length;a++){
                        for(let b=0;b<tet[i].length;b++){
                            if(tet[a][b]==1){
                                playfield[a+trow][b+tcol]=1;
                            }
                        }
                    }
                }
                rotation=te;
                assign();
                return false;
            }
        }
    }
    rotation=te;
    assign();
    return true;
}
function rotate(){
    if(check(x,y,(rotation+1)%4,false)==true){
        rotation=(rotation+1)%4;
    }
    else if(Tetrimino!="I"&&Tetrimino!="O"){
        if(rotation==0){
            if(check(x-50,y,(rotation+1)%4,false)==true){
                x-=50;
                rotation=(rotation+1)%4;
            }
            else if(check(x-50,y+50,(rotation+1)%4,false)==true){
                x-=50;
                y+=50;
                rotation=(rotation+1)%4;
            }
            else if(check(x,y-100,(rotation+1)%4,false)==true){
                y-=100;
                rotation=(rotation+1)%4;
            }
            else if(check(x-50,y-100,(rotation+1)%4,false)==true){
                x-=50;
                y-=100;
                rotation=(rotation+1)%4;
            }
        }
        else if(rotation==1){
            if(check(x+50,y,(rotation+1)%4,false)==true){
                x+=50;
                rotation=(rotation+1)%4;
            }
            else if(check(x+50,y-50,(rotation+1)%4,false)==true){
                x+=50;
                y-=50;
                rotation=(rotation+1)%4;
            }
            else if(check(x,y+100,(rotation+1)%4,false)==true){
                y+=100;
                rotation=(rotation+1)%4;
            }
            else if(check(x+50,y+100,(rotation+1)%4,false)==true){
                x+=50;
                y+=100;
                rotation=(rotation+1)%4;
            }
        }
        else if(rotation==2){
            if(check(x+50,y,(rotation+1)%4,false)==true){
                x+=50;
                rotation=(rotation+1)%4;
            }
            else if(check(x+50,y+50,(rotation+1)%4,false)==true){
                x+=50;
                y+=50;
                rotation=(rotation+1)%4;
            }
            else if(check(x,y-100,(rotation+1)%4,false)==true){
                y-=100;
                rotation=(rotation+1)%4;
            }
            else if(check(x+50,y-100,(rotation+1)%4,false)==true){
                x+=50;
                y-=100;
                rotation=(rotation+1)%4;
            }
        }
        else{
            if(check(x-50,y,(rotation+1)%4,false)==true){
                x-=50;
                rotation=(rotation+1)%4;
            }
            else if(check(x-50,y-50,(rotation+1)%4,false)==true){
                x-=50;
                y-=50;
                rotation=(rotation+1)%4;
            }
            else if(check(x,y+100,(rotation+1)%4,false)==true){
                y+=100;
                rotation=(rotation+1)%4;
            }
            else if(check(x-50,y+100,(rotation+1)%4,false)==true){
                x-=50;
                y+=100;
                rotation=(rotation+1)%4;
            }
        }
    }
    else if(Tetrimino=="I"){
        if(rotation==0){
            if(check(x+50,y,(rotation+1)%4,false)==true){
                x+=50;
                rotation=(rotation+1)%4;
            }
            else if(check(x-50,y,(rotation+1)%4,false)==true){
                x-=50;
                rotation=(rotation+1)%4;
            }
            else if(check(x+100,y,(rotation+1)%4,false)==true){
                x+=100;
                rotation=(rotation+1)%4;
            }
            else if(check(x-50,y-50,(rotation+1)%4,false)==true){
                x-=50;
                y-=50;
                rotation=(rotation+1)%4;
            }
            else if(check(x+100,y+100,(rotation+1)%4,false)==true){
                x+=100;
                y+=100;
                rotation=(rotation+1)%4;
            }
        }
        else if(rotation==1){
            if(check(x,y-50,(rotation+1)%4,false)==true){
                y-=50;
                rotation=(rotation+1)%4;
            }
            else if(check(x-50,y-50,(rotation+1)%4,false)==true){
                x-=50;
                y-=50;
                rotation=(rotation+1)%4;
            }
            else if(check(x+100,y+50,(rotation+1)%4,false)==true){
                x+=100;
                y+=50;
                rotation=(rotation+1)%4;
            }
            else if(check(x-50,y+50,(rotation+1)%4,false)==true){
                x-=50;
                y+=50;
                rotation=(rotation+1)%4;
            }
            else if(check(x+100,y-100,(rotation+1)%4,false)==true){
                x+=100;
                y-=100;
                rotation=(rotation+1)%4;
            }
        }
        else if(rotation==2){
            if(check(x-50,y,(rotation+1)%4,false)==true){
                x-=50;
                rotation=(rotation+1)%4;
            }
            else if(check(x+50,y,(rotation+1)%4,false)==true){
                x+=50;
                rotation=(rotation+1)%4;
            }
            else if(check(x-100,y,(rotation+1)%4,false)==true){
                x-=100;
                rotation=(rotation+1)%4;
            }
            else if(check(x+50,y+50,(rotation+1)%4,false)==true){
                x+=50;
                y+=50;
                rotation=(rotation+1)%4;
            }
            else if(check(x-100,y-100,(rotation+1)%4,false)==true){
                x-=100;
                y-=100;
                rotation=(rotation+1)%4;
            }
        }
        else{
            if(check(x-50,y,(rotation+1)%4,false)==true){
                x-=50;
                rotation=(rotation+1)%4;
            }
            else if(check(x-50,y-50,(rotation+1)%4,false)==true){
                x-=50;
                y-=50;
                rotation=(rotation+1)%4;
            }
            else if(check(x+100,y-50,(rotation+1)%4,false)==true){
                x+=100;
                y-=50;
                rotation=(rotation+1)%4;
            }
            else if(check(x-50,y+50,(rotation+1)%4,false)==true){
                x-=50;
                y+=50;
                rotation=(rotation+1)%4;
            }
            else if(check(x+100,y-100,(rotation+1)%4,false)==true){
                x+=100;
                y-=100;
                rotation=(rotation+1)%4;
            }
        }
    }
    assign();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    show();
    lockDelayStart = null;
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
    else if (e.key == 'x') {
        rotate();
    }
});

const blockCanvas = document.getElementById('block');
let pointerStartX = 0;
let pointerCurrentX = 0;
let isSwiping = false;
let lastTapTime = 0;
const tapDebounceTime = 30; // Time in milliseconds to debounce taps

blockCanvas.addEventListener('pointerdown', function(event) {
    pointerStartX = event.screenX;
    pointerCurrentX = event.screenX;
    isSwiping = false; // Reset swiping flag
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
    const currentTime = Date.now();
    if (!isSwiping && pointerStartX === pointerCurrentX) {
        if (currentTime - lastTapTime > tapDebounceTime) {
            rotate();
            lastTapTime = currentTime;
        }
    }
    pointerStartX = 0; // Reset pointer start position
    event.preventDefault(); // Prevent any default action
}, false);

function handleSwipeWhileMoving() {
    if (pointerCurrentX > pointerStartX + 20) {
        if (check(x + 50, y, rotation, false) === true) {
            x += 50;
            ctx.clearRect(0, 0, blockCanvas.width, blockCanvas.height);
            show();
            lockDelayStart = null;
        }
        pointerStartX = pointerCurrentX; // Reset start position to allow continuous swiping
        isSwiping = true; // Set swiping flag
    } 
    else if (pointerCurrentX < pointerStartX - 20) {
        if (check(x - 50, y, rotation, false) === true) {
            x -= 50;
            ctx.clearRect(0, 0, blockCanvas.width, blockCanvas.height);
            show();
            lockDelayStart = null;
        }
        pointerStartX = pointerCurrentX; // Reset start position to allow continuous swiping
        isSwiping = true; // Set swiping flag
    }
}



function assign(){
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
    if(Tetrimino=="L"){
        if(rotation == 0){
            tet = [
                [0, 0, 1],
                [1, 1, 1],
                [0, 0, 0],
            ];
        }
        else if(rotation == 1){
            tet = [
                [0, 1, 0],
                [0, 1, 0],
                [0, 1, 1],
            ];
        }
        else if(rotation == 2){
            tet = [
                [0, 0, 0],
                [1, 1, 1],
                [1, 0, 0],
            ];
        }
        else if(rotation == 3){
            tet = [
                [1, 1, 0],
                [0, 1, 0],
                [0, 1, 0],
            ];
        }
    }
    else if(Tetrimino=="RL"){
        if(rotation == 0){
            tet = [
                [1, 0, 0],
                [1, 1, 1],
                [0, 0, 0],
            ];
        }
        else if(rotation == 1){
            tet = [
                [0, 1, 1],
                [0, 1, 0],
                [0, 1, 0],
            ];
        }
        else if(rotation == 2){
            tet = [
                [0, 0, 0],
                [1, 1, 1],
                [0, 0, 1],
            ];
        }
        else if(rotation == 3){
            tet = [
                [0, 1, 0],
                [0, 1, 0],
                [1, 1, 0],
            ];
        }
    }
    else if(Tetrimino=="S"){
        if(rotation == 0){
            tet = [
                [0, 1, 1],
                [1, 1, 0],
                [0, 0, 0],
            ];
        }
        else if(rotation == 1){
            tet = [
                [0, 1, 0],
                [0, 1, 1],
                [0, 0, 1],
            ];
        }
        else if(rotation == 2){
            tet = [
                
                [0, 0, 0],
                [0, 1, 1],
                [1, 1, 0],
            ];
        }
        else {
            tet = [
                [1, 0, 0],
                [1, 1, 0],
                [0, 1, 0],
            ];
        }
    }
    else if(Tetrimino=="RS"){
        if(rotation == 0){
            tet = [
                [1, 1, 0],
                [0, 1, 1],
                [0, 0, 0],
            ];
        }
        else if(rotation == 1){
            tet = [
                [0, 0, 1],
                [0, 1, 1],
                [0, 1, 0],
            ];
        }
        else if(rotation == 2){
            tet = [
                
                [0, 0, 0],
                [1, 1, 0],
                [0, 1, 1],
            ];
        }
        else {
            tet = [
                [0, 1, 0],
                [1, 1, 0],
                [1, 0, 0],
            ];
        }
    }
    else if(Tetrimino=="T"){
        if(rotation == 0){
            tet = [
                [0, 1, 0],
                [1, 1, 1],
                [0, 0, 0],
            ];
        }
        else if(rotation == 1){
            tet = [
                [0, 1, 0],
                [0, 1, 1],
                [0, 1, 0],
            ];
        }
        else if(rotation == 2){
            tet = [
                [0, 0, 0],
                [1, 1, 1],
                [0, 1, 0],
            ];
        }
        else if(rotation == 3){
            tet = [
                [0, 1, 0],
                [1, 1, 0],
                [0, 1, 0],
            ];
        }
    }
    else if(Tetrimino=="I"){
        if(Tetrimino=="I"){
            if(rotation == 0){
                tet = [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 1, 1, 1, 1],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                ];
            }
            else if(rotation == 1){
                tet = [
                    [0, 0, 0, 0, 0],
                    [0, 0, 1, 0, 0],
                    [0, 0, 1, 0, 0],
                    [0, 0, 1, 0, 0],
                    [0, 0, 1, 0, 0],
                ];
            }else if(rotation == 2){
                tet = [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [1, 1, 1, 1, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                ];
            }
            else {
                tet = [
                    [0, 0, 1, 0, 0],
                    [0, 0, 1, 0, 0],
                    [0, 0, 1, 0, 0],
                    [0, 0, 1, 0, 0],
                    [0, 0, 0, 0, 0],
                ];
            }
        }
    }
    else if(Tetrimino=="O"){
        tet = [
            [1, 1],
            [1, 1],
        ];
    }
}

window.requestAnimationFrame(draw);
