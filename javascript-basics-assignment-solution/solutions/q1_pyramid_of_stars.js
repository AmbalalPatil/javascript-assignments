/* Write a program to build a `Pyramid of stars` of given height */

const buildPyramid = (rows) => {
    // Write your code here
    let output = '';
    for(let x = 0; x < rows; x = x + 1) {
        for(let y = 0; y < rows - x; y = y + 1) {
            output = output.concat(' ');
        }
        for(let z = 0; z <= x; z = z + 1) {
            output = output.concat('* ');
        }
        output = output.concat(' \n');
    }
    return output;
};

/* For example,
INPUT - buildPyramid(6)

OUTPUT -
     *
    * *
   * * *
  * * * *
 * * * * *
* * * * * *

*/

module.exports = buildPyramid;
