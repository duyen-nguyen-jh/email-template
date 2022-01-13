const removeDuplicate01 = (arr) => {
  if (!arr || arr.length === 0) return;
  return [...new Set(arr)];
};

const removeDuplicate02 = (arr) => {
  if (!arr || arr.length === 0) return;
  return arr.filter((value, indexVal) => arr.indexOf(value) === indexVal);
};

// const removeDuplicate03 = (arr) => {
//   if (!arr || arr.length === 0) return;
//   return arr.filter((value, indexVal) => value !== arr[indexVal + 1]);
// };

// const removeDuplicate04 = (arr) => {
//   if (!arr || arr.length === 0) return;

//   const result = [];
//   const tempArr = [...arr];
//   tempArr.sort((a, b) => a - b);
//   let notDuplicateValueYet = tempArr[tempArr.length - 1];
//   for (let i = 0; i < tempArr.length; i++) {
//     const element = tempArr[i];
//     if (element !== notDuplicateValueYet) {
//       result.push(element);
//       notDuplicateValueYet = element;
//     }
//   }
//   return result;
// };

const removeDuplicate05 = (arr) => {
  if (!arr || arr.length === 0) return;

  const result = [];
  arr.forEach((element) => {
    if (!result.includes(element)) {
      result.push(element);
    }
  });
  return result;
};

const removeDuplicate06 = (arr) => {
  if (!arr || arr.length === 0) return;
  return arr.reduce(
    (result, currItem) => (result.includes(currItem) ? result : [...result, currItem]),
    []
  );
};

const removeDuplicate07 = (arr) => {
  if (!arr || arr.length === 0) return;
 

  const countingObj = {};
  // for (let i = 0; i < arr.length; i++) {
  //   const element = arr[i];
  //   if (!countingObj[element]) {
  //     countingObj[element] = 1;
  //     result.push(element)
  //   }
  // }
  const result = arr.reduce((uniqueArr, currItem) => {
    if (!countingObj[currItem]) {
      uniqueArr.push(currItem);
      countingObj[currItem] = 1;
    } else {
      countingObj[currItem]++;
    }
    return uniqueArr;
  }, []);
  return result;
};

// console.log("Solution 1: ", removeDuplicate01([1, 2, 2, 3, 4, 4, 4, 5, 6]));
// console.log("Solution 2: ", removeDuplicate02([1, 2, 2, 3, 4, 4, 4, 5, 6]));
// console.log("Solution 3: ", removeDuplicate03([1, 2, 2, 3, 4, 4, 4, 5, 6]));
// console.log("Solution 4: ", removeDuplicate04([1, 2, 2, 3, 4, 4, 4, 5, 6]));
console.log("Solution 5: ", removeDuplicate05([1, 4, 4, 5, 6, 2, 2, 3, 4]));
console.log("Solution 6: ", removeDuplicate06([1, 4, 4, 5, 6, 2, 2, 3, 4]));
console.log("Solution 7: ", removeDuplicate07([1, 4, 4, 5, 6, 2, 2, 3, 4]));
