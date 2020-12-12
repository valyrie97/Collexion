const Item = require('./Item');
const EventEmitter = require('events');

/**
 * @typedef {object} InstanceTemplate
 * @param {class} Code the class to create an instance of
 * @param {object} Data any state data to be associated with the instance
 */

/**
 * @typedef {object} Instance
 * @param {object} _data user/config defined state data
 * @param {object<string, Instance>} _links key: instance name, value: {Instance}
 * @param {Collexion}
 */

/**
 * @description Collexion base class.
 */
class Collexion extends EventEmitter {
	
	_namedInstances = {};
	_instances = [];
	_linked;
	_ready = false;
	_readyPromises = [];

	get ready() {
		return this._ready;
	}

	constructor(template) {
		super();
		this.createCollexion(template);
	}

	async createCollexion(template) {
		// call constructors on objects, and give them their data
		for(const name in template) {
			const {Code: code, Data: data} = template[name];
			const inst = this.immerseTemplate(name, code, data);
		}

		await Promise.all(this._readyPromises);
		this.emit('ready', {});
	}
	
	async immerseTemplate(name, code, data) {
		if(typeof code !== 'function')
			throw new TypeError(`code is not a function.`);
		const inst = new code(code);
		this._namedInstances[name] = inst;
		this.immerse(inst, data);
	}

	async immerse(obj, data = {}) {
		if(!('connected' in obj))
			throw new TypeError('function connected doesnt exist on immersed object!')
		const readyPromise = obj.connected(this, data, this._linked);
		this._instances.push(obj);
		if (!this.ready) this._readyPromises.push(readyPromise);
	}

	get namedInstances() {
		return this._linked;
	}

	get instances() {
		return this._instances;
	}
}

module.exports = {Collexion, Item};