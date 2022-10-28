import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllYourFriends } from "../../redux/actions/friends";
import { getAllYourConversations } from "../../redux/actions/coversations";
// import { getAllGroupWithUser } from "../../redux/actions/group";
import "./Chat.css";
import * as api from "../../api";
import { io } from "socket.io-client";
import Demo from "../../components/Demo";
import { initSocket } from "../../redux/actions/socket";
function Chat() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const socket = useRef();
  useEffect(() => {
    dispatch(getAllYourConversations(navigate));
  }, [dispatch, user]);

  useEffect(() => {
    if (user) {
      // socket.current = io("http://localhost:5000",{ transports : ['websocket'] });
      // socket.current.emit("add-user", user);
      socket.current = io("http://localhost:5000", {
        query: {
          _id:user._id,
          friends:user.friends,
          username:user.username,
          avatarURL:user.avatarURL
        },
      });
      // socket.current.emit("add-user", user);
      dispatch(initSocket({socket:socket}))
    }
  }, [user]);

  return <Demo socket={socket} />;
}

export default Chat;
