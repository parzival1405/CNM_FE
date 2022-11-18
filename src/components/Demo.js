import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";

import Conversations from "./Conversations";
import BoxChat from "./BoxChat";

import { useDispatch, useSelector } from "react-redux";
import Nav from "./Nav";
import Slider from "./Slider";
import { GLOBALTYPES } from "../constants/actionType";
import ListFriendsRequest from "./ListFriendsRequest";
import ListGroup from "./ListGroup";
import PhoneBooks from "./PhoneBooks";
import { Group } from "@material-ui/icons";
import DrawerInfoChat from "./Bar/DrawerInfoChat";

const listGroup = [
  {
    id: 1,
    name: "Alo Alo",
    members: 3,
    image:
      "https://images.vexels.com/media/users/3/145908/raw/52eabf633ca6414e60a7677b0b917d92-male-avatar-maker.jpg",
  },
  {
    id: 2,
    name: "Nhóm 4",
    members: 6,
    image:
      "https://images.assetsdelivery.com/compings_v2/yupiramos/yupiramos2004/yupiramos200436847.jpg",
  },
  {
    id: 2,
    name: "Nhóm 5",
    members: 6,
    image:
      "https://images.assetsdelivery.com/compings_v2/yupiramos/yupiramos2004/yupiramos200436847.jpg",
  },
  {
    id: 2,
    name: "Nhóm 6",
    members: 6,
    image:
      "https://images.assetsdelivery.com/compings_v2/yupiramos/yupiramos2004/yupiramos200436847.jpg",
  },
  {
    id: 2,
    name: "Nhóm 7",
    members: 6,
    image:
      "https://images.assetsdelivery.com/compings_v2/yupiramos/yupiramos2004/yupiramos200436847.jpg",
  },
  {
    id: 2,
    name: "Nhóm 8",
    members: 6,
    image:
      "https://images.assetsdelivery.com/compings_v2/yupiramos/yupiramos2004/yupiramos200436847.jpg",
  },
  {
    id: 2,
    name: "Nhóm 9",
    members: 6,
    image:
      "https://images.assetsdelivery.com/compings_v2/yupiramos/yupiramos2004/yupiramos200436847.jpg",
  },
  {
    id: 2,
    name: "Nhóm 10",
    members: 6,
    image:
      "https://images.assetsdelivery.com/compings_v2/yupiramos/yupiramos2004/yupiramos200436847.jpg",
  },
  {
    id: 2,
    name: "Nhóm 11",
    members: 6,
    image:
      "https://images.assetsdelivery.com/compings_v2/yupiramos/yupiramos2004/yupiramos200436847.jpg",
  },
];

function Demo() {
  const dispatch = useDispatch();
  const { socket } = useSelector((state) => state.socket);
  const { currentConversation } = useSelector(
    (state) => state.currentConversation
  );
  const { user } = useSelector((state) => state.auth);
  const {
    isShowPhoneBook,
    isShowConversation,
    isShowRequestAddFriend,
    isShowListGroup,
  } = useSelector((state) => state.sideBar);
  useEffect(() => {
    if (socket?.current) {
      socket.current.on("addConversation-receive", (data) => {
        console.log(data);
        dispatch({
          type: GLOBALTYPES.POST_CONVERSATION,
          data,
        });
      });
    }
    return () => socket?.current.off("addConversation-receive");
  }, [socket, dispatch]);

  useEffect(() => {
    if (socket?.current) {
      socket.current.on("changeGroupName-receive", (data) => {
        if (data._id === currentConversation?._id) {
          dispatch({
            type: GLOBALTYPES.CHANGE_GROUP_NAME,
            data,
          });
        }
        dispatch({
          type: GLOBALTYPES.CHANGE_GROUP_NAME_ALL_CONVERSATION,
          data,
        });
      });
    }
    return () => socket?.current.off("changeGroupName-receive");
  }, [socket, currentConversation, dispatch]);

  useEffect(() => {
    if (socket?.current) {
      socket.current.on("addMemberToGroup-receive", (data) => {
        if (data._id === currentConversation?._id) {
          dispatch({
            type: GLOBALTYPES.UPDATEMEMBER,
            payload: { data: data, user: user },
          });
        }
        dispatch({
          type: GLOBALTYPES.UPDATEMEMBER_ALL_CONVERSATION,
          payload: { data: data, user: user },
        });
      });
    }
    return () => socket?.current.off("addMemberToGroup-receive");
  }, [socket, currentConversation, dispatch]);

  useEffect(() => {
    if (socket?.current) {
      socket.current.on("deleteMemberGroup-receive", (data) => {
        if (data._id === currentConversation?._id) {
          dispatch({
            type: GLOBALTYPES.DELETE_MEMBER_GROUP,
            payload: { data: data, user: user },
          });
        }
        dispatch({
          type: GLOBALTYPES.DELETE_MEMBER_GROUP_ALL_CONVERSATION,
          payload: { data: data, user: user },
        });
      });
    }
    return () => socket?.current.off("deleteMemberGroup-receive");
  }, [socket, currentConversation, dispatch]);
  useEffect(() => {
    if (socket?.current) {
      socket.current.on("changeCreatorGroup-receive", (data) => {
        if (data._id === currentConversation?._id) {
          dispatch({
            type: GLOBALTYPES.UPDATE_CREATOR_GROUP,
            data,
          });
        }
        dispatch({
          type: GLOBALTYPES.UPDATE_CREATOR_GROUP_ALL_CONVERSATION,
          data,
        });
      });
    }
    return () => socket?.current.off("changeCreatorGroup-receive");
  }, [socket, currentConversation, dispatch]);

  useEffect(() => {
    if (socket?.current) {
      socket.current.on("outGroup-receive", (data) => {
        console.log(data);
        if (data._id === currentConversation?._id) {
          dispatch({
            type: GLOBALTYPES.OUT_GROUP,
            payload: { data: data, user: user },
          });
        }
        dispatch({
          type: GLOBALTYPES.OUT_ALL_CONVERSATION,
          payload: { data: data, user: user },
        });
      });
    }
    return () => socket?.current.off("outGroup-receive");
  }, [socket, currentConversation, dispatch]);

  useEffect(() => {
    if (socket?.current) {
      socket.current.on("deleteGroup-receive", (data) => {
        console.log(data);
        if (data._id === currentConversation?._id) {
          dispatch({
            type: GLOBALTYPES.DELETE_GROUP,
          });
        }
        dispatch({
          type: GLOBALTYPES.DELETE_GROUP_ALL_CONVERSATION,
          payload: { data: data },
        });
      });
    }
    return () => socket?.current.off("deleteGroup-receive");
  }, [socket, currentConversation, dispatch]);
  useEffect(() => {
    if (socket?.current) {
      socket.current.on("msg-receive", (data) => {
        if (
          currentConversation === undefined ||
          currentConversation === null ||
          isShowPhoneBook ||
          data.conversation._id !== currentConversation?._id
        ) {
          console.log("here");
          dispatch({
            type: GLOBALTYPES.UPDATE_COUNT_WAITING_MESSAGE,
            payload: data.conversation,
          });
        } else {
          console.log(data.conversation._id, currentConversation?._id);
          dispatch({ type: GLOBALTYPES.ADDMESSAGE, data });
        }
        dispatch({
          type: GLOBALTYPES.UPDATE_LAST_MSG_CONVERSATION,
          payload: {
            data: data,
            conversation: data.conversation,
          },
        });
      });
    }
    return () => socket?.current.off("msg-receive");
  }, [currentConversation, isShowPhoneBook, socket]);

  useEffect(() => {
    if (socket?.current) {
      socket.current.on("delete-receive", (data) => {
        if (
          currentConversation === undefined ||
          currentConversation === null ||
          isShowPhoneBook ||
          data.conversation._id !== currentConversation?._id
        ) {
          // dispatch({ type: GLOBALTYPES.DELETEMESSAGE, data });
        } else {
          dispatch({ type: GLOBALTYPES.DELETEMESSAGE, data });
        }
        dispatch({
          type: GLOBALTYPES.UPDATE_LAST_MSG_CONVERSATION_DELETE,
          payload: {
            data: data,
            conversation: data.conversation,
          },
        });
      });
    }
    return () => socket?.current.off("delete-receive");
  }, [currentConversation, isShowPhoneBook, socket]);

  useEffect(() => {
    if (socket?.current) {
      console.log(1);
      socket.current.on("requestAddFriendToClient", (data) => {
        user.friendsQueue.push(data);
        if (!isShowPhoneBook) {
          dispatch({
            type: GLOBALTYPES.UPDATENOTIFICATION,
          });
        }
        dispatch({
          type: GLOBALTYPES.UPDATEPROFILE,
          user,
        });
      });
    }
    return () => {
      console.log(2);
      socket?.current.off("requestAddFriendToClient");
    };
  }, [dispatch, isShowPhoneBook, socket]);

  useEffect(() => {
    if (socket?.current) {
      socket?.current.on("onTypingTextToClient", (data) => {
        console.log(data);
        dispatch({ type: GLOBALTYPES.TYPING_TEXT, payload: data });
      });
    }
    return () => socket?.current.off("onTypingTextToClient");
  }, [socket, dispatch]);

  useEffect(() => {
    if (socket?.current) {
      socket?.current.on("offTypingTextToClient", (data) => {
        dispatch({ type: GLOBALTYPES.OFF_TYPING_TEXT, payload: data });
      });
    }
    return () => socket?.current.off("offTypingTextToClient");
  }, [socket, dispatch]);

  return (
    <Grid container style={{ height: "100%", flexWrap: "nowrap" }}>
      <Grid item md={"auto"} style={{ backgroundColor: "#0978f5" }}>
        <Nav />
      </Grid>
      <Grid item md={3} className={"con"}>
        {isShowConversation && (
          <Conversations style={{ flex: "0 1 auto", minWidth: "1000px" }} />
        )}
        {isShowPhoneBook && <PhoneBooks style={{ flex: "0 1 auto" }} />}
      </Grid>
      {isShowConversation && (
        <Grid item style={{ flexGrow: 1, height: "inherit" }}>
          {
            currentConversation ? (
              <>
                <BoxChat style={{ height: "100%" }} />
                <DrawerInfoChat style={{ with: 0, height: 0 }}></DrawerInfoChat>
              </>
            ) : (
              ""
            )
            // <Slider/>
          }
        </Grid>
      )}
      {isShowPhoneBook && (
        <Grid style={{ flexGrow: 1, height: "inherit" }}>
          <div className="friend-request__container">
            <div className="friend-request__container--list">
              {isShowRequestAddFriend && <ListFriendsRequest />}
              {isShowListGroup && <ListGroup listFriendsRequest={listGroup} />}
            </div>
          </div>
        </Grid>
      )}
    </Grid>
  );
}

export default Demo;
