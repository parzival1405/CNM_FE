import { GLOBALTYPES
} from '../../constants/actionType';

const initialState = { isLoading: true, currentConversation: null,isRoom:false };

export default (state = initialState, action) => {
  switch (action.type) {
    case GLOBALTYPES.CURRENTCONVERSATION:
      console.log(action.data)
      return {
        ...state,
        currentConversation: action?.data,
        isRoom:action?.data.member.length > 2
      };
    default:
      return state;
  }
};