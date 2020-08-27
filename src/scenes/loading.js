import Phaser from 'phaser';
import heartImage from '../assets/heart.png';
import flowerImage from '../assets/flower.png';

export default {
	key: "load",
	preload(){
		this.load.json('levels-list', './src/assets/levels-list.json');
		this.load.spritesheet('heart', heartImage, {frameWidth: 64, frameHeight: 64});
  	this.load.spritesheet('flower', flowerImage, {frameWidth: 64, frameHeight: 64});
	},
	create(){
		this.scene.start("level", {level: 0});
	}
}