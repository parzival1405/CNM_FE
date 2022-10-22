import React from "react";
import SearchComponent from "../Search";
import { Grid, List } from "@material-ui/core";
import Conversation from "./Conversation";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
function Conversations({ socket }) {
  const { isLoading, conversations } = useSelector(
    (state) => state.conversations
  );
  return (
    <>
      <SearchComponent />
      <List style={{ maxHeight: 640, overflow: "auto" }}>
        {conversations?.map((conversation) => (
          <Conversation
            socket={socket}
            key={conversation._id}
            conversation={conversation}
          />
        ))}
      </List>
    </>
  );
}

export default Conversations;
