import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { djangoUrl, getErrorMessage } from "../utils";
import axios from "axios";

// Interfaces for Teacher and State
interface Teacher {
  id: number;
  first_name: string;
  middle_name?: string;
  last_name: string;
  username: string;
  image?: string;
  short_name?: string;
  gender?: string;
  date_of_birth?: string;
  national_id?: string;
  tin_number?: string;
  nssf_number?: string;
  email?: string;
  phone_number?: string;
  alt_email?: string;
  address?: string;
  empId?: string;
  designation?: string;
  salary?: number;
  unpaid_salary?: number;
  subject_specialization_display: string[];
}

interface TeacherState {
  teacher: Teacher | null;
  teachers: Teacher[];
  loading: boolean;
  error: string | null;
  createdTeacher: Teacher | null;
  successCreate: boolean;
  loadingCreate: boolean;
  errorCreate: string | null;
}

export const getTeacherDetails = createAsyncThunk<
  Teacher, // Return type
  number
>("teacher/details", async (id, thunkAPI) => {
  try {
    const { getState } = thunkAPI;
    const {
      getUsers: { userInfo },
    } = getState() as { getUsers: { userInfo: { access: string } } };

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };
    const { data } = await axios.get<Teacher>(
      `${djangoUrl}/api/users/teachers/${id}/`,
      config
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const listTeachers = createAsyncThunk<Teacher[], Record<string, any>>(
  "teacher/list",
  async (_, thunkAPI) => {
    try {
      const { getState } = thunkAPI;
      const {
        getUsers: { userInfo },
      } = getState() as { getUsers: { userInfo: { access: string } } };

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.access}`,
        },
      };
      const { data } = await axios.get<Teacher[]>(
        `${djangoUrl}/api/users/teachers/`,
        config
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const createTeacher = createAsyncThunk<Teacher, Partial<Teacher>>(
  "teacher/create",
  async (teacherData, thunkAPI) => {
    try {
      const { getState } = thunkAPI;
      const {
        getUsers: { userInfo },
      } = getState() as { getUsers: { userInfo: { access: string } } };

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.access}`,
        },
      };
      const { data } = await axios.post<Teacher>(
        `${djangoUrl}/api/users/teachers/`,
        teacherData,
        config
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const bulkCreateTeachers = createAsyncThunk<
  any, // Adjust to the response type of bulk upload if known
  File
>("teacher/bulkCreate", async (file, thunkAPI) => {
  try {
    const { getState } = thunkAPI;
    const {
      getUsers: { userInfo },
    } = getState() as { getUsers: { userInfo: { access: string } } };

    const formData = new FormData();
    formData.append("file", file);

    const config = {
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };
    const { data } = await axios.post(
      `${djangoUrl}/api/users/teachers/bulk-upload/`,
      formData,
      config
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const deleteTeacher = createAsyncThunk<
  number, // Return deleted teacher ID
  number
>("teacher/delete", async (id, thunkAPI) => {
  try {
    const { getState } = thunkAPI;
    const {
      getUsers: { userInfo },
    } = getState() as { getUsers: { userInfo: { access: string } } };

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };
    await axios.delete(`${djangoUrl}/api/users/teachers/${id}/`, config);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

interface UpdateTeacherPayload {
  id: number;
  [key: string]: any;
}

export const updateTeacher = createAsyncThunk<Teacher, UpdateTeacherPayload>(
  "teacher/update",
  async ({ id, ...values }, thunkAPI) => {
    try {
      const { getState } = thunkAPI;
      const {
        getUsers: { userInfo },
      } = getState() as { getUsers: { userInfo: { access: string } } };

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.access}`,
        },
      };
      const { data } = await axios.put<Teacher>(
        `${djangoUrl}/api/users/teachers/${id}/`,
        values,
        config
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

// Slice initial state with type
const initialState: TeacherState = {
  teacher: null,
  teachers: [],
  loading: false,
  error: null,
  createdTeacher: null,
  successCreate: false,
  loadingCreate: false,
  errorCreate: null,
};

const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {
    resetCreateState: (state) => {
      state.successCreate = false;
      state.createdTeacher = null;
      state.errorCreate = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Teacher Details
      .addCase(getTeacherDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getTeacherDetails.fulfilled,
        (state, action: PayloadAction<Teacher>) => {
          state.loading = false;
          state.teacher = action.payload;
        }
      )
      .addCase(getTeacherDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // List Teachers
      .addCase(listTeachers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        listTeachers.fulfilled,
        (state, action: PayloadAction<Teacher[]>) => {
          state.loading = false;
          state.teachers = action.payload;
        }
      )
      .addCase(listTeachers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create Teacher
      .addCase(createTeacher.pending, (state) => {
        state.loadingCreate = true;
        state.errorCreate = null;
      })
      .addCase(
        createTeacher.fulfilled,
        (state, action: PayloadAction<Teacher>) => {
          state.loadingCreate = false;
          state.successCreate = true;
          state.createdTeacher = action.payload;
        }
      )
      .addCase(createTeacher.rejected, (state, action) => {
        state.loadingCreate = false;
        state.errorCreate = action.payload as string;
      })
      // Delete Teacher
      .addCase(deleteTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteTeacher.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.loading = false;
          state.teachers = state.teachers.filter(
            (teacher) => Number(teacher.id) !== action.payload
          );
        }
      )
      .addCase(deleteTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update Teacher
      .addCase(updateTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateTeacher.fulfilled,
        (state, action: PayloadAction<Teacher>) => {
          state.loading = false;
          state.teacher = action.payload;
        }
      )
      .addCase(updateTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Bulk Create Teachers
      .addCase(bulkCreateTeachers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bulkCreateTeachers.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(bulkCreateTeachers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetCreateState } = teacherSlice.actions;
export default teacherSlice.reducer;
