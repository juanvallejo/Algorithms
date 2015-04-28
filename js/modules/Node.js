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

	// holds our main node value
	// used for comparing and sorting
	this.value 		= value;
	
	// indicates whether this node has been
	// traversed by a graph function.
	this.visited 	= false;

	// all of the nodes this node links to.
	this.children 	= [];
	this.parent 	= null;
	this.root 		= null;

	// defines the total distance
	// to this node from a root
	// node. Null value -> infinity
	this.rootDistance = null;

	/**
	 * Receives a node value and determines if
	 * such a node exists among the node's children.
	 */
	this.containsChild = function(childValue) {
		
		var childExists = false;

		for(var i = 0; i < this.children.length; i++) {
			if(childValue == this.children[i].value) {
				childExists = true;
				break;
			}
		}

		return childExists;

	}
}

module.exports = Node;