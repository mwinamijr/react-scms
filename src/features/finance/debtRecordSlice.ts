import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getErrorMessage, djangoUrl } from "../utils";

export interface DebtRecord {
  id: number;
  student: number;
  term: number;
  amount_added: string;
  amount_paid: string;
  note?: string;
  timestamp: string;
  is_reversed: boolean;
  reversed_on: string | null;
}

interface DebtRecordState {
  records: DebtRecord[];
  loading: boolean;
  error: string | null;
}

const initialState: DebtRecordState = {
  records: [],
  loading: false,
  error: null,
};

export const fetchDebtRecords = createAsyncThunk(
  "debtRecords/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${djangoUrl}/debt-records/`);
      return res.data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

export const fetchDebtRecordsByStudent = createAsyncThunk(
  "debtRecords/fetchByStudent",
  async (studentId: number, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${djangoUrl}/students/${studentId}/debt-records/`
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

export const createDebtRecord = createAsyncThunk(
  "debtRecords/create",
  async (data: Partial<DebtRecord>, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${djangoUrl}/debt-records/`, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

const debtRecordSlice = createSlice({
  name: "debtRecords",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDebtRecords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDebtRecords.fulfilled, (state, action) => {
        state.records = action.payload;
        state.loading = false;
      })
      .addCase(fetchDebtRecords.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export default debtRecordSlice.reducer;
