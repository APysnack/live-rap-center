const { MOCK_LEAGUE_DATA } = require('./mock-pg-response');
const {
  SEARCH_ITEMS_CONTENT,
  VIDEO_ITEMS_CONTENT,
  FETCH_VIDEOS_MOCK_RESPONSE,
} = require('./mock-youtube-response');
const {
  filterByVersus,
  getVideoIds,
  removeYouTubeShorts,
  exceedsDuration,
  createBattlesFor,
} = require('../../utils');

const { invokeAddVideoToDbLambda } = require('../../pgFunctions');

jest.mock('../../pgFunctions', () => ({
  invokeAddVideoToDbLambda: jest.fn(() => 'Baz'),
}));

describe('filterByVersus and getVideoIds functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const EXPECTED_LENGTH = 46;

  test('filterByVersus should return an array with the expected length', () => {
    const result = filterByVersus(SEARCH_ITEMS_CONTENT);
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(EXPECTED_LENGTH);
    result.forEach((item) => {
      expect(item.snippet.title.toLowerCase()).toContain('vs');
    });
  });

  test('getVideoIds should return an array with the expected length', () => {
    const result = filterByVersus(SEARCH_ITEMS_CONTENT);
    const videoIdsString = getVideoIds(result);
    expect(typeof videoIdsString).toBe('string');
    console.log(videoIdsString);
    const videoIdsArray = videoIdsString.split(',');
    expect(Array.isArray(videoIdsArray)).toBe(true);
    expect(videoIdsArray).toHaveLength(EXPECTED_LENGTH);
  });

  test('exceedsDuration should return false for duration less than 7 minutes', () => {
    const result = exceedsDuration('PT6M55S');
    expect(result).toBe(false);
  });

  test('exceedsDuration should return false for duration exactly 7 minutes', () => {
    const result = exceedsDuration('PT7M1S');
    expect(result).toBe(false);
  });

  test('exceedsDuration should return true for duration more than 7 minutes', () => {
    const result = exceedsDuration('PT8M');
    expect(result).toBe(true);
  });

  test('exceedsDuration should handle durations with hours and minutes', () => {
    const result = exceedsDuration('PT1H30M');
    expect(result).toBe(true);
  });

  test('exceedsDuration should handle durations with only hours', () => {
    const result = exceedsDuration('PT2H');
    expect(result).toBe(true);
  });

  test('exceedsDuration should handle durations with only seconds', () => {
    const result = exceedsDuration('PT46S');
    expect(result).toBe(false);
  });

  test('exceedsDuration should handle durations with hours, minutes, and seconds', () => {
    const result = exceedsDuration('PT2H30M45S');
    expect(result).toBe(true);
  });

  test('removeYouTubeShorts should remove all youtube vids shorter than 8 mins', () => {
    const videosWithVsInTitle = filterByVersus(SEARCH_ITEMS_CONTENT);
    const contentDetails = VIDEO_ITEMS_CONTENT;
    const result = removeYouTubeShorts(videosWithVsInTitle, contentDetails);
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(EXPECTED_LENGTH - 8);
  });

  test('createBattles for invokes lambda function', async () => {
    const result = await createBattlesFor(
      FETCH_VIDEOS_MOCK_RESPONSE.videos,
      MOCK_LEAGUE_DATA,
      []
    );

    expect(invokeAddVideoToDbLambda).toHaveBeenCalledTimes(35);

    invokeAddVideoToDbLambda.mock.calls.forEach((call, index) => {
      const [battleInfo] = call;
      expect(battleInfo.leagueId).toBe(MOCK_LEAGUE_DATA.id);
      expect(battleInfo.viewCount).not.toBeNull();
      expect(battleInfo.video).toBe(FETCH_VIDEOS_MOCK_RESPONSE.videos[index]);
      expect(battleInfo.battleUrl).toBe(
        FETCH_VIDEOS_MOCK_RESPONSE.videos[index].id.videoId
      );
    });
  });

  test('createBattlesFor does not invoke lambda function for already-processed videos', async () => {
    const result = await createBattlesFor(
      FETCH_VIDEOS_MOCK_RESPONSE.videos,
      MOCK_LEAGUE_DATA,
      ['dByMmbBt9bk', 'Z96KPAO2XW8']
    );

    expect(invokeAddVideoToDbLambda).toHaveBeenCalledTimes(33);
  });
});
