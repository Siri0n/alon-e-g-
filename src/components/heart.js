import Phaser from "phaser";
import PuzzleElement from "./puzzle-element";

class Heart extends PuzzleElement{
	constructor({scene, xn, yn, s, direction}){
		super({scene, xn, yn, s, key: 'heart'});
		this.type = 'heart';
		this.direction = direction;
		this.setInteractive();
	}
	get direction(){
		return this._direction;
	}
	set direction(value){
		this._direction = value % 4;
		this.angle = 90 * this._direction;
	}
	rotate({rotation, duration, delay}){
		return new Promise((resolve, reject) => {
			this.scene.tweens.add({
				targets: this,
				props: {
					direction: this.direction + rotation
				},
				delay,
				duration,
				onComplete: resolve
			});
		});
	}
	smile(){
		this.setFrame(1);
	}
	calm(){
		this.setFrame(0);
	}
}

Heart.register('heart');

export default Heart;