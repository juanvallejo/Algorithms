/**
 * Implementation of solution for problem 1 in algorithms
 * final project. Uses depth-first search
 *
 * @author juanvallejo
 * @date 4/23/15
 */

var Settings = {
	debug_log: false
};

/**
 * Our node
 */
function Node(value) {

	this.value 		= value;
	this.visited 	= false;
	this.children 	= [];
	this.parent 	= null;
}

function log(text) {
	if(Settings.debug_log) {
		console.log(text);
	}
}

/**
 * Our graph will hold all of our nodes
 */
function Graph() {

	this.root 		= null;
	this.nodes 		= {};
	this.length 	= 0;
	this.traversed 	= 0;		// amount of nodes traversed

	/**
	 * Takes two node values as input. Makes second node
	 * child node of first node.
	 * @param nodeA is the parent node
	 * @param nodeB is child node
	 */
	this.addNodes = function(parentValue, childValue) {

		if(!this.nodes[parentValue]) {
			this.length++;
		}

		if(!this.nodes[childValue]) {
			this.length++;
		}

		// make sure nodes exist
		this.nodes[parentValue] 	= this.nodes[parentValue] || new Node(parentValue);
		this.nodes[childValue]	 	= this.nodes[childValue] || new Node(childValue);

		// add root
		if(!this.root) {
			this.root = this.nodes[parentValue];
		}
	
		// link child node to parent
		this.nodes[parentValue].children.push(this.nodes[childValue]);

	}

	/**
	 * Return a pointer to a node according
	 * to its value
	 */
	this.getNode = function(nodeValue) {
		return this.nodes[nodeValue];
	}

	/**
	 * Iterates through all nodes, and
	 * looks to see if any of the 'parents'
	 * contain children linking back to it
	 */
	this.hasCycles = function() {
		return this._hasCycles(this.root);
	}

	/**
	 * A graph will only be linear if all nodes are 'directly'.
	 * connected. If this is not the case, all nodes will not
	 * be traversed.
	 */
	this.isLinear = function() {
		return this.length == this.traversed;
	}

	/**
	 * Recursive private method. Uses depth-first
	 * search to hit every connected node in a graph
	 * to determine if cycles are present. Stack-based.
	 */
	this._hasCycles = function(node) {

		// this case is hit when main iterator
		// (this.hasCycles) cycles through a stack node
		// that has already been visited by a child from
		// a previous iterated root
		if(node.visited) {
			return false;
		}
		
		log('Now looking at node ' + node.value + ' -> ' + node.children.length + ' children');
		this.traversed++;

		node.visited = true;

		// we've hit the end of our list
		if(!node.children.length) {
			return false;
		}

		var isCyclic = false;

		// determine if node has children
		for(var i = 0; i < node.children.length; i++) {
			if(!node.children[i].visited) {
				isCyclic =  this._hasCycles(node.children[i]);
			} else {
				isCyclic = true;
			}
		}

		return isCyclic;
	}

	/**
	 * Returns the current size
	 * of our graph
	 */
	this.size = function() {
		return this.length;
	}

}

/**
 * Define our main function
 */
(function main() {

	var graphs = [];

	// test case 1... Cycles
	// define our main graph
	var graph1 = new Graph();
	graph1.addNodes(1, 5);
	graph1.addNodes(5, 2);
	graph1.addNodes(3, 2);
	graph1.addNodes(4, 3);

	graphs.push(graph1);

	var graph2 = new Graph();
	graph2.addNodes(3, 1);
	graph2.addNodes(4, 2);
	graph2.addNodes(1, 5);
	graph2.addNodes(5, 4);
	graphs.push(graph2);

	var graph3 = new Graph();
	graph3.addNodes(1, 2);
	graph3.addNodes(2, 1);
	graphs.push(graph3);

	// iterate through all of the nodes
	// in our graph and look for cycles
	for(var i = 0; i < graphs.length; i++) {
		if(graphs[i].hasCycles()) {
			console.log('Infeasible game.');
		} else {
			if(graphs[i].isLinear()) {
				console.log('Linear gameplay.');
			} else {
				console.log('Nonlinear gameplay possible.');
			}
		}
	}
	
})();