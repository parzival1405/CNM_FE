import React, { useState } from "react";
// import Icon from '../assets/Icon'
// import {GoogleLogin} from 'react-google-login';
import {
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import signinImage from "../../assets/signup.jpg";
import { useDispatch } from "react-redux";
import { signup, signin } from "../../redux/actions/auth";
import { Form, Formik } from "formik";
import { firebase, auth } from "../../Firebase";
import { validationLogin } from "../../utils/Validation";
import * as api from '../../api'
import { ShowOTP } from "../../redux/actions/modal";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha",
      {
        size: "invisible",
        callback: (response) => {
          handleSendSms();
        },
        defaultCountry: "IN",
      }
    );
  };

  const handleSendSms = (values) => {
    configureCaptcha();
    const phoneNumber = "+84" + values.phoneNumber.slice(1);
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

  const handleSubmitForm = async (values) => {
    const data = {
      phoneNumber: values.phoneNumber,
      password: values.password,
    };

    const {data:{user}} = await api.checkOTP(data)

    if (user.isVerifyOtp) {
      handleSendSms(values);
      dispatch(ShowOTP())
      // history.replace({
      //   pathname: "/confirm",
      //   data: dt,
      // });
    } else {
      alert("sai j day");
    }
  };
  const handleSubmit = async (values) => {
    // const data = {
    //   phoneNumber: values.phoneNumber,
    //   password: values.password,
    // };

    // const {user} = await api.checkOTP(data)

    // // if (res.data.msg) {
    // if (user.isVerifyOtp) {
    //   console.log(user)
    //   // handleSendSms(values);

    //   // history.replace({
    //   //   pathname: "/confirm",
    //   //   data: dt,
    //   // });
    // } else {
    //   alert("Số điện thoại đã được sử dụng");
    // }
    // dispatch(signin(values, navigate));
    //   let recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha', {
    //       'size': 'invisible'
    //   });
    //   const phoneNumberVN = "+84" + form.phoneNumber.slice(1,form.phoneNumber.length);

    //   auth.signInWithPhoneNumber(phoneNumberVN, recaptcha).then((result) => {
    //       let code = prompt('Nhập mã OTP')
    //       if(code != null){
    //           result.confirm(code).then((result)=> {
    //               console.log(result.user)
    //               dispatch(signin(form, navigate));
    //           }).catch(err => {
    //               alert('Sai mã OTP')
    //           })
    //       }
    //   }).catch(err => {
    //       console.log(err)
    //   })
  };

  return (
    <div className="auth__form-container">
      <div className="auth__form-container_fields">
        <div className="auth__form-container_fields-content">
          <p>Đăng nhập</p>
          <Formik
            initialValues={{
              phoneNumber: "",
              password: "",
            }}
            validationSchema={validationLogin}
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
              resetForm,
              handleChange,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form onSubmit={handleSubmit} method="POST">
                <div className="auth__form-container_fields-content_input">
                  <label htmlFor="phoneNumber">Số điện thoại</label>
                  <TextField
                    error={errors.phoneNumber}
                    helperText={errors.phoneNumber}
                    touched={touched.phoneNumber}
                    value={values.phoneNumber}
                    type="text"
                    name="phoneNumber"
                    placeholder="Nhập số điện thoại"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="auth__form-container_fields-content_input">
                  <label htmlFor="password">Mật khẩu</label>
                  <TextField
                    error={errors.password}
                    helperText={errors.password}
                    touched={touched.password}
                    type="password"
                    name="password"
                    className=""
                    placeholder="Nhập mật khẩu"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div id="recaptcha"></div>
                <div className="auth__form-container_fields-content_button">
                  <button disabled={isSubmitting} type="submit">
                    Đăng nhập
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          <div className="auth__form-container_fields-account">
            <p>Chưa có tài khoản ? </p>
            <Link to={"/register"}>Đăng ký</Link>
          </div>
        </div>
      </div>
      <div className="auth__form-container_image">
        <img src={signinImage} />
      </div>
    </div>
  );
}

export default Login;
