import loadingScene from './scenes/loading';
import levelScene from './scenes/level';

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  scene: [
    loadingScene,
    levelScene
  ]
};

const game = new Phaser.Game(config);