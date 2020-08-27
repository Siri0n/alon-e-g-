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
	this.load.json(`level-${level}`, `src/assets/levels/${levelFilename}`);
}

function create() {
	const level = this.level;
  const grid = new PuzzleGrid({
    scene: this,
    x: 100,
    y: 100,
    cellSize: 64
  });
  grid.load(this.cache.json.get(`level-${level}`).elements);
  this.add.existing(grid);
  
  const controller = new GridController(grid);
  controller.on('win', () => this.scene.start('level', {level: level + 1}));
}

export default {
	key: 'level',
	init,
	preload,
	create
}