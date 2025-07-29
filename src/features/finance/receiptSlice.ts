import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { getErrorMessage } from "../utils";
import { djangoUrl } from "../utils";

interface User {
  first_name: string;
  last_name: string;
}

interface PaidFor {
  name: string;
}

interface Term {
  id: number;
  name: string;
  academic_year_name: string;
  start_date: string;
  end_date: string;
}

interface Receipt {
  id: number;
  date: string;
  amount: number;
  term?: Term | null;
  receipt_number: string;
  student_details?: {
    full_name: string;
  };
  payer?: string;
  paid_for_details?: PaidFor;
  status: "pending" | "paid" | string;
  paid_for_details?: {
    name: string;
  };
}

interface Payment {
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

export const bulkUploadReceipts = createAsyncThunk(
  "receipt/bulkUploadReceipts",
  async (formData: FormData, thunkAPI) => {
    try {
      const { getState } = thunkAPI;
      const {
        getUsers: { userInfo },
      } = getState() as { getUsers: { userInfo: { token: string } } };

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `${djangoUrl}/api/finance/receipts/bulk-upload/`,
        formData,
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
  reducers: {
    resetFinanceState: (state) => {
      state.receipts = [];
      state.studentReceipts = [];
      state.receipt = null;
      state.payments = [];
      state.payment = null;
      state.loading = false;
      state.error = null;
      state.successCreate = false;
      state.createdReceipt = null;
      state.createdPayment = null;
      state.uploadingReceipts = false;
      state.successBulkUpload = false;
      state.bulkUploadError = null;
    },
  },
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
      .addCase(listStudentReceipts.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        listStudentReceipts.fulfilled,
        (state, action: PayloadAction<Receipt[]>) => {
          state.loading = false;
          state.studentReceipts = action.payload;
        }
      )
      .addCase(listStudentReceipts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(receiptDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        receiptDetails.fulfilled,
        (state, action: PayloadAction<Receipt>) => {
          state.loading = false;
          state.receipt = action.payload;
        }
      )
      .addCase(receiptDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createReceipt.pending, (state) => {
        state.loading = true;
        state.successCreate = false;
        state.createdReceipt = null;
      })
      .addCase(
        createReceipt.fulfilled,
        (state, action: PayloadAction<Receipt>) => {
          state.loading = false;
          state.createdReceipt = action.payload;
          state.successCreate = true;
        }
      )
      .addCase(createReceipt.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.successCreate = false;
      })
      .addCase(updateReceipt.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        updateReceipt.fulfilled,
        (state, action: PayloadAction<Receipt>) => {
          state.loading = false;
          state.successCreate = true;
          state.receipt = action.payload;
        }
      )
      .addCase(updateReceipt.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteReceipt.pending, (state) => {
        state.loading = true;
      })
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
    builder.addMatcher(
      (action) => action.type.endsWith("/pending"),
      (state) => {
        state.loading = true;
        state.error = null;
      }
    );
  },
});

export const { resetFinanceState } = receiptSlice.actions;
export default receiptSlice.reducer;
