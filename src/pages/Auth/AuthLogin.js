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
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
      dispatch(signin(values, navigate));
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
    }

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
              handleSubmit(values);
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
            <Link to={"/register"}>
            Đăng ký
            </Link>
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
