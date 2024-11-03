const base_url = "https://hotelbuuk-chat.onrender.com/api";
const endpoints = {
  chats: {
    getRoomsUser: (userId) => `${base_url}/chats/user/${userId}`,
    getRoom: `${base_url}/chat`,
    getRoomMessages:(chatId)=>`${base_url}/chats/${chatId}/messages`
  },
};

export {endpoints}
