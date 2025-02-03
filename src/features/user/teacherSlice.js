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

// Thunks for Teacher Actions
export const getTeacherDetails = createAsyncThunk(
  "teacher/details",
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
        `${djangoUrl}/api/users/teachers/${id}/`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const listTeachers = createAsyncThunk(
  "teacher/list",
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
        `${djangoUrl}/api/users/teachers/`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const deleteTeacher = createAsyncThunk(
  "teacher/delete",
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
      await axios.delete(
        `${djangoUrl}/api/users/teachers/delete/${id}/`,
        config
      );
      return id; // Return teacherId to allow removal from state
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const updateTeacher = createAsyncThunk(
  "teacher/update",
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
        `${djangoUrl}/api/users/teachers/${id}/`,
        values,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Slice for Teacher State Management
const teacherSlice = createSlice({
  name: "teacher",
  initialState: {
    teacher: null,
    teachers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Teacher Details
      .addCase(getTeacherDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTeacherDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.teacher = action.payload;
      })
      .addCase(getTeacherDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // List Teachers
      .addCase(listTeachers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listTeachers.fulfilled, (state, action) => {
        state.loading = false;
        state.teachers = action.payload;
      })
      .addCase(listTeachers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Teacher
      .addCase(deleteTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.teachers = state.teachers.filter(
          (teacher) => teacher.id !== action.payload
        );
      })
      .addCase(deleteTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Teacher
      .addCase(updateTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.teacher = action.payload;
      })
      .addCase(updateTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export Reducer
export default teacherSlice.reducer;
