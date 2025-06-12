import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { djangoUrl } from "../utils";
import { getErrorMessage } from "../utils";
import type { RootState } from "../../app/store";

// Interfaces
export interface Student {
  id: number;
  [key: string]: any;
}

interface StudentsState {
  students: Student[];
  student: Student | null;
  loading: boolean;
  error: string | null;

  createdStudent: Student | null;
  successCreate: boolean;
  loadingCreate: boolean;
  errorCreate: string | null;

  uploadProgress: number;
  uploadMessage: string;
  updatedStudents: Student[];
  uploadError: string;
  notCreatedStudents: Student[];
  skippedStudents: Student[];
}

interface BulkUploadResponse {
  message: string;
  updated_students?: Student[];
  not_created?: Student[];
  skipped_students?: Student[];
}

// Async Thunks

export const listStudents = createAsyncThunk<
  Student[],
  Record<string, any>,
  { state: RootState; rejectValue: string }
>("student/listStudents", async (filters = {}, thunkAPI) => {
  try {
    const { getState } = thunkAPI;
    const {
      getUsers: { userInfo },
    } = getState() as { getUsers: { userInfo: { token: string } } };

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      params: filters,
    };

    const response = await axios.get(`${djangoUrl}/api/sis/students/`, config);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const studentDetails = createAsyncThunk<
  Student,
  number,
  { state: RootState; rejectValue: string }
>("student/details", async (id, thunkAPI) => {
  try {
    const { getState } = thunkAPI;
    const {
      getUsers: { userInfo },
    } = getState() as { getUsers: { userInfo: { token: string } } };

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
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const createStudent = createAsyncThunk<
  Student,
  Partial<Student>,
  { state: RootState; rejectValue: string }
>("student/create", async (studentData, thunkAPI) => {
  try {
    const { getState } = thunkAPI;
    const {
      getUsers: { userInfo },
    } = getState() as { getUsers: { userInfo: { token: string } } };

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
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const bulkCreateStudents = createAsyncThunk<
  BulkUploadResponse,
  File,
  { state: RootState; rejectValue: string }
>("student/bulkCreate", async (file, thunkAPI) => {
  try {
    const { getState, dispatch } = thunkAPI;
    const {
      getUsers: { userInfo },
    } = getState() as { getUsers: { userInfo: { token: string } } };

    const formData = new FormData();
    formData.append("file", file);

    const config = {
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.token}`,
      },
      onUploadProgress: (e: ProgressEvent) => {
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
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const deleteStudent = createAsyncThunk<
  number,
  number,
  { state: RootState; rejectValue: string }
>("student/delete", async (id, thunkAPI) => {
  try {
    const { getState } = thunkAPI;
    const {
      getUsers: { userInfo },
    } = getState() as { getUsers: { userInfo: { token: string } } };

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`${djangoUrl}/api/sis/students/${id}/`, config);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const updateStudent = createAsyncThunk<
  Student,
  { id: number } & Partial<Student>,
  { state: RootState; rejectValue: string }
>("student/update", async ({ id, ...values }, thunkAPI) => {
  try {
    const { getState } = thunkAPI;
    const {
      getUsers: { userInfo },
    } = getState() as { getUsers: { userInfo: { token: string } } };

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
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

// Slice

const initialState: StudentsState = {
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
};

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    resetCreateState: (state) => {
      state.successCreate = false;
      state.createdStudent = null;
      state.errorCreate = null;
    },
    updateUploadProgress: (state, action: PayloadAction<number>) => {
      state.uploadProgress = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        listStudents.fulfilled,
        (state, action: PayloadAction<Student[]>) => {
          state.loading = false;
          state.students = action.payload;
        }
      )
      .addCase(listStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
      })
      .addCase(studentDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        studentDetails.fulfilled,
        (state, action: PayloadAction<Student>) => {
          state.loading = false;
          state.student = action.payload;
        }
      )
      .addCase(studentDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
      })
      .addCase(createStudent.pending, (state) => {
        state.loadingCreate = true;
        state.errorCreate = null;
      })
      .addCase(
        createStudent.fulfilled,
        (state, action: PayloadAction<Student>) => {
          state.loadingCreate = false;
          state.successCreate = true;
          state.createdStudent = action.payload;
        }
      )
      .addCase(createStudent.rejected, (state, action) => {
        state.loadingCreate = false;
        state.errorCreate = action.payload || null;
      })
      .addCase(bulkCreateStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        bulkCreateStudents.fulfilled,
        (state, action: PayloadAction<BulkUploadResponse>) => {
          state.loading = false;
          state.uploadMessage = action.payload.message;
          state.updatedStudents = action.payload.updated_students || [];
          state.notCreatedStudents = action.payload.not_created || [];
          state.skippedStudents = action.payload.skipped_students || [];
        }
      )
      .addCase(bulkCreateStudents.rejected, (state, action) => {
        state.loading = false;
        state.uploadError =
          action.payload || "Upload failed. Please try again.";
      })
      .addCase(deleteStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteStudent.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.loading = false;
          state.students = state.students.filter(
            (student) => student.id !== action.payload
          );
        }
      )
      .addCase(deleteStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
      })
      .addCase(updateStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateStudent.fulfilled,
        (state, action: PayloadAction<Student>) => {
          state.loading = false;
          state.student = action.payload;
        }
      )
      .addCase(updateStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
      });
  },
});

export const { resetCreateState, updateUploadProgress } = studentSlice.actions;
export default studentSlice.reducer;
