import axios from 'axios';
const { REACT_APP_SERVER_URL } = process.env;

class APIChat {
  postChatMessage = (payload) => {
    console.log(payload);
    axios
      .post(`${REACT_APP_SERVER_URL}/league-chat-message`, payload)
      .then((res) => console.log(res));
  };

  // note we retrieve messages from the chat that belongs to the league with id: leagueId
  getChatMessages = (leagueId, callback) => {
    axios
      .get(`${REACT_APP_SERVER_URL}/league-chat-message`, {
        params: { id: leagueId },
      })
      .then((res) => callback(res));
  };
  postCrewChatMessage = (payload) => {
    console.log(payload);
    axios
      .post(`${REACT_APP_SERVER_URL}/crew-chat-message`, payload)
      .then((res) => console.log(res));
  };

  // note we retrieve messages from the chat that belongs to the league with id: crewId
  getCrewChatMessages = (leagueId, callback) => {
    axios
      .get(`${REACT_APP_SERVER_URL}/crew-chat-message`, {
        params: { id: leagueId },
      })
      .then((res) => callback(res));
  };

  postBookingChatMessage = (payload) => {
    console.log(payload);
    axios
      .post(`${REACT_APP_SERVER_URL}/booking-chat-message`, payload)
      .then((res) => console.log(res));
  };

  getBookingChatMessages = (bookingOfferId, callback) => {
    axios
      .get(`${REACT_APP_SERVER_URL}/booking-chat-message`, {
        params: { id: bookingOfferId },
      })
      .then((res) => callback(res));
  };

  postBookingChatOffer = (payload) => {
    console.log(payload);
    axios
      .post(`${REACT_APP_SERVER_URL}/booking-chat-offer`, payload)
      .then((res) => console.log(res));
  };

  getBookingChatOffer = (bookingOfferId, callback) => {
    axios
      .get(`${REACT_APP_SERVER_URL}/booking-chat-offer`, {
        params: { id: bookingOfferId },
      })
      .then((res) => callback(res.data.attributes));
  };
}

export default new APIChat();
