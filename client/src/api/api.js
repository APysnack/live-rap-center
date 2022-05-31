import axios from "axios";
const { REACT_APP_YT_API_KEY } = process.env;

const API_URL = "http://localhost:3001";
const YT_VIDEO_API = "https://www.googleapis.com/youtube/v3/videos";

class API {
  passwordReset = (payload) => {
    axios.post(`${API_URL}/password/reset`, payload).then((res) => res);
  };

  updatePassword = (payload) => {
    axios.get(`${API_URL}/password/reset/edit`, {
      params: { token: payload.token, password: payload.new_password },
    });
  };

  fetchYouTubeVideo = (id, callback) => {
    axios
      .get(`${YT_VIDEO_API}?key=${REACT_APP_YT_API_KEY}`, {
        params: { part: "snippet, statistics, player", id: id },
      })
      .then((res) => {
        callback(res.data.items[0]);
      });
  };
}

export default new API();
