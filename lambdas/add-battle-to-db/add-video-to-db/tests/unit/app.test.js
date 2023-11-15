const lambda = require('../../app');
const {
  connectToDatabase,
  closeDatabaseConnection,
  createBattle,
  findBattlerByName,
  createBattler,
  createBattlerBattle,
} = require('../../pgFunctions');

const { getBattlersFrom, getTitleFrom } = require('../../utils');

const event = require('../../../events/event.json');

jest.mock('../../pgFunctions', () => ({
  connectToDatabase: jest.fn(),
  closeDatabaseConnection: jest.fn(),
  createBattle: jest.fn(),
  findBattlerByName: jest.fn(),
  createBattler: jest.fn(),
  createBattlerBattle: jest.fn(),
}));

jest.mock('../../utils', () => ({
  getBattlersFrom: jest.fn().mockReturnValue(['Battler 1', 'Battler 2']),
  getTitleFrom: jest.fn().mockReturnValue('Battler 1 vs Battler 2'),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

test('test lambda function when a battler does not exist', async () => {
  closeDatabaseConnection.mockResolvedValue('Foo');
  connectToDatabase.mockResolvedValue('Bar');
  createBattle.mockResolvedValue({ id: 'battleId' });
  findBattlerByName.mockResolvedValue(null);
  createBattler.mockResolvedValue({ id: 'battlerId', name: 'battler' });
  createBattlerBattle.mockResolvedValue('Quux');

  const result = await lambda.lambdaHandler(event, {});

  expect(connectToDatabase).toHaveBeenCalled();
  expect(getBattlersFrom).toHaveBeenCalledWith(event.video);
  expect(getTitleFrom).toHaveBeenCalledWith(['Battler 1', 'Battler 2']);
  expect(createBattle).toHaveBeenCalledWith(
    'Bar',
    'Battler 1 vs Battler 2',
    event.leagueId,
    event.battleUrl,
    event.video
  );
  ['Battler 1', 'Battler 2'].forEach((battlerName) => {
    expect(findBattlerByName).toHaveBeenCalledWith('Bar', battlerName);
    expect(createBattler).toHaveBeenCalledWith('Bar', battlerName);
  });
  expect(createBattlerBattle).toHaveBeenCalledWith(
    'Bar',
    'battleId',
    'battlerId'
  );
  expect(closeDatabaseConnection).toHaveBeenCalled();
});

test('test lambda function when battler already exists', async () => {
  closeDatabaseConnection.mockResolvedValue('Foo');
  connectToDatabase.mockResolvedValue('Bar');
  createBattle.mockResolvedValue({ id: 'battleId' });
  findBattlerByName.mockResolvedValue({
    id: 'battlerId',
    name: 'foo',
  });
  createBattlerBattle.mockResolvedValue('Quux');

  const result = await lambda.lambdaHandler(event, {});

  expect(connectToDatabase).toHaveBeenCalled();
  expect(getBattlersFrom).toHaveBeenCalledWith(event.video);
  expect(getTitleFrom).toHaveBeenCalledWith(['Battler 1', 'Battler 2']);
  expect(createBattle).toHaveBeenCalledWith(
    'Bar',
    'Battler 1 vs Battler 2',
    event.leagueId,
    event.battleUrl,
    event.video
  );
  expect(findBattlerByName).toHaveBeenCalledWith('Bar', 'Battler 1');
  expect(createBattler).not.toHaveBeenCalled();
  expect(createBattlerBattle).toHaveBeenCalledWith(
    'Bar',
    'battleId',
    'battlerId'
  );
  expect(closeDatabaseConnection).toHaveBeenCalled();
});
