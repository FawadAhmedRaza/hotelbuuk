import axios from "axios";
import { endpoints } from "./constants";

const getChatRoom = async (data) => {
  const resposne = await axios.post(endpoints.chats.getRoom, data);
  return resposne;
};

const getMessagesByRoom = async (chatId) => {
  const response = await axios.get(endpoints.chats.getRoomMessages(chatId));
  return response;
};

const getUserRooms = async (userId) => {
  const response = await axios.get(endpoints.chats.getRoomsUser(userId));
  return response;
};

export { getChatRoom, getMessagesByRoom, getUserRooms };
