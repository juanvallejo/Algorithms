/**
 * Object prototype for an Edge.
 * @author juanvallejo
 * @date 4/22/15
 */

/**
 * An edge holding pointers between two
 * nodes and storing properties such as
 * distance and edge type.
 */
function Edge(nodeA, nodeB, length, type) {

	// pointers to both nodes it holds
	this.nodeA 		= nodeA;
	this.nodeB 		= nodeB;

	// length (in km) between the two
	// connected ndoes
	this.length		= length;

	// type indicates whether this edge
	// is a backroad, or an autobahn
	// segment.
	this.type		= type;

}

module.exports = Edge;