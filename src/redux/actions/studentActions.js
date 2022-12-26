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

const djangoUrl = 'http://127.0.0.1:8000'
const nodeUrl = 'http://localhost:4001'

export const listStudents = () => async (dispatch, getState) => {
    try {
        
        const {
            userLogin: { userInfo},
        } = getState()

        const config = {
            headers : {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`${nodeUrl}/api/students/`, config)

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

export const studentsDetails = (studentId) => async (dispatch, getState) => {
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

        const { data } = await axios.get(`${nodeUrl}/api/students/${studentId}`, config)

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
    firstName, middleName, lastName, admissionNumber, classLevel, birthday, 
    region, city, street, parentContact, stdViiNumber, premsNumber, gender ) => async (dispatch, getState) => {
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
        `${nodeUrl}/api/students/addstudent`,{
        "firstName": firstName, 
        "middleName": middleName, 
        "lastName": lastName, 
        "addmissionNumber": Number(admissionNumber),
        "classLevel": classLevel,
        address: {
            "region": region,
            "city": city,
            "street": street,
            },
        "stdViiNumber": stdViiNumber,
        "premsNumber": premsNumber,
        "birthday": birthday,
        "gender": gender,
        "parentContact": parentContact
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

export const bulkCreateStudents = (filename) => async (dispatch, getState) => {
    try {
        dispatch({
            type: STUDENT_BULK_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }

        const { data } = await axios.post(
        `${nodeUrl}/api/sis/upload/:${filename}/`,
        config
        )

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