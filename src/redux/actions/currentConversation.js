import * as api from "../../api";
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

export const addMembersToGroup = (data2,socket) => async (dispatch) => {
    try{
        const { data } = await api.addMemberGroup(data2);
        dispatch({type: GLOBALTYPES.UPDATEMEMBER, data})
    } catch (error) {
        console.log(error);
    }
}