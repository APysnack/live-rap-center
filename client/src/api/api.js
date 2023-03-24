import axios from 'axios';
const { REACT_APP_SERVER_URL } = process.env;

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

  fetchYouTubeVideos = (ids, callback) => {
    axios
      .get(`${REACT_APP_SERVER_URL}/videos`, {
        params: {
          ids: ids,
        },
      })
      .then((res) => {
        if (res.data.items.length === 1) {
          callback(res.data.items[0]);
        } else {
          callback(res.data.items);
        }
      });
  };
}

export default new API();
