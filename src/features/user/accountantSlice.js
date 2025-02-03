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
      return rejectWithValue(getErrorMessage(error));
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
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const createAccountant = createAsyncThunk(
  "accountant/create",
  async (accountantData, { getState, rejectWithValue }) => {
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
        `${djangoUrl}/api/users/accountants/`,
        accountantData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
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
      return rejectWithValue(getErrorMessage(error));
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
      return rejectWithValue(getErrorMessage(error));
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
    createdAccountant: null,
    successCreate: false,
    loadingCreate: false,
    errorCreate: null,
  },
  reducers: {
    resetCreateState: (state) => {
      state.successCreate = false;
      state.createdAccountant = null;
      state.errorCreate = null;
    },
  },
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
      // Create Accountant
      .addCase(createAccountant.pending, (state) => {
        state.loadingCreate = true;
        state.errorCreate = null;
      })
      .addCase(createAccountant.fulfilled, (state, action) => {
        state.loadingCreate = false;
        state.successCreate = true;
        state.createdAccountant = action.payload;
      })
      .addCase(createAccountant.rejected, (state, action) => {
        state.loadingCreate = false;
        state.errorCreate = action.payload;
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
export const { resetCreateState } = accountantSlice.actions;
export default accountantSlice.reducer;
