import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

function Chat() {
  const { toUserId } = useParams();
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      text: newMessage,
      toUserId,
      userId,
      name: user?.name,
    });
    setNewMessage("");
  };

  const fetchMessages = async () => {
    const chats = await axios.get(BASE_URL + "/chat/messages/" + toUserId, {
      withCredentials: true,
    });
    console.log(messages.data);
    const chatMessages = chats?.data?.map((chat) => {
      return {
        text: chat?.text,
        name: chat?.senderId?.name,
      };
    });

    setMessages(chatMessages);
  };

  useEffect(() => {
    if (toUserId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchMessages();
    }
  }, [toUserId]);

  useEffect(() => {
    if (toUserId && userId) {
      const socket = createSocketConnection();
      socket.emit("joinChat", { name: user?.name, toUserId, userId });

      socket.on("messageReceived", ({ text, name }) => {
        setMessages((prev) => [...prev, { text, name }]);
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [toUserId, userId]);

  return (
    <div className="w-full flex justify-center my-20">
      <div className="w-3/4 border-2 flex flex-col p-5 rounded-lg">
        <div className="h-90 overflow-scroll">
          {messages &&
            messages.map((message, index) => {
              console.log(user.name === message.name);

              return (
                <div
                  key={index}
                  className={`chat ${
                    user.name === message.name ? "chat-end" : "chat-start"
                  }`}
                >
                  <div className="chat-header">{message?.name}</div>
                  <div className="chat-bubble bg-base-300">{message?.text}</div>
                </div>
              );
            })}
        </div>
        <div className="flex items-center join">
          <input
            type="text"
            placeholder="Type here"
            className="input w-full join-item"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            className="btn btn-neutral join-item"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
