const canvas = document.getElementById("block");
const ctx = canvas.getContext("2d");
const mass = document.getElementById("mass");
const mtx = mass.getContext("2d");
const hol = document.getElementById("hold");
const htx = hol.getContext("2d");
let popo=0;
let y=0;
let x=150;
let tet=[];
let rotation=0;
let level=20;
let lines=190;
let score=0;
let hold="";
mtx.fillStyle = "white";
htx.fillStyle = "white";
htx.fillRect(0,0,200,200);
for(let i=0;i<20;i++){
    for(let j=0;j<10;j++){
        mtx.fillRect((50*j)+1, (50*i)+1, 48, 48);
    }
}
const playfield = [];
for (let row = -2; row < 20; row++) {
  playfield[row] = [1,0,0,0,0,0,0,0,0,0,0,1];
}
playfield[20] = [];
for (let col = 0; col < 12; col++) {
    playfield[20][col] = 1;
}
let pieces = ['I', 'RL', 'L', 'O', 'S', 'RS', 'T'];
const sequence1 = ['I', 'RL', 'L', 'O', 'S', 'RS', 'T'];
let sequence2 = ['I', 'RL', 'L', 'O', 'S', 'RS', 'T'];
shuffleArray(sequence1);
shuffleArray(sequence2);
let Tetrimino=sequence1[0];
sequence1.splice(0,1);
sequence1.push(sequence2[0]);
sequence2.splice(0,1);
if(Tetrimino=="I"){
    x-=50;
    y-=100;
}
else if(Tetrimino=="O"){
    x+=50;
}
assign();
let lastFrameTime = performance.now();
let lockDelayStart = null;
const lockDelayDuration = 500;
function draw() {
    console.log(level);
    const currentTime = performance.now();
    const elapsedTime = currentTime - lastFrameTime;
    if (elapsedTime >= 0) {
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
                Tetrimino = sequence1[0];
                sequence1.splice(0,1);
                if(sequence2.length==0){
                    sequence2=pieces.slice();
                    console.log(sequence2);
                    shuffleArray(sequence2);
                    console.log(sequence2);
                }
                sequence1.push(sequence2[0]);
                sequence2.splice(0,1);
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
function swap(){
    if(hold==""){
        rotation = 0;
        assign();
        for(let i=0;i<tet.length;i++){
            for(let j=0;j<tet[i].length;j++){
                if(tet[i][j]==1){
                    if(Tetrimino=="O"){
                        htx.fillRect((j*40)+35,(i*40)+35,40,40);
                    }
                    else if(Tetrimino=="I"){
                        htx.fillRect((j*40)-40,(i*40)-30,40,40);
                    }
                    else{
                        htx.fillRect((j*40)+15,(i*40)+30,40,40);
                    }
                }
            }
        }
        hold=Tetrimino;
        y = 0;
        x = 150;
        Tetrimino = sequence1[0];
        sequence1.splice(0,1);
        if(sequence2.length==0){
            sequence2=pieces;
            shuffleArray(sequence2);
        }
        sequence1.push(sequence2[0]);
        sequence2.splice(0,1);
        if(Tetrimino=="I"){
            x-=50;
            y-=100;
        }
        else if(Tetrimino=="O"){
            x+=50;
        }
        assign();
    }
    else{
        htx.fillStyle="white";
        htx.fillRect(0,0,200,200);
        rotation = 0;
        assign();
        for(let i=0;i<tet.length;i++){
            for(let j=0;j<tet[i].length;j++){
                if(tet[i][j]==1){
                    if(Tetrimino=="O"){
                        htx.fillRect((j*40)+35,(i*40)+35,40,40);
                    }
                    else if(Tetrimino=="I"){
                        htx.fillRect((j*40)-40,(i*40)-30,40,40);
                    }
                    else{
                        htx.fillRect((j*40)+15,(i*40)+30,40,40);
                    }
                }
            }
        }
        let temp=hold;
        hold=Tetrimino;
        y = 0;
        x = 150;
        Tetrimino = temp;
        if(Tetrimino=="I"){
            x-=50;
            y-=100;
        }
        else if(Tetrimino=="O"){
            x+=50;
        }
        assign();
    }
}
function clear(){
    let fil;
    let x=0;
    for (var row = 0; row < playfield.length-1; row++) {
        fil=true;
        for (var col = 0; col < playfield[row].length; col++) {
            if (playfield[row][col] == 0) {
                fil=false;
            }
        }
        if(fil){
            x++;
        }
    }
    lines+=x;
    if((lines-(lines%10))/10!=0){
        level=20-((lines-(lines%10))/10);
    }
    if(x==1){
        score+=100*(21-level);
    }
    else if(x==2){
        score+=300*(21-level);
    }
    else if(x==3){
        score+=500*(21-level);
    }
    else if(x==4){
        score+=800*(21-level);
    }
    document.getElementById('level').textContent = 21-level;
    document.getElementById('score').textContent = score;
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
                ctx.fillRect(x+(j*50)+1,y+(i*50)+1,48,48);
            }
        }
    }
}
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
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
    lockDelayStart = null;
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
function assign(){
    if(Tetrimino=="L"){
        htx.fillStyle = "orange";
        ctx.fillStyle = "orange";
    }
    else if(Tetrimino=="RL"){
        htx.fillStyle = "blue";
        ctx.fillStyle = "blue";
    }
    else if(Tetrimino=="S"){
        htx.fillStyle = "green";
        ctx.fillStyle = "green";
    }
    else if(Tetrimino=="RS"){
        htx.fillStyle = "red";
        ctx.fillStyle = "red";
    }
    else if(Tetrimino=="T"){
        htx.fillStyle = "purple";
        ctx.fillStyle = "purple";
    }
    else if(Tetrimino=="I"){
        htx.fillStyle = "cyan";
        ctx.fillStyle = "cyan";
    }
    else if(Tetrimino=="O"){
        htx.fillStyle = "yellow";
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
    else if (e.key == 'z') {
        swap();
    }
    else if (e.key == 'x') {
        rotate();
    }
});

const blockCanvas = document.getElementById('tetris-container');
let pointerStartX = 0;
let pointerStartY = 0;
let pointerCurrentX = 0;
let pointerCurrentY = 0;
let isSwiping = false;
let lastTapTime = 0;
const tapDebounceTime = 50; // Time in milliseconds to debounce tap

document.body.addEventListener('pointerdown', function(event) {
    pointerStartX = event.screenX;
    pointerStartY = event.screenY;
    pointerCurrentX = event.screenX;
    pointerCurrentY = event.screenY;
    isSwiping = false; // Reset swiping flag
    event.preventDefault(); // Prevent any default action
}, false);

document.body.addEventListener('pointermove', function(event) {
    if (pointerStartX !== 0) {
        pointerCurrentX = event.screenX;
        pointerCurrentY = event.screenY;
        event.preventDefault();
        handleSwipeWhileMoving();
    }
}, false);

document.body.addEventListener('pointerup', function(event) {
    const currentTime = Date.now();
    if (!isSwiping && pointerStartX === pointerCurrentX && pointerStartY === pointerCurrentY) {
        if (currentTime - lastTapTime > tapDebounceTime) {
            rotate();
            lastTapTime = currentTime;
        }
    }
    pointerStartX = 0; // Reset pointer start position
    pointerStartY = 0; // Reset pointer start position
    event.preventDefault(); // Prevent any default action
}, false);

function handleSwipeWhileMoving() {
    lockDelayStart = null;
    if (pointerCurrentX > pointerStartX + 20) {
        // Handle swipe right
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
        // Handle swipe left
        if (check(x - 50, y, rotation, false) === true) {
            x -= 50;
            ctx.clearRect(0, 0, blockCanvas.width, blockCanvas.height);
            show();
            lockDelayStart = null;
        }
        pointerStartX = pointerCurrentX; // Reset start position to allow continuous swiping
        isSwiping = true; // Set swiping flag
    }
    else if (pointerCurrentY > pointerStartY + 50) {
        // Handle swipe down
        if (check(x, y + 50, rotation, false) === true) {
            y += 50;
            ctx.clearRect(0, 0, blockCanvas.width, blockCanvas.height);
            show();
            lockDelayStart = null;
        }
        pointerStartY = pointerCurrentY; // Reset start position to allow continuous swiping
        isSwiping = true; // Set swiping flag
    }
    else if (pointerCurrentY < pointerStartY - 50) {
        swap();
        pointerStartY = pointerCurrentY; // Reset start position to allow continuous swiping
        isSwiping = true; // Set swiping flag
    }
}



window.requestAnimationFrame(draw);
