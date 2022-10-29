import React from "react";
import { Button, TextField } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import SigninImage from "../../assets/signup.jpg";
import { useDispatch } from "react-redux";
import { signin } from "../../redux/actions/auth";
import { Form, Formik } from "formik";
import { validationLogin } from "../../utils/Validation";
import { blue } from "@material-ui/core/colors";
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
  };

  return (
    <div className="auth__form-container" style={{ height: "100vh" }}>
      <div className="auth__form-container_fields">
        <div className="auth__form-container_fields-content">
          <p>ĐĂNG NHẬP</p>
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
                <div className="form-group-column">
                  <label htmlFor="">Số điện thoại</label>
                  <TextField
                    variant="outlined"
                    className="tf"
                    error={errors.phoneNumber}
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
                  <label htmlFor="">Mật khẩu</label>
                  <TextField
                    variant="outlined"
                    className="tf"
                    error={errors.password}
                    helperText={errors.password}
                    touched={touched.password}
                    type="password"
                    name="password"
                    placeholder="Nhập mật khẩu"
                    onChange={handleChange}
                  />
                </div>
                {/* Sử lý form quên mật khẩu */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    marginTop: "10px",
                  }}
                >
                  <Link to={"/forgot"} style={{ color: blue }}>
                    Quên mật khẩu?
                  </Link>
                </div>
                <div id="recaptcha"></div>
                <div className="auth__form-container_fields-content_button">
                  <Button
                    style={{ width: "500px", fontSize: "16px" }}
                    disabled={isSubmitting}
                    type="submit"
                  >
                    Đăng nhập
                  </Button>
                </div>
              </Form>
            )}
          </Formik>

          <div
            className="auth__form-container_fields-account"
            style={{ marginTop: "10px" }}
          >
            <p style={{ marginRight: "8px", color: "#707070" }}>
              Chưa có tài khoản?{" "}
            </p>
            <Link to={"/register"} style={{ fontWeight: "bold" }}>
              Đăng ký ngay!
            </Link>
          </div>
        </div>
      </div>
      <div className="auth__form-container_image">
        <img style={{ height: "100vh" }} src={SigninImage} alt="" />
      </div>
    </div>
  );
}

export default Login;
