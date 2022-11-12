import React from "react";
import { Grid, Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import "./styles.css";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import SearchComponent from "../Search";
import Paper from "@material-ui/core/Paper";
import GroupIcon from "@material-ui/icons/Group";
import {
  styled,
  IconButton,
  Box,
  AppBar,
  Toolbar,
  InputBase,
  alpha,
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Groups = ({ item }) => {
  const { image, name, members } = item;

  return (
    <>
      <div className="friend-request">
        <div className="friend-request__main">
          <div className="friend-request__main-content">
            <AvatarGroup max={4}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
              <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
              <Avatar
                alt="Trevor Henderson"
                src="/static/images/avatar/5.jpg"
              />
            </AvatarGroup>
            <Typography
              style={{ marginLeft: "30%", marginTop: 20 }}
              variant="subtitle1"
              gutterBottom
            >
              {name}
            </Typography>
            <Typography
              style={{ marginLeft: "20%", marginTop: 20 }}
              variant="subtitle1"
              gutterBottom
            >
              {members} Thành viên
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
};

const ListGroup = ({ listFriendsRequest }) => {
  const classes = useStyles();
  const [title, setTitle] = React.useState("");

  const handleChange = (event) => {
    setTitle(event.target.value);
  };
  return (
    <>
      <div
        className="list-friends-request"
        style={{
          width: "100%",
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <AppBar
            position="static"
            style={{
              backgroundColor: "#0978f5",
              boxShadow: "none",
              borderLeft: "1px solid #bfd4e7",
            }}
          >
            <Toolbar>
              <GroupIcon style={{ fontSize: 30 }}></GroupIcon>
              <Typography style={{ marginLeft: 30, fontSize: 30 }}>
                Danh sách nhóm
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <FormControl className={classes.formControl}>
            <NativeSelect
              value={title}
              onChange={handleChange}
              name="age"
              className={classes.selectEmpty}
              inputProps={{ "aria-label": "age" }}
            >
              <option value={10}> Tất cả ({listFriendsRequest.length})</option>
              <option value={20}>
                Tôi quản lý({listFriendsRequest.length})
              </option>
            </NativeSelect>
          </FormControl>
        </div>
        <Paper
          style={{
            maxHeight: "660px",
            overflow: "auto",
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          {listFriendsRequest.length > 0 &&
            listFriendsRequest.map((friend) => (
              <>
                <Groups item={friend} key={friend.id} />
              </>
            ))}
        </Paper>
      </div>
    </>
  );
};

export default ListGroup;
