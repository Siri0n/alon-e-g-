class GridController{
	constructor(grid){
		this.grid = grid;
		this.state = {
			selection: null
		}
		this.handleClick = this.handleClick.bind(this);
		this.grid.on("click", this.handleClick);

	}
	handleClick(elem){
		console.log("lol");
		if(!this.state.selection){
			this.handleFirstClick(elem);
		}else{
			this.handleSelectionClick(elem);
		}
	}
	handleFirstClick(elem){
		console.log("first click");
		this.state.selection = elem;
		this.grid.disableWhere(it => it.xn != elem.xn && it.yn != elem.yn);
	}
	handleSelectionClick(elem){
		if(elem === this.state.selection){
			console.log("click on ths same element");
		}else{
			console.log("click on the different element");
		}
		this.grid.enableAll();
		this.state.selection = null;
	}
}

export default GridController;