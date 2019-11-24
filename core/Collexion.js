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
class Collexion {
	
	_instances = {};
	_semaphores = {};

	constructor(template) {
		(async () => {

			// create a hookable promise chain, so that others may wait for
			// this collexion to complete from the outside
			this._semaphores.constructed = new Promise(async (res) => {

				// call constructors on objects, and give them their data
				for(const symbol in template) {
					const instTemplate = template[symbol];
					const inst = this._createInstance(instTemplate)

					// construct instances table as we go
					this._instances[symbol] = inst;
				}
				res();

			});

			this._semaphores.started = this._semaphores.constructed.then(async () => {

				//call start in each instance.
				for(const symbol in this._instances) {
					const inst = this._instances[symbol];
					await this._startInstance(inst)
				}
			});

			this._semaphores.connected = this._semaphores.started.then(async () => {

				// call connected
				for(const symbol in this._instances) {
					const inst = this._instances[symbol];
					await this._connectInstance(inst);
				}
			});


		})();
	}

	/**
	 * @description
	 * Create an instance from a template. this does not apply
	 * links to _links. it is purely to make an instance from
	 * the provided contructor and data, then return it.
	 * @param {InstanceTemplate} instTemplate
	 * @returns {Instance}
	 */
	_createInstance(instTemplate) {
		if(typeof instTemplate === 'undefined') return;
		const _class = instTemplate.Code;

		if(typeof _class === 'function') {}
		else throw new TypeError('Entity ' + symbol + ' not a class');

		/** @type {Instance} */
		const inst = new _class(this);
		// guarantee at least an object in _data
		inst._data = {...instTemplate.Data};
		inst._collexion = this;

		return inst;
	}

	/**
	 * @description
	 * Start an instance. This includes calling the start callback
	 * on the instance. Subsequently, apply the link table to each
	 * instance, preparing it for its connected callback, and full
	 * immersion into the collexion.
	 * @param {Instance} inst
	 */
	async _startInstance(inst) {
		if('start' in inst)
			await inst.start();

		// TODO revisit this, and evaluate the usefulness of making this mutable.
		inst._links = {...this._instances};
	}

	/**
	 * @description
	 * Connect instance to the Collexion by calling its connected
	 * callback. this is the final step in immersing an instance.
	 */
	async _connectInstance(inst) {
		if('connected' in inst)
			await inst.connected()
	}

	/**
	 * @description dynamically create and immerse a new instance
	 * @param {InstanceTemplate} instTemplate 
	 */
	async createInstance(instTemplate) {
		const inst = this._createInstance(instTemplate);
		await this._startInstance(inst);
		await this._connectInstance(inst);
		return inst;
	}

	// TODO doc these
	get semaphores() {
		return {
		 constructed: this._semaphores.constructed,
		 started: this._semaphores.started,
		 connected: this._semaphores.connected
		}
	}

	get instances() {
		return {
			...this._instances
		}
	}
}

module.exports = {Collexion};