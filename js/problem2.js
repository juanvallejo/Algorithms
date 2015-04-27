/**
 * Implementation of solution for problem 2 in algorithms
 * final project. Uses dikjstra's algorithm to find all shortest paths.
 * Given two points A and B, determine the lowest-cost path. Final result
 * states whether any time is spent in the Autonahn at all.
 *
 * Program reads graph data and determines for several node pairs the total
 * distance (in km) of route that takes the shortest time. Output also
 * includes total amount of Autobahn kilometers. If it is the case that
 * several routes take the same time to reach a destination node, the route
 * with the most Autobahn kilometers is chosen.
 *
 * Input consists of an integer 'n' specifying the number of nodes
 * in a graph. The next line lists the 'names' of all nodes. The third line
 * contains the amount of segments (edges) that will be specified in the rest
 * of the input. The rest of the input consists of the two nodes the segment
 * connects, the length (in km) of the segment, and whether the segment
 * represents a back road 'B', or a piece of the Autobahn 'A'. All segments
 * are assumed to be strongly connected (bidirectional). It is also assumed
 * that only one edge exists between any two nodes. The lines after this
 * consist of route requests. The first line specifies the number of route
 * calculation requests. Each request then consists of two nodes. The program
 * finds the path that takes the least time between the two nodes.
 *
 * Output: for each route request the program will output the starting node and
 * its destination. It will also output the total travel distance between the
 * two nodes (in km) and the total distance traveled on the Autobahn (in km).
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
	graph1.setLength(6);
	graph1.addAllNodes(['A', 'B', 'C', 'D', 'E', 'F', 'G']);
	graph1.setEdgeLength(12); // 7
	// graph1.addEdge('A', 'B', 10, 'a');
	// graph1.addEdge('B', 'C', 10, 'a');
	// graph1.addEdge('D', 'A', 1, 'b');
	// graph1.addEdge('E', 'B', 5, 'b');
	// graph1.addEdge('F', 'C', 1, 'b');
	// graph1.addEdge('D', 'E', 10, 'b');
	// graph1.addEdge('E', 'F', 10, 'b');
	graph1.addEdge('A', 'B', 4, 'a');
	graph1.addEdge('A', 'C', 3, 'a');
	graph1.addEdge('A', 'E', 7, 'a');
	graph1.addEdge('B', 'D', 5, 'a');
	graph1.addEdge('B', 'C', 6, 'a');
	graph1.addEdge('C', 'D', 11, 'a');
	graph1.addEdge('C', 'E', 8, 'a');
	graph1.addEdge('D', 'E', 2, 'a');
	graph1.addEdge('D', 'G', 10, 'a');
	graph1.addEdge('D', 'F', 2, 'a');
	graph1.addEdge('E', 'G', 5, 'a');
	graph1.addEdge('G', 'F', 3, 'a');

	graph1.getFastestRoute('A', 'F');
	// graph1.getFastestRoute('D', 'E');
	// graph1.getFastestRoute('F', 'D');

	// add our graph to the list
	graphs.push(graph1);

	// iterate through all of the nodes
	// in our graph and look for cycles
	// for(var i = 0; i < graphs.length; i++) {
	// 	if(graphs[i].hasCycles()) {
	// 		console.log('Infeasible game.');
	// 	} else {
	// 		if(graphs[i].isLinear()) {
	// 			console.log('Linear gameplay.');
	// 		} else {
	// 			console.log('Nonlinear gameplay possible.');
	// 		}
	// 	}
	// }
	
})();