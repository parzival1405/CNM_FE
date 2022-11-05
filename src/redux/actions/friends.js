
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

export const requestAddFriend = (userResult) => async (dispatch) => {
    try{
        const data = {
            userId: userResult._id,
          };
        await api.requestAddFriend(data);
    } catch (error) {
        console.log(error);
    }
}

export const acceptAddFriend = (data2) => async (dispatch) => {
    try{
        const {data} = await api.acceptFriend(data2);
        dispatch({
            type: GLOBALTYPES.UPDATEPROFILE,
            data,
          });
    } catch (error) {
        console.log(error);
    }
}

export const deniedAddFriend = (data2) => async (dispatch) => {
    try{
        const {data} = await api.deniedFriend(data2);
        dispatch({
            type: GLOBALTYPES.UPDATEPROFILE,
            data,
          });
    } catch (error) {
        console.log(error);
    }
}

export const deleteFriend = (data2) => async (dispatch) => {
    try{
        const {data} = await api.deleteFriend(data2);
        dispatch({
            type: GLOBALTYPES.UPDATEPROFILE,
            data,
          });
    } catch (error) {
        console.log(error);
    }
}
