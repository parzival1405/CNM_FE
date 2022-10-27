import React, { useEffect, useRef } from "react";
import FootBoxChat from "./FootBoxChat";
import HeaderBoxChat from "./HeaderBoxChat";
import { styled, Box, Paper } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";
import Messages from "../Message/Message";
import useStyles from "./ChatBodyStyle";
import clsx from "clsx";
import { GLOBALTYPES } from "../../constants/actionType";
import { useDispatch, useSelector } from "react-redux";
import { getAllMessage,sendMessage, sendMessageTest } from "../../redux/actions/messages";
import DrawerInfoChat from "../Bar/DrawerInfoChat";

const Wrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
}));

function BoxChat({ socket, room = false }) {
  const classes = useStyles();

  const { isLoading, messages } = useSelector((state) => state.messages);
  const { user, token } = useSelector((state) => state.auth);
  const { currentConversation,isRoom } = useSelector(
    (state) => state.currentConversation
  );
  const dispatch = useDispatch();
  const scrollRef = useRef();

  useEffect(() => {
    if (currentConversation) {
      if (isRoom) {
        socket.current.emit("joinRoom", currentConversation._id);
      }
      dispatch(
        getAllMessage({
          conversation: currentConversation._id,
        })
      );
    }
    // return () => {
    //   socket.current.emit("disconnect",currentChat._id);
    //   socket.off();
    // };
  }, [currentConversation]);

  const handleSendMsg = (message) => {
    dispatch(
      sendMessage({
        sender: user._id,
        conversation:currentConversation,
        text:message,
        isRoom:isRoom
      },socket.current)
    );
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on(
        isRoom ? "groupMessage-receive" : "msg-receive",
        (data) => {
          console.log(data)
            dispatch({ type: GLOBALTYPES.ADDMESSAGE, data })
        }
      );
    }
    return () => socket.current.off(isRoom ? "groupMessage-receive" : "msg-receive");
  }, [currentConversation]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const [open, setOpen] = React.useState(false);

  const openDrawer =() => {
    setOpen(true);
  }
  return (
    <Wrapper>
      <HeaderBoxChat />
      <Paper
        style={{ flexGrow: 1 }}
        className={clsx(
          classes.chatBody,
          // messages?.length  ===0
          false ? `${classes.displayTop}` : ""
        )}
        id="scrollableDiv"
      >
        <InfiniteScroll
          dataLength={3}
          // next={fetchMoreData}
          style={{ display: "flex", flexDirection: "column" }} //To put endMessage and loader to the top.
          inverse={true}
          hasMore={true}
          // loader={
          // messages.length
          //   5 > 0 && <h4 style={{ textAlign: "center" }}>Loading...</h4>
          // }
          scrollableTarget="scrollableDiv"
        >
          {!isLoading &&
            messages.map((message,index) => <Messages key={index} message={message} />)}
        </InfiniteScroll>
      </Paper>
      <FootBoxChat handleSendMsg={handleSendMsg} />
     <DrawerInfoChat handleDrawerOpen={openDrawer} style={{with:0,height:0}} ></DrawerInfoChat>
    </Wrapper>
  );
}

export default BoxChat;
