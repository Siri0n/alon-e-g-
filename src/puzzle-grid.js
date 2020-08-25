import Phaser from "phaser";
import Class from "phaser/src/utils/Class"

const wrapListener(f, self){
	f = f.bind(self)
	return function(...args){
		f(this, ...args);
	}
}

class PuzzleGrid extends Phaser.GameObjects.Container{
	constructor(config){
		const {scene, x, y, children} = config;
		super(scene, x, y, children);

		const {cellSize} = config;
		this.s = cellSize;
		this.groups = {
			heart: scene.add.group()
		}
		this.elementConfig = {};

		this.onClick = wrapListener(this.onClick);
	}
	load(data){
		this.removeAll(true);
		for(let elem of data){
			this.createElement(elem);
		}
	}
	createElement({type, ...rest}){
		const element = this.scene.make[type]({
			s: this.s,
			...rest,
			...this.elementConfig
		});
		this.add(element);
		element.on("pointerdown", this.onClick);
		const group = this.groups[type]; 
		group && group.add(element);
	}
	replaceElement(element, newData){
		const {xn, yn} = element;
		element.destroy();
		this.createElement({xn, yn, ...newData});
	}
	onClick(target){

	}
}

Class.mixin(PuzzleGrid, Phaser.Events.EventEmitter);

export default PuzzleGrid;