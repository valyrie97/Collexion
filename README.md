Collexion is a mesh graph object library that facilitates the modularization
of traditionally monolithic code

# Collexion
[![Build Status](https://travis-ci.org/marcus13345/Collexion.svg?branch=master)](https://travis-ci.org/marcus13345/Collexion)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fmarcus13345%2FCollexion.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fmarcus13345%2FCollexion?ref=badge_shield)

In monolithic applications, with multiple deeply connected parts, splitting the code is an important step to modularization. However, in many applications, The increased Object orientation causes unecessary overhead. Collexion is meant to alleviate that cost.

- [Examples](#examples)
	- [Minimum viable Collexion](#minimum-viable-collexion)
	- [Cross linking](#cross-linking)
	- [Instance Parameterization](#instance-parameterization)

## Examples

Below are some basic examples to help get you started creating Collexions!

### Minimum viable Collexion

To create a basic collexion simply import your code, and link instances together.

```javascript
import Collection from 'collexion';

class ModuleA {
	start() {
		console.log('Module A Starting!')
	}
	
	connected() {
		console.log('Module A Connected!')
	}
}

class ModuleB {
	start() {
		console.log('Module B Starting!')
	}

	connected() {
		console.log('Module B Connected!')
	}
}

new Collexion({
	InstanceA: {
		Code: ModuleA
	},
	InstanceB: {
		Code: ModuleB
	}
})

```
```
Module A Starting!
Module B Starting!
Module A Connected!
Module B Connected!
```

### Cross linking

To have modules talk to eachother, utilize `_links`

```javascript
import Collection from 'collexion';

class ModuleA {
	connected() {
		console.log('once connected, I can call on my links!')
		this._links.instanceB.foo();
	}
}

class ModuleB {
	foo() {
		console.log('Hi from InstanceB! 👩‍🎤')
	}
}

new Collexion({
	InstanceA: {
		Code: ModuleA
	},
	InstanceB: {
		Code: ModuleB
	}
})

```
```
once connected, I can call on my links!
Hi from InstanceB! 👩‍🎤
```

### Instance Parameterization

To an instance some state data, utilize `Data` and `_data`

```javascript
import Collection from 'collexion';

class Employee {
	connected() {
		console.log(`Hi There! My name is ${this._data.name}.`);
	}
}

new Collexion({
	Employee1: {
		Code: Employee,
		Data: {
			name: 'Marshall'
		}
	},
	Employee1: {
		Code: Employee,
		Data: {
			name: 'Valerie'
		}
	}
})

```
```
Hi There! My name is Marshall.
Hi There! My name is Valerie.
```



## Use Cases

One common use case for collexion, is to easily split up a REST API, from the database(s)

```javascript

import Collexion from

```

## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fmarcus13345%2FCollexion.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fmarcus13345%2FCollexion?ref=badge_large)