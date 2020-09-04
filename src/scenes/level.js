import Phaser from 'phaser';

import PuzzleGrid from '../components/puzzle-grid';
import GridController from '../components/grid-controller';
import Heart from '../components/heart';
import Flower from '../components/flower';


function create() {
  const grid = new PuzzleGrid({
    scene: this,
    x: 200,
    y: 200,
    cellSize: 64
  });
  const levelNumber = this.registry.get('level');
  const levelData = this.cache.json.get(`levels`).levels[levelNumber].elements

  grid.load(levelData);
  this.add.existing(grid);
  
  const controller = new GridController(grid);

  this.cameras.main.fadeIn(250, 0, 0, 0)

  controller.on('win', 
  	() => this.cameras.main.fade(250, 0, 0, 0)
  );
  this.cameras.main.once('camerafadeoutcomplete', () => {
    this.registry.inc('level');
    this.scene.restart()
  });
}

export default {
	key: 'level',
	create
}