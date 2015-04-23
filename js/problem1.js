/**
 * Revision of problem one "Who's Got Game" of the list of CPSC 420 
 * Algorithms Competition problems. Uses depth-first search to look 
 * for cycles in a graph.
 *
 * Receives an initial input of `n` amount of items or tasks to perform with `m` amount
 * of relationships between such items or tasks. Every input after such initial input
 * (m n) consists of the performance of action or collection of item `d` which allows
 * access to an item or action `u`. An input consisting of two zeroes (0 0) will end the
 * program. 
 *
 * This program determines, and outputs, from the passed inputs whether the 
 * 'gameplay' simulated represents an "Unfeasible Game" if the proposed gameplay 
 * sequences are impossible, "Linear Gameplay" if exactly one sequence is possible, or 
 * "Nonlinear gameplay possible" if multiple arrangements are possible.
 *
 * Note: This is a revised implementation using nodes to represent points
 *
 * @author juanvallejo
 * @date 4/23/15
 */

// import dependencies
var Node = require('./modules/Node.js');
var Graph = require('./modules/Graph.js');

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