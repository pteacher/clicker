const app = new PIXI.Application({
    width: 1080,
    height: window.innerHeight,
    backgroundColor: 0xffffff, 
    resolution: window.devicePixelRatio || 1,
});

document.body.appendChild(app.view);

const sea = PIXI.Sprite.from("assets/sea.png");
sea.y = -1080;
app.ticker.add(() => {
    sea.y += 2;
    if (sea.y >= -1080 + 242) {
        sea.y = -1080;
    }

});

app.stage.addChild(sea);