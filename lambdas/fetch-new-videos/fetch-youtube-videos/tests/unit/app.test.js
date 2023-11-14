const lambda = require('../../app');
const axios = require('axios');
const { createBattlesFor } = require('../../utils');
const {
  connectToDatabase,
  closeDatabaseConnection,
  initializeLeague,
} = require('../../pgFunctions');

const { MOCK_LEAGUE_DATA } = require('./mock-pg-response');
const {
  MOCK_YOUTUBE_SEARCH_RESPONSE,
  FETCH_VIDEOS_MOCK_RESPONSE,
} = require('./mock-youtube-response');

jest.mock('axios');
jest.mock('../../pgFunctions', () => ({
  connectToDatabase: jest.fn(),
  closeDatabaseConnection: jest.fn(),
  initializeLeague: jest.fn(),
}));
jest.mock('../../utils', () => ({
  fetchVideosFromChannel: jest.fn(),
  formatDate: jest.fn(),
  createBattlesFor: jest.fn(),
}));

// use spyOn instead of mock to mock individual functions
jest
  .spyOn(require('../../utils'), 'fetchVideosFromChannel')
  .mockResolvedValue(FETCH_VIDEOS_MOCK_RESPONSE);

process.env.LAMBDA_ENV = 'local';

test('test lambda function', async () => {
  jest.spyOn(axios, 'get').mockResolvedValue(MOCK_YOUTUBE_SEARCH_RESPONSE);
  closeDatabaseConnection.mockResolvedValue('Foo');
  initializeLeague.mockResolvedValue('Bar');
  connectToDatabase.mockResolvedValue({
    query: jest.fn().mockResolvedValue({
      rows: [MOCK_LEAGUE_DATA],
    }),
  });

  const event = {
    startPosition: 0,
    recordsToFetch: 5,
  };
  const context = {};

  const result = await lambda.lambdaHandler(event, context);

  expect(connectToDatabase).toHaveBeenCalled();
  expect(createBattlesFor).toHaveBeenCalledWith(
    FETCH_VIDEOS_MOCK_RESPONSE.videos,
    MOCK_LEAGUE_DATA,
    []
  );
  expect(closeDatabaseConnection).toHaveBeenCalled();
  expect(initializeLeague).toHaveBeenCalledWith(
    expect.any(Object),
    MOCK_LEAGUE_DATA.id
  );
});
