import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer,
} from './reducers/userReducers'

import {
    assignmentListReducer,
} from './reducers/assignmentReducers'

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,

    assignment: assignmentListReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const assignmentsFromStorage = localStorage.getItem('assgnments') ?
    JSON.parse(localStorage.getItem('assgnments')) : null


const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
    assignments: { assignments: assignmentsFromStorage },
}

const middleware = [thunk]

const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware),
    
    ))

export default store