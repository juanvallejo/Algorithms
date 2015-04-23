/**
 * Revision of problem one "Who's Got Game" of the list of CPSC 420 Algorithms Competition problems.
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
 * @date 4/22/15
 */

#include <iostream>
#include <vector>

// Define constants

const std::string UNFEASIBLE_GAMEPLAY 	= "Unfeasible game";
const std::string LINEAR_GAMEPLAY 		= "Linear gameplay";
const std::string NONLINEAR_GAMEPLAY 	= "Nonlinear gameplay possible";

const int LINEAR_GAMEPLAY_STATUS 		= 0;
const int UNFEASIBLE_GAMEPLAY_STATUS 	= 1;
const int NONLINEAR_GAMEPLAY_STATUS 	= 2;

// define global variables
bool debug_mode 						= false;

/**
 * A Node represents each input value. It has children, other Nodes it links to.
 */
struct Node {

	int value;

	// a single Node's children are all of the other
	// Nodes it connects to
	std::vector<Node*> parents;
	std::vector<Node*> children;

};

/**
 * A Graph is classified as a set of related Nodes 
 */
struct Graph {

	// declare 'n' amount of tasks
	// and 'm' relationships between tasks
	int items;
	int relationships;

	// used for test cases
	std::string expects;

	std::vector<Node*> stack;
	std::vector<Node*> nodes;

};

/**
 * Simple string logging function
 */
void log(std::string text) {
	std::cout << text << std::endl;
}

/**
 * Get the index of a stored Node from its value. If the node
 * doesn't exist, -1 is returned. Fuck the police. Yeah.
 */
int getNodeIndex(std::vector<Node*>& nodes, int nodeValue) {

	int index = -1;

	for(int i = 0; i < nodes.size(); i++) {
		if(nodes.at(i)->value == nodeValue) {
			index = i;
		}
	}

	return index;

}

/**
 * Takes a gapth (with a built-in stack) and its nodes as the second argument
 */
int depthFirstTraversal(Graph& graph, std::vector<Node>& nodes) {

	if(nodes.size() == 0) {
		log("!!!No nodes found");
		return 0;
	}

	// add child nodes to stack
	// for(int i = 0; i < nodes.size(); i++) {

	// 	// save nodes to stack
	// 	graph.stack.push_back(nodes.at(i));

	// 	std::cout << "Added node with value [" << nodes.at(i).value << "] to the stack. Stack now contains " << graph.stack.size() << " nodes." << std::endl;

	// 	depthFirstTraversal(graph, nodes.at(i).children);

	// }

	return 0;

}

/**
 * Takes a root node and a stack. Traverses all of the child node's children
 * adds nodes to stack as they are traversed. If a child is found to link to
 * the parent node, then the function will return true.
 */
bool containsCycles(Node *node, std::vector<Node*>& stack, int index) {

	// base case
	if(node->children.size() == 0) {
		return 0;
	}

	// node still has children
	if(node->children.at(index)->value == node->value)
	stack.push_back(node);

	containsCycles(node->children.at(++index), stack


	if(

}

// iterate through all parent nodes. If any of the children contain the parent as their child, cycle detected

/**
 * Traverse all nodes in a graph using depth first search. Returns 1
 * if cycles are found in the graph, or 0 if none are found.
 */
int depthFirst(Graph& graph) {

	// this stack holds pointers to nodes that have
	// already been visited
	std::vector<Node*> visitedNodes;

	// traverse every node in the graph
	for(int i = 0; i < graph->nodes.size(); i++) {	
		if(containsCycles(graph->nodes.at(i), &visitedNodes, 0)) {
			return 1;
		}
	}

	return 0;

}

/**
 * Creates and stores input nodes from integer values. If a parent node is being
 * stored for the first time, it is stored first, and then its children are 'assigned'
 * to it. If a parent node has already been stored, then just the child is stored.
 */
bool createSequenceRule(Graph& graph, int parentValue, int childValue) {

	// get the index of the parentNode
	int parentIndex = getNodeIndex(graph.nodes, parentValue);
	int childIndex = getNodeIndex(graph.nodes, childValue);

	Node *parent;
	Node *child;

	// determine if node with value has been previously stored
	// if -1, create a new node and store
	if(parentIndex == -1) {
		
		Node newParent;
		newParent.value = parentValue;

		parent = &newParent;

	} else {
		parent = graph.nodes.at(parentIndex);
	}

	if(childIndex == -1) {

		Node newChild;
		newChild.value = childValue;

		child = &newChild;

	} else {
		child = graph.nodes.at(childIndex);
	}

	// add child node to parent node
	parent->children.push_back(child);

	// set parent node of child
	child->parents.push_back(parent);

	// if the child or parent node did not exist
	// save the new node to the cache
	if(parentIndex == -1) {
		graph.nodes.push_back(parent);
	}

	if(childIndex == -1) {
		graph.nodes.push_back(child);
	}

	return true;
}

/**
 * Cleans a cache used to store Nodes
 */
bool clearSequenceRules(std::vector<Node>& nodes) {
	nodes.clear();
	return true;
}

bool printGraph(Graph& graph) {

	// std::cout << "------- Graph (" << graph.nodes.size() << ") -------" << std::endl;

	// for(int i = 0; i < graph.nodes.size(); i++) {
		
	// 	std::string children = "";

	// 	for(int c = 0; c < graph.nodes.at(i).children.size(); c++) {
	// 		children += std::to_string(graph.nodes.at(i).children.at(c).value);
	// 		if(c < graph.nodes.at(i).children.size() - 1) {
	// 			children += ", ";
	// 		}
	// 	}

	// 	std::cout << "[" << graph.nodes.at(i).value << "] -> " << children << std::endl;

	// }

	return true;

}

// store all graphs.
// a status represents the current
// gameplay status determined by iterating
// through all of the available Nodes
std::vector<Graph> graphStore;
std::string status;

int main(int argc, char *argv[]) {

	// determine if a 'test' flag was passed at runtime.
	// This will automatically populate the inputNodes
	// vector with sample data.
	if(argc > 1 && strcmp(argv[1], "test") == 0) {

		std::cout << "Populating user input with test values..." << std::endl;

		// fill user input with one test case
		// and enable debug mode
		debug_mode = true;

		// // Test case 1
		// Graph test1;
		// test1.items = 5;
		// test1.relationships = 4;
		// test1.expects = NONLINEAR_GAMEPLAY;

		// // test inputs
		// createSequenceRule(1, 5);
		// createSequenceRule(5, 2);
		// createSequenceRule(3, 2);
		// createSequenceRule(4, 3);

		// // save graph
		// test1.nodes = nodeStore;

		// // save graph
		// graphStore.push_back(test1);

		// // clear nodeStore to be used in
		// // another test case
		// clearSequenceRules(nodeStore);

		// // Test case 2
		// Graph test2;
		// test2.items = 5;
		// test2.relationships = 4;
		// test2.expects = NONLINEAR_GAMEPLAY;

		// // test inputs
		// createSequenceRule(3, 1);
		// createSequenceRule(4, 2);
		// createSequenceRule(1, 5);
		// createSequenceRule(5, 4);

		// // save graph
		// test2.nodes = nodeStore;

		// // save graph
		// graphStore.push_back(test2);

		// // clear nodeStore to be used in
		// // another test case
		// clearSequenceRules(nodeStore);

		// std::vector<Graph> *test = new 

		// Test case 3
		Graph test3;
		test3.items = 2;
		test3.relationships = 2;
		test3.expects = NONLINEAR_GAMEPLAY;

		// test inputs
		createSequenceRule(test3, 1, 2);
		createSequenceRule(test3, 2, 1);		

		// save graph
		graphStore.push_back(test3);
		std::cout << graphStore.at(0).nodes.at(0)->value << std::endl;

	}

	int index = 0;

	// graphStore holds all of our completed input
	// std::vector<int>::cons_iterator i = graphStore.begin(); i != graphStore.end(); ++i
	for(int i = 0; i < graphStore.size(); i++) {
		// std::cout << 
	}

	return 0;

}