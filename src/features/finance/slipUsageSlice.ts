import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { getErrorMessage } from "../utils";
import { djangoUrl } from "../utils";

interface Receipt {
  id: number;
  date: string;
  amount: number;
  status: "pending" | "paid" | string;
  paid_for_details?: {
    name: string;
  };
}

interface SlipUsage {
  id: number;
  slip: number; // or full object if you prefer
  amount_used: number;
  used: boolean;
  used_by?: string;
  date_used: string;
}

interface PaymentMethod {
  id: number;
  name: string;
  description?: string;
}

interface SlipUsageState {
  paymentMethods: PaymentMethod[];
  slipUsages: SlipUsage[];
  receiptsBySlip: Receipt[];
  slipUsed: boolean | null;
  slipMessage: string | null;

  // Separate status & error for slips and receipts
  slipUsageStatus: "idle" | "loading" | "succeeded" | "failed";
  receiptStatus: "idle" | "loading" | "succeeded" | "failed";

  slipError: string | null;
  receiptError: string | null;

  loading: boolean;
  error: string | null; // for general UI actions like create/update
  successCreate: boolean;
}

// === SLIP USAGE ===
export const listSlipUsages = createAsyncThunk<SlipUsage[]>(
  "slipUsage/list",
  async (_, thunkAPI) => {
    try {
      const {
        getUsers: { userInfo },
      } = thunkAPI.getState() as { getUsers: { userInfo: { token: string } } };

      const { data } = await axios.get(
        `${djangoUrl}/api/finance/slip-usages/`,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const createSlipUsage = createAsyncThunk<SlipUsage, Record<string, any>>(
  "slipUsage/create",
  async (payload, thunkAPI) => {
    try {
      const {
        getUsers: { userInfo },
      } = thunkAPI.getState() as { getUsers: { userInfo: { token: string } } };

      const { data } = await axios.post(
        `${djangoUrl}/api/finance/slip-usages/`,
        payload,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const deleteSlipUsage = createAsyncThunk<SlipUsage, number>(
  "slipUsage/delete",
  async (id, thunkAPI) => {
    try {
      const {
        getUsers: { userInfo },
      } = thunkAPI.getState() as { getUsers: { userInfo: { token: string } } };

      const res = await axios.delete(
        `${djangoUrl}/api/finance/slip-usages/${id}/`,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

// === PAYMENT METHOD ===
export const listPaymentMethods = createAsyncThunk<PaymentMethod[]>(
  "paymentMethod/list",
  async (_, thunkAPI) => {
    try {
      const {
        getUsers: { userInfo },
      } = thunkAPI.getState() as { getUsers: { userInfo: { token: string } } };

      const { data } = await axios.get(
        `${djangoUrl}/api/finance/payment-methods/`,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const createPaymentMethod = createAsyncThunk<
  PaymentMethod,
  Record<string, any>
>("paymentMethod/create", async (payload, thunkAPI) => {
  try {
    const {
      getUsers: { userInfo },
    } = thunkAPI.getState() as { getUsers: { userInfo: { token: string } } };

    const { data } = await axios.post(
      `${djangoUrl}/api/finance/payment-methods/`,
      payload,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const deletePaymentMethod = createAsyncThunk<PaymentMethod, number>(
  "paymentMethod/delete",
  async (id, thunkAPI) => {
    try {
      const {
        getUsers: { userInfo },
      } = thunkAPI.getState() as { getUsers: { userInfo: { token: string } } };

      const res = await axios.delete(
        `${djangoUrl}/api/finance/payment-methods/${id}/`,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

const initialState: SlipUsageState = {
  slipUsages: [],
  paymentMethods: [],
  receiptsBySlip: [],
  slipUsageStatus: "idle",
  receiptStatus: "idle",
  slipUsed: null,
  slipMessage: null,
  slipError: null,
  receiptError: null,
  loading: false,
  error: null,
  successCreate: false,
};

const slipUsageSlice = createSlice({
  name: "slipUsage",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // SLIP USAGE
      .addCase(
        listSlipUsages.fulfilled,
        (state, action: PayloadAction<SlipUsage[]>) => {
          state.loading = false;
          state.slipUsages = action.payload;
        }
      )
      .addCase(
        createSlipUsage.fulfilled,
        (state, action: PayloadAction<SlipUsage>) => {
          state.loading = false;
          state.slipUsages.push(action.payload);
        }
      )
      .addCase(
        deleteSlipUsage.fulfilled,
        (state, action: PayloadAction<SlipUsage>) => {
          state.loading = false;
          state.slipUsages = state.slipUsages.filter(
            (s) => s.id !== action.payload.id
          );
        }
      )

      // PAYMENT METHOD
      .addCase(
        listPaymentMethods.fulfilled,
        (state, action: PayloadAction<PaymentMethod[]>) => {
          state.loading = false;
          state.paymentMethods = action.payload;
        }
      )
      .addCase(
        createPaymentMethod.fulfilled,
        (state, action: PayloadAction<PaymentMethod>) => {
          state.loading = false;
          state.paymentMethods.push(action.payload);
        }
      )
      .addCase(
        deletePaymentMethod.fulfilled,
        (state, action: PayloadAction<PaymentMethod>) => {
          state.loading = false;
          state.paymentMethods = state.paymentMethods.filter(
            (m) => m.id !== action.payload.id
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

export default slipUsageSlice.reducer;
