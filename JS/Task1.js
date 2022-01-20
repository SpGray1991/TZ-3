function primeArray(arrayLength) {
  const result = [];
  let currNumber = 2;

  while (result.length < arrayLength) {
    let addNumberToResult = true;

    for (let i = currNumber - 1; i > 1; i--) {
      if (currNumber % i === 0) {
        addNumberToResult = false;
        break;
      }
    }

    if (addNumberToResult) {
      result.push(currNumber);
    }

    currNumber++;
  }

  return result;
}

console.log(primeArray(5));
console.log(primeArray(7));
