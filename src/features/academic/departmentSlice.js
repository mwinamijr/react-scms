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

// Thunks for Department Actions
export const getDepartmentDetails = createAsyncThunk(
  "department/details",
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
        `${djangoUrl}/api/academic/departments/${id}/`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const listDepartments = createAsyncThunk(
  "department/list",
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
        `${djangoUrl}/api/academic/departments/`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const createDepartment = createAsyncThunk(
  "department/create",
  async (departmentData, { getState, rejectWithValue }) => {
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
        `${djangoUrl}/api/academic/departments/`,
        departmentData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const deleteDepartment = createAsyncThunk(
  "department/delete",
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
        `${djangoUrl}/api/academic/departments/${id}/`,
        config
      );
      return id; // Return departmentId to allow removal from state
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const updateDepartment = createAsyncThunk(
  "department/update",
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
        `${djangoUrl}/api/academic/departments/${id}/`,
        values,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Slice for Department State Management
const departmentSlice = createSlice({
  name: "department",
  initialState: {
    department: null,
    departments: [],
    loading: false,
    error: null,
    createdDepartment: null,
    successCreate: false,
    loadingCreate: false,
    errorCreate: null,
  },
  reducers: {
    resetCreateState: (state) => {
      state.successCreate = false;
      state.createdDepartment = null;
      state.errorCreate = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Department Details
      .addCase(getDepartmentDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDepartmentDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.department = action.payload;
      })
      .addCase(getDepartmentDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // List Departments
      .addCase(listDepartments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listDepartments.fulfilled, (state, action) => {
        state.loading = false;
        state.departments = action.payload;
      })
      .addCase(listDepartments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Department
      .addCase(createDepartment.pending, (state) => {
        state.loadingCreate = true;
        state.errorCreate = null;
      })
      .addCase(createDepartment.fulfilled, (state, action) => {
        state.loadingCreate = false;
        state.successCreate = true;
        state.createdDepartment = action.payload;
      })
      .addCase(createDepartment.rejected, (state, action) => {
        state.loadingCreate = false;
        state.errorCreate = action.payload;
      })
      // Delete Department
      .addCase(deleteDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.departments = state.departments.filter(
          (department) => department.id !== action.payload
        );
      })
      .addCase(deleteDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Department
      .addCase(updateDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.department = action.payload;
      })
      .addCase(updateDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export Reducer
export const { resetCreateState } = departmentSlice.actions;
export default departmentSlice.reducer;
