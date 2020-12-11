const EventEmitter = require('events');

module.exports = class Item extends EventEmitter {
	constructor(collexion, data, links) {
		this._collexion = collexion;
		this._data = data;
		this._links = links;
	}
}