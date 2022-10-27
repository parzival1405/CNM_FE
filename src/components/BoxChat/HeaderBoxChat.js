import * as React from 'react';
import {
  // styled,
  // IconButton,
  Box,
  AppBar,
  // Toolbar,
  InputBase,
  CardHeader,
  Avatar,
} from "@material-ui/core";
import { AvatarGroup } from "@material-ui/lab";
//-------------------------
import DrawerInfoChat from "../Bar/DrawerInfoChat";
import { styled, useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import { Search, GroupAdd, PersonAdd, Edit } from "@material-ui/icons";
import { useSelector } from "react-redux";


const drawerWidth = 240;


const HeaderInfo = ({currentConversation}) => {
  const {user} = useSelector((state) => state.auth)
  const _friends = currentConversation?.member?.filter(
    (m) => m._id !== user._id
  );


  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: drawerWidth,
    }),
  }));
  
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  }));

  return (
    <CardHeader style={{padding:"12px 0"}}
      avatar={
        <AvatarGroup max={2}>
          {_friends.map(friend => <Avatar
          key={friend?._id}
            src={friend?.avatarURL}
            alt="avatar"
          />)}
        </AvatarGroup>
      }
      action={
        <IconButton aria-label="settings">
          <Edit />
        </IconButton>
      }
      title={_friends.length === 1 ? _friends[0].username.slice(0, 30) : currentConversation.label.slice(0, 30)}
      subheader="Truy cập ... giờ trước"
    />
  );
};

function HeaderBoxChat() {
  const {currentConversation} = useSelector((state) => state.currentConversation)

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <HeaderInfo currentConversation={currentConversation}/>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton>
              <Search />
            </IconButton>
            <IconButton>
              <PersonAdd />
            </IconButton>
            <IconButton>
              <GroupAdd style={{ fontSize: "1.9rem" }} />
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerOpen}
              sx={{ ...(open && { display: 'none' }) }}
            >
            <MenuIcon />
          </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default HeaderBoxChat;
