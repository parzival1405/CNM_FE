import { GLOBALTYPES } from "../../constants/actionType";

//SHOW CONVERS
export const showConversation = () => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.SHOW_CONVERSATION,
    });
  } catch (err) {}
};

export const showInformation = () => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.SHOW_INFORMATION,
    });
  } catch (err) {}
};

export const showPhoneBook = () => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.SHOW_PHONEBOOK,
    });
  } catch (err) {}
};

export const showMember = () => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.SHOW_MEMBER,
    });
  } catch (err) {}
};

export const hideSide = (side) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.HIDE_SIDE,
      payload: side,
    });
  } catch (err) {}
};
