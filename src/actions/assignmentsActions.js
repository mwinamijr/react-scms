import axios from "axios";
import {
    ASSIGNMENT_LIST_REQUEST, ASSIGNMENT_LIST_SUCCESS, ASSIGNMENT_LIST_FAIL, /*ASSIGNMENT_LIST_RESET,
    ASSIGNMENT_DETAIL_START, ASSIGNMENT_DETAILS_SUCCESS, ASSIGNMENT_DETAILS_FAIL, ASSIGNMENT_DETAILS_RESET,
    ASSIGNMENT_CREATE_REQUEST, ASSIGNMENT_CREATE_SUCCESS, ASSIGNMENT_CREATE_FAIL, ASSIGNMENT_CREATE_RESET,
    ASSIGNMENT_UPDATE_REQUEST, ASSIGNMENT_UPDATE_SUCCESS, ASSIGNMENT_UPDATE_FAIL, ASSIGNMENT_UPDATE_RESET, 
    ASSIGNMENT_DELETE_REQUEST, ASSIGNMENT_DELETE_SUCCESS, ASSIGNMENT_DELETE_FAIL*/
} from '../constants/assignmentConstants'


export const listAssignments = () => async (dispatch) => {
  try {
      dispatch({ type: ASSIGNMENT_LIST_REQUEST })

      const { data } = await axios.get('http://127.0.0.1:8000/api/assignments/')

      dispatch({
          type: ASSIGNMENT_LIST_SUCCESS,
          payload: data
      })

  } catch (error) {
      dispatch({
          type: ASSIGNMENT_LIST_FAIL,
          payload: error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message,
      })
  }
}

