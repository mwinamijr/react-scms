import axios from "axios";
import {
    STUDENT_LIST_REQUEST, STUDENT_LIST_SUCCESS, STUDENT_LIST_FAIL, 
    STUDENT_DETAILS_REQUEST, STUDENT_DETAILS_SUCCESS, STUDENT_DETAILS_FAIL, 
    STUDENT_CREATE_REQUEST, STUDENT_CREATE_SUCCESS, STUDENT_CREATE_FAIL,
    STUDENT_BULK_CREATE_REQUEST, STUDENT_BULK_CREATE_SUCCESS, STUDENT_BULK_CREATE_FAIL, 
    /*STUDENT_LIST_RESET, STUDENT_DETAILS_RESET, STUDENT_CREATE_RESET,
    STUDENT_UPDATE_REQUEST, STUDENT_UPDATE_SUCCESS, STUDENT_UPDATE_FAIL, STUDENT_UPDATE_RESET, 
    STUDENT_DELETE_REQUEST, STUDENT_DELETE_SUCCESS, STUDENT_DELETE_FAIL*/
} from '../constants/studentConstants'

export const listStudents = () => async (dispatch, getState) => {
    try {
        dispatch({ type: STUDENT_LIST_REQUEST })
        
        const {
            userLogin: { userInfo},
        } = getState()

        const config = {
            headers : {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get('http://127.0.0.1:8000/api/sis/students/', config)

        dispatch({
            type: STUDENT_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: STUDENT_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const studentsDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: STUDENT_DETAILS_REQUEST })

        const {
            userLogin: { userInfo},
        } = getState()

        const config = {
            headers : {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`http://127.0.0.1:8000/api/sis/students/${id}`, config)

        dispatch({
            type: STUDENT_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: STUDENT_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const createStudent = (
    firstName, middleName, lastName, 
    admissionNumber, gradeLevel, classLevel, 
    birthday, gradDate,
    region, city, street,
    stdViiNumber, premsNumber, sex) => async (dispatch, getState) => {
    try {
        dispatch({
            type: STUDENT_CREATE_REQUEST
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

        const { data } = await axios.post(
        'http://127.0.0.1:8000/api/sis/students/',{
        "first_name": firstName, 
        "middle_name": middleName, 
        "last_name": lastName, 
        "admission_number": admissionNumber, 
        "grade_level": gradeLevel, 
        "class_level" : classLevel, 
        "birthday": birthday, 
        "grad_date": gradDate, 
        "region": region,
        "city": city,
        "street": street,
        "std_vii_number": stdViiNumber,
        "prems_number": premsNumber,
        "sex": sex
        },
        config
        )
        console.log(data)
        dispatch({
            type: STUDENT_CREATE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: STUDENT_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const bulkCreateStudents = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: STUDENT_BULK_CREATE_REQUEST
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

        const { data } = await axios.post(
        'http://127.0.0.1:8000/api/sis/upload/:filename/',{},
        config
        )
        console.log(data)
        dispatch({
            type: STUDENT_BULK_CREATE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: STUDENT_BULK_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}