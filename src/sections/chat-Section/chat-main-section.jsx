"use client";
import { getChatRoom, getMessagesByRoom } from "@/src/api/chat";
import { Button, Iconify } from "@/src/components";
import { useAuthContext } from "@/src/providers/auth/context/auth-context";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); 

const ChatMainSection = ({ id }) => {
  const [room, setRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const { user } = useAuthContext();

  console.log(id)
  
  const fetchRoomAndMessages = React.useCallback(async () => {
    console.log("Trgired fucntion")
    setLoading(true);
    try {
      const userIds = {
        userId1: user?.id,
        userId2: id,
      };
      const roomResponse = await getChatRoom(userIds);
      const roomData = roomResponse?.data;
      console.log("roomData",roomData)
      setRoom(roomData);
      const messagesResponse = await getMessagesByRoom(roomData?.id);
      setMessages(messagesResponse?.data);
      console.log("messagesResponse?.data",messagesResponse?.data)
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [id, user]);

  useEffect(() => {
    if (id) {
      fetchRoomAndMessages();
      socket.emit("joinRoom", { userId: user?.id, chatRoomId: id });
    }

    // Listen for new messages from the server
    socket.on("newMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, [id, fetchRoomAndMessages, user]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    socket.emit("sendMessage", {
      chatRoomId: room.id,
      senderId: user?.id,
      content: newMessage,
    });
    setNewMessage("");
  };

  if (!id) {
    return (
      <div className="w-full h-full flex justify-center items-center text-slate-400">
        Select a chat to start messaging
      </div>
    );
  }

  const selectedUser =
    room?.userAData?.id === user?.id ? room?.userBData : room?.userAData; 
  const uesrName = selectedUser?.hotel_name || `${selectedUser?.first_name} ${selectedUser?.last_name}`
  return (
    <div className="w-full h-full flex flex-col relative">
      <div className="h-16 border-b flex justify-between items-center w-full px-5 py-2 shadow-sm">
        <div className="flex items-center">
          <img
            className="h-10 w-10 overflow-hidden rounded-full"
            src={selectedUser?.profile_img}
            alt="User Avatar"
          />
          <p className="font-semibold ml-3 text-slate-600">
            {uesrName}
          </p>
        </div>
      </div>

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
                  {msg.senderId === user?.id ? "Me" : selectedUser?.name}
                  <span className="text-slate-400 text-xs ml-1">
                    {new Date(msg.createdAt).toLocaleTimeString()}
                  </span>
                </p>
              </div>
              <div
                className={`mt-3 p-4 rounded-xl ${
                  msg.senderId === user?.id
                    ? "bg-blue-500 text-white"
                    : "bg-slate-50 text-slate-500"
                }`}
              >
                <p className="text-sm">{msg.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full px-5 py-3 border-t absolute bottom-0 left-0 bg-white">
        <div className="h-12 flex justify-between px-3 items-center border border-transparent bg-slate-50 focus-within:border-slate-300 rounded-lg">
          <input
            type="text"
            className="w-full px-3 bg-transparent outline-none placeholder:text-slate-400"
            placeholder="Type your message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Button className={"px-2.5 bg-blue-600"} onClick={handleSendMessage}>
            <Iconify iconName="mingcute:send-plane-fill" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatMainSection;
