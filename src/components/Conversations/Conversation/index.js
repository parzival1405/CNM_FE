import React from "react";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import { AvatarGroup } from "@material-ui/lab";
// import {
//   getAllMessage,
//   sendMessage,
//   sendMessageTest,
// } from "../../../redux/actions/messages";
import { setCurrentConversation } from "../../../redux/actions/currentConversation";
import { useDispatch, useSelector } from "react-redux";

function Conversation({ conversation }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { currentConversation, isRoom } = useSelector(
    (state) => state.currentConversation
  );
  const { socket } = useSelector((state) => state.socket);
  const _friends = conversation?.member?.filter((m) => m._id !== user._id);
  const handleChangeCurrentConversation = () => {
    dispatch(setCurrentConversation(conversation));
  };
  return (
    <ListItem button onClick={handleChangeCurrentConversation}>
      <ListItemAvatar>
        <AvatarGroup max={2}>
          {_friends.map((friend) => (
            <Avatar key={friend?._id} src={friend?.avatarURL} alt="avatar" />
          ))}
        </AvatarGroup>
      </ListItemAvatar>
      <ListItemText
        primary={
          _friends.length === 1
            ? _friends[0].username?.slice(0, 30)
            : conversation.label?.slice(0, 30)
        }
        secondary={
          conversation?.count_waiting_msg
            ? `Có ${conversation?.count_waiting_msg} tin nhắn chưa xem`
            : user?._id === conversation?.lastMessage?.sender?._id
            ? `Bạn:${conversation?.lastMessage?.text}`
            : conversation?.lastMessage
            ? `${conversation?.lastMessage?.sender?.username}:${conversation?.lastMessage?.text}`
            : ""
        }
      />
    </ListItem>
  );
}

export default Conversation;
