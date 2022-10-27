import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
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
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import PushPinIcon from '@mui/icons-material/PushPin';
const drawerWidth = '25%';

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

export default function PersistentDrawerRight() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
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
              <ListItemButton style={{display: 'flex',flexDirection: 'column'}}>
                <ListItemIcon>
                  <NotificationsIcon /> 
                </ListItemIcon>
                <ListItemText secondary={"Tắt thông báo"} />
              </ListItemButton>
            </ListItem>
            <ListItem style={{padding:0}} >
              <ListItemButton style={{display: 'flex',flexDirection: 'column'}}>
                <ListItemIcon>
               < PushPinIcon/>
                </ListItemIcon>
                <ListItemText secondary={"Ghim hội thoại"} />
              </ListItemButton>
            </ListItem >
            <ListItem style={{padding:0}}>
              <ListItemButton style={{display: 'flex',flexDirection: 'column'}}>
                <ListItemIcon>
                  <PersonAddAltIcon/>
                </ListItemIcon>
                <ListItemText secondary={"Thêm thành viên"} />
              </ListItemButton>
            </ListItem>
            <ListItem style={{padding:0}}>
              <ListItemButton style={{display: 'flex',flexDirection: 'column'}}>
                <ListItemIcon>
                  <SettingsIcon /> 
                </ListItemIcon>
                <ListItemText secondary={"Quản lý nhóm"} />
              </ListItemButton>
            </ListItem>
        </List>
        <Divider />
        <Accordion style={{marginTop:20}}>
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
      </Accordion>
      
      </Drawer>
  );
}

