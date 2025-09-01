import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../../app/store";
import { djangoUrl } from "../utils";
import { getErrorMessage } from "../utils";

interface UserInfo {
  id: number;
  email: string;
  access: string;
  first_name?: string;
  last_name?: string;
  isAdmin?: boolean;
  isTeacher?: boolean;
  isAccountant?: boolean;
}

interface User extends UserInfo {}

interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  isTeacher?: boolean;
  isAdmin?: boolean;
  isAccountant?: boolean;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface UserState {
  userInfo: UserInfo | null;
  user: User | null;
  users: User[];
  loading: boolean;
  error: string | null;
  successDelete: boolean;
}

export const login = createAsyncThunk<
  UserInfo,
  LoginPayload,
  { rejectValue: string }
>("user/login", async ({ email, password }, thunkAPI) => {
  try {
    const { data } = await axios.post(`${djangoUrl}/api/users/login/`, {
      email,
      password,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const register = createAsyncThunk<
  UserInfo,
  RegisterPayload,
  { state: RootState; rejectValue: string }
>("user/register", async (payload, thunkAPI) => {
  try {
    const { data } = await axios.post(`${djangoUrl}/api/users/users/`, payload);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const getUserDetails = createAsyncThunk<
  User,
  number,
  { state: RootState; rejectValue: string }
>("user/details", async (id, thunkAPI) => {
  try {
    const { getState } = thunkAPI;
    const {
      getUsers: { userInfo },
    } = getState() as { getUsers: { userInfo: { access: string } } };
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo?.access}`,
      },
    };
    const { data } = await axios.get(
      `${djangoUrl}/api/users/users/${id}/`,
      config
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const listUsers = createAsyncThunk<
  User[],
  Record<string, any>,
  { state: RootState; rejectValue: string }
>("user/list", async (filters = {}, thunkAPI) => {
  try {
    const { getState } = thunkAPI;
    const {
      getUsers: { userInfo },
    } = getState() as { getUsers: { userInfo: { access: string } } };
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo?.access}`,
      },
      params: filters,
    };
    const { data } = await axios.get(`${djangoUrl}/api/users/users/`, config);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const deleteUser = createAsyncThunk<
  number,
  number,
  { state: RootState; rejectValue: string }
>("user/delete", async (id, thunkAPI) => {
  try {
    const { getState } = thunkAPI;
    const {
      getUsers: { userInfo },
    } = getState() as { getUsers: { userInfo: { access: string } } };
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo?.access}`,
      },
    };
    await axios.delete(`${djangoUrl}/api/users/users/${id}/`, config);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

const initialState: UserState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")!)
    : null,
  user: null,
  users: [],
  loading: false,
  error: null,
  successDelete: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<UserInfo>) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? null;
      })

      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<UserInfo>) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? null;
      })

      // Get User Details
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getUserDetails.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.loading = false;
          state.user = action.payload;
        }
      )
      .addCase(getUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? null;
      })

      // List Users
      .addCase(listUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(listUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? null;
      })

      // Delete User
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.successDelete = true;
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? null;
      });
  },
});

export const { logout, resetError } = userSlice.actions;
export default userSlice.reducer;
