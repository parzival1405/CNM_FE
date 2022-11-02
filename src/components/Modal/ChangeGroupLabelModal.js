import {
  Button,
  Fade,
  InputAdornment,
  Paper,
  TextField,
} from "@material-ui/core";
import { Label } from "@material-ui/icons";
import { Form, Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeCurrentConversationGroupName } from "../../redux/actions/currentConversation";
import { hideModal } from "../../redux/actions/modal";
import { validateionChangeGroupName } from "../../utils/Validation";

import BaseModal from "./BaseModal";
import useStyles from "./styles";
function ChangeGroupLabelModal() {
  const classes = useStyles();
  const { isShowChangeGroupLabel } = useSelector((state) => state.modal);
  const { currentConversation } = useSelector(
    (state) => state.currentConversation
  );
  const { socket } = useSelector((state) => state.socket);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmitForm = React.useCallback(
    (values) => {
      const { label } = values;
      const data = {
        conversationId: currentConversation._id,
        newLabel: label,
      };
      if (label === currentConversation.label) {
        handleHideModal();
      }
      dispatch(changeCurrentConversationGroupName(data,currentConversation.label,user, socket.current));
      handleHideModal();
    },
    [currentConversation, user, dispatch, socket]
  );

  const handleHideModal = () => {
    dispatch(hideModal("isShowChangeGroupLabel"));
  };

  const body = (
    <Fade in={isShowChangeGroupLabel}>
      <Paper className={classes.paper} id="modal-add-friend">
        <h3>Đổi tên nhóm</h3>
        <Formik
          initialValues={{
            label: "",
          }}
          validationSchema={validateionChangeGroupName}
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
          }) => (
            <Form
              action=""
              className={classes.form}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <TextField
                label="Tên nhóm mới"
                name="label"
                error={errors.label}
                helperText={errors.label}
                touched={touched.label}
                value={values.label}
                onChange={handleChange}
                className={classes.title}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Label />
                    </InputAdornment>
                  ),
                }}
              />
              <div className={classes.actions}>
                <Button variant="contained" onClick={handleHideModal}>
                  Hủy
                </Button>
                <Button variant="contained" onClick={resetForm}>
                  Xóa trắng
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  isSubmitting={isSubmitting}
                >
                  Xác nhận
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Paper>
    </Fade>
  );
  return <BaseModal body={body} isShow={isShowChangeGroupLabel} />;
}

export default ChangeGroupLabelModal;
