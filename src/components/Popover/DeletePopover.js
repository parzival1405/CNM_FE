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

function DeletePopover({ children, member,creator=null,isMember= false }) {
    const [listMember, setListMember] = useState([]);
  const { currentConversation } = useSelector(
    (state) => state.currentConversation
  );
  const { socket } = useSelector(
    (state) => state.socket
  );
  const dispatch = useDispatch();

  const deleteId = (id) => {
    listMember.push(id)
    const data = {
        conversationId : currentConversation._id,
        deleteMemberId: listMember
    }
    dispatch(deleteMemberGroup(data,member,socket.current));
  }

  const handleDeleteUser = () => {
    if (window.confirm(`Bạn chắc chắn muốn xóa ${member.username}  ra khỏi nhóm ?`)){
        deleteId(member._id)
    }
  };

  const body = (
    <List>
      <ListItem button onClick={handleDeleteUser}>
        <ListItemText primary={member._id === creator?._id ? "Rời nhóm": isMember ? "Rời nhóm" :"Xóa khỏi nhóm" }/>
      </ListItem>
    </List>
  );
  return (
    <TestPo body={body} children={children}/>
  );
}

export default DeletePopover;
