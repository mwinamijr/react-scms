import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const djangoUrl = "http://127.0.0.1:8000";

// Thunks for Accountant Actions
export const getAccountantDetails = createAsyncThunk(
  "accountant/details",
  async (accountantId, { getState, rejectWithValue }) => {
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
        `${djangoUrl}/api/users/accountants/${accountantId}/`,
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

export const listAccountants = createAsyncThunk(
  "accountant/list",
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
        `${djangoUrl}/api/users/accountants/`,
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

export const deleteAccountant = createAsyncThunk(
  "accountant/delete",
  async (accountantId, { getState, rejectWithValue }) => {
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
        `${djangoUrl}/api/users/accountants/delete/${accountantId}/`,
        config
      );
      return accountantId; // Return accountantId to allow removal from state
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
      );
    }
  }
);

export const updateAccountant = createAsyncThunk(
  "accountant/update",
  async (accountant, { getState, rejectWithValue }) => {
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
        `${djangoUrl}/api/users/accountants/update/${accountant.id}/`,
        accountant,
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

// Slice for Accountant State Management
const accountantSlice = createSlice({
  name: "accountant",
  initialState: {
    accountant: null,
    accountants: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Accountant Details
      .addCase(getAccountantDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAccountantDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.accountant = action.payload;
      })
      .addCase(getAccountantDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // List Accountants
      .addCase(listAccountants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listAccountants.fulfilled, (state, action) => {
        state.loading = false;
        state.accountants = action.payload;
      })
      .addCase(listAccountants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Accountant
      .addCase(deleteAccountant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAccountant.fulfilled, (state, action) => {
        state.loading = false;
        state.accountants = state.accountants.filter(
          (accountant) => accountant.id !== action.payload
        );
      })
      .addCase(deleteAccountant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Accountant
      .addCase(updateAccountant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAccountant.fulfilled, (state, action) => {
        state.loading = false;
        state.accountant = action.payload;
      })
      .addCase(updateAccountant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export Reducer
export default accountantSlice.reducer;
