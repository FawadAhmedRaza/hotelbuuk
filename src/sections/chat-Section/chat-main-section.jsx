"use client";
import { getChatRoom, getMessagesByRoom } from "@/src/api/chat";
import {
  Avatar,
  Button,
  Iconify,
  ProfileAvatar,
  Typography,
} from "@/src/components";
import { useAuthContext } from "@/src/providers/auth/context/auth-context";
import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { LoadingScreen } from "@/src/components/loading-screen";

const socket = io("http://localhost:5000");

const ChatMainSection = ({ id, onBack }) => {
  const [room, setRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(0);
  const [roomLoading, setRoomLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const { user } = useAuthContext();

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchRoom = React.useCallback(async () => {
    try {
      setRoomLoading(true);
      const userIds = { userId1: user?.id, userId2: id };
      const roomResponse = await getChatRoom(userIds);
      setRoom(roomResponse?.data);
    } catch (error) {
      console.log("Error", error);
    } finally {
      setRoomLoading(false);
    }
  }, [id, user]);

  const fetchMessages = React.useCallback(async () => {
    if (!room) return;
    try {
      const messagesResponse = await getMessagesByRoom(room?.id);
      setMessages(messagesResponse?.data);
      socket.emit("joinRoom", { userId: user?.id, chatRoomId: room?.id });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading((prev) => prev + 1);
    }
  }, [id, user, room]);

  useEffect(() => {
    if (id) {
      fetchRoom();
    }
    socket.on("newMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, [id, user]);

  useEffect(() => {
    if (room) {
      const intervalId = setInterval(() => {
        fetchMessages();
      }, 3000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [room]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;
    socket.emit("sendMessage", {
      chatRoomId: room.id,
      senderId: user?.id,
      content: newMessage,
    });
    setNewMessage("");
  };

  if (roomLoading) {
    return <LoadingScreen />;
  }

  if (!room) {
    return (
      <div className="flex h-screen hide-scrollbar">
        <div className="w-full h-full flex justify-center items-center text-slate-400">
          Select a chat to start messaging
        </div>
      </div>
    );
  }

  const selectedUser =
    room?.userAData?.id === user?.id ? room?.userBData : room?.userAData;
  const nomadName = selectedUser?.first_name
    ? `${selectedUser?.first_name} ${selectedUser?.last_name}`
    : "";
  const userName = selectedUser?.hotel_name || nomadName;

  return (
    <div className="w-full h-full flex flex-col relative">
      <div className="h-16 border-b flex justify-between items-center w-full px-5 py-2 shadow-sm">
        <div className="flex items-center">
          <Iconify
            iconName="gg:arrow-left"
            onClick={onBack}
            className="md:hidden flex text-gray-400 cursor-pointer"
          />
          <ProfileAvatar
            type="server"
            src={selectedUser?.profile_img}
            effect="blur"

            className="h-10 w-10 overflow-hidden rounded-full"
            alt={userName}
          />
          <p className="font-semibold ml-3 text-slate-600">{userName}</p>
        </div>
      </div>
      {loading === 0 ? (
        <h6>Loading....</h6>
      ) : (
        <div className="px-5 pt-4 pb-24 overflow-y-scroll">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`w-full flex ${
                msg.senderId === user?.id ? "justify-end" : "justify-start"
              } mt-3`}
            >
              <div className="w-1/2">
                <div
                  className={`flex items-center ${
                    msg.senderId === user?.id ? "justify-end" : ""
                  }`}
                >
                  <p
                    className={`font-semibold ${
                      msg.senderId === user?.id ? "mr-3" : "ml-3"
                    } text-sm text-slate-600`}
                  >
                    {msg.senderId === user?.id ? "Me" : userName}
                    <span className="text-slate-400 text-xs ml-1">
                      {new Date(msg.sentAt).toLocaleTimeString()}
                    </span>
                  </p>
                </div>
                <div
                  className={`mt-3 p-4 rounded-xl ${
                    msg.senderId === user?.id
                      ? "bg-purple-500 text-white"
                      : "bg-slate-50 text-slate-500"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}
      <form
        onSubmit={handleSendMessage}
        className="absolute bottom-0 w-full px-5 py-3 flex items-center"
      >
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
          className="w-full p-2 border rounded-lg"
        />
        <button
          type="submit"
          className="ml-3 bg-purple-500 text-white px-4 py-2 rounded-lg"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatMainSection;
