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