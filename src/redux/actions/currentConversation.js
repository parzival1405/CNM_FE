import * as api from "../../api";
import { GLOBALTYPES } from "../../constants/actionType";

export const setCurrentConversation =
  (currentConversation) => async (dispatch) => {
    try {
      dispatch({
        type: GLOBALTYPES.REMOVE_COUNT_WAITING_MESSAGE,
        payload: currentConversation,
      });
      dispatch({
        type: GLOBALTYPES.CURRENTCONVERSATION,
        data: currentConversation,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const addMembersToGroup = (data2,user, socket) => async (dispatch) => {
  try {
    const { data } = await api.addMemberGroup(data2);
    dispatch({ type: GLOBALTYPES.UPDATEMEMBER, data });
    dispatch({ type: GLOBALTYPES.UPDATEMEMBER_ALL_CONVERSATION, data });
    socket.emit("addMemberToGroup", {...data,userChange: user._id});
  } catch (error) {
    console.log(error);
  }
};

export const changeCurrentConversationGroupName =
  (data2, label, user, socket) => async (dispatch) => {
    try {
      const { data } = await api.changeLabel(data2);
      dispatch({
        type: GLOBALTYPES.CHANGE_GROUP_NAME,
        data,
      });
      dispatch({
        type: GLOBALTYPES.CHANGE_GROUP_NAME_ALL_CONVERSATION,
        data,
      });
      socket.emit("changeGroupName", {
        ...data,
        userChange: user._id,
        msg: `${user.username} đã thay đổi tên nhóm ${label} thành ${data2.newLabel}`,
      });
    } catch (err) {
      //   dispatch({
      //     type: GLOBALTYPES.ALERT,
      //     payload: {
      //       error: err,
      //     },
      //   });
    }
  };
