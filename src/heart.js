import Phaser from "phaser";
import PuzzleElement from "./puzzle-element";

class Heart extends PuzzleElement{
	constructor({scene, xn, yn, s, direction}){
		super(scene, xn, yn, s, 'heart');
		this.direction = direction;
		this.setInteractive();
	}
	get direction(){
		return this._direction;
	}
	set direction(value){
		this._direction = value
		this.angle = 90 * value;
	}
}

Heart.register("heart");

export default Heart;