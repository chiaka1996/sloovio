
const loginDetails= (state = {}, action) => {
    switch(action.type){

        case "LOGIN-DETAILS" :
            return action.payload
        
            default : 
            return state;
    }
} 

export default loginDetails;