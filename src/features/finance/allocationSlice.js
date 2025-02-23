import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getErrorMessage } from "../utils";
import { djangoUrl } from "../utils";

// Thunks for ReceiptAllocation Actions
export const listReceiptAllocations = createAsyncThunk(
  "receiptAllocation/list",
  async (_, { getState, rejectWithValue }) => {
    try {
      const {
        getUsers: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(
        `${djangoUrl}/api/finance/receipt-allocations/`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const receiptAllocationDetails = createAsyncThunk(
  "receiptAllocation/details",
  async (id, { getState, rejectWithValue }) => {
    try {
      const {
        getUsers: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(
        `${djangoUrl}/api/finance/receipt-allocations/${id}`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const createReceiptAllocation = createAsyncThunk(
  "receiptAllocation/create",
  async (receiptAllocationData, { getState, rejectWithValue }) => {
    try {
      const {
        getUsers: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        `${djangoUrl}/api/finance/receipt-allocations/`,
        receiptAllocationData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const updateReceiptAllocation = createAsyncThunk(
  "receiptAllocation/update",
  async ({ id, receiptAllocationData }, { getState, rejectWithValue }) => {
    try {
      const {
        getUsers: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `${djangoUrl}/api/finance/receipt-allocations/${id}/`,
        receiptAllocationData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const deleteReceiptAllocation = createAsyncThunk(
  "receiptAllocation/delete",
  async (id, { getState, rejectWithValue }) => {
    try {
      const {
        getUsers: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.delete(
        `${djangoUrl}/api/finance/receipt-allocations/${id}/`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Thunks for PaymentAllocation Actions
export const listPaymentAllocations = createAsyncThunk(
  "paymentAllocation/list",
  async (_, { getState, rejectWithValue }) => {
    try {
      const {
        getUsers: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(
        `${djangoUrl}/api/finance/payment-allocations/`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const paymentAllocationDetails = createAsyncThunk(
  "paymentAllocation/details",
  async (id, { getState, rejectWithValue }) => {
    try {
      const {
        getUsers: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(
        `${djangoUrl}/api/finance/payment-allocations/${id}`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const createPaymentAllocation = createAsyncThunk(
  "paymentAllocation/create",
  async (paymentAllocationData, { getState, rejectWithValue }) => {
    try {
      const {
        getUsers: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        `${djangoUrl}/api/finance/payment-allocations/`,
        paymentAllocationData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const updatePaymentAllocation = createAsyncThunk(
  "paymentAllocation/update",
  async ({ id, paymentAllocationData }, { getState, rejectWithValue }) => {
    try {
      const {
        getUsers: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `${djangoUrl}/api/finance/payment-allocations/${id}/`,
        paymentAllocationData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const deletePaymentAllocation = createAsyncThunk(
  "paymentAllocation/delete",
  async (id, { getState, rejectWithValue }) => {
    try {
      const {
        getUsers: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.delete(
        `${djangoUrl}/api/finance/payment-allocations/${id}/`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// Slice for Finance State Management
const financeSlice = createSlice({
  name: "finance",
  initialState: {
    receiptAllocations: [],
    receiptAllocation: null,
    paymentAllocations: [],
    paymentAllocation: null,
    loading: false,
    error: null,
    successCreate: false,
    loadingCreate: false,
    errorCreate: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ReceiptAllocations
      .addCase(listReceiptAllocations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listReceiptAllocations.fulfilled, (state, action) => {
        state.loading = false;
        state.receiptAllocations = action.payload;
      })
      .addCase(listReceiptAllocations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(receiptAllocationDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(receiptAllocationDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.receiptAllocation = action.payload;
      })
      .addCase(receiptAllocationDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createReceiptAllocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReceiptAllocation.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createReceiptAllocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateReceiptAllocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateReceiptAllocation.fulfilled, (state, action) => {
        state.loading = false;
        state.receiptAllocation = action.payload;
      })
      .addCase(updateReceiptAllocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteReceiptAllocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReceiptAllocation.fulfilled, (state, action) => {
        state.loading = false;
        state.receiptAllocations = state.receiptAllocations.filter(
          (receiptAllocation) => receiptAllocation.id !== action.payload.id
        );
      })
      .addCase(deleteReceiptAllocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // PaymentAllocations
      .addCase(listPaymentAllocations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listPaymentAllocations.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentAllocations = action.payload;
      })
      .addCase(listPaymentAllocations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(paymentAllocationDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(paymentAllocationDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentAllocation = action.payload;
      })
      .addCase(paymentAllocationDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createPaymentAllocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPaymentAllocation.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createPaymentAllocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updatePaymentAllocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePaymentAllocation.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentAllocation = action.payload;
      })
      .addCase(updatePaymentAllocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deletePaymentAllocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePaymentAllocation.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentAllocations = state.paymentAllocations.filter(
          (paymentAllocation) => paymentAllocation.id !== action.payload.id
        );
      })
      .addCase(deletePaymentAllocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default financeSlice.reducer;
