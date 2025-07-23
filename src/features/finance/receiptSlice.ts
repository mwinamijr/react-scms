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
interface BankSlip {
  id: number;
  slip_number: string;
  bank_name: string;
  amount: number;
  used_amount: number;
  date: string;
  owner_name?: string;
}

interface SlipUsage {
  id: number;
  slip: number; // or full object if you prefer
  amount_used: number;
  used_by?: string;
  date_used: string;
}

interface PaymentMethod {
  id: number;
  name: string;
  description?: string;
}

interface ReceiptState {
  receipts: Receipt[];
  studentReceipts: Receipt[];
  bankSlips: BankSlip[];
  paymentMethods: PaymentMethod[];
  slipUsages: SlipUsage[];
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

// === BANK SLIP ===
export const listBankSlips = createAsyncThunk<BankSlip[]>(
  "bankSlip/list",
  async (_, thunkAPI) => {
    try {
      const {
        getUsers: { userInfo },
      } = thunkAPI.getState() as { getUsers: { userInfo: { token: string } } };

      const { data } = await axios.get(`${djangoUrl}/api/finance/bank-slips/`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const createBankSlip = createAsyncThunk<BankSlip, Record<string, any>>(
  "bankSlip/create",
  async (payload, thunkAPI) => {
    try {
      const {
        getUsers: { userInfo },
      } = thunkAPI.getState() as { getUsers: { userInfo: { token: string } } };

      const { data } = await axios.post(
        `${djangoUrl}/api/finance/bank-slips/`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
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
    } = thunkAPI.getState() as { getUsers: { userInfo: { token: string } } };

    const res = await axios.put(
      `${djangoUrl}/api/finance/bank-slips/${id}/`,
      data,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
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
      } = thunkAPI.getState() as { getUsers: { userInfo: { token: string } } };

      const res = await axios.delete(
        `${djangoUrl}/api/finance/bank-slips/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

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

const initialState: ReceiptState = {
  receipts: [],
  studentReceipts: [],
  bankSlips: [],
  slipUsages: [],
  paymentMethods: [],
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
      )
      // BANK SLIP
      .addCase(
        listBankSlips.fulfilled,
        (state, action: PayloadAction<BankSlip[]>) => {
          state.loading = false;
          state.bankSlips = action.payload;
        }
      )
      .addCase(
        createBankSlip.fulfilled,
        (state, action: PayloadAction<BankSlip>) => {
          state.loading = false;
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
      )

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

export default receiptSlice.reducer;
