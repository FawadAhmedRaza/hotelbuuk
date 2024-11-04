<div className="px-5 pt-4 pb-24 overflow-y-scroll">
  {messages.map((msg) => (
    <div
      key={msg.id}
      className={`w-full flex ${
        msg.senderId === user?.id ? "justify-end" : "justify-start"
      } mt-3`}
    >
      <div className="max-w-[70%] md:max-w-[60%] lg:max-w-[50%]">
        <div
          className={`flex items-center ${
            msg.senderId === user?.id ? "justify-end" : ""
          }`}
        >
          <p
            className={`font-semibold ${
              msg.senderId === user?.id ? "mr-3" : "ml-3"
            } text-xs text-slate-600`}
          >
            {msg.senderId === user?.id ? "Me" : userName}
            <span className="text-slate-400 text-xs ml-1">
              {new Date(msg.sentAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </p>
        </div>
        <div
          className={`mt-1 p-3 rounded-lg max-w-full break-words ${
            msg.senderId === user?.id
              ? "bg-green-500 text-white rounded-tr-none ml-auto"
              : "bg-gray-200 text-gray-700 rounded-tl-none mr-auto"
          }`}
        >
          <p className="text-sm leading-5 whitespace-pre-wrap">
            {msg.content}
          </p>
        </div>
      </div>
    </div>
  ))}
  <div ref={messagesEndRef} />
</div>
