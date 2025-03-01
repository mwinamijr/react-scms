import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { djangoUrl } from "../utils";
import { getErrorMessage } from "../utils";

// Async thunk for fetching the student list with advanced search and pagination
export const listStudents = createAsyncThunk(
  "student/listStudents",
  async (
    { first_name = "", middle_name = "", last_name = "", class_level = "" },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(
        `${djangoUrl}/api/sis/students/?first_name=${first_name}&middle_name=${middle_name}&last_name=${last_name}&class_level=${class_level}`
      );
      return response.data; // Includes pagination metadata and the student results
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const studentDetails = createAsyncThunk(
  "student/details",
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
        `${djangoUrl}/api/sis/students/${id}/`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const createStudent = createAsyncThunk(
  "student/create",
  async (studentData, { getState, rejectWithValue }) => {
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
        `${djangoUrl}/api/sis/students/`,
        studentData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const bulkCreateStudents = createAsyncThunk(
  "student/bulkCreate",
  async (file, { getState, rejectWithValue }) => {
    try {
      const {
        getUsers: { userInfo },
      } = getState();

      // Create FormData and append the file
      const formData = new FormData();
      formData.append("file", file);

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        `${djangoUrl}/api/sis/students/bulk-upload/`,
        formData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const deleteStudent = createAsyncThunk(
  "student/delete",
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
      await axios.delete(`${djangoUrl}/api/sis/students/${id}/`, config);
      return id; // Return studentId to allow removal from state
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const updateStudent = createAsyncThunk(
  "student/update",
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
        `${djangoUrl}/api/sis/students/${id}/`,
        values,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Slice for Student State Management
const studentSlice = createSlice({
  name: "students",
  initialState: {
    students: [], // List of students
    search: "", // Search term for dynamic search
    student: null, // Individual student details
    loading: false, // Loading state
    error: null, // Error state
    createdStudent: null,
    successCreate: false,
    loadingCreate: false,
    errorCreate: null,
  },
  reducers: {
    resetCreateState: (state) => {
      state.successCreate = false;
      state.createdStudent = null;
      state.errorCreate = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // List Students
      .addCase(listStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
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
        state.loadingCreate = true;
        state.errorCreate = null;
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.loadingCreate = false;
        state.successCreate = true;
        state.createdStudent = action.payload;
      })
      .addCase(createStudent.rejected, (state, action) => {
        state.loadingCreate = false;
        state.errorCreate = action.payload;
      })
      // Bulk Create Students
      .addCase(bulkCreateStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bulkCreateStudents.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(bulkCreateStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Student
      .addCase(deleteStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.students = state.students.filter(
          (student) => student.id !== action.payload
        );
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Student
      .addCase(updateStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.student = action.payload;
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCreateState } = studentSlice.actions;

// Export reducer
export default studentSlice.reducer;
