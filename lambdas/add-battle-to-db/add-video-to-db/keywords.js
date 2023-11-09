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
];

module.exports = {
  keywords,
};
