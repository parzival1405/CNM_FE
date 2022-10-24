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
import { validationRegister } from "../../utils/Validation";
function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {

      dispatch(signup(values, navigate));
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
          <p>Đăng ký</p>
          <Formik
            initialValues={{
              username: "",
              phoneNumber: "",
              password: "",
              confirmPassword: "",
              gender:true
            }}
            validationSchema={validationRegister}
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
                    <label htmlFor="username">Tên hiển thị</label>
                    <TextField
                      error={errors.username}
                      helperText={errors.username}
                      touched={touched.username}
                      value={values.username}
                      type="text"
                      name="username"
                      placeholder="Nhập tên"
                      onChange={handleChange}
                      required
                    />
                  </div>
                {/* {isSignup && (
                  <div className="auth__form-container_fields-content_input">
                    <label>Giới tính</label>
                    <TextField
                      type="radio"
                      name="gender"
                      className=""
                      value={true}
                      onChange={handleChange}
                      required
                    />
                    <label htmlFor="gender">Nam</label>
                    <br />
                    <TextField
                      type="radio"
                      name="gender"
                      className=""
                      value={false}
                      onChange={handleChange}
                      required
                    />
                    <label htmlFor="gender">Nữ</label>
                  </div>
                )} */}
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
                  <div className="auth__form-container_fields-content_input">
                    <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                    <TextField
                      error={errors.confirmPassword}
                      helperText={errors.confirmPassword}
                      touched={touched.confirmPassword}
                      type="password"
                      name="confirmPassword"
                      className=""
                      placeholder="Xác nhận lại mật khẩu"
                      onChange={handleChange}
                      required
                    />
                  </div>
                <div id="recaptcha"></div>
                <div className="auth__form-container_fields-content_button">
                  <button disabled={isSubmitting} type="submit">
                    Đăng ký
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          {/* <form onSubmit={handleSubmit} method="POST">
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="phoneNumber">Số điện thoại</label>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Nhập số điện thoại"
                onChange={handleChange}
                required
              />
            </div>
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="username">Tên hiển thị</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Nhập tên"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label>Giới tính</label>
                <input
                  type="radio"
                  name="gender"
                  className=""
                  value={true}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="gender">Nam</label>
                <br />
                <input
                  type="radio"
                  name="gender"
                  className=""
                  value={false}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="gender">Nữ</label>
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="password">Mật khẩu</label>
              <input
                type="password"
                name="password"
                className=""
                placeholder="Nhập mật khẩu"
                onChange={handleChange}
                required
              />
            </div>
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className=""
                  placeholder="Xác nhận lại mật khẩu"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div id="recaptcha"></div>
            <div className="auth__form-container_fields-content_button">
              <button>{isSignup ? "Đăng ký" : "Đăng nhập"}</button>
            </div>
          </form> */}
          <div className="auth__form-container_fields-account">
            <p>Đã có tài khoản ?</p>
            <Link to={"/login"}>
              Đăng nhập
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

export default Register;
