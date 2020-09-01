import Phaser from 'phaser';

import PuzzleGrid from '../components/puzzle-grid';
import GridController from '../components/grid-controller';
import Heart from '../components/heart';
import Flower from '../components/flower';

function init({level}){
	this.level = level;
}

function create() {
	const level = this.level;
  const grid = new PuzzleGrid({
    scene: this,
    x: 200,
    y: 200,
    cellSize: 64
  });
  grid.load(this.cache.json.get(`levels`).levels[level].elements);
  this.add.existing(grid);
  
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
	create
}