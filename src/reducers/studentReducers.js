import {
    STUDENT_LIST_REQUEST, STUDENT_LIST_SUCCESS, STUDENT_LIST_FAIL, /*STUDENT_LIST_RESET,
    STUDENT_DETAIL_START, STUDENT_DETAILS_SUCCESS, STUDENT_DETAILS_FAIL, STUDENT_DETAILS_RESET,
    STUDENT_CREATE_REQUEST, STUDENT_CREATE_SUCCESS, STUDENT_CREATE_FAIL, STUDENT_CREATE_RESET,
    STUDENT_UPDATE_REQUEST, STUDENT_UPDATE_SUCCESS, STUDENT_UPDATE_FAIL, STUDENT_UPDATE_RESET, 
    STUDENT_DELETE_REQUEST, STUDENT_DELETE_SUCCESS, STUDENT_DELETE_FAIL*/
} from '../constants/studentConstants'

export const studentListReducer = (state = { students: [] }, action) => {
    switch (action.type) {
        case STUDENT_LIST_REQUEST:
            return { loading: true, students: [] }

        case STUDENT_LIST_SUCCESS:
            return {
                loading: false,
                students: action.payload,
            }

        case STUDENT_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}