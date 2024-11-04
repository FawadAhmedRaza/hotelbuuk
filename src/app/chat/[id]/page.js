import ChatMainSection from "@/src/sections/chat-Section/chat-main-section";
import React from "react";

const page = ({ params }) => {
  return <ChatMainSection id={params.id} />;
};

export default page;
