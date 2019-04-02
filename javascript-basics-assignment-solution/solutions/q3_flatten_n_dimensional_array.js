/* Write a Program to Flatten a given n-dimensional array */

const flatten = (array) => {
	// Write your code here
	if(!Array.isArray(array)) {
		return null;
	}
	return array.reduce((prevValue, curValue) => {
		return prevValue.concat(Array.isArray(curValue) ? flatten(curValue) : curValue);
	}, []);
};

/* For example,
INPUT - flatten([1, [2, 3], [[4], [5]])
OUTPUT - [ 1, 2, 3, 4, 5 ]

*/

module.exports = flatten;
