import {
    USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS,USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_RESET,
    USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL, USER_LIST_RESET,
    USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL,
    USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_RESET,

    TEACHER_DETAILS_REQUEST, TEACHER_DETAILS_SUCCESS, TEACHER_DETAILS_FAIL, TEACHER_DETAILS_RESET,
    TEACHER_LIST_REQUEST, TEACHER_LIST_SUCCESS, TEACHER_LIST_FAIL, TEACHER_LIST_RESET,
    TEACHER_DELETE_REQUEST, TEACHER_DELETE_SUCCESS, TEACHER_DELETE_FAIL,
    TEACHER_UPDATE_REQUEST, TEACHER_UPDATE_SUCCESS, TEACHER_UPDATE_FAIL, TEACHER_UPDATE_RESET,

    ACCOUNTANT_DETAILS_REQUEST, ACCOUNTANT_DETAILS_SUCCESS, ACCOUNTANT_DETAILS_FAIL, ACCOUNTANT_DETAILS_RESET,
    ACCOUNTANT_LIST_REQUEST, ACCOUNTANT_LIST_SUCCESS, ACCOUNTANT_LIST_FAIL, ACCOUNTANT_LIST_RESET,
    ACCOUNTANT_DELETE_REQUEST, ACCOUNTANT_DELETE_SUCCESS, ACCOUNTANT_DELETE_FAIL,
    ACCOUNTANT_UPDATE_REQUEST, ACCOUNTANT_UPDATE_SUCCESS, ACCOUNTANT_UPDATE_FAIL, ACCOUNTANT_UPDATE_RESET
} from '../constants/userConstants'


export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true }

        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }

        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }

        case USER_LOGOUT:
            return {}

        default:
            return state
    }
}


export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true }

        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload }

        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload }

        case USER_LOGOUT:
            return {}

        default:
            return state
    }
}

export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return { ...state, loading: true }

        case USER_DETAILS_SUCCESS:
            return { loading: false, user: action.payload }

        case USER_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        case USER_DETAILS_RESET:
            return { user: {} }


        default:
            return state
    }
}

export const userListReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case USER_LIST_REQUEST:
            return { loading: true }

        case USER_LIST_SUCCESS:
            return { loading: false, users: action.payload }

        case USER_LIST_FAIL:
            return { loading: false, error: action.payload }

        case USER_LIST_RESET:
            return { users: [] }

        default:
            return state
    }
}


export const userDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_DELETE_REQUEST:
            return { loading: true }

        case USER_DELETE_SUCCESS:
            return { loading: false, success: true }

        case USER_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}


export const userUpdateReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return { loading: true }

        case USER_UPDATE_SUCCESS:
            return { loading: false, success: true }

        case USER_UPDATE_FAIL:
            return { loading: false, error: action.payload }

        case USER_UPDATE_RESET:
            return { user: {} }

        default:
            return state
    }
}

export const teacherDetailsReducer = (state = { teacher: {} }, action) => {
    switch (action.type) {
        case TEACHER_DETAILS_REQUEST:
            return { ...state, loading: true }

        case TEACHER_DETAILS_SUCCESS:
            return { loading: false, teacher: action.payload }

        case TEACHER_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        case TEACHER_DETAILS_RESET:
            return { teacher: {} }


        default:
            return state
    }
}

export const teacherListReducer = (state = { teachers: [] }, action) => {
    switch (action.type) {
        case TEACHER_LIST_REQUEST:
            return { loading: true }

        case TEACHER_LIST_SUCCESS:
            return { loading: false, teachers: action.payload }

        case TEACHER_LIST_FAIL:
            return { loading: false, error: action.payload }

        case TEACHER_LIST_RESET:
            return { teachers: [] }

        default:
            return state
    }
}


export const teacherDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case TEACHER_DELETE_REQUEST:
            return { loading: true }

        case TEACHER_DELETE_SUCCESS:
            return { loading: false, success: true }

        case TEACHER_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}


export const teacherUpdateReducer = (state = { teacher: {} }, action) => {
    switch (action.type) {
        case TEACHER_UPDATE_REQUEST:
            return { loading: true }

        case TEACHER_UPDATE_SUCCESS:
            return { loading: false, success: true }

        case TEACHER_UPDATE_FAIL:
            return { loading: false, error: action.payload }

        case TEACHER_UPDATE_RESET:
            return { teacher: {} }

        default:
            return state
    }
}

export const accountantDetailsReducer = (state = { accountant: {} }, action) => {
    switch (action.type) {
        case ACCOUNTANT_DETAILS_REQUEST:
            return { ...state, loading: true }

        case ACCOUNTANT_DETAILS_SUCCESS:
            return { loading: false, accountant: action.payload }

        case ACCOUNTANT_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        case ACCOUNTANT_DETAILS_RESET:
            return { accountant: {} }


        default:
            return state
    }
}

export const accountantListReducer = (state = { accountants: [] }, action) => {
    switch (action.type) {
        case ACCOUNTANT_LIST_REQUEST:
            return { loading: true }

        case ACCOUNTANT_LIST_SUCCESS:
            return { loading: false, accountants: action.payload }

        case ACCOUNTANT_LIST_FAIL:
            return { loading: false, error: action.payload }

        case ACCOUNTANT_LIST_RESET:
            return { accountants: [] }

        default:
            return state
    }
}


export const accountantDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case ACCOUNTANT_DELETE_REQUEST:
            return { loading: true }

        case ACCOUNTANT_DELETE_SUCCESS:
            return { loading: false, success: true }

        case ACCOUNTANT_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}


export const accountantUpdateReducer = (state = { accountant: {} }, action) => {
    switch (action.type) {
        case ACCOUNTANT_UPDATE_REQUEST:
            return { loading: true }

        case ACCOUNTANT_UPDATE_SUCCESS:
            return { loading: false, success: true }

        case ACCOUNTANT_UPDATE_FAIL:
            return { loading: false, error: action.payload }

        case ACCOUNTANT_UPDATE_RESET:
            return { accountant: {} }

        default:
            return state
    }
}