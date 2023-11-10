const { keywords, stringsToRemove } = require('./keywords');
const he = require('he');

function parseTitle(title) {
  let battlers;

  // youtube passes ampersands as &amp; so we need to decode them
  let decodedTitle = he.decode(title);
  decodedTitle = sanitizeString(decodedTitle);

  const tagMatchObj = isTagTeamMatch(decodedTitle);
  const isTripleThreat = isTripleThreatMatch(decodedTitle);

  if (tagMatchObj.isTagMatch) {
    battlers = tagTeamDefaultFormat(decodedTitle, tagMatchObj.delimiter);
  } else if (isTripleThreat) {
    battlers = tripleThreatDefaultFormat(decodedTitle);
  } else {
    battlers = defaultFormat(decodedTitle);
  }
  return battlers;
}

// format: "battler1 vs battler2" with any other symbols preceding or following
const defaultFormat = (input) => {
  const [leftSide, rightSide] = splitStringByVs(input);
  let leftName = splitLeft(leftSide);
  let rightName = splitRight(rightSide);
  rightName = removeKeywords(rightName, 'right');
  leftName = removeKeywords(leftName, 'left');
  rightName = removeParentheses(rightName);
  leftName = removeParentheses(leftName);

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

const tripleThreatDefaultFormat = (input) => {
  const [leftSide, middle, rightSide] = splitStringByVsTriple(input);
  const leftName = splitLeft(leftSide);
  const rightName = splitRight(rightSide);
  let middleName = splitLeft(middle);
  middleName = splitRight(middle);

  return [leftName, middleName, rightName];
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

const splitStringByVsTriple = (inputString) => {
  const pattern = /(.*?)(?:\s*VS\s*)(.*?)(?:\s*VS\s*|-VS-|VS)(.*)/i;
  const matchResult = inputString.match(pattern);

  if (matchResult !== null) {
    const [, firstPart, secondPart, thirdPart] = matchResult;
    return [firstPart.trim(), secondPart.trim(), thirdPart.trim()];
  }
  return ['', '', ''];
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

// all problematic substrings in the array are removed from the
// title e.g. kings vs queens adds a misleading 'vs' to the title
const sanitizeString = (inputString) => {
  let sanitizedString = inputString;

  for (const substring of stringsToRemove) {
    const regex = new RegExp(substring, 'gi');
    sanitizedString = sanitizedString.replace(regex, '');
  }

  return sanitizedString;
};

// returns only words before or after a key word e.g. COMA HOSTED BY
// see keywords.js for list of keywords
const removeKeywords = (inputString, titleSide) => {
  const regexPattern = new RegExp(`(${keywords.join('|')})`, 'i');
  const result = inputString.split(regexPattern);

  if (titleSide === 'left') {
    return result[result.length - 1].trim();
  } else {
    return result[0].trim();
  }
};

const removeParentheses = (inputString) => {
  const regex = /\([^)]*\)/g;
  return inputString.replace(regex, '').trim();
};

// delimiter used to further split PurelyDef & Refractor as opposed to PurelyDef and Refractor
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

const isTripleThreatMatch = (inputString) => {
  const vsCount = (inputString.match(/VS/gi) || []).length;
  return vsCount === 2;
};

module.exports = {
  parseTitle,
  isTagTeamMatch,
  isTripleThreatMatch,
};
