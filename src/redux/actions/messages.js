import * as api from "../../api";
import { GLOBALTYPES } from "../../constants/actionType";

export const sendMessage = (messageData, socket) => async (dispatch) => {
  try {
    const {isRoom} = messageData;
    dispatch({ type: GLOBALTYPES.START_LOADING });
    const {
      data: { data },
    } = await api.sendMessage(messageData);
    socket.emit(isRoom ? "sendGroupMessage" : "send-msg", {...data,conversation:messageData.conversation});
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

//demo

export const sendMessageTest = (messagedata, navigate) => async (dispatch) => {
  try {
    const { room } = messagedata;
    dispatch({ type: GLOBALTYPES.START_LOADING });
    const data = messagedata;
    if (room) {
      dispatch({ type: GLOBALTYPES.ADDGROUPMESSAGE, data });
    } else {
      dispatch({ type: GLOBALTYPES.ADDMESSAGE, data });
    }

    dispatch({ type: GLOBALTYPES.END_LOADING });
  } catch (error) {
    console.log(error);
  }
};
