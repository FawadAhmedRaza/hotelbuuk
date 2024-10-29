"use client";
import React, { useState } from "react";
import ChatNav from "./chat-nav";
import ChatSidebar from "./chat-sidebar";
import ChatMainSection from "./chat-main-section";

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  // Function to handle user selection from the sidebar
  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  // Function to go back to the sidebar
  const handleBackToSidebar = () => {
    setSelectedUser(null);
  };

  return (
    <div className="h-screen flex">
      {/* Sidebar visible on small screens when no user is selected */}
      <div
        className={`md:block ${
          selectedUser ? "hidden" : "block"
        } w-full md:w-[30%] bg-gray-50`}
      >
        <ChatSidebar setSelectedUser={handleUserSelect} />
      </div>

      {/* Main chat section visible when a user is selected */}
      <div className={`flex-1 w-[70%] ${selectedUser ? "block" : "hidden"} md:block`}>
        <ChatMainSection
          selectedUser={selectedUser}
          onBack={handleBackToSidebar}
        />
      </div>
    </div>
  );
};

export default Chat;
