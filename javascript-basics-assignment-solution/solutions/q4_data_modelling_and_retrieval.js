// Create a list of fruits with their properties (name, color, pricePerKg)
// and convert it into a format so that for a given fruit name
// retrieval of its color and pricePerKg value is fast


// Write your code here

function getFruitDetailsByName(fruitName) {
  let fruitArr = [{ name: 'apple', color: 'red', pricePerKg: 150},
  { name: 'banana', color: 'green', pricePerKg: 30},
  { name: 'mango', color: 'yellow', pricePerKg: 100}];
      
  const fruitArrObj = fruitArr.reduce((obj, item) => {
    obj[item.name] = item;
    return obj;
  }, {});
  return fruitArrObj[fruitName];
}

console.log(getFruitDetailsByName('apple'));

