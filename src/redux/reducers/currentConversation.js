import { GLOBALTYPES
} from '../../constants/actionType';

const initialState = { isLoading: true, currentConversation: null };

export default (state = initialState, action) => {
  switch (action.type) {
    case GLOBALTYPES.CURRENTCONVERSATION:
      return {
        ...state,
        currentConversation: action?.data,
      };
      case GLOBALTYPES.UPDATEMEMBER:
        return {
          ...state,
          currentConversation: action?.data,
        };
        case GLOBALTYPES.CHANGE_GROUP_NAME:
        return {
          ...state,
          currentConversation: action?.data,
        };
    default:
      return state;
  }
};