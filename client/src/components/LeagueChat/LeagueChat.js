import React, { useEffect, useRef, useState } from "react";
import api from "../../api/apiChat";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

function LeagueChat({ cable }) {
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const { user } = useSelector((state) => state.user.userState);
  const { leagueId, leagueName } = location.state || null;
  const navigate = useNavigate();

  const updateMessages = (res) => {
    setMessages(res.data);
  };

  useEffect(() => {
    // if user does not have a league, redirect to home
    if (leagueId) {
      api.getChatMessages(leagueId, updateMessages);
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (leagueId) {
      const paramsToSend = {
        // The key here needs to be "channel" and should have the camelcase naming convention in rails e.g. conversation_channel.rb
        channel: "LeagueChatChannel",
        id: leagueId,
      };

      const handlers = {
        received(data) {
          console.log(data);
          setMessages([...messages, data]);
        },
        connected() {
          console.log("connected");
        },
        disconnected() {
          console.log("disconnected");
        },
      };

      const subscription = cable.subscriptions.create(paramsToSend, handlers);

      return function cleanup() {
        subscription.unsubscribe();
      };
    }
  }, [messages]);

  const sendMessage = () => {
    const message = {
      user_id: user.id,
      league_chat_id: leagueId,
      body: "My first posted message",
    };
    api.postChatMessage(message);
  };

  return (
    <div>
      <div>{leagueName} Chat Room</div>
      {messages?.length > 0
        ? messages.map((message) => (
            <div key={message.id}>
              <div>Username: {message.attributes.username}</div>
              <div>Message: {message.attributes.body}</div>
            </div>
          ))
        : null}
      <button onClick={sendMessage}>Send a message</button>
    </div>
  );
}

export default LeagueChat;
