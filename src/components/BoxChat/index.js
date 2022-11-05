import React, { useEffect, useRef } from "react";
import FootBoxChat from "./FootBoxChat";
import HeaderBoxChat from "./HeaderBoxChat";
import { styled, Box, Paper } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";
import Message from "../Message/Message";
import useStyles from "./ChatBodyStyle";
import clsx from "clsx";
import { GLOBALTYPES } from "../../constants/actionType";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMessage,
  sendMessage,
  sendMessageTest,
} from "../../redux/actions/messages";
import { demoPostFile, getDataS3API } from "../../api";
import DrawerInfoChat from "../Bar/DrawerInfoChat";
const Wrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
}));

function BoxChat() {
  const classes = useStyles();

  const { isLoading, messages } = useSelector((state) => state.messages);
  const { user, token } = useSelector((state) => state.auth);
  const { currentConversation, isRoom } = useSelector(
    (state) => state.currentConversation
  );

  const { socket } = useSelector((state) => state.socket);
  const dispatch = useDispatch();
  const scrollRef = useRef();

  useEffect(() => {
    if (currentConversation) {
      dispatch(
        getAllMessage({
          conversation: currentConversation._id,
        })
      );
    }
  }, [currentConversation]);

  const handleSendMsg = async (message, media) => {
    if (media.length > 0) {
      await media.map(async (item) => {
        let mediaArray = [];
        const formData = new FormData();
        formData.append("media", item);
        const {
          data: { data },
        } = await demoPostFile(formData);
        console.log(data);
        mediaArray.push({
          url: data,
          type: item.type,
        });
        dispatch(
          sendMessage(
            {
              sender: user._id,
              conversation: currentConversation,
              text: message,
              type: item.type,
              media: mediaArray,
            },
            socket.current
          )
        );
      });
    } else {
      dispatch(
        sendMessage(
          {
            sender: user._id,
            conversation: currentConversation,
            text: message,
            type: "text",
            media: media,
          },
          socket.current
        )
      );
    }
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (data) => {
        if (
          currentConversation === undefined ||
          data.conversation._id !== currentConversation?._id
        ) {
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
    return () => socket.current.off("msg-receive");
  }, [currentConversation]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("delete-receive", (data) => {
        if (
          currentConversation === undefined ||
          data.conversation._id !== currentConversation?._id
        ) {
          console.log("here");
        } else {
          dispatch({ type: GLOBALTYPES.DELETEMESSAGE, data });
        }
      });
    }
    return () => socket.current.off("delete-receive");
  }, [currentConversation]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const [open, setOpen] = React.useState(false);

  const openDrawer = () => {
    setOpen(true);
  };
  return (
    <Wrapper style={{ borderLeft: "1px solid #bfd4e7" }}>
      <HeaderBoxChat />
      <Paper
        style={{ flexGrow: 1, boxShadow: "none" }}
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
            messages.map((message, index) => (
              <Message key={index} message={message} />
            ))}
        </InfiniteScroll>
      </Paper>
      <FootBoxChat handleSendMsg={handleSendMsg} />
      <DrawerInfoChat style={{ with: 0, height: 0 }}></DrawerInfoChat>
    </Wrapper>
  );
}

export default BoxChat;
