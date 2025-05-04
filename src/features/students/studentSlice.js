import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { djangoUrl } from "../utils";
import { getErrorMessage } from "../utils";

export const listStudents = createAsyncThunk(
  "student/listStudents",
  async (filters = {}, { getState, rejectWithValue }) => {
    try {
      const {
        getUsers: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
        params: filters,
      };
      const response = await axios.get(
        `${djangoUrl}/api/sis/students/`,
        config
      );
      return response.data;
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
  async (file, { getState, rejectWithValue, dispatch }) => {
    try {
      const {
        getUsers: { userInfo },
      } = getState();

      const formData = new FormData();
      formData.append("file", file);

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
        onUploadProgress: (e) => {
          const percent = Math.round((e.loaded * 100) / e.total);
          dispatch(updateUploadProgress(percent));
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
      return id;
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

const studentSlice = createSlice({
  name: "students",
  initialState: {
    students: [],
    student: null,
    loading: false,
    error: null,
    createdStudent: null,
    successCreate: false,
    loadingCreate: false,
    errorCreate: null,

    uploadProgress: 0,
    uploadMessage: "",
    updatedStudents: [],
    uploadError: "",
    notCreatedStudents: [],
    skippedStudents: [],
  },
  reducers: {
    resetCreateState: (state) => {
      state.successCreate = false;
      state.createdStudent = null;
      state.errorCreate = null;
    },
    updateUploadProgress: (state, action) => {
      state.uploadProgress = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
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
      .addCase(bulkCreateStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bulkCreateStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.uploadMessage = action.payload.message;
        state.updatedStudents = action.payload.updated_students || [];
        state.notCreatedStudents = action.payload.not_created || [];
        state.skippedStudents = action.payload.skipped_students || [];
      })
      .addCase(bulkCreateStudents.rejected, (state, action) => {
        state.loading = false;
        state.uploadError =
          action.payload || "Upload failed. Please try again.";
      })
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

export const { resetCreateState, updateUploadProgress } = studentSlice.actions;

export default studentSlice.reducer;
