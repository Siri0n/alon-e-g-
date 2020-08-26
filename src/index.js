import Phaser from 'phaser';
import PuzzleGrid from './puzzle-grid';
import GridController from './grid-controller';
import Heart from './heart';
import Flower from './flower';

import heartImage from './assets/heart.png';
import flowerImage from './assets/flower.png';

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create
  }
};

const game = new Phaser.Game(config);

function preload() {
  this.load.spritesheet('heart', heartImage, {frameWidth: 64, frameHeight: 64});
  this.load.spritesheet('flower', flowerImage, {frameWidth: 64, frameHeight: 64});
  this.load.json('test-level', 'src/assets/test-level.json');
}


function create() {
  const grid = new PuzzleGrid({
    scene: this,
    x: 100,
    y: 100,
    cellSize: 64
  });
  grid.load(this.cache.json.get('test-level').elements);
  this.add.existing(grid);
  
  const controller = new GridController(grid);
}
