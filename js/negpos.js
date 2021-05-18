const negpos = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x568EBF
});

document.body.appendChild(negpos.view);
negpos.stage.sortableChildren = true;

let pane = new PIXI.Graphics();
pane.beginFill(0xD99A4E);
pane.lineStyle(2, 0x000000, 1);
pane.drawRect(0, 0, negpos.screen.width, 68);
pane.endFill();
negpos.stage.addChild(pane);

const scoreText = new PIXI.Text("0/20");
scoreText.anchor.set(0.5)
scoreText.x = negpos.screen.width * 0.9;
scoreText.y = 35;
negpos.stage.addChild(scoreText);

let score = 0;
let a = Math.ceil(Math.random() * 6) - 3; 
let b = Math.ceil(Math.random() * 6) - 3; 
let c = Math.ceil(Math.random() * 6) - 3;
let n = 20;
let k = negpos.screen.width / n ;
let h = negpos.screen.height * 0.5;
let ans = 0;

const problemText = new PIXI.Text(a + " + " + b + " + " + c + " = " + ans);
problemText.anchor.set(0.5);
problemText.x = negpos.screen.width * 0.5;
problemText.y = 35;
negpos.stage.addChild(problemText);

// BUTTON
let buttonContainer = new PIXI.Container();
const buttonText = new PIXI.Text("OK");
buttonText.anchor.set(0.5);

let buttonPane = new PIXI.Graphics();
buttonPane.beginFill(0xF2E749);
buttonPane.lineStyle(2, 0x000000, 1);
buttonPane.drawRect(-100, -30, 200, 60);
buttonPane.endFill();
buttonContainer.addChild(buttonPane);
buttonContainer.addChild(buttonText);

buttonContainer.x = negpos.screen.width * 0.5;
buttonContainer.y = negpos.screen.height * 0.9;
buttonContainer.interactive = true;
buttonContainer.buttonMode = true;
buttonContainer.on("pointerdown", onSubmit);
negpos.stage.addChild(buttonContainer);
// BUTTON



let parts = new PIXI.Container();
newTask();


function newTask() {


    let arrow = new PIXI.Graphics();
    arrow.lineStyle(2, 0x000000, 1);
    arrow.drawRect(0, h, negpos.screen.width, 2);
    negpos.stage.addChild(arrow);
    
    for (let i = 1; i < n; i++) {
        if (i % 2 == 0) {
            let triangle = new PIXI.Graphics();
            triangle.lineStyle(2, 0x000000, 1);
            triangle.drawRect(k * i, h - 15, 1, 30);
            parts.addChild(triangle);

            const problemText = new PIXI.Text(i - (n / 2), {"fill": "#ffffff", "fontSize": 20});
            problemText.anchor.set(0.5);
            problemText.x = k * i;
            problemText.y = h + 40;
            parts.addChild(problemText);
        }
    }
    negpos.stage.addChild(parts);
}

let mover = new PIXI.Graphics();
mover.lineStyle(2, 0x000000, 1);
mover.beginFill(0xD99A4E);

mover.drawRect(0, 0, 20, 40);
mover.x = negpos.screen.width / 2 - 10;
mover.y = negpos.screen.height * 0.5 - 20;

mover.endFill();
mover.interactive = true;
mover.buttonMode = true;
mover
.on('pointerdown', onDragStart)
.on('pointerup', onDragEnd)
.on('pointerupoutside', onDragEnd)
.on('pointermove', onDragMove);
negpos.stage.addChild(mover);

function onDragStart(event) {
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
}

function onDragEnd() {
    this.alpha = 1;
    this.dragging = false;
    this.data = null;
    ans = Math.floor(this.x / k) - 9;
    problemText.text = a + " + " + b + " + " + c + " = " + ans;
}

function onDragMove() {
    if (this.dragging) {
        const newPosition = this.data.getLocalPosition(this.parent);
        this.x = Math.round((newPosition.x) / k) * k - this.width / 2;
        
    }
}

function onSubmit() {
    let current = new Date();
    let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
    let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
    let dateTime = cDate + ' ' + cTime;
    let res = 0;
    if (a + b + c == ans) {
        score++;
        res = 1;
    }
    else {
        score = 0;
    }
    writeNewResult("negpos", localStorage.name, dateTime, res);
    parts.removeChildren();
    a = Math.ceil(Math.random() * 6) - 3; 
    b = Math.ceil(Math.random() * 6) - 3; 
    c = Math.ceil(Math.random() * 6) - 3;
    newTask();
    mover.zIndex = 999;
    mover.x = negpos.screen.width / 2 - 10;
    ans = 0;
    problemText.text = a + " + " + b + " + " + c + " = " + ans;
    scoreText.text = score + "/20";
}