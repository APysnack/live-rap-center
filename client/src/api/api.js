import axios from "axios";

const API_URL = "http://localhost:3001";

class API {
  passwordReset = (payload) => {
    axios
      .post(`${API_URL}/password/reset`, payload)
      .then((res) => console.log(res));
  };
  updatePassword = (payload) => {
    axios.get(`${API_URL}/password/reset/edit`, {
      params: { token: payload.token, password: payload.new_password },
    });
  };
}

export default new API();
