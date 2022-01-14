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
  result = Object.keys(objCountDuplicate).filter(
    (val) => objCountDuplicate[val] === maxDup
  );

  return result;
};

const findMostDuplicated02 = (arr) => {
  if (!arr || arr.length <= 0) return null;

  const array = [...arr];
  let result = [];
  const objWithCount = {};
  let maxCount = 0;
  for (let i = 0; i < array.length; i++) {
    const cur = array[i];
    if (objWithCount[cur]) objWithCount[cur]++;
    else objWithCount[cur] = 1;

    if (maxCount === objWithCount[cur]) {
      result.push(cur);
    } else if (maxCount < objWithCount[cur]) {
      maxCount = objWithCount[cur];
      result = [cur];
    }
  }
  return result;
};

console.log(findMostDuplicated([1, 1, 2, 3, 4, 4, 4, 2, 2, 3, 4]));
console.log(findMostDuplicated02([1, 1, 2, 3, 4, 4, 4, 2, 2, 3, 4, 2]));
