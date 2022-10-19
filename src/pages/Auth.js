import React, { useState } from "react";
// import Icon from '../assets/Icon'
// import {GoogleLogin} from 'react-google-login';
import { useNavigate } from "react-router-dom";
import signinImage from "../assets/signup.jpg";
import { useDispatch } from "react-redux";
import { signup, signin } from "../redux/actions/auth";
import { firebase, auth } from '../Firebase';
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const regex =
    /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
  const initState = {
    username: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  };
  const [form, setForm] = useState(initState);
  const [isSignup, setIsSignup] = useState(false);
  const [isPhoneNumber, setIsPhoneNumber] = useState(false);
  const handleChange = (e) => {
    if (e.target.name === "phoneNumber") {
      setIsPhoneNumber(regex.test(e.target.value));
      
    }
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(isPhoneNumber){
        if (isSignup) {
            dispatch(signup(form, navigate));
        } else {
          dispatch(signin(form, navigate));
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
    }else{
        alert("Số điện thoại không hợp lệ")
    }
    
  };

  return (
    <div className="auth__form-container">
      <div className="auth__form-container_fields">
        <div className="auth__form-container_fields-content">
          <p>{isSignup ? "Đăng ký" : "Đăng nhập"}</p>
          <form onSubmit={handleSubmit} method="POST">
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
              <button>{isSignup ?  "Đăng ký" :"Đăng nhập" }</button>
            </div>
          </form>
          <div className="auth__form-container_fields-account">
            <p>
              {isSignup
                ? "Đã có tài khoản ? "
                : "Chưa có tài khoản ? "}
            </p>
            <span onClick={switchMode}>
              {isSignup ? "Đăng nhập" : "Đăng ký" }
            </span>
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
