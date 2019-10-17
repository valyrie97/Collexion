const {Signale} = require('signale');
const log = new Signale({
	scope: 'PING_PONG'
});

module.exports = class module {
	async start() {
		// console.log(this._data)
	}

	connected() {
		if(this._data.start)
			this.boop(0);
	}

	async boop(iterations) {
		if(iterations >= 4) {
			log.success('test passed!');
			process.exit(0);
		}
		log.info(`Boop!`);
		await new Promise(res => setTimeout(res, 1000));
		this._links[this._data.dest].boop(++iterations);
	}
}

