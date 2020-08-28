import Phaser from "phaser";

const ALPHA_DISABLED = 0.5;

class PuzzleElement extends Phaser.GameObjects.Sprite{
	constructor({scene, xn, yn, s, key, invisible}){
		super(scene, 0, 0, key);
		this.s = s;
		this.xn = xn;
		this.yn = yn;
		if(invisible){
			this.hide();
		}
	}
	get xn(){
		return this._xn;	
	}
	set xn(value){
		this._xn = value;
		this.x = value * this.s;
	}
	get yn(){
		return this._yn;
	}
	set yn(value){
		this._yn = value;
		this.y = value * this.s;
	}
	disable(){
		if(this.input?.enabled){
			this.setData('wasInteractive', true);
			this.disableInteractive();
		}
		this.alpha = ALPHA_DISABLED;
	}
	enable(){
		if(this.data?.values.wasInteractive){
			this.toggleData('wasInteractive');
			this.setInteractive();
		}
		this.alpha = 1;
	}
	hide(){
		console.log('hide');
		this.scaleX = 0;
	}
	disappear({duration, delay, destroy}){
		console.log('start disappear');
		return new Promise((resolve, reject) => {
			this.scene.tweens.add({
				targets: this,
				props: {
					scaleX: 0
				},
				duration,
				delay,
				onComplete: () => {
					console.log('end disappear');
					destroy && this.destroy();
					resolve()
				}
			});
		});
	}
	appear({duration, delay}){
		console.log('start appear');
		return new Promise((resolve, reject) => {
			this.scene.tweens.add({
				targets: this,
				props: {
					scaleX: 1
				},
				duration,
				delay,
				onComplete: () => {
					console.log('end appear');
					resolve();
				}
			});
		});
	}
	static register(key){
		const Ructor = this;
		Phaser.GameObjects.GameObjectCreator.register(key, function(config){
			return new Ructor({scene: this.scene, ...config});
		});
	}
}

export default PuzzleElement;