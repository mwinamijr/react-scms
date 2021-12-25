import axios from "axios";
import {
    ASSIGNMENT_LIST_REQUEST, ASSIGNMENT_LIST_SUCCESS, ASSIGNMENT_LIST_FAIL, ASSIGNMENT_LIST_RESET,
    ASSIGNMENT_DETAIL_START, ASSIGNMENT_DETAILS_SUCCESS, ASSIGNMENT_DETAILS_FAIL, ASSIGNMENT_DETAILS_RESET,
    ASSIGNMENT_CREATE_REQUEST, ASSIGNMENT_CREATE_SUCCESS, ASSIGNMENT_CREATE_FAIL, ASSIGNMENT_CREATE_RESET,
    ASSIGNMENT_UPDATE_REQUEST, ASSIGNMENT_UPDATE_SUCCESS, ASSIGNMENT_UPDATE_FAIL, ASSIGNMENT_UPDATE_RESET, 
    ASSIGNMENT_DELETE_REQUEST, ASSIGNMENT_DELETE_SUCCESS, ASSIGNMENT_DELETE_FAIL
} from '../constants/assignmentConstants'

const getASNTListStart = () => {
  return {
    type: actionTypes.GET_ASSIGNMENT_LIST_START
  };
};

export const assignmentList = () => async (dispatch) => {
    try {
        dispatch({
            type: ASSIGNMENT_LIST_REQUEST
        })

        const { data } = await axios.get(
            'http://127.0.0.1:8000/api/assignments/',
        )

        dispatch({
            type: ASSIGNMENT_LIST_SUCCESS,
            payload: data
        })

        localStorage.setItem('assignments', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: ASSIGNMENT_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



const getASNTListSuccess = assignments => {
  return {
    type: actionTypes.GET_ASSIGNMENTS_LIST_SUCCESS,
    assignments
  };
};

const getASNTListFail = error => {
  return {
    type: actionTypes.GET_ASSIGNMENTS_LIST_FAIL,
    error: error
  };
};

export const getASNTS = token => {
  return dispatch => {
    dispatch(getASNTListStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    axios
      .get("http://127.0.0.1:8000/assignments/")
      .then(res => {
        const assignments = res.data;
        dispatch(getASNTListSuccess(assignments));
      })
      .catch(err => {
        dispatch(getASNTListFail());
      });
  };
};

const getASNTDetailStart = () => {
  return {
    type: actionTypes.GET_ASSIGNMENT_DETAIL_START
  };
};

const getASNTDetailSuccess = assignment => {
  return {
    type: actionTypes.GET_ASSIGNMENT_DETAIL_SUCCESS,
    assignment
  };
};

const getASNTDetailFail = error => {
  return {
    type: actionTypes.GET_ASSIGNMENT_DETAIL_FAIL,
    error: error
  };
};

export const getASNTSDetail = (token, id) => {
  return dispatch => {
    dispatch(getASNTDetailStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    axios
      .get(`http://127.0.0.1:8000/assignments/${id}/`)
      .then(res => {
        const assignment = res.data;
        dispatch(getASNTDetailSuccess(assignment));
      })
      .catch(err => {
        dispatch(getASNTDetailFail());
      });
  };
};

const createASNTStart = () => {
  return {
    type: actionTypes.CREATE_ASSIGNMENT_START
  };
};

const createASNTSuccess = assignment => {
  return {
    type: actionTypes.CREATE_ASSIGNMENT_SUCCESS,
    assignment
  };
};

const createASNTFail = error => {
  return {
    type: actionTypes.CREATE_ASSIGNMENT_FAIL,
    error: error
  };
};

export const createASNT = (token, asnt) => {
  return dispatch => {
    dispatch(createASNTStart());
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    axios
      .post(`http://127.0.0.1:8000/assignments/`, asnt)
      .then(res => {
        dispatch(createASNTSuccess());
      })
      .catch(err => {
        dispatch(createASNTFail());
      });
  };
};
