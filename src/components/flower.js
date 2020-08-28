import Phaser from "phaser";
import PuzzleElement from "./puzzle-element";

class Flower extends PuzzleElement{
	constructor(params){
		super({key: 'flower', ...params});
		this.type = 'flower';
	}
}

Flower.register("flower");

export default Flower;