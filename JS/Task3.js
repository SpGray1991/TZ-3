function calculateCountOfRepeatedSigns(inputString) {
  let result = "";
  let currentCharacter = null;
  let currentCharacterCount = 0;

  const addCurrentCharacterCount = () => {
    if (currentCharacterCount > 1 && currentCharacter !== null) {
      result += currentCharacterCount;
    }
  };

  inputString.split("").forEach((character) => {
    if (character === currentCharacter) {
      currentCharacterCount++;
      return;
    }

    addCurrentCharacterCount();

    result += character;
    currentCharacter = character;
    currentCharacterCount = 1;
  });

  addCurrentCharacterCount();

  return result;
}

console.log(calculateCountOfRepeatedSigns("assdssddffffrrreeeweggggg"));
