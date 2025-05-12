// As Per My Understandings Time Complexity for TwoSums that should have better than O(n^2) Could be O(n)
// We can use Hash Map Because Some Following Reasons
//     - Store values and their indices
//     - Instantly check if the complement of the current number exists in the map
//         (i.e., has the number target - x been seen before?)
// Example: array=[2, 7, 11, 15] target=9

function findTwoSums(array, target) {
  if (!Array.isArray(array))
    throw new TypeError('Input "array" should be an array');

  if (typeof target !== "number")
    throw new TypeError('Input "target" should have a valid number');

  const map = new Map(); //To Store Number -> indice

  // Time Complexity O(n) as go through each element once. Space is O(n) worst case, stores every number in Hash Map before solution
  for (let i = 0; i < array.length; i++) {
    // Time and Space Complexity O(1)
    const current = array[i]; //Ex: i = 0; number=[i] = 2
    const complement = target - current; // 9-2 which is 7

    // Time and Space Complexity O(1) -> Simple map lookup
    if (map.has(complement)) {
      return [map.get(complement), i];
    }

    // Time and Space Complexity O(1)
    map.set(current, i);
  }

  throw new Error("No Two Sum Solution Found");
}

let array = [7, 11, 2, 15],
  target = 26;
let result = findTwoSums(array, target);

console.log("Result: ", result);
