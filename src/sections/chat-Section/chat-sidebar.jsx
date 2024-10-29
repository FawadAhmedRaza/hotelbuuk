import { Iconify } from "@/src/components";
import React from "react";

const mockUsers = [
  {
    id: 1,
    name: "Yaroslav Zubkp",
    message: "Is this long ipsum available...",
    avatar:
      "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHVzZXJzfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500",
  },
  {
    id: 2,
    name: "Alison Alison",
    message: "Hello",
    avatar:
      "https://images.unsplash.com/photo-1499887142886-791eca5918cd?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHVzZXJzfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500",
  },
  {
    id: 3,
    name: "Mircel Jones",
    message: "Ok, Thanks.",
    avatar:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnN8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500",
  },
];

const ChatSidebar = ({ setSelectedUser }) => {
  return (
    <div className="w-full bg-slate-50 border-r flex flex-col h-screen">
      <div className="h-16 border-b px-4 flex items-center justify-center space-x-4">
        <div className="border border-zinc-300 bg-transparent flex gap-2  w-full rounded-md px-3 items-center">
          <Iconify
            iconName="ic:baseline-search"
            className="size-7  text-zinc-300"
          />
          <input
            className=" w-full   py-1  bg-transparent outline-none"
            placeholder="Search"
          />
        </div>
      </div>

      <div className="h-full overflow-y-scroll">
        {mockUsers.map((user) => (
          <div
            key={user.id}
            onClick={() => setSelectedUser(user)}
            className=" px-2 md:px-5 py-4 flex items-center cursor-pointer border-l-4 border-l-transparent hover:bg-slate-100"
          >
            <img
              src={user.avatar}
              className="h-12 w-12 border-2 border-white rounded-full"
              alt={`${user.name} avatar`}
            />
            <div className="ml-4">
              <p className="text-md font-semibold text-slate-600 m-0 p-0">
                {user.name}
              </p>
              <p className="text-xs text-slate-400  font-semibold">
                {user.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;
