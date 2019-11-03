const {Collexion, Link, LinkArray} = require('./../../core/Collexion.js');
const PingPong = require('./pingpong.js')

const collexion = new Collexion({
	A: {
		Code: PingPong,
		Data: {
			start: true,
			dest: 'B'
		}
	},
	B: {
		Code: PingPong,
		Data: {
			dest: 'A'
		}
	}
});
