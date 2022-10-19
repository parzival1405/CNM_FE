
import { GLOBALTYPES
} from '../../constants/actionType';

export const setCurrentConversation = (currentConversation) => async (dispatch) => {
    try{
        dispatch({type: GLOBALTYPES.CURRENTCONVERSATION, data:currentConversation})
    } catch (error) {
        console.log(error);
    }
}