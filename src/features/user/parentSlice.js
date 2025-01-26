import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const djangoUrl = "http://127.0.0.1:8000";

// Thunks for Asynchronous Actions
export const parentDetails = createAsyncThunk(
  "parent/details",
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
        `${djangoUrl}/api/users/parents/${id}/`,
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

export const listParents = createAsyncThunk(
  "parent/list",
  async (
    { first_name = "", last_name = "", email = "", page = 1, pageSize = 30 },
    { getState, rejectWithValue }
  ) => {
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
      const response = await axios.get(
        `${djangoUrl}/api/users/parents/?first_name=${first_name}&last_name=${last_name}&email=${email}&page=${page}&page_size=${pageSize}`,
        config
      );
      return response.data; // Includes pagination metadata and the parent results
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
      );
    }
  }
);

export const deleteParent = createAsyncThunk(
  "user/delete",
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
      await axios.delete(`${djangoUrl}/api/users/users/delete/${id}/`, config);
      return id; // Return ID to remove from the list if needed
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
      );
    }
  }
);

// Slice for Parent State Management
const parentSlice = createSlice({
  name: "parent",
  initialState: {
    parent: null,
    parents: [],
    pagination: {
      count: 0, // Total number of parents
      next: null, // URL for the next page
      previous: null, // URL for the previous page
    },
    loading: false,
    error: null,
    successDelete: false, // Add a flag for delete success
  },
  reducers: {
    resetSuccessDelete(state) {
      state.successDelete = false; // Reset the success flag
    },
    resetError(state) {
      state.error = null; // Reset the error state
    },
  },
  extraReducers: (builder) => {
    builder
      // Get parent Details
      .addCase(parentDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(parentDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.parent = action.payload;
      })
      .addCase(parentDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // List parents
      .addCase(listParents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listParents.fulfilled, (state, action) => {
        state.loading = false;
        state.parents = action.payload.results;
        state.pagination = {
          count: action.payload.count,
          next: action.payload.next,
          previous: action.payload.previous,
        }; // Set pagination metadata
      })
      .addCase(listParents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete parent
      .addCase(deleteParent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteParent.fulfilled, (state, action) => {
        state.loading = false;
        state.successDelete = true; // Set success flag
        state.parents = state.parents.filter(
          (parent) => parent.id !== action.payload
        );
      })
      .addCase(deleteParent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export Actions and Reducer
export const { resetSuccessDelete, resetError } = parentSlice.actions;
export default parentSlice.reducer;
