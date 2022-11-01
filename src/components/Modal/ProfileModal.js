import {
  Avatar,
  Button,
  Fade,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import BaseModal from "./BaseModal";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { hideModal } from "../../redux/actions/modal";
import { updateProfile } from "../../redux/actions/auth";
import { validateionCreateGroup, validationChangeProfile } from "../../utils/Validation";
import { KeyboardDatePicker,MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { Form, Formik } from "formik";
function Profile() {
  const classes = useStyles();
  const { isShowFormSettingModal } = useSelector((state) => state.modal);
  const { user, token } = useSelector((state) => state.auth);
  const { socket } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(() => user.avatarURL);
  const [username, setUsername] = useState(() => user.username);
  const [gender, setGender] = useState(() => user.gender);
  const [dob, setDob] = useState("");
  const [image, setImage] = useState({});

  const handleHideModal = () => {
    dispatch(hideModal("isShowFormSettingModal"));
  };

  const handleSubmitForm = (values) => {
    dispatch(updateProfile(values))
    handleHideModal()
  };

  const body = (
    <Fade in={isShowFormSettingModal}>
      <Paper className={classes.paperSetting} id="modal-add-group">
        <h2 className={classes.setting}>Cập nhật thông tin cá nhân</h2>
        <Avatar className={classes.avatar} src={avatar} />
        <h3 className={classes.username}>{username}</h3>
        <Formik
          initialValues={{
            username: "",
            avatarURL: "",
            gender: "",
            dob: "",
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
            setFieldValue
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

              <FormControl className={classes.setting}>
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

              <div className={classes.actions}>
                <Button variant="contained" onClick={handleHideModal}>
                  Hủy
                </Button>
                <Button
                  color="primary"
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
