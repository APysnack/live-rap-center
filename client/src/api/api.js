import axios from 'axios';
const { REACT_APP_YT_API_KEY, REACT_APP_SERVER_URL, REACT_APP_YT_VIDEO_API } =
  process.env;

class API {
  passwordReset = (payload) => {
    axios
      .post(`${REACT_APP_SERVER_URL}/password/reset`, payload)
      .then((res) => res);
  };
  updatePassword = (payload, callback) => {
    axios
      .get(`${REACT_APP_SERVER_URL}/password/reset/edit`, {
        params: { token: payload.token, password: payload.new_password },
      })
      .then((res) => callback(res.status));
  };
  fetchYouTubeVideo = (id, callback) => {
    axios
      .get(`${REACT_APP_YT_VIDEO_API}?key=${REACT_APP_YT_API_KEY}`, {
        params: { part: 'snippet, statistics, player', id: id },
      })
      .then((res) => {
        callback(res.data.items[0]);
      });
  };

  // per youtube API docs, video ids format should be: ["id1,id2,id3"]
  // doublecheck to be sure, it may just need to be a string of csv id's and not an array
  fetchYouTubeVideos = (ids, callback) => {
    axios
      .get(`${REACT_APP_YT_VIDEO_API}?key=${REACT_APP_YT_API_KEY}`, {
        params: {
          part: 'snippet, statistics, player',
          id: ids,
        },
      })
      .then((res) => {
        callback(res.data.items);
      });
  };
}

export default new API();
