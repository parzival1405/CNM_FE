import React, { useState } from "react";
// import Icon from '../assets/Icon'
// import {GoogleLogin} from 'react-google-login';
import { InputBase } from "@material-ui/core";

import { Link, useNavigate } from "react-router-dom";
import signinImage from "../../assets/signup.jpg";
import { useDispatch } from "react-redux";
import { signup } from "../../redux/actions/auth";
import { Form, Formik } from "formik";
// import { firebase, auth } from "../../Firebase";
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
  };
  // let dob = document.getElementById("dob");
  // const [show, toggleShow] = useState(false);
  // // const [btnstate, setBtnstate] = useState(false);
  // function dobhandleClick() {
  //   // setBtnstate((btnstate) => !btnstate);
  //   // toggleShow(!show);
  //   dob.focus();
  //   dob.click();
  // }
  // // let toggleClasscheck = btnstate ? "active" : null;
  return (
    <div className="auth__form-container" style={{ height: "100vh" }}>
      <div className="auth__form-container_fields">
        <div className="auth__form-container_fields-content">
          <p>ĐĂNG KÝ</p>
          <Formik
            initialValues={{
              username: "",
              phoneNumber: "",
              password: "",
              confirmPassword: "",
              gender: true,
              dayofbirth: "",
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
                <div className="form-group-column">
                  <label>Số điện thoại</label>
                  <InputBase
                    className="tf"
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
                <div className="form-group-column">
                  <label htmlFor="">Tên hiển thị</label>
                  <InputBase
                    className="tf"
                    error={errors.username}
                    helperText={errors.username}
                    touched={touched.username}
                    value={values.username}
                    type="text"
                    name="username"
                    placeholder="Nhập tên hiển thị"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group-column">
                  <label htmlFor="">Ngày sinh</label>
                  <InputBase
                    id="dob"
                    className="tf"
                    error={errors.dayofbirth}
                    helperText={errors.dayofbirth}
                    touched={touched.dayofbirth}
                    value={values.dayofbirth}
                    type="date"
                    name="dayofbirth"
                    onChange={handleChange}
                    required
                    placeholderText="Ngay sinh"
                  />
                </div>
                {/* {isSignup && (
                  <div className="form-group-column">
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
                <div className="form-group-column">
                  <label htmlFor="">Mật khẩu</label>
                  <InputBase
                    className="tf"
                    error={errors.password}
                    helperText={errors.password}
                    touched={touched.password}
                    type="password"
                    name="password"
                    placeholder="Nhập mật khẩu"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group-column">
                  <label htmlFor="">Xác nhận mật khẩu</label>
                  <InputBase
                    className="tf"
                    error={errors.confirmPassword}
                    helperText={errors.confirmPassword}
                    touched={touched.confirmPassword}
                    type="password"
                    name="confirmPassword"
                    placeholder="Xác nhận mật khẩu"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div id="recaptcha"></div>
                <div className="auth__form-container_fields-content_button">
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    style={{ width: "500px", fontSize: "16px" }}
                  >
                    Đăng ký
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          {/* <form onSubmit={handleSubmit} method="POST">
            <div className="form-group-column">
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
              <div className="form-group-column">
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
              <div className="form-group-column">
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
            <div className="form-group-column">
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
              <div className="form-group-column">
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
          <div
            className="auth__form-container_fields-account"
            style={{ marginTop: "10px" }}
          >
            <p style={{ marginRight: "8px", color: "#707070" }}>
              Đã có tài khoản?{" "}
            </p>
            <Link to={"/login"} style={{ fontWeight: "bold" }}>
              Đăng nhập ngay!
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
