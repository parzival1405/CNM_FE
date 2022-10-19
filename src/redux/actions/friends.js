
import * as api from '../../api'
import { GLOBALTYPES
} from '../../constants/actionType';

export const getAllYourFriends = (navigate) => async (dispatch) => {
    try{
        dispatch({ type : GLOBALTYPES.START_LOADING})
        const { data } = await api.getAllFriends();
        dispatch({type: GLOBALTYPES.GETALLYOURFRIENDS, data})
        dispatch({ type : GLOBALTYPES.END_LOADING})
    } catch (error) {
        console.log(error);
    }
}
