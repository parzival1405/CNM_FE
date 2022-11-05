import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";

import Conversations from "./Conversations";
import BoxChat from "./BoxChat";

import { useDispatch, useSelector } from "react-redux";
import Nav from "./Nav";
import Slider from "./Slider";
import { GLOBALTYPES } from "../constants/actionType";
import ListFriendsRequest from "./ListFriendsRequest";
import PhoneBooks from "./PhoneBooks";


function Demo() {
  const dispatch = useDispatch();
  const { socket } = useSelector((state) => state.socket);
  const { currentConversation } = useSelector(
    (state) => state.currentConversation
  );
  const { user } = useSelector((state) => state.auth);
  const { isShowPhoneBook, isShowConversation } = useSelector(
    (state) => state.sideBar
  );
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
        console.log(data)
        if (data._id === currentConversation?._id) {
          dispatch({
            type: GLOBALTYPES.DELETE_GROUP,
          });
        }
        dispatch({
          type: GLOBALTYPES.DELETE_GROUP_ALL_CONVERSATION,
          payload: { data: data},
        });
      });
    }
    return () => socket?.current.off("deleteGroup-receive");
  }, [socket, currentConversation, dispatch]);

  return (
    <Grid container style={{ height: "100%" }}>
      <Grid item md={"auto"} style={{ backgroundColor: "#0978f5" }}>
        <Nav />
      </Grid>
      <Grid item md={3}>
        {isShowConversation && <Conversations />}
        {isShowPhoneBook && <PhoneBooks />}
      </Grid>
      {isShowConversation && (
        <Grid item style={{ flexGrow: 1, height: "inherit" }}>
          {
            currentConversation ? <BoxChat style={{ height: "100%" }} /> : ""
            // <Slider/>
          }
        </Grid>
      )}
      {isShowPhoneBook && (
        <Grid item md={8}>
          <div className="friend-request__container">
            <div
              className="friend-request__container--list"
              style={{
                padding: "20px 100px",
              }}
            >
              <ListFriendsRequest />
            </div>
          </div>
        </Grid>
      )}
    </Grid>
  );
}

export default Demo;
