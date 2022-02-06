import axios from "axios";
import {
    STUDENT_LIST_REQUEST, STUDENT_LIST_SUCCESS, STUDENT_LIST_FAIL, /*STUDENT_LIST_RESET,
    STUDENT_DETAIL_START, STUDENT_DETAILS_SUCCESS, STUDENT_DETAILS_FAIL, STUDENT_DETAILS_RESET,
    STUDENT_CREATE_REQUEST, STUDENT_CREATE_SUCCESS, STUDENT_CREATE_FAIL, STUDENT_CREATE_RESET,
    STUDENT_UPDATE_REQUEST, STUDENT_UPDATE_SUCCESS, STUDENT_UPDATE_FAIL, STUDENT_UPDATE_RESET, 
    STUDENT_DELETE_REQUEST, STUDENT_DELETE_SUCCESS, STUDENT_DELETE_FAIL*/
} from '../constants/studentConstants'

export const listStudents = () => async (dispatch) => {
    try {
        dispatch({ type: STUDENT_LIST_REQUEST })

        const { data } = await axios.get('http://127.0.0.1:8000/api/sis/students/')

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