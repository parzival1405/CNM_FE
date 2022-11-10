import useStyles from "./styles";
import {
  Avatar,
  Button,
  Fade,
  InputAdornment,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { Phone } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideModal } from "../../redux/actions/modal";
import BaseModal from "./BaseModal";
import {
  getUserByPhoneNumber,
  removeUserState,
} from "../../redux/actions/userResultFromModalAddFriendAction";
import useDebounce from "../../hooks/useDebounce";
import { requestAddFriend } from "../../redux/actions/friends";
function AddFriendModal() {
  const classes = useStyles();
  const { isShowAddFriendModal } = useSelector((state) => state.modal);
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState("");
  const debounceValue = useDebounce(phoneNumber, 500);
  const userResult = useSelector(
    (state) => state.userResultFromModalAddFriend.data
  );
  const {socket} = useSelector(
    (state) => state.socket
  );
  const { loading, error } = useSelector(
    (state) => state.userResultFromModalAddFriend
  );

  useEffect(() => {
    if (!phoneNumber.trim()) {
      dispatch(removeUserState());
      return;
    }
    dispatch(getUserByPhoneNumber({ phoneNumber: phoneNumber }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceValue]);

  const handleRequestAddFriend = React.useCallback(() => {
    // xu ly here
    console.log("here")
    dispatch(requestAddFriend(userResult,user,socket.current));
    handleHideModal("")
  }, [user, token, dispatch, userResult, socket]);

  const handleHideModal = () => {
    dispatch(hideModal("isShowAddFriendModal"));
    setPhoneNumber("");
  };

  const body = (
    <Fade in={isShowAddFriendModal}>
      <Paper className={classes.paper} id="modal-add-friend">
        <div
          style={{ borderBottom: "1px solid #bfd4e7", marginBottom: "10px" }}
        >
          <h3>Thêm bạn</h3>
        </div>
        <form action="" className={classes.form} noValidate autoComplete="off">
          <TextField
            label="Số điện thoại"
            className={classes.title}
            value={phoneNumber}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone />
                </InputAdornment>
              ),
            }}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          {/* {loading && <SmallLoading />}
          {error && <ErrorMessage error={error} />} */}
          {userResult && (
            <ListItem>
              <ListItemAvatar>
                <Avatar src={userResult?.avatarURl} alt="avatar" />
              </ListItemAvatar>
              <ListItemText
                primary={userResult.username}
                secondary={userResult.phoneNumber}
              />
              {userResult._id && user._id !== userResult._id && (
                <>
                  {userResult.friends.map(fr => fr._id).includes(user._id) ||
                  user.friends.map(fr => fr._id).includes(userResult._id) ? (
                    <Button variant="outlined" color="primary" disabled>
                      Bạn bè
                    </Button>
                  ) : (
                    <>
                      {userResult.friendsQueue?.map(fr => fr._id).includes(user._id) ? (
                        <Button variant="outlined" color="primary" disabled>
                          Đã gửi yêu cầu
                        </Button>
                      ) : (
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={handleRequestAddFriend}
                        >
                          Kết bạn
                        </Button>
                      )}
                    </>
                  )}
                </>
              )}
            </ListItem>
          )}
          <Typography>Gợi ý kết bạn</Typography>
          <div className={classes.actions}>
            <Button variant="contained" onClick={handleHideModal}>
              Hủy
            </Button>
            <Button
              color="primary"
              variant="contained"
              type="submit"
              disabled={phoneNumber.length === 0}
            >
              Tìm kiếm
            </Button>
          </div>
        </form>
      </Paper>
    </Fade>
  );
  return <BaseModal body={body} isShow={isShowAddFriendModal} />;
}

export default AddFriendModal;
