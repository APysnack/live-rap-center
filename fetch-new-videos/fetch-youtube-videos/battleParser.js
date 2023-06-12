function parseTitle(title) {
  let battlers;
  const tagMatchObj = isTagTeamMatch(title);
  if (tagMatchObj.isTagMatch) {
    battlers = tagTeamDefaultFormat(title, tagMatchObj.delimiter);
  } else {
    battlers = defaultFormat(title);
  }
  return battlers;
}

// format: "battler1 vs battler2" with any other symbols preceding or following
// known failures:
// "battler1 vs battler2: rap battle" because of symbol in name
// kings vs queens smack battle battler1 vs battler2
const defaultFormat = (input) => {
  const [leftSide, rightSide] = splitStringByVs(input);
  const leftName = splitLeft(leftSide);
  let rightName = splitRight(rightSide);
  rightName = removeHost(rightName);

  return [leftName, rightName];
};

// format: "battler1 & battler2 vs battler 3 & battler 4" with any other symbols preceding or following
const tagTeamDefaultFormat = (input, delimiter) => {
  const [leftSide, rightSide] = splitStringByVs(input);
  const leftNames = splitStringByDelimiter(leftSide, delimiter);
  const rightNames = splitStringByDelimiter(rightSide, delimiter);
  const battler1 = splitLeft(leftNames[0]);
  const battler2 = splitRight(leftNames[1]);
  const battler3 = splitLeft(rightNames[0]);
  const battler4 = splitRight(rightNames[1]);

  return [battler1, battler2, battler3, battler4];
};

// splits BATTLER A VS BATTLER B into ["battler a", "battler b"]
const splitStringByDelimiter = (inputString, delimiter) => {
  const pattern = new RegExp(`^(.*)\\${delimiter}(.*)$`, 'i');
  const matchResult = inputString.match(pattern);

  if (matchResult !== null) {
    const [, left, right] = matchResult;
    return [left.trim(), right.trim()];
  }
  return ['', ''];
};

// splits BATTLER A VS BATTLER B into ["battler a", "battler b"]
const splitStringByVs = (inputString) => {
  const pattern = /(.*?)(?:\[VS]|VS\.|-VS-|VS)(.*)/i;
  const matchResult = inputString.match(pattern);

  if (matchResult !== null) {
    const [, left, right] = matchResult;
    return [left.trim(), right.trim()];
  }
  return ['', ''];
};

// removes any preceding league names, etc. from battler a
const splitLeft = (inputString) => {
  const pattern = /(\W\s)/;
  const result = inputString.split(pattern);
  return result[result.length - 1];
};

// removes any succeeding league names, etc. from battler b
const splitRight = (inputString) => {
  const pattern = /(\s\W)/;
  const result = inputString.split(pattern);
  return result[0];
};

// sanitizes right side e.g. Coma - HOSTED BY PAT STAY
const removeHost = (inputString) => {
  const regex = /HOSTED/i;
  const result = inputString.split(regex);
  return result[0].trim();
};

const isTagTeamMatch = (inputString) => {
  const ampersandCount = (inputString.match(/&/g) || []).length;
  if (ampersandCount >= 2) {
    return { isTagMatch: true, delimiter: '&' };
  }

  const andCount = (inputString.match(/\band\b/gi) || []).length;
  if (andCount >= 2) {
    return { isTagMatch: true, delimiter: 'AND' };
  }

  return { isTagMatch: false, delimiter: '' };
};

module.exports = {
  parseTitle,
  isTagTeamMatch,
};
