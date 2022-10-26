import React from "react";
import { InputBase } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import signinImage from "../../assets/signup.jpg";
import { useDispatch } from "react-redux";
import { signin } from "../../redux/actions/auth";
import { Form, Formik } from "formik";
import { validationLogin } from "../../utils/Validation";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    dispatch(signin(values, navigate));
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
                  <label htmlFor="">
                    Nhập số điện thoại để nhận mã xác thực
                  </label>
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
                <div id="recaptcha"></div>
                <div className="auth__form-container_fields-content_button">
                  <button
                    style={{ width: "500px", fontSize: "16px" }}
                    disabled={isSubmitting}
                    type="submit"
                  >
                    Tiếp tục
                  </button>
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

export default Login;
