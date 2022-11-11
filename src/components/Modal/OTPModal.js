import { Button, Fade, Paper, TextField } from "@material-ui/core";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideModal } from "../../redux/actions/modal";
import BaseModal from "./BaseModal";
import useStyles from "./styles";
import KeyOTP from "../../assets/key_otp.svg";
import { number } from "yup";
import { Form, Formik } from "formik";

import { firebase, auth } from "../../Firebase";
import { signin } from "../../redux/actions/auth";
import { Link, useNavigate } from "react-router-dom";
import { validateionOTP } from "../../utils/Validation";

function Test() {
  const navigate = useNavigate();
  const [OTP1, setOTP1] = useState("");
  const [OTP2, setOTP2] = useState("");
  const [OTP3, setOTP3] = useState("");
  const [OTP4, setOTP4] = useState("");
  const [OTP5, setOTP5] = useState("");
  const [OTP6, setOTP6] = useState("");
  const { isShowOTP } = useSelector((state) => state.modal);
  const { data } = useSelector((state) => state.dataToOTPModal);
  
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleHideModal = () => {
    dispatch(hideModal("isShowOTP"));
  };
  const [show, setshow] = useState(false);
  function xacthucClickHandle() {
    handleHideModal();
  }

 const configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          handleSendSms();
          console.log("Recaptca varified");
        },
        defaultCountry: "IN",
      }
    );
  };

  const handleSendSms = (values) => {
    configureCaptcha();
    const phoneNumber = "+84" + data.phoneNumber.slice(1);
    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        console.log("SMS not sent", error);
      });
  };

  const handleSubmitForm = (values) => {
    // const dt = {
    //   phoneNumber: data.phoneNumber,
    //   password: data.password,
    // };
    // console.log(dt)
    // window.confirmationResult
    //   .confirm(values.otp)
    //   .then((result) => {
        const dt = {
          phoneNumber: "0975247624",
          password: "123456",
        };
    //     console.log(dt)
        handleHideModal();
        dispatch(signin(dt, navigate));
    //   })
    //   .catch((error) => {
    //     alert("Mã xác nhận không chính xác");
    //   });
  };

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
        <Formik
        initialValues={{
          otp: "",
        }}
        validationSchema={validateionOTP}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleSubmitForm(values);
          setSubmitting(true);
          resetForm();
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form
            className={classes.form}
            autoComplete="off"
            onSubmit={handleSubmit}
          >

            <TextField
              label="Nhập mã xác nhận"
              error={errors.otp}
              helperText={errors.otp}
              touched={touched.otp}
              type="text"
              fullWidth
              variant="filled"
              // InputProps={{
              //   startAdornment: (
              //     <InputAdornment position="start">
              //       <Lock />
              //     </InputAdornment>
              //   ),
              // }}
              name="otp"
              onChange={handleChange}
            />
            <div id="sign-in-button"> </div>
            <div style={{ display: "flex", width: "100%" }}>
              <Button variant="secondary" onClick={() => handleSendSms(values)}>
                Gửi lại mã
              </Button>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Xác nhận
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      </Paper>
    </Fade>
  );
  return <BaseModal body={body} isShow={isShowOTP} />;
}

export default Test;
