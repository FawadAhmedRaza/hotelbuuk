"use client"
import React, { useState } from "react";
import ChatNav from "./chat-nav";
import ChatSidebar from "./chat-sidebar";
import ChatMainSection from "./chat-main-section";

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className=" h-screen ">
      <div className="flex h-screen hide-scrollbar">
      <ChatSidebar setSelectedUser={setSelectedUser} />
      <ChatMainSection selectedUser={selectedUser} />
      </div>
    </div>
  );
};

export default Chat;
