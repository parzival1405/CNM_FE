import * as api from "../../api";
import { GLOBALTYPES } from "../../constants/actionType";

export const sendMessage = (messageData, socket) => async (dispatch) => {
  try {
    const { sender, conversation, text, type, media, isRoom } = messageData;
    
    dispatch({ type: GLOBALTYPES.START_LOADING });
    console.log(messageData);

    const {
      data: { data },
    } = await api.sendMessage(messageData);


    socket.emit(isRoom ? "sendGroupMessage" : "send-msg", JSON.stringify({
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

