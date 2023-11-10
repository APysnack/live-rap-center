'use strict';

const chai = require('chai');
const { getTitleFrom } = require('../../utils');
const expect = chai.expect;

describe('getTitleFrom', function () {
  it('It should parse A vs B correctly', function () {
    const input = ['PurelyDef', 'Coma'];
    const expectedOutput = 'PurelyDef vs Coma';

    const result = getTitleFrom(input);

    expect(result).to.deep.equal(expectedOutput);
  });

  it('It should parse A vs B vs C correctly', function () {
    const input = ['PurelyDef', 'Coma', 'Codes'];
    const expectedOutput = 'PurelyDef vs Coma vs Codes';

    const result = getTitleFrom(input);

    expect(result).to.deep.equal(expectedOutput);
  });

  it('It should parse A & B vs C & D correctly', function () {
    const input = ['PurelyDef', 'Refractor', 'Saint', 'Dough'];
    const expectedOutput = 'PurelyDef & Refractor vs Saint & Dough';

    const result = getTitleFrom(input);

    expect(result).to.deep.equal(expectedOutput);
  });
});
