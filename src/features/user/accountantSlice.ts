import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../../app/store";
import { djangoUrl, getErrorMessage } from "../utils";

// Types
interface Accountant {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  username: string;
  phone_number: string;
  image: string | null;
  email: string;
  empId: string;
  date_of_birth: string | null;
  gender: string;
  national_id: string;
  alt_email: string;
  address: string;
  tin_number: string;
  nssf_number: string;
  salary: number;
  unpaid_salary: number;
}

interface AccountantState {
  accountant: Accountant | null;
  accountants: Accountant[];
  loading: boolean;
  error: string | null;
  createdAccountant: Accountant | null;
  successCreate: boolean;
  loadingCreate: boolean;
  errorCreate: string | null;
}

const initialState: AccountantState = {
  accountant: null,
  accountants: [],
  loading: false,
  error: null,
  createdAccountant: null,
  successCreate: false,
  loadingCreate: false,
  errorCreate: null,
};

// Thunks
export const getAccountantDetails = createAsyncThunk<
  Accountant,
  number,
  { state: RootState; rejectValue: string }
>("accountant/details", async (id, thunkAPI) => {
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
      `${djangoUrl}/api/users/accountants/${id}/`,
      config
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const listAccountants = createAsyncThunk<
  Accountant[],
  void,
  { state: RootState; rejectValue: string }
>("accountant/list", async (_, thunkAPI) => {
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
      `${djangoUrl}/api/users/accountants/`,
      config
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const createAccountant = createAsyncThunk<
  Accountant,
  Partial<Accountant>,
  { state: RootState; rejectValue: string }
>("accountant/create", async (accountantData, thunkAPI) => {
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
      `${djangoUrl}/api/users/accountants/`,
      accountantData,
      config
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const deleteAccountant = createAsyncThunk<
  number,
  number,
  { state: RootState; rejectValue: string }
>("accountant/delete", async (accountantId, thunkAPI) => {
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

    await axios.delete(
      `${djangoUrl}/api/users/accountants/delete/${accountantId}/`,
      config
    );
    return accountantId;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const updateAccountant = createAsyncThunk<
  Accountant,
  { id: number } & Partial<Accountant>,
  { state: RootState; rejectValue: string }
>("accountant/update", async ({ id, ...values }, thunkAPI) => {
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
      `${djangoUrl}/api/users/accountants/${id}/`,
      values,
      config
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

// Slice
const accountantSlice = createSlice({
  name: "accountant",
  initialState,
  reducers: {
    resetCreateState: (state) => {
      state.successCreate = false;
      state.createdAccountant = null;
      state.errorCreate = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Details
      .addCase(getAccountantDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAccountantDetails.fulfilled,
        (state, action: PayloadAction<Accountant>) => {
          state.loading = false;
          state.accountant = action.payload;
        }
      )
      .addCase(getAccountantDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? null;
      })

      // List
      .addCase(listAccountants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        listAccountants.fulfilled,
        (state, action: PayloadAction<Accountant[]>) => {
          state.loading = false;
          state.accountants = action.payload;
        }
      )
      .addCase(listAccountants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? null;
      })

      // Create
      .addCase(createAccountant.pending, (state) => {
        state.loadingCreate = true;
        state.errorCreate = null;
      })
      .addCase(
        createAccountant.fulfilled,
        (state, action: PayloadAction<Accountant>) => {
          state.loadingCreate = false;
          state.successCreate = true;
          state.createdAccountant = action.payload;
        }
      )
      .addCase(createAccountant.rejected, (state, action) => {
        state.loadingCreate = false;
        state.errorCreate = action.payload ?? null;
      })

      // Delete
      .addCase(deleteAccountant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteAccountant.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.loading = false;
          state.accountants = state.accountants.filter(
            (a) => a.id !== action.payload
          );
        }
      )
      .addCase(deleteAccountant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? null;
      })

      // Update
      .addCase(updateAccountant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateAccountant.fulfilled,
        (state, action: PayloadAction<Accountant>) => {
          state.loading = false;
          state.accountant = action.payload;
        }
      )
      .addCase(updateAccountant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? null;
      });
  },
});

export const { resetCreateState } = accountantSlice.actions;
export default accountantSlice.reducer;
