import { GLOBALTYPES } from "../../constants/actionType";

const initState = {
  user: null,
  token: null,
  notification: 0,
};

export default (state = initState, action) => {
  switch (action.type) {
    case GLOBALTYPES.AUTH:
      sessionStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return {
        ...state,
        user : action?.data.user,
        token: action?.data.token
      };
    case GLOBALTYPES.LOGOUT:
      sessionStorage.clear();
      return initState;
    case GLOBALTYPES.RE_AUTH:
      return {
        ...state,
        user : action?.data.user,
        token: action?.data.token
      };
    case GLOBALTYPES.UPDATENOTIFICATION:
      return { ...state, notification: state.notification + 1 };
    case GLOBALTYPES.REMOVENOTIFICATION:
      return { ...state, notification: 0 };
    case GLOBALTYPES.UPDATEPROFILE:
      const newProfile = { ...state.user, ...action?.data };
      sessionStorage.clear();
      sessionStorage.setItem(
        "profile",
        JSON.stringify({ user: newProfile, token: state.token })
      );
      return { ...state, user: newProfile };
    default:
      return state;
  }
};
