const {Signale} = require('signale');
const log = new Signale({
	scope: 'PING_PONG'
});

class PingPong {

	start(data) {
		this._data = data;
	}

	connected(links, collexion) {
		this._links = links;
		this._collexion = collexion;
		// if we get passed a string link, its a reference to _links
		// elsewise, its a direct reference to our destination.
		// convert it accordingly.
		if(typeof this._data.dest === 'string')
			this._data.dest = this._links[this._data.dest]

		// if we are flagged to start, then kick it off!
		if(this._data.start)
			this.ping(0);
	}

	async ping(iterations) {

		// at 5 iterations, create a new instance, dynamically, and
		// start pinging that one instead.
		if(iterations === 5 && this._data.start) {
			const newDest = await this._collexion.createInstance({
				Code: PingPong,
				Data: {
					dest: this,
					name: 'PingPong Dynamic'
				}
			});
			this._data.dest = newDest;

			// once we get to 10 iterations, we've passed!
		} else if(iterations === 10) {
			log.success('test passed!');
			process.exit(0);
		}

		log.info(`${this._data.name} Ping received!`);
		await new Promise(res => setTimeout(res, 100));

		// this line seems counter intuitive. but remember, links
		// _are_ state data. _links, refers to the static link table.
		if(this._data.start) iterations ++;
		this._data.dest.ping(iterations);
	}
}

module.exports = PingPong;