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
    socket.current.emit(
      "offTypingText",
      JSON.stringify({
        conversationId: currentConversation._id,
        member: currentConversation.member.filter(
          (item) => item._id !== user._id
        ),
        sender: user.username,
      })
    );
  };
  return (
    <ListItem button onClick={handleChangeCurrentConversation}>
      <ListItemAvatar>
        <AvatarGroup max={3}>
          {_friends.map((friend) => (
            <Avatar key={friend?._id} src={friend?.avatarURL} alt="avatar" />
          ))}
        </AvatarGroup>
      </ListItemAvatar>
      <ListItemText
        style={{ paddingLeft: "5px" }}
        primary={
          conversation.isGroup
            ? conversation.label?.slice(0, 30)
            : _friends[0].username?.slice(0, 30)
        }
        secondary={
          conversation?.count_waiting_msg
            ? `Có ${conversation?.count_waiting_msg} tin nhắn chưa xem`
            : user?._id === conversation?.lastMessage?.sender?._id
            ? !conversation?.lastMessage?.isDelete
              ? `Bạn:${conversation?.lastMessage?.text}`
              : "Đã thu hồi tin nhắn"
            : conversation?.lastMessage
            ? !conversation?.lastMessage?.isDelete
              ? `${conversation?.lastMessage?.sender?.username}:${conversation?.lastMessage?.text}`
              : "Tin nhắn đã được thu hồi"
            : ""
        }
      />
    </ListItem>
  );
}

export default Conversation;
