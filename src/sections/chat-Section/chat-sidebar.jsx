"use client";
import { getUserRooms } from "@/src/api/chat";
import { Avatar, ProfileAvatar } from "@/src/components";
import { useAuthContext } from "@/src/providers/auth/context/auth-context";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ChatSidebar = () => {
  const [chats, setChats] = useState([]);
  const { user } = useAuthContext();
  const { id } = useParams();
  const router = useRouter();
  const fetchChats = async () => {
    try {
      const response = await getUserRooms(user.id);
      console.log("Response", response);
      setChats(response.data);
    } catch (err) {
      console.error("Error fetching chat rooms:", err);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchChats();
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [id]);

  return (
    <div className="w-[500px] bg-slate-50 border-r flex flex-col h-screen">
      {/* Search input */}
      <div className="h-16 border-b px-4 flex items-center justify-center space-x-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full border border-zinc-400 bg-transparent rounded-xl py-1 px-3 outline-none"
        />
      </div>

      {/* Chat rooms list */}
      <div className="h-full overflow-y-scroll">
        {chats.map((chatRoom) => {
          const otherUser =
            chatRoom?.userAData?.id === user.id
              ? chatRoom?.userBData
              : chatRoom?.userAData;
          const latestMessage =
            chatRoom?.messages && chatRoom?.messages?.length > 0
              ? chatRoom?.messages[0]?.content
              : "";

          const nomadName = otherUser?.first_name
            ? `${otherUser?.first_name} ${otherUser?.last_name}`
            : "";
          console.log("namadName", nomadName);
          const userName = otherUser?.hotel_name || nomadName;
          console.log("userName", userName);
          if (!userName) {
            return null;
          }
          return (
            <div
              key={chatRoom.id}
              onClick={() => router.push(`/chat/${otherUser.id}`)}
              className="px-5 py-4 flex items-center cursor-pointer border-l-4 border-l-transparent hover:bg-slate-100"
            >
              <ProfileAvatar
                type="server"
                src={otherUser?.profile_img}
                alt={userName}
                className="h-12 w-12 border-2 border-white rounded-full"
              />
              <div className="ml-4">
                <p className="text-md font-semibold text-slate-600 m-0 p-0">
                  {userName}
                </p>
                <p className="text-xs text-slate-400 -mt-0.5 font-semibold">
                  {latestMessage}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatSidebar;
