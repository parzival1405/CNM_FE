import * as React from 'react';
import clsx from 'clsx';
import { makeStyles,styled, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SettingsIcon from '@material-ui/icons/Settings';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

const drawerWidth = '25%';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

export default function PersistentDrawerRight() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleClick = () => {
    setOpen(!open);
  };
  return (
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader style={{justifyContent:'center'}}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
          <Typography variant="h6" gutterBottom>
          Thông tin nhóm
        </Typography>
        </DrawerHeader>
        <Divider style={{justifyContent:'center',alignItems:'center'}} />
        <h2 style={{display:'flex',justifyContent:'center'}} variant="h6" >Tên Nhóm</h2>
        <AvatarGroup max={4}  style={{justifyContent:'center',marginTop:20}} >
            <Avatar alt="Remy Sharp" src="" />
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
        </AvatarGroup>
        <List style={{display: 'flex',flexDirection: 'row',width: drawerWidth}}>
            <ListItem style={{padding:0}}>
              <ListItem button style={{display: 'flex',flexDirection: 'column'}}>
                <ListItemIcon>
                  <NotificationsIcon /> 
                </ListItemIcon>
                <ListItemText secondary={"Tắt thông báo"} />
              </ListItem>
            </ListItem>
            <ListItem style={{padding:0}}>
              <ListItem button style={{display: 'flex',flexDirection: 'column'}}>
                <ListItemIcon>
                  <PersonAddIcon/>
                </ListItemIcon>
                <ListItemText secondary={"Thêm thành viên"} />
              </ListItem>
            </ListItem>
            <ListItem style={{padding:0}}>
              <ListItem button style={{display: 'flex',flexDirection: 'column'}}>
                <ListItemIcon>
                  <SettingsIcon /> 
                </ListItemIcon>
                <ListItemText secondary={"Quản lý nhóm"} />
              </ListItem>
            </ListItem>
        </List>
        <Divider />
        {/* <Accordion style={{marginTop:20}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Thành viên nhóm</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            10 thành viên
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion style={{marginTop:20}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Bảng tin nhóm</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Null
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion style={{marginTop:20}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Ảnh/Video</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Null
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion style={{marginTop:20}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>File</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Null
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion style={{marginTop:20}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Link</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Null
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion style={{marginTop:20}} >
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
      <ListItem button onClick={handleClick}>
        <ListItemText primary="Inbox" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
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
  );
}

