const base_url = "http://localhost:5000/api";
const endpoints = {
  chats: {
    getRoomsUser: (userId) => `${base_url}/chats/user/${userId}`,
    getRoom: `${base_url}/chat`,
    getRoomMessages:(chatId)=>`${base_url}/chats/${chatId}/messages`
  },
};

export {endpoints}
