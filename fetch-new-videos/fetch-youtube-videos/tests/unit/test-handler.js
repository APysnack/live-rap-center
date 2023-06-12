'use strict';

const chai = require('chai');
const { parseTitle, isTagTeamMatch } = require('../../battleParser');
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

  it('should parse KING BROOK vs PURELYDEF - iBattleTV correctly', function () {
    const input = 'KING BROOK vs PURELYDEF - iBattleTV';
    const expectedOutput = ['KING BROOK', 'PURELYDEF'];

    const result = parseTitle(input);

    expect(result).to.deep.equal(expectedOutput);
  });

  it('should parse RemyD vs Coma hosted by Pat Stay correctly', function () {
    const input = 'RemyD vs Coma hosted by Pat Stay';
    const expectedOutput = ['RemyD', 'Coma'];

    const result = parseTitle(input);

    expect(result).to.deep.equal(expectedOutput);
  });

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

  it('should parse  SHOWTIME BATTLE ARENA: RASHAAD THA GOD AND LA FROSS VS OSIRIS AND KI HOSTED BY FOO correctly', function () {
    const input =
      'SHOWTIME BATTLE ARENA: RASHAAD THA GOD AND LA FROSS VS OSIRIS AND KI - HOSTED BY FOO';
    const expectedOutput = ['RASHAAD THA GOD', 'LA FROSS', 'OSIRIS', 'KI'];

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
