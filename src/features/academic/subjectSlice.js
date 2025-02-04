import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const djangoUrl = "http://127.0.0.1:8000";

const getErrorMessage = (error) => {
  if (error.response) {
    if (error.response.data) {
      if (typeof error.response.data === "string") {
        return error.response.data; // Handle string errors
      } else if (error.response.data.detail) {
        return error.response.data.detail; // Handle DRF 'detail' key
      } else {
        return JSON.stringify(error.response.data); // Convert object errors to string
      }
    }
  }
  return error.message || "An unknown error occurred";
};

// Thunks for Subject Actions
export const getSubjectDetails = createAsyncThunk(
  "subject/details",
  async (id, { getState, rejectWithValue }) => {
    try {
      const {
        getUsers: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(
        `${djangoUrl}/api/academic/subjects/${id}/`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const listSubjects = createAsyncThunk(
  "subject/list",
  async (_, { getState, rejectWithValue }) => {
    try {
      const {
        getUsers: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(
        `${djangoUrl}/api/academic/subjects/`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const createSubject = createAsyncThunk(
  "subject/create",
  async (subjectData, { getState, rejectWithValue }) => {
    try {
      const {
        getUsers: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        `${djangoUrl}/api/academic/subjects/`,
        subjectData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const deleteSubject = createAsyncThunk(
  "subject/delete",
  async (id, { getState, rejectWithValue }) => {
    try {
      const {
        getUsers: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.delete(`${djangoUrl}/api/academic/subjects/${id}/`, config);
      return id; // Return subjectId to allow removal from state
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const updateSubject = createAsyncThunk(
  "subject/update",
  async ({ id, ...values }, { getState, rejectWithValue }) => {
    try {
      const {
        getUsers: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `${djangoUrl}/api/academic/subjects/${id}/`,
        values,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Slice for Subject State Management
const subjectSlice = createSlice({
  name: "subject",
  initialState: {
    subject: null,
    subjects: [],
    loading: false,
    error: null,
    createdSubject: null,
    successCreate: false,
    loadingCreate: false,
    errorCreate: null,
  },
  reducers: {
    resetCreateState: (state) => {
      state.successCreate = false;
      state.createdSubject = null;
      state.errorCreate = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Subject Details
      .addCase(getSubjectDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSubjectDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.subject = action.payload;
      })
      .addCase(getSubjectDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // List Subjects
      .addCase(listSubjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listSubjects.fulfilled, (state, action) => {
        state.loading = false;
        state.subjects = action.payload;
      })
      .addCase(listSubjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Subject
      .addCase(createSubject.pending, (state) => {
        state.loadingCreate = true;
        state.errorCreate = null;
      })
      .addCase(createSubject.fulfilled, (state, action) => {
        state.loadingCreate = false;
        state.successCreate = true;
        state.createdSubject = action.payload;
      })
      .addCase(createSubject.rejected, (state, action) => {
        state.loadingCreate = false;
        state.errorCreate = action.payload;
      })
      // Delete Subject
      .addCase(deleteSubject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSubject.fulfilled, (state, action) => {
        state.loading = false;
        state.subjects = state.subjects.filter(
          (subject) => subject.id !== action.payload
        );
      })
      .addCase(deleteSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Subject
      .addCase(updateSubject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSubject.fulfilled, (state, action) => {
        state.loading = false;
        state.subject = action.payload;
      })
      .addCase(updateSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export Reducer
export const { resetCreateState } = subjectSlice.actions;
export default subjectSlice.reducer;
