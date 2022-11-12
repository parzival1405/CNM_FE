import {
  Avatar,
  Button,
  Fade,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import BaseModal from "./BaseModal";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { hideModal } from "../../redux/actions/modal";
import { updateProfile } from "../../redux/actions/auth";
import { validationChangeProfile } from "../../utils/Validation";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { Form, Formik } from "formik";
function Profile() {
  const classes = useStyles();
  const { isShowFormSettingModal } = useSelector((state) => state.modal);
  const { user } = useSelector((state) => state.auth);
  // const { socket } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(() => user.avatarURL);
  const [username, setUsername] = useState(() => user.username);
  const [gender, setGender] = useState(() => user.gender);
  const [dob, setDob] = useState(user.dob);

  useEffect(() => {
    setAvatar(user.avatarURL);
    setUsername(user.username);
    setGender(user.gender);
    setDob(user.dob);
  }, [user]);

  const handleHideModal = () => {
    dispatch(hideModal("isShowFormSettingModal"));
  };

  const handleSubmitForm = (values) => {
    dispatch(updateProfile(values));
    handleHideModal();
  };

  const body = (
    <Fade in={isShowFormSettingModal}>
      <Paper className={classes.paperSetting} id="modal-add-group">
        <div style={{ textAlign: "center", margin: "10px 0" }}>
          <h2>Cập nhật thông tin cá nhân</h2>
        </div>
        <Avatar className={classes.avatar} src={avatar} />
        <h3 className={classes.username}>{username}</h3>
        <Formik
          initialValues={{
            username: username,
            avatarURL: avatar,
            gender: gender,
            dob: dob,
          }}
          validationSchema={validationChangeProfile}
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
            setFieldValue,
          }) => (
            <Form
              action=""
              className={classes.form}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <TextField
                label="Tên hiển thị"
                name="username"
                error={errors.username}
                helperText={errors.username}
                touched={touched.username}
                value={values.username}
                onChange={handleChange}
                className={classes.title}
              />

              <TextField
                label="Đường dẫn avatar"
                name="avatarURL"
                error={errors.avatarURL}
                helperText={errors.avatarURL}
                touched={touched.avatarURL}
                value={values.avatarURL}
                onChange={handleChange}
                className={classes.title}
              />

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  margin: "40px 0 40px 0",
                  justifyContent: "flex-start",
                }}
              >
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Giới tính
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="true"
                    name="radio-buttons-group"
                  >
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <FormControlLabel
                        value="true"
                        control={<Radio checked={values.gender === true} />}
                        label="Male"
                        name="gender"
                        onChange={(val) => {
                          setFieldValue("gender", true);
                        }}
                      />
                      <FormControlLabel
                        value="false"
                        control={<Radio checked={values.gender === false} />}
                        label="Female"
                        name="gender"
                        onChange={(val) => {
                          setFieldValue("gender", false);
                        }}
                      />
                    </div>
                  </RadioGroup>
                </FormControl>

                <FormControl>
                  <FormLabel
                    id="demo-radio-buttons-group-label"
                    style={{
                      marginLeft: "50px",
                    }}
                  >
                    Ngày sinh
                  </FormLabel>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      name="dob"
                      inputVariant="outlined"
                      format="MM/dd/yyyy"
                      value={values.dob}
                      error={errors.dob}
                      helperText={errors.dob}
                      touched={touched.dob}
                      onChange={(val) => {
                        setFieldValue("dob", val);
                      }}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                      style={{
                        width: "50%",
                        marginLeft: "50px",
                        fontSize: "20px",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </FormControl>
              </div>

              <div className={classes.actions}>
                <Button variant="contained" onClick={handleHideModal}>
                  Hủy
                </Button>
                <Button
                  // color="#0978f5"
                  style={{ backgroundColor: "#0978f5", color: "white" }}
                  variant="contained"
                  type="submit"
                  isSubmitting={isSubmitting}
                >
                  Thay đổi
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Paper>
    </Fade>
  );

  return <BaseModal body={body} isShow={isShowFormSettingModal} />;
}

export default Profile;
