/**
 *
 * Problem one "Who's Got Game" of the list of CPSC 420 Algorithms Competition problems.
 * Receives an initial input of `n` amount of items or tasks to perform with `m` amount
 * of relationships between such items or tasks. Every input after such initial input
 * (m n) consists of the performance of action or collection of item `d` which allows
 * access to an item or action `u`. An input consisting of two zeroes (0 0) will end the
 * program. 
 *
 * This program determines, and outputs, from the passed inputs whether the 
 * 'gameplay' simulated represents an "Infeasible Game" if the proposed gameplay 
 * sequences are impossible, "Linear Gameplay" if exactly one sequence is possible, or 
 * "Nonlinear gameplay possible" if multiple arrangements are possible.
 *
 * @author juanvallejo
 * @date 4/19/15
 */

#include <iostream>
#include <vector>
#include <string>

struct Case {

	// case = amount of items or actions to perform
	// relationships = number of relationships between cases
	int itemAmount;
	int relationshipAmount;

	std::vector<int> performingItem;
	std::vector<int> unlocksItem;

};

/**
 * Returns a case struct by case and relationship quantity
 */
int getCaseById(std::vector<Case>& cases, int itemAmount, int relAmount) {
	return 0;
}

/**
 * Determines if a "cause" from a user case exists in an array of effects, and
 * an "effect" from a user case exists in an array of causes.
 * @return true if cause is found in list of effects
 */
bool causeEqualsEffect(int cause, int effect, std::vector<int>& causes, std::vector<int>& effects) {

	bool causeIsEffect = false;

	for(int i = 0; i < effects.size(); i++) {
		if(cause == effects.at(i) && effect == causes.at(i)) {
			causeIsEffect = true;
		}
	}

	return causeIsEffect;
}

/**
 * Determines the number of occurrences of cause and effect in
 */
int getGameplayStatus(int cause, int effect, std::vector<int>& causes, std::vector<int>& effects) {

	for(int i = 0; i < effects.size(); i++) {
		if(cause == effects.at(i) && effect == causes.at(i)) {
			return 1;
		} else if(cause == causes.at(i) || effect == effects.at(i)) {
			return 2;
		}
	}

	return 0;
}

/**
 * Determines if a cause or effect is found in a given list of causes or effects
 */
bool causeOrEffectExists(int cause, int effect, std::vector<int>& causes, std::vector<int>& effects) {

	bool itemExists = false;

	for(int i = 0; i < effects.size(); i++) {
		if(cause == causes.at(i) || effect == effects.at(i)) {
			itemExists = true;
		}
	}

	return itemExists;

}

int main(int argc, char* argv[]) {

	// define output constants
	const std::string INFEASIBLE_GAMEPLAY 	= "Infeasible game";
	const std::string LINEAR_GAMEPLAY 		= "Linear gameplay";
	const std::string NONLINEAR_GAMEPLAY 	= "Nonlinear gameplay possible";

	const int LINEAR_GAMEPLAY_STATUS 		= 0;
	const int INFEASIBLE_GAMEPLAY_STATUS 	= 1;
	const int NONLINEAR_GAMEPLAY_STATUS 	= 2;

	bool debug_mode 						= false;

	std::vector<Case> userInput;
	std::vector<std::string> userInputStatus;

	// detect if arguments were passed
	// if 'test' argument then manually create user input
	if(argc > 1 && strcmp(argv[1], "test") == 0) {

		std::cout << "Populating user input with test values..." << std::endl;

		// fill user input with one test case
		// and enable debug mode
		debug_mode = true;

		// Test case 1
		// define test case parameters as first item in array
		Case case1;
		case1.itemAmount = 5;
		case1.relationshipAmount = 4;
		
		// define test case data
		case1.performingItem.push_back(1);
		case1.unlocksItem.push_back(5);

		case1.performingItem.push_back(5);
		case1.unlocksItem.push_back(2);

		case1.performingItem.push_back(3);
		case1.unlocksItem.push_back(2);

		case1.performingItem.push_back(4);
		case1.unlocksItem.push_back(3);

		// save test case
		userInput.push_back(case1);

		// Test case 2
		Case case2;
		case2.itemAmount = 5;
		case2.relationshipAmount = 4;
		
		// define test case data
		case2.performingItem.push_back(3);
		case2.unlocksItem.push_back(1);

		case2.performingItem.push_back(4);
		case2.unlocksItem.push_back(2);

		case2.performingItem.push_back(1);
		case2.unlocksItem.push_back(5);

		case2.performingItem.push_back(5);
		case2.unlocksItem.push_back(4);

		// save test case
		userInput.push_back(case2);

		// Test case 3
		Case case3;
		case3.itemAmount = 2;
		case3.relationshipAmount = 2;
		
		// define test case data
		case3.performingItem.push_back(1);
		case3.unlocksItem.push_back(2);

		case3.performingItem.push_back(2);
		case3.unlocksItem.push_back(1);

		// save test case
		userInput.push_back(case3);

	} else {

		// load user input through the standard input

		bool gatherInput 		= true;

		int inputIndex 			= 0;
		int input1 				= 0;
		int input2 				= 0;

		Case currentCase;

		while(gatherInput) {

			std::cin >> input1;
			std::cin >> input2;

			// determine if end of input by searching for
			// zeroes in both inputs
			if(input1 == 0 && input2 == 0) {
				break;
			} else if(inputIndex == 0) {
				currentCase.itemAmount 			= input1;
				currentCase.relationshipAmount 	= input2;
			} else {

				currentCase.performingItem.push_back(input1);
				currentCase.unlocksItem.push_back(input2);

				// determine if end of case by counting the amount of
				// items declared for the current case
				if(inputIndex >= currentCase.relationshipAmount) {

					// reset index, start a new case
					inputIndex = -1;

					// save case
					userInput.push_back(currentCase);

					// reset case
					currentCase.itemAmount 			= 0;
					currentCase.relationshipAmount 	= 0;
					currentCase.performingItem.clear();
					currentCase.unlocksItem.clear();

				}

			}

			inputIndex++;
		}

	}

	// loop through our user input cases
	for(int userCase = 0; userCase < userInput.size(); userCase++) {

		// status of gameplay based on user case parameters
		std::string status = LINEAR_GAMEPLAY;
		int gamePlayStatus = LINEAR_GAMEPLAY_STATUS;

		// declare user case vars
		std::vector<int> causes;
		std::vector<int> effects;

		for(int userCaseAction = 0; userCaseAction < userInput.at(userCase).relationshipAmount; userCaseAction++) {

			int cause 	= userInput.at(userCase).performingItem.at(userCaseAction);
			int effect 	= userInput.at(userCase).unlocksItem.at(userCaseAction);

			// determine if there are actions unlocked / performed
			// if the current cause is found in the list of effects, declare gameplay as infeasible
			if(causes.size() > 0 && effects.size() > 0) {

				gamePlayStatus = getGameplayStatus(cause, effect, causes, effects);

				if(gamePlayStatus == INFEASIBLE_GAMEPLAY_STATUS) {
					status = INFEASIBLE_GAMEPLAY;
					break;
				} else if(gamePlayStatus == NONLINEAR_GAMEPLAY_STATUS) {
					status = NONLINEAR_GAMEPLAY;
					break;
				}

			}

			causes.push_back(cause);
			effects.push_back(effect);
		}

		userInputStatus.push_back(status);

	}

	std::string testResultIndex = "";

	if(debug_mode) {

		std::cout << std::endl << "---------- User Case results ----------" << std::endl;

		// output test user case gameplay statuses
		for(int i = 0; i < userInputStatus.size(); i++) {
			std::cout << i + 1 << ") " << userInputStatus.at(i) << std::endl;
		}

	} else {

		// output standard user case gameplay statuses
		for(int i = 0; i < userInputStatus.size(); i++) {
			std::cout << userInputStatus.at(i) << std::endl;
		}

	}

	return 0;

}