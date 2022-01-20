const exampleArr = [
  { a: { b: [{ c: 4 }, { c: 5 }] } },
  { a: { b: [{ c: 6 }, { c: 7 }] } },
];
const exampleObj = { a: { b: { c: 5 } } };

function getFromArrayByPath(arr, path) {
  if (!path.length) {
    return arr;
  }

  const pathToValue = path
    .split(/(\[|\]|\.)/)
    .filter((x) => x.match(/[0-9a-zA-Z]/));

  let result = arr;
  for (const partOfPath of pathToValue) {
    if (typeof result[partOfPath] === "undefined") {
      return undefined;
    }

    result = result[partOfPath];
  }

  return result;
}

console.log(getFromArrayByPath(exampleArr, "0.a.b.1.c"));
console.log(getFromArrayByPath(exampleObj, "a.b"));
