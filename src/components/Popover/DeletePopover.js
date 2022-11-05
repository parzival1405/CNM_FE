import React, { useState } from "react";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Popover,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { deleteMessage } from "../../redux/actions/messages";
import TestPo from "./TestPo";
import { SignalCellularNull } from "@material-ui/icons";
import { deleteMemberGroup } from "../../redux/actions/currentConversation";
import { deleteFriend } from "../../redux/actions/friends";

function DeletePopover({
  children,
  member,
  creator = null,
  isMember = false,
  isDelete,
}) {
  const [listMember, setListMember] = useState([]);
  const { currentConversation } = useSelector(
    (state) => state.currentConversation
  );
  const { user } = useSelector((state) => state.auth);
  const { socket } = useSelector((state) => state.socket);
  const dispatch = useDispatch();

  const deleteId = (id) => {
    listMember.push(id);
    const data = {
      conversationId: currentConversation._id,
      deleteMemberId: listMember,
    };
    dispatch(deleteMemberGroup(data, user, member, socket.current));
  };

  const handleDeleteUser = () => {
    if (isDelete) {
      if (
        window.confirm(
          `Bạn chắc chắn muốn hủy kết bạn với ${member.username} ?`
        )
      ) {
        const data = {
          deleteFriendId:member._id
        }
        dispatch(deleteFriend(data,socket.current));
      } 
    } else {
      if (
        window.confirm(
          `Bạn chắc chắn muốn xóa ${member.username} ra khỏi nhóm ?`
        )
      ) {
        deleteId(member._id);
      }
    }
  };

  const body = (
    <List>
      <ListItem button onClick={handleDeleteUser}>
        {isDelete ? (
          <ListItemText primary={"Hủy bạn bè"} />
        ) : (
          <ListItemText
            primary={
              member._id === creator?._id
                ? "Rời nhóm"
                : isMember
                ? "Rời nhóm"
                : "Xóa khỏi nhóm"
            }
          />
        )}
      </ListItem>
    </List>
  );
  return <TestPo body={body} children={children} />;
}

export default DeletePopover;
