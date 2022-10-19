import {
  GLOBALTYPES
} from '../../constants/actionType';

export default (state = { isLoading: true, messages: [] }, action) => {
  switch (action.type) {
    case GLOBALTYPES.ADDMESSAGE:
      return { ...state, messages: [...state.messages, action.data] };
    case GLOBALTYPES.GETALLMESSAGE:
      return { ...state, messages: action.data };
    case GLOBALTYPES.ADDGROUPMESSAGE:
      return { ...state, messages: [...state.messages, action.data] };
    case GLOBALTYPES.GETALLGROUPMESSAGE:
      return { ...state, messages: action.data };
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
