import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";

import Conversations from "./Conversations";
import BoxChat from "./BoxChat";

import { useDispatch, useSelector } from "react-redux";
import Nav from "./Nav";
import Slider from "./Slider";
import { GLOBALTYPES } from "../constants/actionType";

function Demo() {
  const dispatch = useDispatch();
  const { socket } = useSelector((state) => state.socket);
  const { currentConversation } = useSelector(
    (state) => state.currentConversation
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
        if (
          data._id === currentConversation?._id
        ){
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
  }, [socket,currentConversation, dispatch]);

  useEffect(() => {
    if (socket?.current) {
      socket.current.on("addMemberToGroup-receive", (data) => {
        if (
          data._id === currentConversation?._id
        ){
          dispatch({
            type: GLOBALTYPES.UPDATEMEMBER,
            data,
          });
        }
        dispatch({
          type: GLOBALTYPES.UPDATEMEMBER_ALL_CONVERSATION,
          data,
        });
      });
    }
    return () => socket?.current.off("addMemberToGroup-receive");
  }, [socket,currentConversation, dispatch]);

  return (
    <Grid container style={{ height: "100%" }}>
      <Grid item md={"auto"} style={{ backgroundColor: "#2ab7ca" }}>
        <Nav />
      </Grid>
      <Grid item md={3}>
        <Conversations />
      </Grid>
      <Grid item style={{ flexGrow: 1, height: "inherit" }}>
        {
          currentConversation ? <BoxChat style={{ height: "100%" }} /> : ""
          // <Slider/>
        }
      </Grid>
    </Grid>
  );
}

export default Demo;
