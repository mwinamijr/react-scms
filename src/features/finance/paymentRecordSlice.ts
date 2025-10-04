import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { djangoUrl, getErrorMessage } from "../utils";

export interface PaymentRecord {
  id: number;
  student: number;
  debt_record: number;
  amount: string;
  method?: string;
  reference?: string;
  note?: string;
  paid_on: string;
  processed_by: number;
}

interface PaymentState {
  records: PaymentRecord[];
  loading: boolean;
  error: string | null;
}

const initialState: PaymentState = {
  records: [],
  loading: false,
  error: null,
};

export const fetchPaymentRecords = createAsyncThunk(
  "payment/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${djangoUrl}/api/finance/payments/`);
      return res.data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

export const fetchPaymentRecordsByStudent = createAsyncThunk(
  "payment/fetchByStudent",
  async (studentId: number, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${djangoUrl}/students/${studentId}/api/finance/payments/`
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

export const createPaymentRecord = createAsyncThunk(
  "payment/create",
  async (data: Partial<PaymentRecord>, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${djangoUrl}/api/finance/payments/`, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

const paymentRecordSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaymentRecords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaymentRecords.fulfilled, (state, action) => {
        state.records = action.payload;
        state.loading = false;
      })
      .addCase(fetchPaymentRecords.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export default paymentRecordSlice.reducer;
