import { GLOBALTYPES } from "../../constants/actionType";

const initialState = { isLoading: true, conversations: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case GLOBALTYPES.GETALLCONVERSATION:
      return {
        ...state,
        conversations: action?.data,
      };
    case GLOBALTYPES.POST_CONVERSATION:
      return {
        ...state,
        conversations: [action?.data, ...state.conversations],
      };
    case GLOBALTYPES.UPDATE_COUNT_WAITING_MESSAGE: {
      let conversationSend = state.conversations.find(
        (convers) => convers._id === action?.payload._id
      );
      let count_waiting_msg = conversationSend.count_waiting_msg
        ? conversationSend.count_waiting_msg + 1
        : 1;
      conversationSend = {
        ...conversationSend,
        count_waiting_msg,
      };
      return {
        ...state,
        conversations: state.conversations.map((conver) =>
          conver._id == conversationSend._id ? conversationSend : conver
        ),
      };
    }
    case GLOBALTYPES.REMOVE_COUNT_WAITING_MESSAGE: {
      let conversationSend = state.conversations.find(
        (convers) => convers._id === action?.payload._id
      );
      if (conversationSend) {
        conversationSend = {
          ...conversationSend,
          count_waiting_msg : undefined,
        };
      }
      return {
        ...state,
        conversations: state.conversations.map((conver) =>
          conver._id == conversationSend._id ? conversationSend : conver
        ),
      };
    }
    case GLOBALTYPES.UPDATE_LAST_MSG_CONVERSATION: {
      const msg = action.payload.data;
      let conversationSend = state.conversations.find(
        (convers) => convers._id === action?.payload.conversation._id
      );
      if (conversationSend) {
        conversationSend = {
          ...conversationSend,
          lastMessage: msg,
        };
      }
      return {
        ...state,
        conversations: state.conversations.map((conver) =>
          conver._id == conversationSend._id ? conversationSend : conver
        ),
      };
    }
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
