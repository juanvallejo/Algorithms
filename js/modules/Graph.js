/**
 * Object prototype for a Graph.
 * @author juanvallejo
 * @date 4/22/15
 */

var Node = require('./Node.js');
var Edge = require('./Edge.js');

/**
 * Graph for storing nodes. Allows computation
 * between node paths, and node relationships.
 */
function Graph() {

	// root will be defined by the first
	// node added to the graph.
	this.root 		= null;

	// length lock. If true, graph will
	// not change its length value
	// automatically as nodes are added.
	this.lengthSet 	= false;

	// length is defined by the total
	// amount of nodes contained in
	// this graph.
	this.length 	= 0;

	// edge length is defined by the amount
	// of connections (relationships) between
	// all nodes.
	this.edgeLength = 0;

	// defined by the total count of nodes
	// that have been visited in the graph.
	// This counter should be reset after an
	// algorithm is done using it.
	this.traversed 	= 0;

	// holds every node in the graph by value
	this.nodes 		= {};

	// holds all edges connecting a pair of nodes
	// in the graph. Stored by key: nodeA value + 
	// nodeB value
	this.edges 		= {};

	/**
	 * Takes two node values as input. Makes second node
	 * child node of first node. Used for creating node
	 * dependencies as items are added.
	 * @param nodeA is the parent node
	 * @param nodeB is child node
	 */
	this.addNodes = function(parentValue, childValue) {

		if(!this.nodes[parentValue]) {
			if(!this.lengthSet) {
				this.length++;
			}
		}

		if(!this.nodes[childValue]) {
			if(!this.lengthSet) {
				this.length++;
			}
		}

		// make sure nodes exist
		this.nodes[parentValue] 	= this.nodes[parentValue] || new Node(parentValue);
		this.nodes[childValue]	 	= this.nodes[childValue] || new Node(childValue);

		// add root
		if(!this.root) {
			this.root = this.nodes[parentValue];
		}
	
		// link child node to parent
		if(!this.nodes[parentValue].containsChild(childValue)) {
			this.nodes[parentValue].children.push(this.nodes[childValue]);
		}

	}

	/**
	 * Adds a single node to the graph by
	 * value specified. Does nothing
	 * if a node with that value has
	 * already been added.
	 */
	this.addNode = function(nodeValue) {
		
		if(!this.nodes[nodeValue]) {
			if(!this.lengthSet) {
				this.length++;
			}
		}

		// makes sure node exists, if not, creates
		// and adds a new one.
		this.nodes[nodeValue] = this.nodes[nodeValue] || new Node(nodeValue);

		// assign a root if one has not
		// already been assigned.
		if(!this.root) {
			this.root = this.nodes[nodeValue];
		}

	}

	/**
	 * Takes an array of node values. Adds every
	 * item, if it doesn't already exist as a node
	 * to the graph's list of nodes.
	 */
	this.addAllNodes = function(nodeValuesArray) {

		for(var i = 0; i < nodeValuesArray.length; i++) {
			this.addNode(nodeValuesArray[i]);
		}

	}

	/**
	 * Adds a new (strong) edge, if one connecting two nodes does
	 * not already exist. If a node passed does not exist,
	 * it it is created on the spot and added.
	 * Note: Bidirectional relationships between the two nodes provided will be
	 * created. This means nodeB will become the child of nodeA, as
	 * that's what an edge describes.
	 * Warning: Strong edges WILL make the graph cyclic.
	 * @param nodeAValue is the value of the parent node
	 * @param nodeAValue is the value of the parent node
	 * @param edgeLength is the distance (in km) of this edge
	 * @param type tells whether edge is a backroad 'b', or autobahn 'a'
	 * segment.
	 */
	this.addEdge = function(nodeAValue, nodeBValue, edgeLength, type) {

		// make sure nodes with given values exist
		this.nodes[nodeAValue] = this.nodes[nodeAValue] || new Node(nodeAValue);
		this.nodes[nodeBValue] = this.nodes[nodeBValue] || new Node(nodeBValue);

		// create the edge if it doesn't already exist
		this.edges[nodeAValue + nodeBValue] = this.edges[nodeAValue + nodeBValue] || new Edge(this.nodes[nodeAValue], this.nodes[nodeBValue], edgeLength, type);

		// create a strong relationship between the two given nodes
		// if one doesn't already exist.
		if(!this.nodes[nodeAValue].containsChild(nodeBValue)) {
			this.nodes[nodeAValue].children.push(this.nodes[nodeBValue]);
		}

		if(!this.nodes[nodeBValue].containsChild(nodeAValue)) {
			this.nodes[nodeBValue].children.push(this.nodes[nodeAValue]);
		}

	}

	/**
	 * Returns a stored edge based on the two
	 * nodes it holds. Only node values should
	 * be provided as the only two parameters.
	 */
	this.getEdge = function(nodeAValue, nodeBValue) {
		return this.edges[nodeAValue + nodeBValue] || this.edges[nodeBValue + nodeAValue];
	}

	/**
	 * Return a pointer to a node according
	 * to its value
	 */
	this.getNode = function(nodeValue) {
		return this.nodes[nodeValue];
	}

	/**
	 * Returns an array of all of the node
	 * values currently stored in this graph
	 */
	this.getNodeValues = function() {
		
		var nodeValues = [];

		for(var i in this.nodes) {
			nodeValues.push(this.nodes[i].value);
		}

		return nodeValues;

	}

	/**
	 * Sorts an array of integers
	 * @return object with sorted array and
	 * array of integers denoting new order
	 * Warning: does not alter original array.
	 */
	this.sortArray = function(array) {
		
		var copy 	= [];

		var arrays = {
			order:[],
			sort : null
		}

		for(var i = 0; i < array.length; i++) {
			copy[i] = array[i];
		}

		arrays.sort  = this._sortArray(copy, []);
		arrays.order = [];

		for(var i = 0; i < arrays.sort.length; i++) {
			arrays.order.push(arrays.sort.indexOf(array[i]));
		}

		return arrays;
	}

	/**
	 * Recursive method for array sorting.
	 * 
	 */
	this._sortArray = function(array, sortedArray) {

		if(!array.length) {
			return sortedArray;
		}

		var smallest = array[0];
		var smallestIndex = 0;

		for(var i = 0; i < array.length; i++) {
			if(array[i] < smallest) {
				smallest = array[i];
				smallestIndex = i;
			}
		}

		array.splice(smallestIndex, 1);
		sortedArray.push(smallest);

		return this._sortArray(array, sortedArray);

	}

	/**
	 * Gets the route that takes shortest time
	 * between two nodes. Only node values should
	 * be specified. Uses Dijkstra's algorithm.
	 */
	this.getFastestRoute = function(nodeAValue, nodeBValue) {

		var source = this.nodes[nodeAValue];
		var target = this.nodes[nodeBValue];

		var queue = [];
		var visited = {};
		var targetFound = false;

		// set root node for source
		this.nodes[nodeBValue].root = this.nodes[nodeAValue];

		// set initial distance for root node
		queue.push(source.value);
		this.nodes[queue[0]].visited = true;
		this.nodes[queue[0]].rootDistance = 0;

		while(queue.length) {

			visited[queue[0]] 				= true;
			this.nodes[queue[0]].visited 	= true;

			var distances = [];
			var sortOrder = [];

			for(var i = 0; i < this.nodes[queue[0]].children.length; i++) {
				
				if(!visited[this.nodes[queue[0]].children[i].value]) {

					if(this.nodes[queue[0]].children[i].rootDistance == null || this.nodes[queue[0]].rootDistance + this.getEdge(queue[0], this.nodes[queue[0]].children[i].value).length < this.nodes[queue[0]].children[i].rootDistance) {
						this.nodes[queue[0]].children[i].rootDistance = this.nodes[queue[0]].rootDistance + this.getEdge(queue[0], this.nodes[queue[0]].children[i].value).length;
					}

					if(queue.indexOf(this.nodes[queue[0]].children[i].value) == -1) {
						distances.push(this.nodes[queue[0]].children[i].rootDistance);
					}

				}

			}

			sortOrder = this.sortArray(distances).order;

			// pointers to unvisited & unadded nodes
			var unvisited = [];

			for(var i = 0; i < this.nodes[queue[0]].children.length; i++) {
				if(!visited[this.nodes[queue[0]].children[i].value] && queue.indexOf(this.nodes[queue[0]].children[i].value) == -1) {

					if(this.nodes[queue[0]].children[i].value == target.value) {
						targetFound = true;
						break;
					}

					unvisited.push(i);
				}
			}

			if(targetFound) {
				break;
			}

			for(var i = 0; i < unvisited.length; i++) {
				queue.push(this.nodes[queue[0]].children[unvisited[sortOrder[i]]].value);
			}

			// remove current item from array
			queue.splice(0, 1);
			
		}

		return {
			sourceNode 	: this.nodes[nodeAValue],
			targetNode 	: this.nodes[nodeBValue],
			distance 	: this.nodes[nodeBValue].rootDistance
		};

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
	 * Iterates through all nodes, and
	 * looks to see if any of the 'parents'
	 * contain children linking back to it
	 */
	this.hasCycles = function() {
		return this._hasCycles(this.root);
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
	 * Manually specifies the amount of nodes
	 * the graph will hold.
	 * Warning: Overrides automatic node counting.
	 * This means that as nodes are added using an
	 * 'addNodes' function, the graph's size will
	 * not be increased.
	 */
	this.setLength = function(size) {
		this.lengthSet = true;
		this.length = size;
	}

	/**
	 * Sets the length of all relationships
	 * or edges connecting each node.
	 * This value is manually assigned, and
	 * is not automatically increased in any
	 * method by the graph.
	 */
	this.setEdgeLength = function(length) {
		this.edgeLength = length;
	}

	/**
	 * Returns the total number of edges that
	 * have been set.
	 * Warning: value must be manually set first.
	 */
	this.getEdgeLength = function() {
		return this.edgeLength;
	}

	/**
	 * Returns a string containing an edge's
	 * nodes, its length, and its type, for every
	 * edge that has been created.
	 */
	this.getEdgeData = function() {

		var edgeData = '';

		for(var i in this.edges) {
			edgeData += this.edges[i].nodeA.value + ' -> ' + this.edges[i].nodeB.value + ', ' + this.edges[i].length + 'km. [' + this.edges[i].type + ']\n'; 
		}

		return edgeData;

	}

	/**
	 * Returns the current size
	 * of our graph
	 */
	this.size = function() {
		return this.length;
	}

}

module.exports = Graph;