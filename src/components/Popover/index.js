import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Popover,
  Typography,
  ListItemIcon,
} from "@material-ui/core";
import { Textsms, Contacts, Settings } from "@material-ui/icons";
import Profile from "../Modal/Profile";
import { useDispatch, useSelector } from "react-redux";
import { showFormSettingModal } from "../../redux/actions/modal";

function BasicPopover({ children, handleLogout }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleShowFormSettingModal = () => {
    dispatch(showFormSettingModal());
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <IconButton
        style={{ width: "55px", height: "55px" }}
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
      >
        {children}
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
      >
        <Box
          sx={{
            width: "100%",
            minWidth: 250,
            maxWidth: 360,
            bgcolor: "background.paper",
          }}
        >
          <List>
            <ListItem>
              <ListItemText primary="Ten cua ban" />
            </ListItem>
          </List>
          <Divider variant="middle" />
          <List>
            <ListItem button onClick={handleShowFormSettingModal}>
              <ListItemText primary="Hồ sơ" />
            </ListItem>
          </List>
          <Divider variant="middle" />
          <List>
            <ListItem button onClick={handleLogout}>
              <ListItemText primary="Đăng xuất" />
            </ListItem>
          </List>
        </Box>
      </Popover>
    </div>
  );
}

export default BasicPopover;
