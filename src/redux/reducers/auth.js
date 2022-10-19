import { GLOBALTYPES } from "../../constants/actionType";

const initState = {
  user : null,
  token : null
}

export default (state = initState, action) => {
  switch (action.type) {
    case GLOBALTYPES.AUTH:
      sessionStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      // localStorage.setItem('profile',JSON.stringify({...action?.data}))
      return action?.data ;
    case GLOBALTYPES.LOGOUT:
      sessionStorage.clear();
      return initState;
    case GLOBALTYPES.RE_AUTH:
      return action?.data ;
    case GLOBALTYPES.LOGOUT:
    default:
      return state;
  }
};
