// after the parser splits the battle into two battlers,
// removes the following keywords from the battler's name if they appear
const keywords = [
  'HOSTED',
  'COHOST',
  'CO-HOST',
  'CO-',
  'BATTLES',
  'RAP BATTLES',
  'RAP BATTLE',
  'BATTLE',
  'PRESENTED',
  'PRESENTS',
  'QOTR',
  'QUEEN OF THE RING',
  'PIT FIGHT',
  'AHAT',
  'RAPPER',
  'BATTLER',
  '360°',
  'IBATTLETV',
  'IBATTLE',
];

// generally redundant vs e.g. champion vs champion
const stringsToRemove = [
  'kings vs queens',
  'USA vs',
  'vs USA',
  'CHAMPION vs',
  'vs Champion',
  'blind vs',
  'deaf vs',
  'vs blind',
  'vs deaf',
];

module.exports = {
  keywords,
  stringsToRemove,
};
