import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { djangoUrl, getErrorMessage } from "../utils";

interface BankSlip {
  id: number;
  bank_name: string;
  reference_number: string;
  payment_date: string;
  total_amount: number;
  amount_used: number;
  amount_remaining: number;
  used: boolean;
  uploaded_on: string;
  uploaded_by?: string;
}

interface FetchedSlipResponse {
  message: string;
  slip?: BankSlip;
  used: boolean;
}

interface BankSlipState {
  bankSlips: BankSlip[];
  selectedSlip: BankSlip | null;
  slipMessage: string | null;

  // Separate status & error for slips and receipts
  slipStatus: "idle" | "loading" | "succeeded" | "failed";

  slipError: string | null;

  loading: boolean;
  error: string | null; // for general UI actions like create/update
  successCreate: boolean;
}

// === BANK SLIP ===
export const listBankSlips = createAsyncThunk<BankSlip[]>(
  "bankSlip/list",
  async (_, thunkAPI) => {
    try {
      const {
        getUsers: { userInfo },
      } = thunkAPI.getState() as { getUsers: { userInfo: { access: string } } };

      const { data } = await axios.get(`${djangoUrl}/api/finance/bank-slips/`, {
        headers: {
          Authorization: `Bearer ${userInfo.access}`,
        },
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const fetchBankSlipByNumber = createAsyncThunk<
  FetchedSlipResponse,
  string
>("bankSlips/fetchByNumber", async (referenceNumber: string, thunkAPI) => {
  try {
    const {
      getUsers: { userInfo },
    } = thunkAPI.getState() as { getUsers: { userInfo: { access: string } } };

    const res = await axios.get(
      `${djangoUrl}/api/finance/bank-slips/slip/${referenceNumber}/`,
      {
        headers: { Authorization: `Bearer ${userInfo.access}` },
      }
    );
    return res.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(
      getErrorMessage(err) || "Failed to fetch bank slip."
    );
  }
});

export const clearSelectedSlip = () => ({ type: "bankSlips/clearSelected" });

export const createBankSlip = createAsyncThunk<BankSlip, Record<string, any>>(
  "bankSlip/create",
  async (payload, thunkAPI) => {
    try {
      const {
        getUsers: { userInfo },
      } = thunkAPI.getState() as { getUsers: { userInfo: { access: string } } };

      const { data } = await axios.post(
        `${djangoUrl}/api/finance/bank-slips/`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${userInfo.access}`,
          },
        }
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const updateBankSlip = createAsyncThunk<
  BankSlip,
  { id: number; data: Record<string, any> }
>("bankSlip/update", async ({ id, data }, thunkAPI) => {
  try {
    const {
      getUsers: { userInfo },
    } = thunkAPI.getState() as { getUsers: { userInfo: { access: string } } };

    const res = await axios.put(
      `${djangoUrl}/api/finance/bank-slips/${id}/`,
      data,
      {
        headers: {
          Authorization: `Bearer ${userInfo.access}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const deleteBankSlip = createAsyncThunk<BankSlip, number>(
  "bankSlip/delete",
  async (id, thunkAPI) => {
    try {
      const {
        getUsers: { userInfo },
      } = thunkAPI.getState() as { getUsers: { userInfo: { access: string } } };

      const res = await axios.delete(
        `${djangoUrl}/api/finance/bank-slips/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.access}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

const initialState: BankSlipState = {
  bankSlips: [],
  selectedSlip: null,
  slipStatus: "idle",
  slipMessage: null,
  slipError: null,
  loading: false,
  error: null,
  successCreate: false,
};

const bankSlipSlice = createSlice({
  name: "bankSlip",
  initialState,
  reducers: {
    clearSelected: (state) => {
      state.selectedSlip = null;
      state.slipStatus = "idle";
      state.slipError = null;
      state.slipMessage = null;
    },
    clearSlipMessages(state) {
      state.slipMessage = null;
      state.slipError = null;
      state.slipStatus = "idle"; // reset status too if needed
    },
  },

  extraReducers: (builder) => {
    builder

      // BANK SLIP
      .addCase(
        listBankSlips.fulfilled,
        (state, action: PayloadAction<BankSlip[]>) => {
          state.loading = false;
          state.bankSlips = action.payload;
        }
      )
      .addCase(fetchBankSlipByNumber.pending, (state) => {
        state.slipStatus = "loading";
        state.slipError = null;
      })
      .addCase(fetchBankSlipByNumber.fulfilled, (state, action) => {
        state.selectedSlip = action.payload.slip || null;
        state.slipMessage = action.payload.message;
        state.slipStatus = "succeeded";
      })
      .addCase(
        fetchBankSlipByNumber.rejected,
        (state, action: PayloadAction<any>) => {
          state.slipStatus = "failed";
          state.slipError = action.payload || "Error fetching slip";
          state.selectedSlip = null;
          state.slipMessage = null;
        }
      )
      .addCase(
        createBankSlip.fulfilled,
        (state, action: PayloadAction<BankSlip>) => {
          state.loading = false;
          state.successCreate = true;
          state.bankSlips.push(action.payload);
        }
      )
      .addCase(
        updateBankSlip.fulfilled,
        (state, action: PayloadAction<BankSlip>) => {
          state.loading = false;
          state.bankSlips = state.bankSlips.map((s) =>
            s.id === action.payload.id ? action.payload : s
          );
        }
      )
      .addCase(
        deleteBankSlip.fulfilled,
        (state, action: PayloadAction<BankSlip>) => {
          state.loading = false;
          state.bankSlips = state.bankSlips.filter(
            (s) => s.id !== action.payload.id
          );
        }
      );

    // Rejection/loading states (generic)
    builder
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});
export const { clearSelected, clearSlipMessages } = bankSlipSlice.actions;
export default bankSlipSlice.reducer;
