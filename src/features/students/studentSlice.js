import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const djangoUrl = "http://127.0.0.1:8000";

// Async thunk for fetching the student list with pagination
export const listStudents = createAsyncThunk(
  "student/listStudents",
  async ({ page = 1 }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${djangoUrl}/api/sis/students/?page=${page}`
      );
      return response.data; // This should include pagination metadata and the results list
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
      );
    }
  }
);

export const studentDetails = createAsyncThunk(
  "student/details",
  async (id, { getState, rejectWithValue }) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(
        `${djangoUrl}/api/sis/students/${id}`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
      );
    }
  }
);

export const createStudent = createAsyncThunk(
  "student/create",
  async (studentData, { getState, rejectWithValue }) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        `${djangoUrl}/api/sis/students/`,
        studentData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
      );
    }
  }
);

export const bulkCreateStudents = createAsyncThunk(
  "student/bulkCreate",
  async (filename, { getState, rejectWithValue }) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        `${djangoUrl}/api/sis/upload/${filename}/`, // Corrected URL format
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
      );
    }
  }
);

// Slice for Student State Management
const studentSlice = createSlice({
  name: "student",
  initialState: {
    students: [],
    pagination: {
      count: 0, // Total number of students
      next: null, // URL for the next page
      previous: null, // URL for the previous page
    },
    student: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // List Students
      .addCase(listStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload.results;
        state.pagination = {
          count: action.payload.count,
          next: action.payload.next,
          previous: action.payload.previous,
        }; // Set pagination metadata
      })
      .addCase(listStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Student Details
      .addCase(studentDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(studentDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.student = action.payload;
      })
      .addCase(studentDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Student
      .addCase(createStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.student = action.payload;
      })
      .addCase(createStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Bulk Create Students
      .addCase(bulkCreateStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bulkCreateStudents.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(bulkCreateStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export Reducer
export default studentSlice.reducer;
