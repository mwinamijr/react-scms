import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getErrorMessage, djangoUrl } from "../utils";

interface BulkDebtState {
  loading: boolean;
  message: string | null;
  error: string | null;
}

const initialState: BulkDebtState = {
  loading: false,
  message: null,
  error: null,
};

export const updateCurrentTermDebts = createAsyncThunk(
  "debt/updateCurrent",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${djangoUrl}/api/finance/debts/update-current/`
      );
      return res.data.detail;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

export const updateAllMissingDebts = createAsyncThunk(
  "debt/updateAllMissing",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${djangoUrl}/api/finance/debts/update-all-missing/`
      );
      return res.data.detail;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

export const updatePastTermDebts = createAsyncThunk(
  "debt/updatePast",
  async (term_ids: number[], { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${djangoUrl}/api/finance/debts/update-past/`,
        {
          term_ids,
        }
      );
      return res.data.detail;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

const debtBulkActionsSlice = createSlice({
  name: "debtBulk",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateCurrentTermDebts.pending, (state) => {
        state.loading = true;
        state.message = null;
        state.error = null;
      })
      .addCase(updateCurrentTermDebts.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(updateCurrentTermDebts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(updateAllMissingDebts.fulfilled, (state, action) => {
        state.message = action.payload;
        state.loading = false;
      })
      .addCase(updatePastTermDebts.fulfilled, (state, action) => {
        state.message = action.payload;
        state.loading = false;
      });
  },
});

export default debtBulkActionsSlice.reducer;
