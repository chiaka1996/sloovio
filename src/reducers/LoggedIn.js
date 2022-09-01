const loggedReducer = (state = false, action) => {
    switch (action.type) {
        case 'LOGIN-STATUS':
            return action.payload;

        default:
            return state;
    }
};

export default loggedReducer;