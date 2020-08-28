import Phaser from 'phaser';

import PuzzleGrid from '../components/puzzle-grid';
import GridController from '../components/grid-controller';
import Heart from '../components/heart';
import Flower from '../components/flower';

function init({level}){
	this.level = level;
}

function preload() {
	const level = this.level;
	const levelFilename = this.cache.json.get('levels-list').levels[level];
	this.load.json(`level-${level}`, `assets/levels/${levelFilename}`);
}

function create() {
	const level = this.level;
  const grid = new PuzzleGrid({
    scene: this,
    x: 200,
    y: 200,
    cellSize: 64
  });
  grid.load(this.cache.json.get(`level-${level}`).elements);
  this.add.existing(grid);
  //Phaser.Display.Bounds.CenterOn(grid, this.cameras.main.width / 2, this.cameras.main.height/2);
  
  const controller = new GridController(grid);
  this.cameras.main.fadeIn(250, 0, 0, 0)

  controller.on('win', 
  	() => this.cameras.main.fade(250, 0, 0, 0)
  );
  this.cameras.main.once('camerafadeoutcomplete', () => this.scene.start('level', {level: level + 1}));
}

export default {
	key: 'level',
	init,
	preload,
	create
}