// specific group for a term in the calculus

define('term', function(require) {

	var Group = require('group');
	var Link = require('link');
	var Contract = require('nodes/contract');

	class Term extends Group {

		constructor(prin, auxs, group) {
			super();
			this.prin = null;
			this.set(prin, auxs, group)
		}

		set(prin, auxs, group) {
			this.prin = prin;
			this.auxs = auxs;
			return this;
		}

	copyBox(map) {
		var group = this.group;
		var nodes = this.nodes;

		var newPrin = this.prin.copy().addToGroup(group);
		map.set(this.prin.key, newPrin.key);

		for (let node of nodes) {
			var newNode;
			if (!map.has(node.key)) {
				if (node instanceof Term) {
					newNode = node.copyBox(map).addToGroup(group);
				} else {
					newNode = node.copy().addToGroup(group);
					map.set(node.key, newNode.key);
				}
			}
		}

		for (let aux of this.auxs) {
			var newAux = aux.copy().addToGroup(group);
			newBoxWrapper.auxs.push(newAux);
			map.set(aux.key, newAux.key);
		}

		for (let link of this.links) {
			if (link.colour != "lightgrey") { // hacking!!
				var newLink = new Link(map.get(link.from), map.get(link.to),
													link.fromPort, link.toPort).addToGroup(group);
				newLink.reverse = link.reverse;
			}
		}

		return newPrin;
	}

	copy() {
		var map = new Map();
		return this.copyBox(map);
	}

}

	return Term;
});
