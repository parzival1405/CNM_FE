
import * as api from '../../api'
import { GLOBALTYPES
} from '../../constants/actionType';

export const getAllYourConversations = (navigate) => async (dispatch) => {
    try{
        dispatch({ type : GLOBALTYPES.START_LOADING})
        const { data } = await api.getAllConversations();
        dispatch({type: GLOBALTYPES.GETALLCONVERSATION, data})
        dispatch({ type : GLOBALTYPES.END_LOADING})
    } catch (error) {
        console.log(error);
    }
}
