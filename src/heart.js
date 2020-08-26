import Phaser from "phaser";
import PuzzleElement from "./puzzle-element";

class Heart extends PuzzleElement{
	constructor({scene, xn, yn, s, direction}){
		super(scene, xn, yn, s, 'heart');
		this.elementType = 'heart';
		this.direction = direction;
		this.setInteractive();
	}
	get direction(){
		return this._direction;
	}
	set direction(value){
		this._direction = value % 4;
		this.angle = 90 * this._direction;
		console.log(this._direction);
	}
}

Heart.register('heart');

export default Heart;