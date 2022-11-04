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

export const addMembersToGroup = (data2, user, socket) => async (dispatch) => {
  try {
    const { data } = await api.addMemberGroup(data2);
    dispatch({ type: GLOBALTYPES.UPDATEMEMBER, payload: { data: data, user: user } });
    dispatch({ type: GLOBALTYPES.UPDATEMEMBER_ALL_CONVERSATION, payload: { data: data, user: user } });
    socket.emit(
      "addMemberToGroup",
      JSON.stringify({ conversation: data, userChange: user._id })
    );
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
      socket.emit(
        "changeGroupName",
        JSON.stringify({
          conversation: data,
          userChange: user._id,
          msg: `${user.username} đã thay đổi tên nhóm ${label} thành ${data2.newLabel}`,
        })
      );
    } catch (err) {
      //   dispatch({
      //     type: GLOBALTYPES.ALERT,
      //     payload: {
      //       error: err,
      //     },
      //   });
    }
  };

export const deleteMemberGroup =
  (data2,user, member, socket) => async (dispatch) => {
    try {
      const { data } = await api.deleteMember(data2);
      dispatch({
        type: GLOBALTYPES.DELETE_MEMBER_GROUP,
        payload: { data: data, user: user },
      });
      dispatch({
        type: GLOBALTYPES.DELETE_MEMBER_GROUP_ALL_CONVERSATION,
        payload: { data: data, user: user },
      });
      socket.emit(
        "deleteMemberGroup",
        JSON.stringify({
          conversation: data,
          deleteUser: member._id,
          msg: `Đã bị xóa ${member.username} khỏi nhóm`,
        })
      );
    } catch (err) {
      //   dispatch({
      //     type: GLOBALTYPES.ALERT,
      //     payload: {
      //       error: err,
      //     },
      //   });
    }
  };

export const changeCreator = (data2, user, socket) => async (dispatch) => {
  try {
    const { data } = await api.updateCreator(data2);
    dispatch({
      type: GLOBALTYPES.UPDATE_CREATOR_GROUP,
      data,
    });
    dispatch({
      type: GLOBALTYPES.UPDATE_CREATOR_GROUP_ALL_CONVERSATION,
      data,
    });
    socket.emit(
      "changeCreatorGroup",
      JSON.stringify({
        conversation: data,
        oldCreator: user._id,
        // msg: `Đã bị xóa ${member.username} khỏi nhóm`,
      })
    );
  } catch (err) {
    //   dispatch({
    //     type: GLOBALTYPES.ALERT,
    //     payload: {
    //       error: err,
    //     },
    //   });
  }
};

export const outGroup = (data2, user, socket) => async (dispatch) => {
  try {
    const { data } = await api.outGroup(data2);
    dispatch({
      type: GLOBALTYPES.OUT_GROUP,
      payload: { data: data, user: user },
    });
    dispatch({
      type: GLOBALTYPES.OUT_ALL_CONVERSATION,
      payload: { data: data, user: user },
    });
    socket.emit(
      "outGroup",
      JSON.stringify({
        conversation: data,
        // msg: `Đã bị xóa ${member.username} khỏi nhóm`,
      })
    );
  } catch (err) {
    //   dispatch({
    //     type: GLOBALTYPES.ALERT,
    //     payload: {
    //       error: err,
    //     },
    //   });
  }
};
