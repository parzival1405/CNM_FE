import React from "react";
import { Button, TextField } from "@material-ui/core";

import signinImage from "../../assets/signup.jpg";
import { useDispatch } from "react-redux";

import { Form, Formik } from "formik";
import { validationForgotPass } from "../../utils/Validation";
import { isShowOTP } from "../../redux/actions/modal";

function Forgot() {
  const dispatch = useDispatch();

  const handleShowOTP = () => {
    dispatch(isShowOTP());
  };

  return (
    <div className="auth__form-container" style={{ height: "100vh" }}>
      <div className="auth__form-container_fields">
        <div className="auth__form-container_fields-content">
          <p>Quên mật khẩu</p>
          <Formik
            initialValues={{
              phoneNumber: "",
              newpassword: "",
            }}
            validationSchema={validationForgotPass}
            onSubmit={(values, { setSubmitting, resetForm }) => {
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
                  <label htmlFor="">
                    Nhập số điện thoại để nhận mã xác thực
                  </label>
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
                <div className="form-group-column" style={{ display: "none" }}>
                  <label htmlFor="">Nhập lại mật khẩu mới</label>
                  <TextField
                    variant="outlined"
                    className="tf"
                    error={errors.newpassword}
                    helperText={errors.newpassword}
                    touched={touched.newpassword}
                    value={values.newpassword}
                    type="password"
                    name="newpassword"
                    placeholder="Nhập mật khẩu mới"
                    onChange={handleChange}
                  />
                </div>
                <div id="recaptcha"></div>
                <div className="auth__form-container_fields-content_button">
                  <Button
                    style={{ width: "500px", fontSize: "16px" }}
                    disabled={
                      values.phoneNumber && !errors.phoneNumber ? false : true
                    }
                    onClick={handleShowOTP}
                  >
                    Tiếp tục
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <div className="auth__form-container_image">
        <img src={signinImage} alt="" />
      </div>
    </div>
  );
}

export default Forgot;
