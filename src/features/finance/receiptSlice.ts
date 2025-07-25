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

interface ReceiptState {
  receipts: Receipt[];
  studentReceipts: Receipt[];
  receipt: Receipt | null;
  loading: boolean;
  error: string | null;
  successCreate: boolean;
  createdReceipt: Receipt | null;
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

      const { data } = await axios.get(
        `${djangoUrl}/api/finance/receipts/`,
        config
      );
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
      const { data } = await axios.get(
        `${djangoUrl}/api/finance/receipts/student/${id}/`,
        config
      );
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
      const { data } = await axios.get(
        `${djangoUrl}/api/finance/receipts/${id}/`,
        config
      );
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
      const { data } = await axios.post(
        `${djangoUrl}/api/finance/receipts/`,
        receiptData,
        config
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const updateReceipt = createAsyncThunk<
  Receipt,
  { id: number; receiptData: Record<string, any> }
>("receipt/update", async ({ id, receiptData }, thunkAPI) => {
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
    const { data } = await axios.put(
      `${djangoUrl}/api/finance/receipts/${id}/`,
      receiptData,
      config
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

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
      const { data } = await axios.delete(
        `${djangoUrl}/api/finance/receipts/${id}/`,
        config
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

const initialState: ReceiptState = {
  receipts: [],
  studentReceipts: [],
  receipt: null,
  loading: false,
  error: null,
  successCreate: false,
  createdReceipt: null,
};

const receiptSlice = createSlice({
  name: "receipt",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Receipts
      .addCase(listReceipts.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        listReceipts.fulfilled,
        (state, action: PayloadAction<Receipt[]>) => {
          state.loading = false;
          state.receipts = action.payload;
        }
      )
      .addCase(listReceipts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(
        listStudentReceipts.fulfilled,
        (state, action: PayloadAction<Receipt[]>) => {
          state.loading = false;
          state.studentReceipts = action.payload;
        }
      )
      .addCase(
        receiptDetails.fulfilled,
        (state, action: PayloadAction<Receipt>) => {
          state.loading = false;
          state.receipt = action.payload;
        }
      )
      .addCase(
        createReceipt.fulfilled,
        (state, action: PayloadAction<Receipt>) => {
          state.loading = false;
          state.createdReceipt = action.payload;
          state.successCreate = true;
        }
      )
      .addCase(
        updateReceipt.fulfilled,
        (state, action: PayloadAction<Receipt>) => {
          state.loading = false;
          state.receipt = action.payload;
        }
      )
      .addCase(
        deleteReceipt.fulfilled,
        (state, action: PayloadAction<Receipt>) => {
          state.loading = false;
          state.receipts = state.receipts.filter(
            (receipt) => receipt.id !== action.payload.id
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

export default receiptSlice.reducer;
