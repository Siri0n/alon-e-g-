import Phaser from 'phaser';

export default {
	key: "load",
	preload(){
		this.load.json('levels', 'assets/levels.json');
		this.load.spritesheet('heart', 'assets/heart.png', {frameWidth: 64, frameHeight: 64});
  	this.load.spritesheet('flower', 'assets/flower.png', {frameWidth: 64, frameHeight: 64});
  	this.load.image('rope', 'assets/rope.png');
	},
	create(){
		this.registry.set('level', 0);
		this.scene.start('level');
	}
}