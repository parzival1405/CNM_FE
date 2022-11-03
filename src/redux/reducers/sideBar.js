import { GLOBALTYPES } from "../../constants/actionType";

export default function modalReducers(
  state = {
    isShowConversation: true,
    isShowPhoneBook: false,
    isShowInformation: false,
    isShowMember: false,
  },
  action
) {
  switch (action.type) {
    case GLOBALTYPES.SHOW_CONVERSATION:
      return {
        ...state,
        isShowConversation: true,
        isShowPhoneBook: false,
      };
    case GLOBALTYPES.SHOW_PHONEBOOK:
      return {
        ...state,
        isShowConversation: false,
        isShowPhoneBook: true,
      };
    case GLOBALTYPES.SHOW_INFORMATION:
      return {
        ...state,
        isShowInformation: true,
        isShowMember: false,
      };
    case GLOBALTYPES.SHOW_MEMBER:
      return {
        ...state,
        isShowInformation: false,
        isShowMember: true,
      };
    default:
      return state;
    case GLOBALTYPES.HIDE_SIDE:
      let side = action.payload;
      state[side] = false;
      return {
        ...state,
      };
  }
}
