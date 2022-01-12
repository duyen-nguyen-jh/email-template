const findMostDuplicated = (arr) => {
  if (!arr || arr.length <= 0) return null;

  const array = [...arr];
  let result = [];
// obj: {value: duplicatedTime}
  const objCountDuplicate = array.reduce((objWithDuplicatedTime, curValInArr) => {
    if (!objWithDuplicatedTime[curValInArr]) {
      objWithDuplicatedTime[curValInArr] = 1;
    } else {
      objWithDuplicatedTime[curValInArr]++;
    }
    return objWithDuplicatedTime;
  }, {});

  const maxDup = Math.max(...Object.values(objCountDuplicate));
  result = Object.keys(objCountDuplicate).filter(val => objCountDuplicate[val] === maxDup);

  return result;
};

console.log(findMostDuplicated([1, 1, 2, 2]));
