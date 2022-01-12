const removeDuplicate01 = (arr) => {
  if (!arr || arr.length === 0) return;
  const arrBySet = new Set(arr);
  return [...arrBySet];
};

const removeDuplicate02 = (arr) => {
  if (!arr || arr.length === 0) return;
  return arr.filter((value, indexVal) => arr.indexOf(value) === indexVal);
};

const removeDuplicate03 = (arr) => {
  if (!arr || arr.length === 0) return;
  return arr.filter((value, indexVal) => value !== arr[indexVal + 1]);
};

const removeDuplicate04 = (arr) => {
  if (!arr || arr.length === 0) return;

  const result = [];
  let tempArr = [...arr];
  tempArr.sort((a, b) => a - b);
  let notDuplicateValueYet = tempArr[tempArr.length - 1];
  for (let i = 0; i < tempArr.length; i++) {
    const element = tempArr[i];
    if (element !== notDuplicateValueYet) {
      result.push(element);
      notDuplicateValueYet = element;
    }
  }
  return result;
};

console.log("Solution 1: ", removeDuplicate01([1, 2, 2, 3, 4, 4, 4, 5, 6]));
console.log("Solution 2: ", removeDuplicate02([1, 2, 2, 3, 4, 4, 4, 5, 6]));
console.log("Solution 3: ", removeDuplicate03([1, 2, 2, 3, 4, 4, 4, 5, 6]));
console.log("Solution 4: ", removeDuplicate04([1, 2, 2, 3, 4, 4, 4, 5, 6]));
