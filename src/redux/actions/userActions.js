import axios from 'axios'
import {
    USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS,USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL,
    USER_LIST_SUCCESS, USER_LIST_FAIL,
    USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL,
    USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL,

    TEACHER_DETAILS_REQUEST, TEACHER_DETAILS_SUCCESS, TEACHER_DETAILS_FAIL,
    TEACHER_LIST_SUCCESS, TEACHER_LIST_FAIL,
    TEACHER_DELETE_REQUEST, TEACHER_DELETE_SUCCESS, TEACHER_DELETE_FAIL,
    TEACHER_UPDATE_REQUEST, TEACHER_UPDATE_SUCCESS, TEACHER_UPDATE_FAIL,

    ACCOUNTANT_DETAILS_REQUEST, ACCOUNTANT_DETAILS_SUCCESS, ACCOUNTANT_DETAILS_FAIL,
    ACCOUNTANT_LIST_SUCCESS, ACCOUNTANT_LIST_FAIL,
    ACCOUNTANT_DELETE_REQUEST, ACCOUNTANT_DELETE_SUCCESS, ACCOUNTANT_DELETE_FAIL,
    ACCOUNTANT_UPDATE_REQUEST, ACCOUNTANT_UPDATE_SUCCESS, ACCOUNTANT_UPDATE_FAIL,
} from '../constants/userConstants'

const djangoUrl = 'http://127.0.0.1:8000'
//const nodeUrfl = 'http://localhost:4001'

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post(
            `${djangoUrl}/api/users/login/`,
            { 'email': email, 'password': password },
            config
        )

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
}


export const register = (
    firstName, lastName, email, phone,
    password, isTeacher, isAdmin, isAccountant) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post(
            `${djangoUrl}/api/users/register`,
            { 
                'firstName': firstName, 
                'lastName': lastName, 
                'email': email,
                'phone': phone,
                'password': password,
                'isTeacher': isTeacher,
                'isAdmin': isAdmin,
                'isAccountant': isAccountant
             },
            config
        )

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const getUserDetails = (userId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `${djangoUrl}/api/users/${userId}/`,
            config
        )

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listUsers = () => async (dispatch, getState) => {
    try {
        
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `${djangoUrl}/api/users/`,
            config
        )

        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DELETE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(
            `${djangoUrl}/api/users/delete/${id}/`,
            config
        )

        dispatch({
            type: USER_DELETE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const updateUser = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/users/update/${user._id}/`,
            user,
            config
        )

        dispatch({
            type: USER_UPDATE_SUCCESS,
        })

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const getTeacherDetails = (teacherId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: TEACHER_DETAILS_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `${djangoUrl}/api/users/teachers/${teacherId}/`,
            config
        )

        dispatch({
            type: TEACHER_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: TEACHER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listTeachers = () => async (dispatch, getState) => {
    try {
        
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `${djangoUrl}/api/users/teachers/`,
            config
        )

        dispatch({
            type: TEACHER_LIST_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: TEACHER_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const deleteTeacher = (teacherId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: TEACHER_DELETE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(
            `${djangoUrl}/api/users/teachers/delete/${teacherId}/`,
            config
        )

        dispatch({
            type: TEACHER_DELETE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: TEACHER_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const updateTeacher = (teacher) => async (dispatch, getState) => {
    try {
        dispatch({
            type: TEACHER_UPDATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/users/teachers/update/${teacher.id}/`,
            teacher,
            config
        )

        dispatch({
            type: TEACHER_UPDATE_SUCCESS,
        })

        dispatch({
            type: TEACHER_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: TEACHER_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const getAccountantDetails = (accountantId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ACCOUNTANT_DETAILS_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `${djangoUrl}/api/users/accountants/${accountantId}/`,
            config
        )

        dispatch({
            type: ACCOUNTANT_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: ACCOUNTANT_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listAccountants = () => async (dispatch, getState) => {
    try {
        
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `${djangoUrl}/api/users/accountants/`,
            config
        )

        dispatch({
            type: ACCOUNTANT_LIST_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: ACCOUNTANT_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const deleteAccountant = (accountantId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ACCOUNTANT_DELETE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(
            `${djangoUrl}/api/users/accountants/delete/${accountantId}/`,
            config
        )

        dispatch({
            type: ACCOUNTANT_DELETE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: ACCOUNTANT_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const updateAccountant = (accountant) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ACCOUNTANT_UPDATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/users/accountants/update/${accountant.id}/`,
            accountant,
            config
        )

        dispatch({
            type: ACCOUNTANT_UPDATE_SUCCESS,
        })

        dispatch({
            type: ACCOUNTANT_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: ACCOUNTANT_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}