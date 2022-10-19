import { GLOBALTYPES } from "../../constants/actionType";

const initialState = { isLoading: true, conversations: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case GLOBALTYPES.GETALLCONVERSATION:
        console.log(action.data)
      return {
        ...state,
        conversations: action?.data,
      };
    case GLOBALTYPES.START_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case GLOBALTYPES.END_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};
