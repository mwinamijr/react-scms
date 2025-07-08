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
  paid_through: string;
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
      } = getState() as { getUsers: { userInfo: { token: string } } };

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
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
      } = getState() as { getUsers: { userInfo: { token: string } } };

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
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
    } = getState() as { getUsers: { userInfo: { token: string } } };

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
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
      } = getState() as { getUsers: { userInfo: { token: string } } };

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
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
      )
      .addCase(deleteReceipt.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Payments
      .addCase(listPayments.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        listPayments.fulfilled,
        (state, action: PayloadAction<Payment[]>) => {
          state.loading = false;
          state.payments = action.payload;
        }
      )
      .addCase(listPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(paymentDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        paymentDetails.fulfilled,
        (state, action: PayloadAction<Payment>) => {
          state.loading = false;
          state.payment = action.payload;
        }
      )
      .addCase(paymentDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createPayment.pending, (state) => {
        state.loading = true;
        state.successCreate = false;
        state.createdPayment = null;
      })
      .addCase(
        createPayment.fulfilled,
        (state, action: PayloadAction<Payment>) => {
          state.loading = false;
          state.createdPayment = action.payload;
          state.successCreate = true;
        }
      )
      .addCase(createPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.successCreate = false;
      })
      .addCase(updatePayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        updatePayment.fulfilled,
        (state, action: PayloadAction<Payment>) => {
          state.loading = false;
          state.successCreate = true;
          state.payment = action.payload;
        }
      )
      .addCase(updatePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deletePayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        deletePayment.fulfilled,
        (state, action: PayloadAction<Payment>) => {
          state.loading = false;
          state.payments = state.payments.filter(
            (payment) => payment.id !== action.payload.id
          );
        }
      )
      .addCase(deletePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetFinanceState } = financeSlice.actions;
export default financeSlice.reducer;
