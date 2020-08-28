import Phaser from 'phaser';

export default {
	key: "load",
	preload(){
		this.load.json('levels-list', 'assets/levels-list.json');
		this.load.spritesheet('heart', 'assets/heart.png', {frameWidth: 64, frameHeight: 64});
  	this.load.spritesheet('flower', 'assets/flower.png', {frameWidth: 64, frameHeight: 64});
	},
	create(){
		this.scene.start("level", {level: 0});
	}
}