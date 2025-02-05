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

// Thunks for ClassLevel Actions
export const getClassLevelDetails = createAsyncThunk(
  "classLevel/details",
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
        `${djangoUrl}/api/academic/class-levels/${id}/`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const listClassLevels = createAsyncThunk(
  "classLevel/list",
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
        `${djangoUrl}/api/academic/class-levels/`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const createClassLevel = createAsyncThunk(
  "classLevel/create",
  async (classLevelData, { getState, rejectWithValue }) => {
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
        `${djangoUrl}/api/academic/class-levels/`,
        classLevelData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const deleteClassLevel = createAsyncThunk(
  "classLevel/delete",
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
        `${djangoUrl}/api/academic/class-levels/${id}/`,
        config
      );
      return id; // Return classLevelId to allow removal from state
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const updateClassLevel = createAsyncThunk(
  "classLevel/update",
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
        `${djangoUrl}/api/academic/class-levels/${id}/`,
        values,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Slice for ClassLevel State Management
const classLevelSlice = createSlice({
  name: "classLevel",
  initialState: {
    classLevel: null,
    classLevels: [],
    loading: false,
    error: null,
    createdClassLevel: null,
    successCreate: false,
    loadingCreate: false,
    errorCreate: null,
  },
  reducers: {
    resetCreateState: (state) => {
      state.successCreate = false;
      state.createdClassLevel = null;
      state.errorCreate = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get ClassLevel Details
      .addCase(getClassLevelDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getClassLevelDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.classLevel = action.payload;
      })
      .addCase(getClassLevelDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // List ClassLevels
      .addCase(listClassLevels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listClassLevels.fulfilled, (state, action) => {
        state.loading = false;
        state.classLevels = action.payload;
      })
      .addCase(listClassLevels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create ClassLevel
      .addCase(createClassLevel.pending, (state) => {
        state.loadingCreate = true;
        state.errorCreate = null;
      })
      .addCase(createClassLevel.fulfilled, (state, action) => {
        state.loadingCreate = false;
        state.successCreate = true;
        state.createdClassLevel = action.payload;
      })
      .addCase(createClassLevel.rejected, (state, action) => {
        state.loadingCreate = false;
        state.errorCreate = action.payload;
      })
      // Delete ClassLevel
      .addCase(deleteClassLevel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteClassLevel.fulfilled, (state, action) => {
        state.loading = false;
        state.classLevels = state.classLevels.filter(
          (classLevel) => classLevel.id !== action.payload
        );
      })
      .addCase(deleteClassLevel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update ClassLevel
      .addCase(updateClassLevel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateClassLevel.fulfilled, (state, action) => {
        state.loading = false;
        state.classLevel = action.payload;
      })
      .addCase(updateClassLevel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export Reducer
export const { resetCreateState } = classLevelSlice.actions;
export default classLevelSlice.reducer;
