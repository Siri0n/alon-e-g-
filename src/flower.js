import Phaser from "phaser";
import PuzzleElement from "./puzzle-element";

class Flower extends PuzzleElement{
	constructor({scene, xn, yn, s, direction}){
		super(scene, xn, yn, s, 'flower');
	}
}

Flower.register("flower");

export default Flower;