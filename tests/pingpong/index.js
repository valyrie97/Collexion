const {Collexion, Link, LinkArray} = require('./../../core/Collexion.js');
const PingPong = require('./pingpong.js')

;(async () => {
	const collexion = new Collexion({
		A: {
			Code: PingPong,
			Data: {
				start: true,
				link: 'B'
			}
		},
		B: {
			Code: PingPong,
			Data: {
				link: 'A'
			}
		}
	});
})();


// const ExampleModule = require('./module.js.js');

// module.exports = {
// 	Entities: {
// 		A: {
// 			Code: ExampleModule,
// 			Data: {
// 				thing: ref('B'),
// 				boop: true
// 			}
// 		},
// 		B: {
// 			Code: ExampleModule,
// 			Data: {
// 				thing: ref('B')
// 			}
// 		}
// 	}
// }

