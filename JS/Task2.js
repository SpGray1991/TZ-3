function findNumbers(inputString) {
  return inputString.match(/\d+\.?\d*/g).map((number) => +number);
}

console.log(
  findNumbers(
    "У Пети было 10 яблок, 2.5 он отдал Маше, 3.5 Васе и 4 оставил себе."
  )
);
