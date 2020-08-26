import Phaser from "phaser";
import PuzzleGrid from "./puzzle-grid";
import GridController from "./grid-controller";
import Heart from "./heart";
import Flower from "./flower";

import heartImage from "./assets/heart.png";
import flowerImage from "./assets/flower.png";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create
  }
};

const game = new Phaser.Game(config);

function preload() {
  this.load.spritesheet("heart", heartImage, {frameWidth: 64, frameHeight: 64});
  this.load.spritesheet("flower", flowerImage, {frameWidth: 64, frameHeight: 64});
}


const hearts = [...Array(4)].map((_, i) => ({
  type: 'heart',
  xn: i,
  yn: i,
  direction: i
}));

const flowers = [...Array(3)]
  .flatMap((_, i) => [[i, i + 1], [i + 1, i]])
  .map(([xn, yn]) => ({
    type: 'flower',
    xn,
    yn
  }));

function create() {
  const grid = new PuzzleGrid({
    scene: this,
    x: 100,
    y: 100,
    cellSize: 64
  });
  grid.on("test", () => {console.log('ololo')});
  grid.load([...hearts, ...flowers]);
  this.add.existing(grid);
  
  const controller = new GridController(grid);
}
