import Phaser from 'phaser';
/*Vector2 = Phaser.Math.Vector2;

const elem2vec = ({xn, yn}) => new Vector2(xn, yn);*/

const isBetween = (b, a, c) => 
	(
		(b.xn == a.xn) && (b.xn == c.xn) && ((b.yn - a.yn) * (b.yn - c.yn) < 0)
	) || (
		(b.yn == a.yn) && (b.yn == c.yn) && ((b.xn - a.xn) * (b.xn - c.xn) < 0)
	);


class GridController extends Phaser.Events.EventEmitter{
	constructor(grid){
		super();
		this.grid = grid;
		this.state = {
			selection: null
		}
		this.handleClick = this.handleClick.bind(this);
		this.grid.on("click", this.handleClick);

	}
	handleClick(elem){
		if(!this.state.selection){
			this.handleFirstClick(elem);
		}else{
			this.handleSelectionClick(elem);
		}
	}
	handleFirstClick(elem){
		console.log("first click");
		this.state.selection = elem;
		this.grid.disableWhere(it => 
			(it.xn != elem.xn && it.yn != elem.yn) || 
			it.type != 'heart' || 
			it.direction != elem.direction
		);
	}
	async handleSelectionClick(elem){
		if(elem === this.state.selection){
			//do nothing
		}else{
			await this.grid.doWhere(
				it => isBetween(it, elem, this.state.selection) && it.type == 'heart',
				it => it.rotate(1, 250)
			)
			this.grid.replaceElement(elem, {type: 'flower'});
			this.grid.replaceElement(this.state.selection, {type: 'flower'});
			if(this.grid.checkWin()){
				return this.emit('win');
			}
		}
		this.grid.enableAll();
		this.state.selection = null;
	}
}

export default GridController;