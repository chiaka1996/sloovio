export const loginDetails = (details) => {
    return {
        type: 'LOGIN-DETAILS',
        payload: details
    }
}

export const loginStatus = (boolean) => {
    return {
        type: 'LOGIN-STATUS',
        payload: boolean
    }
}