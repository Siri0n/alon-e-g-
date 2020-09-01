const fs = require('fs/promises');
const path = require('path');

class LevelCompilerPlugin {
	constructor({src, dest}){
		this.src = src;
		this.dir = path.resolve(path.dirname(src), './levels');
		this.dest = dest;
		this.compileLevels = this.compileLevels.bind(this);
	}
	apply(compiler){
		compiler.hooks.afterEmit.tapAsync('LevelCompilerPlugin', this.compileLevels)
	}
	async compileLevels(compile, cb){
		const srcString = await fs.readFile(this.src, 'utf8');
		const srcObject = JSON.parse(srcString);
		const levels = await Promise.all(srcObject.levels.map(async (it, i) => {
			const levelString = await fs.readFile(path.resolve(this.dir, it), 'utf8');
			return JSON.parse(levelString);
		}));
		srcObject.levels = levels;
		await fs.writeFile(this.dest, JSON.stringify(srcObject), 'utf8');
		cb();
	}
}

module.exports = LevelCompilerPlugin;