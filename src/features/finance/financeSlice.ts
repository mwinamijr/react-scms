import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { getErrorMessage } from "../utils";
import { djangoUrl } from "../utils";


interface Receipt {
  id: number;
  // add other relevant fields as needed
  [key: string]: any;
}

interface Payment {
  id: number;
  // add other relevant fields as needed
  [key: string]: any;
}

interface FinanceState {
  receipts: Receipt[];
  studentReceipts: Receipt[];
  receipt: Receipt | null;
  payments: Payment[];
  payment: Payment | null;
  loading: boolean;
  error: string | null;
  successCreate: boolean;
  createdReceipt: Receipt | null;
  createdPayment: Payment | null;
}

// Receipts
export const listReceipts = createAsyncThunk<Receipt[], Record<string, any>>(
  "receipt/list",
  async (filters = {}, thunkAPI) => {
    try {
      const { getState } = thunkAPI;
    const {
      getUsers: { userInfo },
    } = getState() as { getUsers: { userInfo: { token: string } } };


      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
        params: filters,
      };

      const { data } = await axios.get(`${djangoUrl}/api/finance/receipts/`, config);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const listStudentReceipts = createAsyncThunk<Receipt[], number>(
  "studentReceipt/list",
  async (id, thunkAPI) => {
    try {
      const { getState } = thunkAPI;
    const {
      getUsers: { userInfo },
    } = getState() as { getUsers: { userInfo: { token: string } } };

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`${djangoUrl}/api/finance/receipts/student/${id}/`, config);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const receiptDetails = createAsyncThunk<Receipt, number>(
  "receipt/details",
  async (id, thunkAPI) => {
    try {
      const { getState } = thunkAPI;
    const {
      getUsers: { userInfo },
    } = getState() as { getUsers: { userInfo: { token: string } } };

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`${djangoUrl}/api/finance/receipts/${id}/`, config);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const createReceipt = createAsyncThunk<Receipt, Record<string, any>>(
  "receipt/create",
  async (receiptData, thunkAPI) => {
    try {
      const { getState } = thunkAPI;
    const {
      getUsers: { userInfo },
    } = getState() as { getUsers: { userInfo: { token: string } } };

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(`${djangoUrl}/api/finance/receipts/`, receiptData, config);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const updateReceipt = createAsyncThunk<Receipt, { id: number; receiptData: Record<string, any> }>(
  "receipt/update",
  async ({ id, receiptData }, thunkAPI) => {
    try {
      const { getState } = thunkAPI;
    const {
      getUsers: { userInfo },
    } = getState() as { getUsers: { userInfo: { token: string } } };

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(`${djangoUrl}/api/finance/receipts/${id}/`, receiptData, config);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const deleteReceipt = createAsyncThunk<Receipt, number>(
  "receipt/delete",
  async (id, thunkAPI) => {
    try {
      const { getState } = thunkAPI;
    const {
      getUsers: { userInfo },
    } = getState() as { getUsers: { userInfo: { token: string } } };

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.delete(`${djangoUrl}/api/finance/receipts/${id}/`, config);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

// Payments
export const listPayments = createAsyncThunk<Payment[]>(
  "payment/list",
  async (_, thunkAPI) => {
    try {
      const { getState } = thunkAPI;
    const {
      getUsers: { userInfo },
    } = getState() as { getUsers: { userInfo: { token: string } } };

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`${djangoUrl}/api/finance/payments/`, config);
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
    } = getState() as { getUsers: { userInfo: { token: string } } };

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`${djangoUrl}/api/finance/payments/${id}`, config);
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
    } = getState() as { getUsers: { userInfo: { token: string } } };

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(`${djangoUrl}/api/finance/payments/`, paymentData, config);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const updatePayment = createAsyncThunk<Payment, { id: number; paymentData: Record<string, any> }>(
  "payment/update",
  async ({ id, paymentData }, thunkAPI) => {
    try {
      const { getState } = thunkAPI;
    const {
      getUsers: { userInfo },
    } = getState() as { getUsers: { userInfo: { token: string } } };

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(`${djangoUrl}/api/finance/payments/${id}/`, paymentData, config);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const deletePayment = createAsyncThunk<Payment, number>(
  "payment/delete",
  async (id, thunkAPI) => {
    try {
      const { getState } = thunkAPI;
    const {
      getUsers: { userInfo },
    } = getState() as { getUsers: { userInfo: { token: string } } };

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.delete(`${djangoUrl}/api/finance/payments/${id}/`, config);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

// ---------- Slice ----------

const initialState: FinanceState = {
  receipts: [],
  studentReceipts: [],
  receipt: null,
  payments: [],
  payment: null,
  loading: false,
  error: null,
  successCreate: false,
  createdReceipt: null,
  createdPayment: null,
};

const financeSlice = createSlice({
  name: "finance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Receipts
      .addCase(listReceipts.pending, (state) => {
        state.loading = true;
      })
      .addCase(listReceipts.fulfilled, (state, action: PayloadAction<Receipt[]>) => {
        state.loading = false;
        state.receipts = action.payload;
      })
      .addCase(listReceipts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(listStudentReceipts.fulfilled, (state, action: PayloadAction<Receipt[]>) => {
        state.loading = false;
        state.studentReceipts = action.payload;
      })
      .addCase(receiptDetails.fulfilled, (state, action: PayloadAction<Receipt>) => {
        state.loading = false;
        state.receipt = action.payload;
      })
      .addCase(createReceipt.fulfilled, (state, action: PayloadAction<Receipt>) => {
        state.loading = false;
        state.createdReceipt = action.payload;
        state.successCreate = true;
      })
      .addCase(updateReceipt.fulfilled, (state, action: PayloadAction<Receipt>) => {
        state.loading = false;
        state.receipt = action.payload;
      })
      .addCase(deleteReceipt.fulfilled, (state, action: PayloadAction<Receipt>) => {
        state.loading = false;
        state.receipts = state.receipts.filter((receipt) => receipt.id !== action.payload.id);
      })

      // Payments
      .addCase(listPayments.fulfilled, (state, action: PayloadAction<Payment[]>) => {
        state.loading = false;
        state.payments = action.payload;
      })
      .addCase(paymentDetails.fulfilled, (state, action: PayloadAction<Payment>) => {
        state.loading = false;
        state.payment = action.payload;
      })
      .addCase(createPayment.fulfilled, (state, action: PayloadAction<Payment>) => {
        state.loading = false;
        state.createdPayment = action.payload;
        state.successCreate = true;
      })
      .addCase(updatePayment.fulfilled, (state, action: PayloadAction<Payment>) => {
        state.loading = false;
        state.payment = action.payload;
      })
      .addCase(deletePayment.fulfilled, (state, action: PayloadAction<Payment>) => {
        state.loading = false;
        state.payments = state.payments.filter((payment) => payment.id !== action.payload.id);
      });

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
        (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        }
      );
  },
});

export default financeSlice.reducer;
