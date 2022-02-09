import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
    userLoginReducer,
} from './reducers/userReducers'

import {
    assignmentListReducer,
} from './reducers/assignmentReducers'

import { studentDetailsReducer, studentListReducer } from './reducers/studentReducers';
;


const reducer = combineReducers({
    userLogin: userLoginReducer,

    assignmentList: assignmentListReducer,
    studentList: studentListReducer,
    studentDetails: studentDetailsReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const assignmentsFromStorage = localStorage.getItem('assignments') ?
    JSON.parse(localStorage.getItem('assignments')) : null


const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware),
    
    ))

export default store