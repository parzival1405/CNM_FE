import * as React from "react";
import clsx from "clsx";
import { makeStyles, styled, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SettingsIcon from "@material-ui/icons/Settings";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import { useDispatch, useSelector } from "react-redux";
import {
  hideSide,
  showInformation,
  showMember,
} from "../../redux/actions/sideBar";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";
import Friend from "../PhoneBooks/Friend";
import { showChangeCreator } from "../../redux/actions/modal";
import { deleteGroup, outGroup } from "../../redux/actions/currentConversation";

const drawerWidth = "25%";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

export default function PersistentDrawerRight() {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { currentConversation } = useSelector(
    (state) => state.currentConversation
  );
  const { user } = useSelector((state) => state.auth);
  const handleDrawerClose = () => {
    dispatch(hideSide("isShowInformation"));
  };
  const { socket } = useSelector((state) => state.socket);
  const handleShowMember = () => {
    dispatch(showMember());
  };

  const handleOutGroup = () => {
    if (user._id === currentConversation.createdBy._id) {
      handleShowChangeCreator();
    } else {
      confirmOutGroup();
    }
  };
  const handleDeleteGroup = () => {
    if (window.confirm(`Bạn chắc chắn muốn giải tán nhóm này ?`)) {
      const data = {
        conversationId: currentConversation._id,
      };
      dispatch(deleteGroup(data, socket.current));
    }
  };
  const confirmOutGroup = () => {
    if (window.confirm(`Bạn chắc chắn muốn rời nhóm ?`)) {
      const data = {
        conversationId: currentConversation._id,
      };
      dispatch(outGroup(data, user, socket.current));
    }
  };

  const handleShowChangeCreator = () => {
    dispatch(showChangeCreator());
  };

  const handleHideShowMember = () => {
    dispatch(showInformation());
  };
  const { isShowInformation, isShowMember } = useSelector(
    (state) => state.sideBar
  );
  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={isShowInformation}
      >
        <DrawerHeader style={{ justifyContent: "center" }}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
          <Typography variant="h6" gutterBottom>
            Thông tin
          </Typography>
        </DrawerHeader>
        <Divider style={{ justifyContent: "center", alignItems: "center" }} />
        <h2 style={{ display: "flex", justifyContent: "center" }} variant="h6">
          {currentConversation?.label}
        </h2>
        <AvatarGroup
          max={4}
          style={{ justifyContent: "center", marginTop: 20 }}
        >
          {currentConversation.member.map((member) => (
            <Avatar key={member?._id} src={member?.avatarURL} alt="avatar" />
          ))}
        </AvatarGroup>
        <List style={{ display: "flex", flexDirection: "row" }}>
          <ListItem style={{ padding: 0 }}>
            <ListItem
              button
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <ListItemIcon>
                <NotificationsIcon />
              </ListItemIcon>
              <ListItemText secondary={"Tắt thông báo"} />
            </ListItem>
          </ListItem>
          <ListItem style={{ padding: 0 }}>
            <ListItem
              button
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <ListItemIcon>
                <PersonAddIcon />
              </ListItemIcon>
              <ListItemText secondary={"Thêm thành viên"} />
            </ListItem>
          </ListItem>
          <ListItem style={{ padding: 0 }}>
            <ListItem
              button
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText secondary={"Quản lý nhóm"} />
            </ListItem>
          </ListItem>
        </List>
        <Divider />
        {currentConversation.member.length >= 3 && (
          <Accordion style={{ marginTop: 20 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Thành viên nhóm</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ListItem button onClick={handleShowMember}>
                <ListItemText
                  primary={`${currentConversation.member.length} thành viên`}
                />
              </ListItem>
            </AccordionDetails>
          </Accordion>
        )}
        <Accordion style={{ marginTop: 20 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Bảng tin nhóm</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Null</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion style={{ marginTop: 20 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Ảnh/Video</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Null</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion style={{ marginTop: 20 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>File</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Null</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion style={{ marginTop: 20 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Link</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Null</Typography>
          </AccordionDetails>
        </Accordion>
        {/*<Accordion style={{marginTop:20}} >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Thiết lập bảo mật</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Null
          </Typography>
        </AccordionDetails>
      </Accordion> */}

        <ListItem button>
          <ListItemText primary="Inbox" />
          {isShowInformation ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        {user._id === currentConversation.createdBy._id && (
          <ListItem button onClick={handleShowChangeCreator}>
            <ListItemText primary="Thay đổi trưởng nhóm" />
          </ListItem>
        )}
        {user._id === currentConversation.createdBy._id && (
          <ListItem button onClick={handleDeleteGroup}>
            <ListItemText primary="Giải tán nhóm" />
          </ListItem>
        )}
        <ListItem button onClick={handleOutGroup}>
          <ListItemText primary="Rời nhóm" />
        </ListItem>
        <Collapse in={isShowInformation} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Starred" />
            </ListItem>
          </List>
        </Collapse>
      </Drawer>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={isShowMember}
      >
        <DrawerHeader style={{ justifyContent: "center" }}>
          <IconButton onClick={handleHideShowMember}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
          <Typography variant="h6" gutterBottom>
            Danh Sách thành viên
          </Typography>
        </DrawerHeader>
        <List style={{ maxHeight: 640, overflow: "auto" }}>
          {currentConversation?.member?.map((member) => (
            <Friend
              key={member._id}
              friend={member}
              creator={currentConversation.createdBy}
            />
          ))}
        </List>
      </Drawer>
    </>
  );
}
