import { Button, Fade, Paper, TextField } from "@material-ui/core";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideModal } from "../../redux/actions/modal";
import BaseModal from "./BaseModal";
import useStyles from "./styles";
import KeyOTP from "../../assets/key_otp.svg";
import { number } from "yup";
function Test() {
  const [OTP1, setOTP1] = useState("");
  const [OTP2, setOTP2] = useState("");
  const [OTP3, setOTP3] = useState("");
  const [OTP4, setOTP4] = useState("");
  const { isShowOTP } = useSelector((state) => state.modal);
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleHideModal = () => {
    dispatch(hideModal("isShowOTP"));
  };
  const [show, setshow] = useState(false);
  function xacthucClickHandle() {
    handleHideModal();
  }
  const body = (
    <Fade in={isShowOTP}>
      <Paper className={classes.paper} id="modal-add-friend">
        <div
          style={{
            display: "flex",
            backgroundColor: "#0878f4",
            height: "40px",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            borderRadius: "2px",
          }}
        >
          <p>Xác nhận OTP</p>
        </div>
        <div
          style={{
            borderRadius: "2px",
            display: "flex",
            backgroundColor: "#f2f3f5",
            height: "40px",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <p>Vui lòng không chia sẻ mã xác nhận để tránh mất tài khoản</p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "5px",
          }}
        >
          <img style={{ width: "50px" }} src={KeyOTP} alt="" />
        </div>
        <div
          style={{
            borderRadius: "2px",
            display: "flex",

            height: "40px",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <p>Vui lòng nhập mã OTP gửi tới số điện thoại của bạn</p>
        </div>
        <form action="" className={classes.form} noValidate autoComplete="off">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "5px",
            }}
          >
            <TextField
              style={{ width: "10%" }}
              className={classes.title}
              value={OTP1}
              onChange={(e) => setOTP1(e.target.value)}
              min={1}
              max={9}
              type={number}
              inputProps={{ maxLength: 1, style: { textAlign: "center" } }}
              inputRef={(input) => input && input.focus()}
            />
            <TextField
              style={{ width: "10%", marginLeft: "5px" }}
              className={classes.title}
              value={OTP2}
              onChange={(e) => setOTP2(e.target.value)}
              min={1}
              max={9}
              type={number}
              inputProps={{ maxLength: 1, style: { textAlign: "center" } }}
              inputRef={
                OTP1.length !== 0 ? (input) => input && input.focus() : ""
              }
            />
            <TextField
              style={{ width: "10%", marginLeft: "5px" }}
              className={classes.title}
              value={OTP3}
              onChange={(e) => setOTP3(e.target.value)}
              min={1}
              max={9}
              type={number}
              inputProps={{ maxLength: 1, style: { textAlign: "center" } }}
              inputRef={
                OTP2.length !== 0 ? (input) => input && input.focus() : ""
              }
            />
            <TextField
              style={{
                display: "flex",
                width: "10%",
                marginLeft: "5px",
                justifyContent: "center",
              }}
              className={classes.title}
              value={OTP4}
              onChange={(e) => setOTP4(e.target.value)}
              min={1}
              max={9}
              type={number}
              inputProps={{ maxLength: 1, style: { textAlign: "center" } }}
              inputRef={
                OTP3.length !== 0 ? (input) => input && input.focus() : ""
              }
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <p>Không nhận được mã OTP?</p>
            <Button style={{ color: "red" }}>Gửi lại</Button>
          </div>
          <div className={classes.actions}>
            <Button variant="contained" onClick={handleHideModal}>
              Hủy
            </Button>
            <Button
              color="primary"
              variant="contained"
              type="submit"
              disabled={
                OTP1.length + OTP2.length + OTP3.length + OTP4.length < 4
              }
              onClick={xacthucClickHandle}
            >
              Xác thực
            </Button>
          </div>
        </form>
      </Paper>
    </Fade>
  );
  return <BaseModal body={body} isShow={isShowOTP} />;
}

export default Test;
