import React from "react";
import {
  Grid,
} from "@material-ui/core";


import Conversations from "./Conversations";
import BoxChat from "./BoxChat";

import { useSelector } from "react-redux";
import Nav from "./Nav";
import ListFriendsRequest from "./ListFriendsRequest"

const listFriendsRequest = [
  {
    id: 1,
    name: "Văn Lộc",
    subtitle: "Từ nhóm trò chuyện",
    message: "Hi, mình là Lộc láo lol, rất vui được làm quen. Xin chỉ giáo ạ.",
    image: "https://images.vexels.com/media/users/3/145908/raw/52eabf633ca6414e60a7677b0b917d92-male-avatar-maker.jpg"
  }, 
  {
    id: 2,
    name: "Thanh Sang",
    subtitle: "Từ nhóm trò chuyện BE",
    message: "Hello, mình là Sang ngáo đá, rất vui được làm quen với bạn.",
    image: "https://images.assetsdelivery.com/compings_v2/yupiramos/yupiramos2004/yupiramos200436847.jpg"
  }
]

function Demo({socket}) {
  const {currentConversation} = useSelector((state) => state.currentConversation);

  return (
    <Grid container style={{ height: "100%" }}>
      <Grid item md={"auto"} style={{ backgroundColor: "#2ab7ca" }}>
        <Nav/>
      </Grid>
      <Grid item md={3}>
        <Conversations socket={socket}/>
      </Grid>
      <Grid item md={8}>
        <div className="friend-request__container">
        <div className="friend-request__container--list" style={{
          padding: "20px 100px"
        }}>
          <ListFriendsRequest listFriendsRequest={listFriendsRequest} />
        </div>
          
        </div>
      </Grid>
      <Grid item style={{ flexGrow: 1 ,height:"inherit" }}>
        {currentConversation ? <BoxChat socket={socket} style={{ height: "100%" }} /> : 
        ""
        // <Slider/>
        }
      </Grid>

    </Grid>
  );
}

export default Demo;
