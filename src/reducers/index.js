import details from './LoginDetails';
import loggedIn from './LoggedIn';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    details,
    loggedIn,

})

export default allReducers;
