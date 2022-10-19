import { Avatar, Button, Fade, FormControl, Input, InputLabel, MenuItem, Paper, Select, TextField } from "@material-ui/core";
import React, { useState } from "react";
import BaseModal from "./BaseModal";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux"
import { hideModal } from "../../redux/actions/modal";
function Profile() {
  const classes = useStyles();
  const { isShowFormSettingModal } = useSelector((state) => state.modal);
  const { user, token } = useSelector((state) => state.auth);
  const { socket } = useSelector((state) => state);
  const dispatch = useDispatch();
//   const [avatar, setAvatar] = useState(() => `${user.profilePicture}`);
//   const [username, setUsername] = useState(() => `${user.username}`);
//   const [gender, setGender] = useState(() => `${user.gender}`);
//   const [image, setImage] = useState({});

  const [avatar, setAvatar] = useState('');
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('');
  const [image, setImage] = useState({});

  const handleHideModal = () => {
    dispatch(hideModal('isShowFormSettingModal'));
  };
  const body = (
    <Fade in={isShowFormSettingModal}>
      <Paper className={classes.paperSetting} id="modal-add-group">
        <h2 className={classes.setting}>Cập nhật thông tin cá nhân</h2>
        <form action="" className={classes.form} 
        // onSubmit={handleSubmitForm}
        >
          {/* <Avatar className={classes.avatar} src={avatar} />
          <h3 className={classes.username}>ten user</h3>
          <Input
            className={classes.setting}
            type="file"
            label="Avatar"
            name="avatar"
            // onChange={handleChangeFile}
            accept=" image/jpeg, image/png, image/jpg"
          />
          {!image && (
            <p
              style={{
                color: "red",
                marginTop: -20,
                fontSize: 13,
                marginLeft: "20%",
              }}
            >
              Vui lòng chọn hình ảnh
            </p>
          )}
          <TextField
            label="Username"
            // error={
            //   username === "" || username.length < 4 || username.length > 15
            // }
            type="text"
            className={classes.setting}
            // value={username}
            name="username"
            // onBlur={validateInput(username)}
            // onChange={(e) => {
            //   setUsername(e.target.value);
            //   console.log("leng= ", username.length);
            // }}
          />
          {username === "" ? (
            <p
              style={{
                color: "red",
                marginTop: -20,
                fontSize: 13,
                marginLeft: "20%",
              }}
            >
              Username không được để rỗng!
            </p>
          ) : username.length < 4 || username.length > 15 ? (
            <p
              style={{
                color: "red",
                marginTop: -20,
                fontSize: 13,
                marginLeft: "20%",
              }}
            >
              Username có độ dài từ 4-25 kí tự!
            </p>
          ) : (
            ""
          )}
          <FormControl className={classes.setting}>
            <InputLabel>Gender</InputLabel>
            <Select
              value={gender}
              label="Gender"
              onChange={(e) => setGender(e.target.value)}
            >
              <MenuItem value={true}>Nam</MenuItem>
              <MenuItem value={false}>Nu</MenuItem>
            </Select>
          </FormControl> */}

          <div className={classes.actionSetting}>
            <Button variant="contained" onClick={handleHideModal}>
              Hủy
            </Button>
            <Button color="primary" variant="contained" type="submit">
              Cập nhật thông tin
            </Button>
          </div>
        </form>
      </Paper>
    </Fade>
  );

  return <BaseModal body={body} isShow={isShowFormSettingModal} />;
}

export default Profile;
