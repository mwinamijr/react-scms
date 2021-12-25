import {
    ASSIGNMENT_LIST_REQUEST, ASSIGNMENT_LIST_SUCCESS, ASSIGNMENT_LIST_FAIL, ASSIGNMENT_LIST_RESET,
    ASSIGNMENT_DETAIL_START, ASSIGNMENT_DETAILS_SUCCESS, ASSIGNMENT_DETAILS_FAIL, ASSIGNMENT_DETAILS_RESET,
    ASSIGNMENT_CREATE_REQUEST, ASSIGNMENT_CREATE_SUCCESS, ASSIGNMENT_CREATE_FAIL, ASSIGNMENT_CREATE_RESET,
    ASSIGNMENT_UPDATE_REQUEST, ASSIGNMENT_UPDATE_SUCCESS, ASSIGNMENT_UPDATE_FAIL, ASSIGNMENT_UPDATE_RESET, 
    ASSIGNMENT_DELETE_REQUEST, ASSIGNMENT_DELETE_SUCCESS, ASSIGNMENT_DELETE_FAIL
} from '../constants/assignmentConstants'

const initialState = {
  assignments: [],
  currentAssignment: {},
  error: null,
  loading: false
};

export const assignmentListReducer = (state = { assignments : [] }, action) => {
  switch (action.type) {
    case ASSIGNMENT_LIST_REQUEST:
      return { loading: true }

    case ASSIGNMENT_LIST_SUCCESS:
      return { loading: false, assignments: action.payload }

    case ASSIGNMENT_LIST_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}
 /*
const getASNTListSuccess = (state, action) => {
  return updateObject(state, {
    assignments: action.assignments,
    error: null,
    loading: false
  });
};

const getASNTListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const getASNTDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getASNTDetailSuccess = (state, action) => {
  return updateObject(state, {
    currentAssignment: action.assignment,
    error: null,
    loading: false
  });
};

const getASNTDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const createASNTStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createASNTSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createASNTFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};
*/
