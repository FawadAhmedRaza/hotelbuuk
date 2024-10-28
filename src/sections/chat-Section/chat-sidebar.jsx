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
  {
    id: 4,
    name: "Uran Poland",
    message: "We own hidden lake...",
    avatar:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnN8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500",
  },
  {
    id: 4,
    name: "Uran Poland",
    message: "We own hidden lake...",
    avatar:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnN8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500",
  },
  {
    id: 4,
    name: "Uran Poland",
    message: "We own hidden lake...",
    avatar:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnN8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500",
  },
  {
    id: 4,
    name: "Uran Poland",
    message: "We own hidden lake...",
    avatar:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnN8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500",
  },
  {
    id: 4,
    name: "Uran Poland",
    message: "We own hidden lake...",
    avatar:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnN8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500",
  },
  {
    id: 4,
    name: "Uran Poland",
    message: "We own hidden lake...",
    avatar:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnN8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500",
  },
  {
    id: 4,
    name: "Uran Poland",
    message: "We own hidden lake...",
    avatar:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnN8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500",
  },
  {
    id: 4,
    name: "Uran Poland",
    message: "We own hidden lake...",
    avatar:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnN8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500",
  },
];

const ChatSidebar = () => {
  return (
    <div className=" w-[500px] bg-slate-50 border-r flex flex-col h-screen ">
      <div className="h-16 border-b px-4 flex items-center justify-center space-x-4">
        <div className="px-4 py-4 border-b-4 border-b-blue-500">All</div>
        <div className="px-4 py-4">Archived</div>
      </div>

      {/* Overflow scroll container */}
      <div className="h-full  overflow-y-scroll">
        {mockUsers.map((user) => (
          <div
            key={user.id}
            className="px-5 py-4 flex items-center cursor-pointer border-l-4 border-l-transparent hover:bg-slate-100"
          >
            <img
              src={user.avatar}
              className="h-12 w-12 border-2 border-white rounded-full"
              alt={`${user.name} avatar`}
            />
            <div className="ml-4">
              <div>
                <p className="text-md font-semibold text-slate-600 m-0 p-0">
                  {user.name}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400 -mt-0.5 font-semibold">
                  {user.message}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;
