import ChatSidebar from "@/src/sections/chat-Section/chat-sidebar";
import React from "react";

const page = () => {
  return (
    <>
      <div className=" w-full md:w-[30%] bg-red-300f">
        <ChatSidebar />
      </div>
      <div className="w-full hidden md:block md:w-[70%]">
        <div className="w-full h-full flex justify-center items-center text-slate-400">
          Select a chat to start messaging
        </div>
      </div>
    </>
  );
};

export default page;
