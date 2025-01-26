import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const djangoUrl = "http://127.0.0.1:8000";

// Thunks for Asynchronous Actions
export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-type": "application/json" },
      };
      const { data } = await axios.post(
        `${djangoUrl}/api/users/login/`,
        { email, password },
        config
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
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

export const register = createAsyncThunk(
  "user/register",
  async (
    {
      firstName,
      lastName,
      email,
      phone,
      password,
      isTeacher,
      isAdmin,
      isAccountant,
    },
    { rejectWithValue, getState }
  ) => {
    try {
      const {
        getUsers: { userInfo },
      } = getState();
      const config = {
        headers: { "Content-type": "application/json" },
        Authorization: `Bearer ${userInfo.token}`,
      };
      const { data } = await axios.post(
        `${djangoUrl}/api/users/users/`,
        {
          firstName,
          lastName,
          email,
          phone,
          password,
          isTeacher,
          isAdmin,
          isAccountant,
        },
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

export const getUserDetails = createAsyncThunk(
  "user/details",
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
        `${djangoUrl}/api/users/users/${id}/`,
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

export const listUsers = createAsyncThunk(
  "user/list",
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
        `${djangoUrl}/api/users/users/?first_name=${first_name}&last_name=${last_name}&email=${email}&page=${page}&page_size=${pageSize}`,
        config
      );
      return response.data; // Includes pagination metadata and the student results
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
      );
    }
  }
);

export const deleteUser = createAsyncThunk(
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

// Slice for User State Management
const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null, // Initialize from localStorage
    user: null,
    users: [],
    pagination: {
      count: 0, // Total number of users
      next: null, // URL for the next page
      previous: null, // URL for the previous page
    },
    loading: false,
    error: null,
    successDelete: false, // Add a flag for delete success
  },
  reducers: {
    logout(state) {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
    resetSuccessDelete(state) {
      state.successDelete = false; // Reset the success flag
    },
    resetError(state) {
      state.error = null; // Reset the error state
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get User Details
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // List Users
      .addCase(listUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.results;
        state.pagination = {
          count: action.payload.count,
          next: action.payload.next,
          previous: action.payload.previous,
        }; // Set pagination metadata
      })
      .addCase(listUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete User
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.successDelete = true; // Set success flag
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export Actions and Reducer
export const { logout, resetSuccessDelete, resetError } = userSlice.actions;
export default userSlice.reducer;
