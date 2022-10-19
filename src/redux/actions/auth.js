
import * as api from '../../api'
import { GLOBALTYPES
} from '../../constants/actionType';

export const signup = (formData,navigate) => async (dispatch) => {
    try{
        const { data } = await api.signUp(formData);
        dispatch({type: GLOBALTYPES.AUTH, data})
        navigate('/')
    } catch (error) {
        alert(error.response.data.message)
    }
}

export const signin = (formData,navigate) => async (dispatch) =>  {
    try{
        const { data } = await api.signIn(formData);    
        dispatch({type: GLOBALTYPES.AUTH, data})
        navigate('/')
    } catch (error) {
        alert(error.response.data.message)
    }
}

export const logout = (navigate) => async (dispatch) =>  {
    try{ 
        dispatch({type: GLOBALTYPES.LOGOUT})
        navigate('/auth')
    } catch (error) {
        console.log(error);
    }
}