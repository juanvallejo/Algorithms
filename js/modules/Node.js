/**
 * Object prototype for a Node.
 * @author juanvallejo
 * @date 4/22/15
 */

/**
 * A node holding pointers to every
 * other nodes it is linked to.
 */
function Node(value) {

	this.value 		= value;
	this.visited 	= false;
	this.children 	= [];
	this.parent 	= null;
}

module.exports = Node;