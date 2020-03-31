import { combineReducers } from 'redux';
import  timerReducer  from './timerReducer';
import { drawerToggleReducer } from './drawerToggleReducer';

const rootReducer = combineReducers({
    timer: timerReducer,
    drawer: drawerToggleReducer
});

export default rootReducer;