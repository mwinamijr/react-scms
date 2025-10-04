import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { djangoUrl, getErrorMessage } from "../utils";

interface User {
  first_name: string;
  last_name: string;
}

interface PaidFor {
  name: string;
}

interface Payment {
  id: number;
  date: string;
  payment_number: string;
  paid_to: string;
  paid_for: PaidFor;
  paid_through: string;
  amount: number;
  paid_by: User;
}

interface FinanceState {
  payments: Payment[];
  payment: Payment | null;
  loading: boolean;
  error: string | null;
  successCreate: boolean;
  createdPayment: Payment | null;
}

// Payments
export const listPayments = createAsyncThunk<Payment[]>(
  "payment/list",
  async (_, thunkAPI) => {
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
        `${djangoUrl}/api/finance/payments/`,
        config
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const paymentDetails = createAsyncThunk<Payment, number>(
  "payment/details",
  async (id, thunkAPI) => {
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
        `${djangoUrl}/api/finance/payments/${id}`,
        config
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const createPayment = createAsyncThunk<Payment, Record<string, any>>(
  "payment/create",
  async (paymentData, thunkAPI) => {
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
        `${djangoUrl}/api/finance/payments/`,
        paymentData,
        config
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const updatePayment = createAsyncThunk<
  Payment,
  { id: number; paymentData: Record<string, any> }
>("payment/update", async ({ id, paymentData }, thunkAPI) => {
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
      `${djangoUrl}/api/finance/payments/${id}/`,
      paymentData,
      config
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const deletePayment = createAsyncThunk<Payment, number>(
  "payment/delete",
  async (id, thunkAPI) => {
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
      const { data } = await axios.delete(
        `${djangoUrl}/api/finance/payments/${id}/`,
        config
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

// ---------- Slice ----------

const initialState: FinanceState = {
  payments: [],
  payment: null,
  loading: false,
  error: null,
  successCreate: false,
  createdPayment: null,
};

const financeSlice = createSlice({
  name: "finance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Payments
      .addCase(
        listPayments.fulfilled,
        (state, action: PayloadAction<Payment[]>) => {
          state.loading = false;
          state.payments = action.payload;
        }
      )
      .addCase(
        paymentDetails.fulfilled,
        (state, action: PayloadAction<Payment>) => {
          state.loading = false;
          state.payment = action.payload;
        }
      )
      .addCase(
        createPayment.fulfilled,
        (state, action: PayloadAction<Payment>) => {
          state.loading = false;
          state.createdPayment = action.payload;
          state.successCreate = true;
        }
      )
      .addCase(
        updatePayment.fulfilled,
        (state, action: PayloadAction<Payment>) => {
          state.loading = false;
          state.payment = action.payload;
        }
      )
      .addCase(
        deletePayment.fulfilled,
        (state, action: PayloadAction<Payment>) => {
          state.loading = false;
          state.payments = state.payments.filter(
            (payment) => payment.id !== action.payload.id
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

export default financeSlice.reducer;
