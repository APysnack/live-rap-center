import axios from 'axios';
const { REACT_APP_SERVER_URL } = process.env;

class APIChat {
  getSpaces = (callback) => {
    axios
      .get(`${REACT_APP_SERVER_URL}/spaces`)
      .then((res) => callback(res.data));
  };
}

export default new APIChat();
