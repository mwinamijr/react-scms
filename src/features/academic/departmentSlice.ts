import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../../app/store";
import { djangoUrl, getErrorMessage } from "../utils";

// Interfaces
interface Department {
  id: number;
  name: string;
  [key: string]: any;
}

interface DepartmentState {
  department: Department | null;
  departments: Department[];
  loading: boolean;
  error: string | null;
  createdDepartment: Department | null;
  successCreate: boolean;
  loadingCreate: boolean;
  errorCreate: string | null;
}

interface UpdateDepartmentPayload {
  id: number;
  [key: string]: any;
}

// Thunks
export const getDepartmentDetails = createAsyncThunk<
  Department,
  number,
  { state: RootState; rejectValue: string }
>("department/details", async (id, thunkAPI) => {
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
    const { data } = await axios.get(
      `${djangoUrl}/api/academic/departments/${id}/`,
      config
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const listDepartments = createAsyncThunk<
  Department[],
  void,
  { state: RootState; rejectValue: string }
>("department/list", async (_, thunkAPI) => {
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
    const { data } = await axios.get(
      `${djangoUrl}/api/academic/departments/`,
      config
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const createDepartment = createAsyncThunk<
  Department,
  Partial<Department>,
  { state: RootState; rejectValue: string }
>("department/create", async (departmentData, thunkAPI) => {
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
    const { data } = await axios.post(
      `${djangoUrl}/api/academic/departments/`,
      departmentData,
      config
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const deleteDepartment = createAsyncThunk<
  number,
  number,
  { state: RootState; rejectValue: string }
>("department/delete", async (id, thunkAPI) => {
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
    await axios.delete(`${djangoUrl}/api/academic/departments/${id}/`, config);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const updateDepartment = createAsyncThunk<
  Department,
  UpdateDepartmentPayload,
  { state: RootState; rejectValue: string }
>("department/update", async ({ id, ...values }, thunkAPI) => {
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
    const { data } = await axios.put(
      `${djangoUrl}/api/academic/departments/${id}/`,
      values,
      config
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

// Slice
const initialState: DepartmentState = {
  department: null,
  departments: [],
  loading: false,
  error: null,
  createdDepartment: null,
  successCreate: false,
  loadingCreate: false,
  errorCreate: null,
};

const departmentSlice = createSlice({
  name: "department",
  initialState,
  reducers: {
    resetCreateState(state) {
      state.successCreate = false;
      state.createdDepartment = null;
      state.errorCreate = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDepartmentDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getDepartmentDetails.fulfilled,
        (state, action: PayloadAction<Department>) => {
          state.loading = false;
          state.department = action.payload;
        }
      )
      .addCase(getDepartmentDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load department details";
      })
      .addCase(listDepartments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        listDepartments.fulfilled,
        (state, action: PayloadAction<Department[]>) => {
          state.loading = false;
          state.departments = action.payload;
        }
      )
      .addCase(listDepartments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load departments";
      })
      .addCase(createDepartment.pending, (state) => {
        state.loadingCreate = true;
        state.errorCreate = null;
      })
      .addCase(
        createDepartment.fulfilled,
        (state, action: PayloadAction<Department>) => {
          state.loadingCreate = false;
          state.successCreate = true;
          state.createdDepartment = action.payload;
        }
      )
      .addCase(createDepartment.rejected, (state, action) => {
        state.loadingCreate = false;
        state.errorCreate = action.payload || "Failed to create department";
      })
      .addCase(deleteDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteDepartment.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.loading = false;
          state.departments = state.departments.filter(
            (d) => d.id !== action.payload
          );
        }
      )
      .addCase(deleteDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete department";
      })
      .addCase(updateDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateDepartment.fulfilled,
        (state, action: PayloadAction<Department>) => {
          state.loading = false;
          state.department = action.payload;
        }
      )
      .addCase(updateDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update department";
      });
  },
});

export const { resetCreateState } = departmentSlice.actions;
export default departmentSlice.reducer;
