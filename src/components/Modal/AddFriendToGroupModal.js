import {
  Avatar,
  Button,
  Chip,
  Fade,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMembersToGroup } from "../../redux/actions/currentConversation";
import { hideModal } from "../../redux/actions/modal";
import BaseModal from "./BaseModal";
import useStyles from "./styles";
const isMemberOfGroup = (conversation, memberId) => {
  return conversation.member.find((e) => e._id === memberId) ? true : false;
};
function AddFriendToGroupModal() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isShowAddFriendToGroupModal } = useSelector((state) => state.modal);
  const { socket } = useSelector((state) => state.socket);
  const { user, token } = useSelector((state) => state.auth);
  const { currentConversation } = useSelector(
    (state) => state.currentConversation
  );

  const listFriend = user?.friends;
  const [listMember, setListMember] = useState([]);

  const handleSubmitForm = React.useCallback(() => {
    const _listMember = listMember.map((member) => member._id);
    const data = {
      conversationId: currentConversation._id,
      newMember: _listMember,
    };
    dispatch(addMembersToGroup(data), socket.current);
    setListMember([]);
    handleHideModal();
  }, [dispatch, token, listMember, user]);

  const handleAddMember = (item) => {
    if (listMember.includes(item)) return;
    setListMember([...listMember, item]);
  };
  const handleDeleteMember = (item) => {
    setListMember((listMember) =>
      listMember.filter((member) => member._id !== item._id)
    );
  };
  const handleHideModal = () => {
    dispatch(hideModal("isShowAddFriendToGroupModal"));
  };
  const body = (
    <Fade in={isShowAddFriendToGroupModal}>
      <Paper className={classes.paper} id="modal-add-group">
        <h3>Thêm thành viên</h3>
        <form
          action=""
          className={classes.form}
          noValidate
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmitForm();
          }}
        >
          <div>
            {
              <Typography variant="body">
                Đã chọn ({listMember.length})
              </Typography>
            }
            <div
              className={classes.listMember}
              style={{ display: listMember.length > 0 ? "flex" : "none" }}
            >
              {listMember?.map((item) => (
                <Chip
                  key={item._id}
                  size="small"
                  avatar={
                    <Avatar
                      alt="avatar"
                      sizes="small"
                      src={item.profilePicture}
                    />
                  }
                  label={item.username}
                  disabled={user._id === item._id}
                  onDelete={() => handleDeleteMember(item)}
                  color="secondary"
                />
              ))}
            </div>
          </div>
          <div>
            {listFriend && (
              <Typography>Bạn bè ({listFriend.length})</Typography>
            )}
            <List style={{ height: "400px", overflowY: "scroll" }}>
              {listFriend?.map((item, index) => (
                <ListItem
                  disabled={
                    currentConversation &&
                    isMemberOfGroup(currentConversation, item._id)
                  }
                  button
                  onClick={() => handleAddMember(item)}
                  key={index}
                >
                  <ListItemAvatar>
                    <Avatar alt="avatar" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.username}
                    secondary={
                      currentConversation &&
                      isMemberOfGroup(currentConversation, item._id) &&
                      "Thành viên"
                    }
                  />
                </ListItem>
              ))}
            </List>
          </div>

          <div className={classes.actions}>
            <Button variant="contained" onClick={handleHideModal}>
              Hủy
            </Button>
            <Button variant="outlined" onClick={() => setListMember([])}>
              Xóa Trống
            </Button>
            <Button color="primary" variant="contained" type="submit">
              Thêm
            </Button>
          </div>
        </form>
      </Paper>
    </Fade>
  );
  return <BaseModal body={body} isShow={isShowAddFriendToGroupModal} />;
}

export default AddFriendToGroupModal;
