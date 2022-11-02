import React, { useState } from "react";
// import Icon from '../assets/Icon'
// import {GoogleLogin} from 'react-google-login';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";

import { Link, useNavigate } from "react-router-dom";
import signinImage from "../../assets/signup.jpg";
import { useDispatch } from "react-redux";
import { signup } from "../../redux/actions/auth";
import { Form, Formik } from "formik";
import DateFnsUtils from "@date-io/date-fns";
// import { firebase, auth } from "../../Firebase";
import { validationRegister } from "../../utils/Validation";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

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
              dob: "",
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
              setFieldValue,
            }) => (
              <Form onSubmit={handleSubmit} method="POST">
                <div className="form-group-column">
                  <label>Số điện thoại</label>
                  <TextField
                    error={errors.phoneNumber?.length > 0}
                    variant="outlined"
                    className="tf"
                    helperText={errors.phoneNumber}
                    touched={touched.phoneNumber}
                    value={values.phoneNumber}
                    type="text"
                    name="phoneNumber"
                    placeholder="Nhập số điện thoại"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group-column">
                  <label htmlFor="">Tên hiển thị</label>
                  <TextField
                    variant="outlined"
                    className="tf"
                    error={errors.username}
                    helperText={errors.username}
                    touched={touched.username}
                    value={values.username}
                    type="text"
                    name="username"
                    placeholder="Nhập tên hiển thị"
                    onChange={handleChange}
                  />
                </div>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  name="dob"
                  inputVariant="outlined"
                  format="MM/dd/yyyy"
                  value={values.dob}
                  error={errors.dob}
                  helperText={errors.dob}
                  touched={touched.dob}
                  onChange={val => {
                    setFieldValue("dob", val)
                  }}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider> 
                <FormControl >
                  <InputLabel>Gender</InputLabel>
                  <Select
                    label="gender"
                    name="gender"
                    error={errors.gender}
                    helperText={errors.gender}
                    touched={touched.gender}
                    value={values.gender}
                    onChange={handleChange}
                  >
                    <MenuItem value={true}>Nam</MenuItem>
                    <MenuItem value={false}>Nu</MenuItem>
                  </Select>
                </FormControl>
                <div className="form-group-column">
                  <label htmlFor="">Mật khẩu</label>
                  <TextField
                    error={errors.password?.length > 0}
                    variant="outlined"
                    className="tf"
                    helperText={errors.password}
                    touched={touched.password}
                    type="password"
                    name="password"
                    placeholder="Nhập mật khẩu"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group-column">
                  <label htmlFor="">Xác nhận mật khẩu</label>
                  <TextField
                    variant="outlined"
                    className="tf"
                    error={errors.confirmPassword?.length > 0}
                    helperText={errors.confirmPassword}
                    touched={touched.confirmPassword}
                    type="password"
                    name="confirmPassword"
                    placeholder="Xác nhận mật khẩu"
                    onChange={handleChange}
                  />
                </div>
                <div id="recaptcha"></div>
                <div className="auth__form-container_fields-content_button">
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    style={{ width: "500px", fontSize: "16px" }}
                  >
                    Đăng ký
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
          <div className="auth__form-container_fields-account">
            <p>Đã có tài khoản ?</p>
            <Link to={"/login"}>Đăng nhập</Link>
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
