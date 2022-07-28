import React, { useEffect, useRef, useState } from "react";
import api from "../../api/apiChat";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function LeagueChat({ cable }) {
  const [messages, setMessages] = useState([]);
  const { user } = useSelector((state) => state.user.userState);
  const navigate = useNavigate();

  const updateMessages = (res) => {
    setMessages(res.data.messages);
  };

  useEffect(() => {
    // if user does not have a league, redirect to home
    if (user?.league_ids?.length > 0) {
      api.getChatMessages(updateMessages);
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (user?.league_ids?.length > 0) {
      const paramsToSend = {
        // The key here needs to be "channel" and should have the camelcase naming convention in rails e.g. conversation_channel.rb
        channel: "LeagueChatChannel",
        id: user.league_ids[0],
      };

      const handlers = {
        received(data) {
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
      league_chat_id: user.league_ids[0],
      body: "My first posted message",
    };
    api.postChatMessage(message);
  };

  return (
    <div>
      {messages?.length > 0
        ? messages.map((message) => <div key={message.id}>{message.body}</div>)
        : null}
      <button onClick={sendMessage}>Send a message</button>
    </div>
  );
}

export default LeagueChat;
