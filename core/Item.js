const EventEmitter = require('events');

const COLLEXION = Symbol('collexion');
const DATA = Symbol('data');
const LINKS = Symbol('links');
const EVENTEMITTER = Symbol('event-emitter');

module.exports = class Item {
	connected(collexion, data, links) {
		// console.log('Item::connected', collexion, data, links);
		this[COLLEXION] = collexion;
		this[DATA] = data;
		this[LINKS] = links;
		this[EVENTEMITTER] = new EventEmitter();

		// copy data into state
		for(const key in this[DATA]) {
			this[key] = this[DATA][key];
		}

		if(!collexion.ready) {
			collexion.on('ready', evt => {
				this.ready()
			});
		} else {
			this.ready();
		}
	}

	ready() {}

	on(...args) { this[EVENTEMITTER].on(...args) }
	off(...args) { this[EVENTEMITTER].off(...args) }
	emit(...args) { this[EVENTEMITTER].emit(...args) }

	get collexion() {
		return this[COLLEXION];
	}

	get links() {
		return this[LINKS];
	}

	get _links() { return this.links; }
}