import PIXI from 'pixi.js';

const WIDTH = 1480,
      HEIGHT = 720,
      COLUMNS = 10,
      ROWS = 4;

let renderer = PIXI.autoDetectRenderer(WIDTH, HEIGHT, {backgroundColor : 0xffffff}),
    stage = new PIXI.Container(),
    tileSize = WIDTH / COLUMNS,
    fontStyle = {
    fill : '#F7EDCA',
    stroke : '#4a1850',
    align : 'center',
    strokeThickness : 3
  };

document.body.appendChild(renderer.view);

stage.interactive = true;

drawTiles([null, null]);

function drawTiles(selected) {
  const [selX, selY] = selected;

  for(let x = 0; x < COLUMNS; x = x + 1) {
    for(let y = 0; y < ROWS; y = y + 1) {

      let graphics = new PIXI.Graphics();

      if(x === selX && y === selY) {
        graphics.lineStyle(1, 0xaaffaa, 1);
        graphics.beginFill(0x991010, 1);
        let textString = '[ ' + (x + 1) + ' , ' +  (y + 1) + ' ]',
            text = new PIXI.Text(textString, fontStyle);
        text.anchor = new PIXI.Point(0.5,0.5);
        text.x = (x * tileSize) + (tileSize/2);
        text.y = (y * tileSize) + (tileSize/2);
        text.width = tileSize * 2;
        graphics.addChild(text);
      } else {
        graphics.lineStyle(2, 0xaaffaa, 1);
        graphics.beginFill(0x109910, 1);
      }
      graphics.interactive = true;
      graphics.buttonMode = true;

      graphics.drawRect(x * tileSize, y*tileSize, tileSize, tileSize);

      graphics.hitArea = new PIXI.Rectangle(x * tileSize, y * tileSize, tileSize, tileSize);

      stage.addChild(graphics);

      graphics.click = e => {
        drawTiles([x,y]);
      };
     }
  }
}

requestAnimationFrame(animate);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(stage);
}
