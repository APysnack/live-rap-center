import axios from "axios";
const { REACT_APP_SERVER_URL } = process.env;

class APIChat {
  postChatMessage = (payload) => {
    axios
      .post(`${REACT_APP_SERVER_URL}/league-chat-message`, payload)
      .then((res) => console.log(res));
  };
  getChatMessages = (id, callback) => {
    axios
      .get(`${REACT_APP_SERVER_URL}/league-chat-message`, {
        params: { id: id },
      })
      .then((res) => callback(res));
  };
}

export default new APIChat();
