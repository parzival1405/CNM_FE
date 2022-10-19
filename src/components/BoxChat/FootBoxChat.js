import React, { useState } from "react";
import {
  IconButton,
  Box,
  AppBar,
  Toolbar,
  TextField,
  styled,
  FormControl,
} from "@material-ui/core";

import { SendOutlined } from "@material-ui/icons";

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  backgroundColor: "#fff",
}));

function FootBoxChat({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <Box>
      <AppBar position="static">
        <StyledFormControl onSubmit={(event) => sendChat(event)}>
          <TextField
            style={{ flexGrow: 1, margin: "16px 0 12px 0" }}
            label="Nhập tin nhắn"
            variant="outlined"
            size="small"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton onClick={(event) => sendChat(event)}>
              <SendOutlined style={{ color: "#000" }} />
            </IconButton>
          </Box>
        </StyledFormControl>
      </AppBar>
    </Box>
  );
}

export default FootBoxChat;
