import * as api from "../../api";
import { GLOBALTYPES } from "../../constants/actionType";

export const sendMessage = (messageData, socket) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.START_LOADING });
    const {
      data: { data },
    } = await api.sendMessage(messageData);


    socket.emit("send-msg", JSON.stringify({
      ...data,
      conversation: messageData.conversation,
    }));

    dispatch({ type: GLOBALTYPES.ADDMESSAGE, data });
    dispatch({ type: GLOBALTYPES.END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getAllMessage = (conversation, navigate) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.START_LOADING });
    const {
      data: { data },
    } = await api.getAllMessage(conversation);
    dispatch({ type: GLOBALTYPES.GETALLMESSAGE, data });
    dispatch({ type: GLOBALTYPES.END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const deleteMessage = (messData,socket) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.START_LOADING });
    const {
      data: { data },
    } = await api.deleteMessage(messData);
    socket.emit("delete-msg", JSON.stringify({
      ...data,
      conversation: messData.conversation,
    }));
    dispatch({ type: GLOBALTYPES.DELETEMESSAGE, data });
    dispatch({ type: GLOBALTYPES.END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

