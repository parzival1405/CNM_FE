import React, { useState } from "react";
import {
  IconButton,
  Box,
  AppBar,
  Toolbar,
  TextField,
  styled,
  FormControl,
  Tooltip,
} from "@material-ui/core";
import Picker from "emoji-picker-react";
import {
  SendOutlined,
  Image,
  EmojiEmotions,
  AttachFile,
  Cancel
} from "@material-ui/icons";
import useStyles from "./styles";
import {fileShow,videoShow,imageShow} from "../../utils/mediaShow"


const StyledFormControl = styled(FormControl)(({ theme }) => ({
  backgroundColor: "#fff",
  display: "flex",
  flexDirection: "row",
}));

// const EmojiPicker = styled()(({ theme }) => ({
//   position: "relative",
// }));

function FootBoxChat({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [media, setMedia] = useState([]);
  const classes = useStyles();
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
      handleSendMsg(msg, media);
      setMsg("");
    }
  };

  const demoSubmit = (event) => {
    // event.preventDefault();
    console.log("here");
  };

  const handleChangeMedia = (e) => {
    const files = [...e.target.files];
    let err = "";
    let newMedia = [];
    files.forEach((file) => {
      if (!file) return (err = "Tệp không tồn lại");
      if (file.size > 1024 * 1024 * 5) {
        return (err = "Tệp tối đa 5mb");
      }
      return newMedia.push(file);
    });
    // if (err) setMediaErr(err);
    // else setMediaErr("");
    setMedia([...media, ...newMedia]);
  };

  const handleDeleteMedia = (index) => {
    const newMedia = [...media];
    newMedia.splice(index, 1);
    setMedia(newMedia);
  };

  return (
    <Box>
      <AppBar position="static">
        <StyledFormControl onSubmit={(event) => demoSubmit(event)}>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              onClick={() => handleEmojiPickerhideShow(!showEmojiPicker)}
            >
              <EmojiEmotions style={{ color: "#000" }} />
            </IconButton>
            {showEmojiPicker && (
              // <EmojiPicker>
              <Picker onEmojiClick={handleEmojiClick} />
              // </EmojiPicker>
            )}
          </Box>
          <TextField
            style={{ flexGrow: 1, margin: "16px 0" }}
            label="Nhập tin nhắn"
            variant="outlined"
            size="small"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <input
              type="file"
              name="file"
              id="file"
              multiple
              accept="image/*,video/*,.pdf,.doc"
              onChange={handleChangeMedia}
              className={classes.mediaInput}
            />
            <label htmlFor="file" style={{ display: "flex" }}>
              <Tooltip title="Thêm ảnh">
                <IconButton component="span">
                  <Image style={{ color: "#000" }} />
                </IconButton>
              </Tooltip>
            </label>
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton onClick={(event) => sendChat(event)}>
              <SendOutlined style={{ color: "#000" }} />
            </IconButton>
          </Box>
        </StyledFormControl>
        {media?.map((item, index) => (
            <div key={index} className={classes.mediaItem}>
              {item.type.match(/video/i) ? 
              videoShow(URL.createObjectURL(item)) 
              : item.type.match(/image/i) 
              ? imageShow(URL.createObjectURL(item))
              : fileShow(URL.createObjectURL(item), item)}
              <span onClick={() => handleDeleteMedia(index)}>
                <Cancel />{" "}
              </span>
            </div>
          ))}
      </AppBar>
    </Box>
  );
}

export default FootBoxChat;
