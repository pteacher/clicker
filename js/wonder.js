const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0xffffff, 
    resolution: window.devicePixelRatio || 1,
});

document.body.appendChild(app.view);
const w = window.innerWidth;
const h = window.innerHeight;

function letterBlock(c, x, y, v) {
    const block = PIXI.Sprite.from("assets/block.png");
    block.scale.set(0.5);
    block.anchor.set(0.5);
    let letter = new PIXI.Text(c);
    letter.anchor.set(0.5);
    letter.visible = v;

    let guessBlock = new PIXI.Container();
    guessBlock.addChild(block);
    guessBlock.addChild(letter);
    guessBlock.x = x;
    guessBlock.y = y;

    return guessBlock;
}

let word = "MOUSE";
let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let letters = [];
// ADDING WORD

for (let i = 0; i < word.length; i++) {

    let letter = letterBlock(word[i], 
        w / 2 + 70 * i - word.length / 2 * 70, 
        h / 2, 
        false);
    letter.interactive = true;
    letters.push(letter);
    app.stage.addChild(letter);        
}

// ADDING KEYBOARD

for (let i = 0; i < alphabet.length; i++) {
    let letter = letterBlock(alphabet[i], 
        w / 2 + 70 * (i % 8) - 4 * 70, 
        h - h / 3 + 70 * Math.floor(i / 8), 
        true);
    letter.interactive = true;
    letter.on("pointerdown", function() {onClick(letter)});
    app.stage.addChild(letter);        
}

function onClick(letter) {
    letters.forEach(element => {
        if (element.getChildAt(1).text == letter.getChildAt(1).text) {
            element.getChildAt(1).visible = true;
        }
    });
}


