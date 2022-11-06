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

// fake data
const listFriendsRequest = [
  {
    id: 1,
    name: "Văn Lộc",
    subtitle: "Từ nhóm trò chuyện",
    message: "Hi",
    image:
      "https://images.vexels.com/media/users/3/145908/raw/52eabf633ca6414e60a7677b0b917d92-male-avatar-maker.jpg",
  },
  {
    id: 2,
    name: "Hữu",
    subtitle: "Từ nhóm trò chuyện Haha",
    message: "Hello",
    image:
      "https://images.assetsdelivery.com/compings_v2/yupiramos/yupiramos2004/yupiramos200436847.jpg",
  },
];

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
  }, [socket, currentConversation, dispatch]);

  useEffect(() => {
    if (socket?.current) {
      socket.current.on("deleteMemberGroup-receive", (data) => {
        console.log(data);
        if (data._id === currentConversation?._id) {
          dispatch({
            type: GLOBALTYPES.DELETE_MEMBER_GROUP,
            data,
          });
        }
        dispatch({
          type: GLOBALTYPES.DELETE_MEMBER_GROUP_ALL_CONVERSATION,
          data,
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
  console.log(isShowConversation)
  return (
    
    <Grid container style={{ height: "100%" }}>
      <Grid item md={"auto"} style={{ backgroundColor: "#2ab7ca" }}>
        <Nav />
      </Grid>
      <Grid item md={3} style={{ borderRightStyle:'solid',borderColor: 'rgb(187, 187, 187)',borderWidth:'0.1px'}}>
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
      {/* {isShowPhoneBook && ( */}
        <Grid item md={8} style={{borderWidth:1, borderColor:"#000"}}>
          <div className="friend-request__container" >
            <div
              className="friend-request__container--list"
              style={{
                padding: "20px 100px",
              }}
            >
              <ListGroup listFriendsRequest={listGroup} />
            </div>
          </div>
        </Grid>
      {/* )} */}
    </Grid>
  );
}

export default Demo;
