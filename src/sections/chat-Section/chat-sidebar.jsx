"use client";
import { getUserRooms } from "@/src/api/chat";
import { ProfileAvatar, Iconify } from "@/src/components";
import { useAuthContext } from "@/src/providers/auth/context/auth-context";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ChatSidebar = () => {
  const [chats, setChats] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuthContext();
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
  }, []);

  // Filtered chats based on the search term
  const filteredChats = chats.filter((chatRoom) => {
    const otherUser =
      chatRoom?.userAData?.id === user.id
        ? chatRoom?.userBData
        : chatRoom?.userAData;
    const userName =
      otherUser?.hotel_name ||
      `${otherUser?.first_name} ${otherUser?.last_name}`;
    return userName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="w-full bg-slate-50 border-r flex flex-col h-screen">
      {/* Search input */}
      <div className="h-16 border-b px-4 flex items-center justify-center space-x-4">
        <div className="border border-zinc-300 bg-transparent flex gap-2 w-full rounded-md px-3 items-center">
          <Iconify
            iconName="ic:baseline-search"
            className="size-7 text-zinc-300"
          />
          <input
            className="w-full py-1 bg-transparent outline-none"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Chat rooms list */}
      <div className="h-full overflow-y-scroll">
        {filteredChats.map((chatRoom) => {
          const otherUser =
            chatRoom?.userAData?.id === user.id
              ? chatRoom?.userBData
              : chatRoom?.userAData;
          const latestMessage =
            chatRoom?.messages && chatRoom?.messages.length > 0
              ? chatRoom.messages[0].content
              : "";

          const userName =
            otherUser?.hotel_name ||
            `${otherUser?.first_name} ${otherUser?.last_name}`;
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
                iconSize=" !h-12 !w-12 border border-black"
                type="server"
                src={otherUser?.profile_img}
                alt={userName}
                effect="blur"
                className="h-12 w-12 border border-white rounded-full"
              />
              <div className="ml-4">
                <p className="text-md font-medium text-black m-0 p-0">
                  {userName}
                </p>
                <p className="text-xs text-gray-500 font-medium">
                  {latestMessage.length > 25
                    ? `${latestMessage.slice(0, 25)}...`
                    : latestMessage}
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
