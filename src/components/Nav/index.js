import React, { useEffect } from "react";
import {
    List,
    styled,
    Avatar,
    Box,
    IconButton,
  } from "@material-ui/core";
  import BasicPopover from "../Popover";
  import { Textsms, Contacts, Settings } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../redux/actions/auth";
import decode from "jwt-decode";
function Nav() {
    
  const {user,token} = useSelector((state) => state.auth)
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout(navigate));
  };

  useEffect(() => {
    if (token) {
      const decodeToken = decode(token);

      if (decodeToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
      }
    }
  }, [location]);

  return (
    <List
      style={{
        height: "97.6%",
        overflow: "auto",
        display: "flex",
        justifyContent: "space-around",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <BasicPopover handleLogout={handleLogout}>
          <Avatar src={user.avatarURL} />
        </BasicPopover>
        <IconButton style={{ margin: "8px 0" }}>
          <Textsms style={{ fontSize: "32px" }} />
        </IconButton>
        <IconButton>
          <Contacts style={{ fontSize: "32px" }} />
        </IconButton>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        <IconButton>
          <Settings style={{ fontSize: "32px" }} />
        </IconButton>
      </Box>
    </List>
  );
}

export default Nav;
