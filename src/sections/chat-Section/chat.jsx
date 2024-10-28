import React from "react";
import ChatNav from "./chat-nav";
import ChatSidebar from "./chat-sidebar";
import ChatMainSection from "./chat-main-section";

const Chat = () => {
  return (
    <div className=" h-screen ">
      <div className="flex h-screen hide-scrollbar">
        <ChatSidebar />
        <ChatMainSection />
      </div>
    </div>
  );
};

export default Chat;
