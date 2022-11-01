import { GLOBALTYPES } from "../../constants/actionType";

const initState = {
    data : null
  }  

export default (state = initState, action) => {
    switch (action.type) {
        case GLOBALTYPES.ADDDATAOTP:
            return action?.data;
       default:
            return state;
    }
    
}