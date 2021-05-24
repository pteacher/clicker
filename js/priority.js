const prior = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x568EBF
});

document.body.appendChild(prior.view);
prior.stage.sortableChildren = true;

let pane = new PIXI.Graphics();
pane.beginFill(0xD99A4E);
pane.lineStyle(2, 0x000000, 1);
pane.drawRect(0, 0, prior.screen.width, 68);
pane.endFill();
prior.stage.addChild(pane);

const scoreText = new PIXI.Text("0/20");
scoreText.anchor.set(0.5)
scoreText.x = prior.screen.width * 0.9;
scoreText.y = 35;
prior.stage.addChild(scoreText);

let score = 0;
// Math.ceil(Math.random() * 6) - 3; 
let n = 3;
let k = 300 / n;
let h = prior.screen.height * 0.5;
let ans = 0;

const problemText = new PIXI.Text( " = " + ans);
problemText.anchor.set(0.5);
problemText.x = prior.screen.width * 0.5;
problemText.y = h + 50;
prior.stage.addChild(problemText);

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

buttonContainer.x = prior.screen.width * 0.5;
buttonContainer.y = prior.screen.height * 0.9;
buttonContainer.interactive = true;
buttonContainer.buttonMode = true;
buttonContainer.on("pointerdown", onSubmit);
prior.stage.addChild(buttonContainer);
// BUTTON

let parts = new PIXI.Container();
newTask();

function newTask() {
    
    for (let i = 0; i < n; i++) {
        let block = new PIXI.Graphics();
        block.lineStyle(2, 0x000000, 1);
        block.beginFill(0x000000);
        block.drawEllipse(prior.screen.width * 0.5 + (k * (n / 2 - i - 0.5)) * (1 - 1 / k), h - 15, 15, 15);
        block.endFill();
        block.interactive = true;
        block.buttonMode = true;
        parts.addChild(block);
    }
    prior.stage.addChild(parts);
}

let x =  Math.round(Math.random() * 8) + 1
let y =  Math.round(Math.random() * 8) + 1;
let priorArr = [];
let order = 1;
let eqq = eq(x, y, 0, 1, n);
problemText.text = eqq;

const split = (expression, operator) => {
    const result = [];
    let braces = 0;
    let currentChunk = "";
    for (let i = 0; i < expression.length; ++i) {
        const curCh = expression[i];
        if (curCh == '(') {
            braces++;
        } else if (curCh == ')') {
            braces--;
        }
        if (braces == 0 && operator == curCh && expression[i - 1] == ' ') {
            result.push(currentChunk);
            currentChunk = "";
        } else currentChunk += curCh;
    }
    if (currentChunk != "") {
        result.push(currentChunk);
    }
    return result;
};
// this will only take strings containing * operator [ no + ]
const parseMultiplicationSeparatedExpression = (expression) => {
    const numbersString = split(expression, '*');
    console.log(numbersString);
    const numbers = numbersString.map(noStr => {
        if (noStr[0] == '(') {
            const expr = noStr.substr(1, noStr.length - 2);
            // recursive call to the main function
            return parsePlusSeparatedExpression(expr);
        }
        return +noStr;
    });
    const initialValue = 1.0;
    const result = numbers.reduce((acc, no) => acc * no, initialValue);
    return result;
};
// both * -
const parseMinusSeparatedExpression = (expression) => {
    const numbersString = split(expression, '-');
    console.log(numbersString);
    const numbers = numbersString.map(noStr => parseMultiplicationSeparatedExpression(noStr));
    const initialValue = numbers[0];
    const result = numbers.slice(1).reduce((acc, no) => acc - no, initialValue);
    return result;
};
// * - + 
const parsePlusSeparatedExpression = (expression) => {
    const numbersString = split(expression, '+');
    console.log(numbersString);
    const numbers = numbersString.map(noStr => parseMinusSeparatedExpression(noStr));
    const initialValue = 0.0;
    const result = numbers.reduce((acc, no) => acc + no, initialValue);
    return result;
};

let res = parsePlusSeparatedExpression(eqq, '+');
console.log(res);

function eq(a, b, lr, p, n) {
    if (p == 0) {
        if (Math.round(Math.random()) == 0) {
            a = a + "  +  " + b;
        } else {
            a = a + "  -  " + b;
        }
    } else {
        if (Math.round(Math.random() * 2) == 0) {
            a = a + "  *  " + b;
        } else if (Math.round(Math.random() * 2) == 1) {
            a = a + "  /  " + b;
        } else {
            a = "(" + a + "  +  " + b + ")";
        }
    }
    
    if (n == 1) return a;
    b = Math.ceil(Math.random() * 8) - 1;
    lr =  lr==0?1:0;
    p =  Math.round(Math.random());
    if (lr == 0) {
        
        return eq(a, b, lr, p, n - 1);
    } else {
        
        return eq(b, a, lr, p, n - 1);
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
    writeNewResult("prior", localStorage.name, dateTime, res);
    parts.removeChildren();
    a = Math.ceil(Math.random() * 6) - 3; 
    b = Math.ceil(Math.random() * 6) - 3; 
    c = Math.ceil(Math.random() * 6) - 3;
    newTask();
    mover.zIndex = 999;
    mover.x = prior.screen.width / 2 - 10;
    ans = 0;
    problemText.text = a + " + " + b + " + " + c + " = " + ans;
    scoreText.text = score + "/20";
}