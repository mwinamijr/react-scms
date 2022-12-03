import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
    userLoginReducer, userListReducer,
} from './redux/reducers/userReducers'

import {
    assignmentListReducer,
} from './redux/reducers/assignmentReducers'

import { studentDetailsReducer, studentListReducer, studentCreateReducer, studentsBulkCreateReducer } from './redux/reducers/studentReducers';

import {
    receiptListReducer, receiptDetailsReducer, receiptCreateReducer,
    paymentListReducer, paymentDetailsReducer, paymentCreateReducer
    
} from './redux/reducers/financeReducers'

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userList: userListReducer,

    assignmentList: assignmentListReducer,
    studentList: studentListReducer,
    studentDetails: studentDetailsReducer,
    studentCreate: studentCreateReducer,
    studentsBulkCreate: studentsBulkCreateReducer,

    receiptList: receiptListReducer,
    receiptDetails: receiptDetailsReducer,
    receiptCreate: receiptCreateReducer,

    paymentList: paymentListReducer,
    paymentDetails: paymentDetailsReducer,
    paymentCreate: paymentCreateReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null
/*
const assignmentsFromStorage = localStorage.getItem('assignments') ?
    JSON.parse(localStorage.getItem('assignments')) : null
*/

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware),
    
    ))

export default store