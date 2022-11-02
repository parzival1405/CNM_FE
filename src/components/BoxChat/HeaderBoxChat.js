import React from "react";
import {
  IconButton,
  Box,
  AppBar,
  Toolbar,
  CardHeader,
  Avatar,
} from "@material-ui/core";
import { AvatarGroup } from "@material-ui/lab";

import { Search, GroupAdd, PersonAdd, Edit } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  showAddFriendToGroupModal,
  showChangeGroupLabelModal,
} from "../../redux/actions/modal";

const HeaderInfo = ({ currentConversation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const _friends = currentConversation?.member?.filter(
    (m) => m._id !== user._id
  );
  const handleShowChangeGroupLabelModal = () => {
    dispatch(showChangeGroupLabelModal());
  };
  return (
    <>
      <CardHeader
        style={{ padding: "12px 0", height: "5vh" }}
        avatar={
          <AvatarGroup max={2}>
            {_friends.map((friend) => (
              <Avatar key={friend?._id} src={friend?.avatarURL} alt="avatar" />
            ))}
          </AvatarGroup>
        }
        title={
          _friends.length === 1
            ? _friends[0].username.slice(0, 30)
            : currentConversation.label.slice(0, 30)
        }
        subheader="Truy cập ... giờ trước"
        subheaderTypographyProps={{ color: "white" }}
      />
      {_friends.length >= 2 ? (
        <IconButton
          aria-label="settings"
          onClick={handleShowChangeGroupLabelModal}
        >
          <Edit style={{ color: "white" }} />
        </IconButton>
      ) : (
        <></>
      )}
    </>
  );
};

function HeaderBoxChat() {
  const { currentConversation } = useSelector(
    (state) => state.currentConversation
  );
  const isRoom = currentConversation.member.length > 2;
  const dispatch = useDispatch();
  const handleShowAddFriendToGroupModal = () => {
    dispatch(showAddFriendToGroupModal());
  };
  return (
    <Box>
      <AppBar
        position="static"
        style={{
          backgroundColor: "#0978f5",
          boxShadow: "none",
          borderLeft: "1px solid #bfd4e7",
        }}
      >
        <Toolbar>
          <HeaderInfo currentConversation={currentConversation} />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton>
              <Search />
            </IconButton>
            {isRoom ? (
              <IconButton onClick={handleShowAddFriendToGroupModal}>
                <GroupAdd style={{ fontSize: "1.9rem" }} />
              </IconButton>
            ) : (
              <></>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default HeaderBoxChat;
