import { Button, Iconify } from "@/src/components";
import React from "react";

const ChatMainSection = ({ selectedUser }) => {
  if (!selectedUser) {
    return (
      <div className="w-full h-full flex justify-center items-center text-slate-400">
        Select a chat to start messaging
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col relative">
      <div className="h-16 border-b flex justify-between items-center w-full px-5 py-2 shadow-sm">
        <div className="flex items-center">
          <img
            className="h-10 w-10 overflow-hidden rounded-full"
            src={selectedUser.avatar}
            alt="User Avatar"
          />
          <p className="font-semibold ml-3 text-slate-600">
            {selectedUser.name}
          </p>
        </div>
        <div className="flex items-center space-x-5">
          {/* Additional icons/buttons can go here */}
        </div>
      </div>

      <div className="px-5 pt-4 pb-24 overflow-y-scroll">
        {/* Message from User */}
        <div className="w-full flex flex-start">
          <div className="w-1/2">
            <div className="flex items-center">
              <img
                className="h-5 w-5 overflow-hidden rounded-full"
                src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnN8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500"
                alt="User Avatar"
              />
              <p className="font-semibold ml-3 text-sm text-slate-600">
                Mircel Jones{" "}
                <span className="text-slate-400 text-xs">3:21 PM</span>
              </p>
            </div>
            <div className="mt-3 w-full bg-slate-50 p-4 rounded-b-xl rounded-tr-xl">
              <p className="text-sm text-slate-500">
                Hey all, <br />
                There are many variations of passages of Lorem Ipsum available,
                but the majority have been altered in some form.
              </p>
            </div>
          </div>
        </div>

        {/* Message from Me */}
        <div className="w-full flex justify-end mt-3">
          <div className="w-1/2">
            <div className="flex items-center justify-end">
              <p className="font-semibold mr-3 text-sm text-slate-600">
                Me <span className="text-slate-400 text-xs">3:25 PM</span>
              </p>
              <img
                className="h-5 w-5 overflow-hidden rounded-full"
                src="https://source.unsplash.com/random/500x500/?face"
                alt="User Avatar"
              />
            </div>
            <div className="mt-3 w-full bg-blue-500 p-4 rounded-b-xl rounded-tl-xl">
              <p className="text-sm text-white">
                Hey, <br />
                We own a hidden lake forest, a natural lake typically found in
                mountains.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end mt-3">
          <div className="w-1/2">
            <div className="flex items-center justify-end">
              <p className="font-semibold mr-3 text-sm text-slate-600">
                Me <span className="text-slate-400 text-xs">3:25 PM</span>
              </p>
              <img
                className="h-5 w-5 overflow-hidden rounded-full"
                src="https://source.unsplash.com/random/500x500/?face"
                alt="User Avatar"
              />
            </div>
            <div className="mt-3 w-full bg-blue-500 p-4 rounded-b-xl rounded-tl-xl">
              <p className="text-sm text-white">
                Hey, <br />
                We own a hidden lake forest, a natural lake typically found in
                mountains.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end mt-3">
          <div className="w-1/2">
            <div className="flex items-center justify-end">
              <p className="font-semibold mr-3 text-sm text-slate-600">
                Me <span className="text-slate-400 text-xs">3:25 PM</span>
              </p>
              <img
                className="h-5 w-5 overflow-hidden rounded-full"
                src="https://source.unsplash.com/random/500x500/?face"
                alt="User Avatar"
              />
            </div>
            <div className="mt-3 w-full bg-blue-500 p-4 rounded-b-xl rounded-tl-xl">
              <p className="text-sm text-white">
                Hey, <br />
                We own a hidden lake forest, a natural lake typically found in
                mountains.
              </p>
            </div>
          </div>
        </div>

        {/* Date Divider */}
        <div className="text-center my-5">
          <hr className="-mb-3" />
          <span className="text-xs text-slate-300 font-medium bg-white px-3 -mt-3">
            Today, 2:15 AM
          </span>
        </div>

        {/* Another User Message */}
        <div className="w-full flex flex-start">
          <div className="w-1/2">
            <div className="flex items-center">
              <img
                className="h-5 w-5 overflow-hidden rounded-full"
                src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnN8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500"
                alt="User Avatar"
              />
              <p className="font-semibold ml-3 text-sm text-slate-600">
                Mircel Jones{" "}
                <span className="text-slate-400 text-xs">3:21 PM</span>
              </p>
            </div>
            <div className="mt-3 bg-slate-50 p-4 rounded-b-xl rounded-tr-xl">
              <p className="text-sm text-slate-500">Ok, Thanks</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-5 py-3 border-t absolute bottom-0 left-0 bg-white">
        <div className="h-12 flex justify-between px-3 items-center border border-transparent bg-slate-50 focus-within:border-slate-300 rounded-lg">
          <input
            type="text"
            className="w-full px-3 bg-transparent outline-none placeholder:text-slate-400"
            placeholder="Type your message"
          />
          <div className="flex items-center space-x-4 ">
            <Button className={"px-2.5 bg-blue-600"}>
              <Iconify iconName="mingcute:send-plane-fill" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMainSection;
