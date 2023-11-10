'use strict';

const chai = require('chai');
const {
  parseTitle,
  isTagTeamMatch,
  isTripleThreatMatch,
} = require('../../battleParser');
const expect = chai.expect;

describe('parseTitle', function () {
  it('It should parse A vs B correctly', function () {
    const input = 'PurelyDef vs Coma';
    const expectedOutput = ['PurelyDef', 'Coma'];

    const result = parseTitle(input);

    expect(result).to.deep.equal(expectedOutput);
  });

  it('It should parse A Name vs B correctly', function () {
    const input = 'Mac Miller vs Coma';
    const expectedOutput = ['Mac Miller', 'Coma'];

    const result = parseTitle(input);

    expect(result).to.deep.equal(expectedOutput);
  });

  it('It should parse A Name vs B Name correctly', function () {
    const input = 'Mac Miller vs Jim Jones';
    const expectedOutput = ['Mac Miller', 'Jim Jones'];

    const result = parseTitle(input);

    expect(result).to.deep.equal(expectedOutput);
  });

  it('It should parse A-Name vs B Name correctly', function () {
    const input = 'Mac-Miller vs Jim Jones';
    const expectedOutput = ['Mac-Miller', 'Jim Jones'];

    const result = parseTitle(input);

    expect(result).to.deep.equal(expectedOutput);
  });

  it('It should parse LeagueName: A-Name vs B Name correctly', function () {
    const input = 'iBattleTV: Mac-Miller vs Jim Jones';
    const expectedOutput = ['Mac-Miller', 'Jim Jones'];

    const result = parseTitle(input);

    expect(result).to.deep.equal(expectedOutput);
  });

  it('should parse KOTD - Rap Battle - Real Deal vs Bizzo Bond | #KOTDS1 Exhibition correctly', function () {
    const input =
      'KOTD - Rap Battle - Real Deal vs Bizzo Bond | #KOTDS1 Exhibition';
    const expectedOutput = ['Real Deal', 'Bizzo Bond'];

    const result = parseTitle(input);

    expect(result).to.deep.equal(expectedOutput);
  });

  // league name following symbol
  it('should parse KING BROOK vs PURELYDEF - iBattleTV correctly', function () {
    const input = 'KING BROOK vs PURELYDEF - iBattleTV';
    const expectedOutput = ['KING BROOK', 'PURELYDEF'];

    const result = parseTitle(input);

    expect(result).to.deep.equal(expectedOutput);
  });

  // hosted by
  it('should parse RemyD vs Coma hosted by Pat Stay correctly', function () {
    const input = 'RemyD vs Coma hosted by Pat Stay';
    const expectedOutput = ['RemyD', 'Coma'];

    const result = parseTitle(input);

    expect(result).to.deep.equal(expectedOutput);
  });

  // tag team ampersands
  it('should parse HOMESKOOL & LORD GIOVANNI vs KANG & CASHIS CLAY - iBattleTV (House of Lords vs Chain Gang) correctly', function () {
    const input =
      'HOMESKOOL & LORD GIOVANNI vs KANG & CASHIS CLAY - iBattleTV (House of Lords vs Chain Gang)';
    const expectedOutput = [
      'HOMESKOOL',
      'LORD GIOVANNI',
      'KANG',
      'CASHIS CLAY',
    ];

    const result = parseTitle(input);

    expect(result).to.deep.equal(expectedOutput);
  });

  // tag team "and"
  it('should parse  SHOWTIME BATTLE ARENA: RASHAAD THA GOD AND LA FROSS VS OSIRIS AND KI HOSTED BY FOO correctly', function () {
    const input =
      'SHOWTIME BATTLE ARENA: RASHAAD THA GOD AND LA FROSS VS OSIRIS AND KI - HOSTED BY FOO';
    const expectedOutput = ['RASHAAD THA GOD', 'LA FROSS', 'OSIRIS', 'KI'];

    const result = parseTitle(input);

    expect(result).to.deep.equal(expectedOutput);
  });

  // includes "battle"
  it('should parse REAL NAME BRANDON vs PATRON battle correctly', function () {
    const input = 'REAL NAME BRANDON vs PATRON battle';
    const expectedOutput = ['REAL NAME BRANDON', 'PATRON'];

    const result = parseTitle(input);

    expect(result).to.deep.equal(expectedOutput);
  });

  // includes "rap battle right side"
  it('should parse REAL NAME BRANDON vs PATRON rap battle correctly', function () {
    const input = 'REAL NAME BRANDON vs PATRON rap battle';
    const expectedOutput = ['REAL NAME BRANDON', 'PATRON'];

    const result = parseTitle(input);

    expect(result).to.deep.equal(expectedOutput);
  });

  // includes "rap battle left side"
  it('should parse RAP BATTLE REAL NAME BRANDON vs PATRON correctly', function () {
    const input = 'RAP BATTLE REAL NAME BRANDON vs PATRON rap battle';
    const expectedOutput = ['REAL NAME BRANDON', 'PATRON'];

    const result = parseTitle(input);

    expect(result).to.deep.equal(expectedOutput);
  });

  // co-host
  it('should parse 413 Battle League - Uno Lavoz vs 3SK co-host Chilla Jones correctly', function () {
    const input = '413 Battle League - Uno Lavoz vs 3SK co-host Chilla Jones';
    const expectedOutput = ['Uno Lavoz', '3SK'];

    const result = parseTitle(input);

    expect(result).to.deep.equal(expectedOutput);
  });

  // parentheses
  it('should parse 413 Battle League - JeFFrey (CT) vs Flash da Gator (MA) hosted by Lush One', function () {
    const input =
      '413 Battle League - JeFFrey (CT) vs Flash da Gator (MA) hosted by Lush One';
    const expectedOutput = ['JeFFrey', 'Flash da Gator'];

    const result = parseTitle(input);

    expect(result).to.deep.equal(expectedOutput);
  });

  it('should parse 40 B.A.R.R.S vs CHETTA QOTR presented by BABS BUNNY & VAGUE', function () {
    const input = '40 B.A.R.R.S vs CHETTA QOTR presented by BABS BUNNY & VAGUE';
    const expectedOutput = ['40 B.A.R.R.S', 'CHETTA'];

    const result = parseTitle(input);

    expect(result).to.deep.equal(expectedOutput);
  });

  it('413 Battle League Presents Cityy Towers vs 3SK', function () {
    const input = '413 Battle League Presents Cityy Towers vs 3SK';
    const expectedOutput = ['Cityy Towers', '3SK'];

    const result = parseTitle(input);

    expect(result).to.deep.equal(expectedOutput);
  });

  // html encoded
  it('should parse  Battleground Dallas "THE REAFFIRMATION"- STREET CAMMO VS G NUTTY', function () {
    const input =
      ' Battleground Dallas &#34;THE REAFFIRMATION&#34;- STREET CAMMO VS G NUTTY';
    const expectedOutput = ['STREET CAMMO', 'G NUTTY'];

    const result = parseTitle(input);

    expect(result).to.deep.equal(expectedOutput);
  });

  it('should parse AHAT Rap Battles Aries vs TBG(tryout)', function () {
    const input = 'AHAT Rap Battles Aries vs TBG(tryout)';
    const expectedOutput = ['Aries', 'TBG'];

    const result = parseTitle(input);

    expect(result).to.deep.equal(expectedOutput);
  });

  it('It should parse A vs B vs C correctly', function () {
    const input =
      'Face Off Battle League: PastLyfe vs SK vs Rames the Last Pharoah';

    const expectedOutput = ['PastLyfe', 'SK', 'Rames the Last Pharoah'];

    const result = parseTitle(input);

    expect(result).to.deep.equal(expectedOutput);
  });

  it('It should parse KINGS VS QUEENS: A vs B correctly', function () {
    const input = 'URL PRESENTS KINGS VS QUEENS: ARSONAL VS OFFICIAL';

    const expectedOutput = ['ARSONAL', 'OFFICIAL'];

    const result = parseTitle(input);

    expect(result).to.deep.equal(expectedOutput);
  });

  it('It should parse LUMINOUS vs MACKENZIE - iBattleTV (USA vs SCOTLAND RAP BATTLE) correctly', function () {
    const input =
      'LUMINOUS vs MACKENZIE - iBattleTV (USA vs SCOTLAND RAP BATTLE)';

    const expectedOutput = ['LUMINOUS', 'MACKENZIE'];

    const result = parseTitle(input);

    expect(result).to.deep.equal(expectedOutput);
  });
});

describe('isTagTeamMatch', function () {
  it('should return false if less than 2 ampersands', function () {
    const input = 'RemyD vs Pat Stay';
    const expectedOutput = { isTagMatch: false, delimiter: '' };

    const result = isTagTeamMatch(input);

    expect(result).to.deep.equal(expectedOutput);
  });

  it('should return true if 2 or more ampersands', function () {
    const input = 'RemyD & Pat Stay vs Coma & Richard Cranium';
    const expectedOutput = { isTagMatch: true, delimiter: '&' };

    const result = isTagTeamMatch(input);

    expect(result).to.deep.equal(expectedOutput);
  });

  it('should return true if 2 or more instances of and', function () {
    const input = 'RemyD AND Pat Stay vs Coma and Richard Cranium';
    const expectedOutput = { isTagMatch: true, delimiter: 'AND' };

    const result = isTagTeamMatch(input);

    expect(result).to.deep.equal(expectedOutput);
  });
});

describe('isTripleThreatMatch', function () {
  it('should return true if more than 1 instance of VS', function () {
    const input =
      'Face Off Battle League: PastLyfe vs SK vs Rames the Last Pharoah';
    const expectedOutput = true;

    const result = isTripleThreatMatch(input);

    expect(result).to.deep.equal(expectedOutput);
  });

  it('should return false if less than 2 instances of vs', function () {
    const input = 'RemyD AND Pat Stay vs Coma and Richard Cranium';
    const expectedOutput = false;

    const result = isTripleThreatMatch(input);

    expect(result).to.deep.equal(expectedOutput);
  });
});
