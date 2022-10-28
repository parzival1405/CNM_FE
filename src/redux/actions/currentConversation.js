
import { GLOBALTYPES
} from '../../constants/actionType';

export const setCurrentConversation = (currentConversation) => async (dispatch) => {
    try{    
        dispatch({type: GLOBALTYPES.REMOVE_COUNT_WAITING_MESSAGE, payload:currentConversation}) 
        dispatch({type: GLOBALTYPES.CURRENTCONVERSATION, data:currentConversation})   
    } catch (error) {
        console.log(error);
    }
}

export const addMembersToGroup = (listMember,currentConversation,user) => async (dispatch) => {
    try{
        dispatch({type: GLOBALTYPES.CURRENTCONVERSATION, data:currentConversation})
    } catch (error) {
        console.log(error);
    }
}