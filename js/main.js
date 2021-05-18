const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x568EBF
});

document.body.appendChild(app.view);

var frac = 0;
var score = 0;

let n = Math.ceil(Math.random() * 10) + 2;
let m = Math.ceil(Math.random() * (n - 1));

const cookie = PIXI.Sprite.from("assets/cookie.png");
const cookieClick = PIXI.Sprite.from("assets/cookie.png");

let pane = new PIXI.Graphics();
pane.beginFill(0xD99A4E);
pane.lineStyle(2, 0x000000, 1);
pane.drawRect(0, 0, app.screen.width, 68);
pane.endFill();
app.stage.addChild(pane);

const scoreText = new PIXI.Text("0/20");
scoreText.anchor.set(0.5)
scoreText.x = app.screen.width * 0.9;
scoreText.y = 35;

const problemText = new PIXI.Text(m + "/" + n);
problemText.anchor.set(0.5);
problemText.x = app.screen.width * 0.5;
problemText.y = 35;
app.stage.addChild(problemText);

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

buttonContainer.x = app.screen.width * 0.5;
buttonContainer.y = app.screen.height * 0.9;
buttonContainer.interactive = true;
buttonContainer.buttonMode = true;
buttonContainer.on("pointerdown", onSubmit);
app.stage.addChild(buttonContainer);

// BUTTON



cookie.anchor.set(0.5);
cookie.scale.set(0.5);
cookieClick.anchor.set(0.5);
cookieClick.scale.set(0.5);
cookieClick.alpha = 0.4;

cookie.x = app.screen.width / 2;
cookie.y = app.screen.height / 2;
cookieClick.x = app.screen.width / 2;
cookieClick.y = app.screen.height / 2;

cookieClick.interactive = true;
cookieClick.buttonMode = true;
cookieClick.on("pointerdown", onClick);

app.stage.addChild(cookie);
app.stage.addChild(cookieClick);
app.stage.addChild(scoreText);

let graphics = new PIXI.Graphics();
graphics.lineStyle(2, 0xF26849, 1);
graphics.drawEllipse(cookie.x, cookie.y, 128, 128);

let parts = new PIXI.Container();
let linesContainer = new PIXI.Container();
newTask();

function newTask() {
    let a = 360 / n;
    let k = Math.tan(a * Math.PI / 360);
    
    for (let i = 0; i < n; i++) {
        let triangle = new PIXI.Graphics();
        triangle.lineStyle(2, 0xF2C53D, 2);
        triangle.drawPolygon([
            -102 * k, 102,
            0, 0,
            102 * k, 102,  
            0, 0
        ]);

        triangle.x = cookie.x;
        triangle.y = cookie.y;
        triangle.rotation = Math.PI / (n / 2) * i;
        linesContainer.addChild(triangle);
    }

    for (let i = 0; i < n; i++) {
        let triangle = new PIXI.Graphics();
        triangle.lineStyle(2, 0x000000, 1);
        triangle.beginFill(0xD99A4E);
        triangle.drawPolygon([
            -1000 * k, 1000,
            1000 * k, 1000,  
            0, 0
        ]);
        triangle.endFill();

        triangle.x = cookie.x;
        triangle.y = cookie.y;
        triangle.rotation = Math.PI / (n / 2) * i;
        triangle.visible = false;
        parts.addChild(triangle);
    }
    app.stage.addChild(parts);
    cookie.mask = parts;
    app.stage.addChild(graphics);
    app.stage.addChild(linesContainer);
}

function onClick() {
    frac++;
    
    try {
        parts.getChildAt(frac - 1).visible = true;
    }
    catch {
        console.log('none');
    }
}

function onSubmit() {
    let current = new Date();
    let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
    let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
    let dateTime = cDate + ' ' + cTime;
    let res = 0;
    if (frac == m) {
        score++;
        res = 1;
    }
    else {
        score = 0;
    }
    writeNewResult(localStorage.name, dateTime, res);
    linesContainer.removeChildren();
    parts.removeChildren();
    n = Math.ceil(Math.random() * 10) + 2;
    m = Math.ceil(Math.random() * (n - 1));
    newTask();
    frac = 0;
    problemText.text = m + "/" + n;
    scoreText.text = score + "/20";
}


