import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { getErrorMessage } from "../utils";
import { djangoUrl } from "../utils";
import type { RootState } from "../../app/store";

// === Types ===
interface Allocation {
  id: number;
  [key: string]: any;
}

interface FinanceState {
  receiptAllocations: Allocation[];
  receiptAllocation: Allocation | null;
  paymentAllocations: Allocation[];
  paymentAllocation: Allocation | null;
  loading: boolean;
  error: string | null;
  successCreate: boolean;
  loadingCreate: boolean;
  errorCreate: string | null;
}

interface UpdatePayload {
  id: number;
  receiptAllocationData?: Allocation;
  paymentAllocationData?: Allocation;
}

// === Thunks: Receipt ===
export const listReceiptAllocations = createAsyncThunk<
  Allocation[],
  void,
  { state: RootState; rejectValue: string }
>("receiptAllocation/list", async (_, thunkAPI) => {
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
      `${djangoUrl}/api/finance/receipt-allocations/`,
      config
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const receiptAllocationDetails = createAsyncThunk<
  Allocation,
  number,
  { state: RootState; rejectValue: string }
>("receiptAllocation/details", async (id, thunkAPI) => {
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
      `${djangoUrl}/api/finance/receipt-allocations/${id}`,
      config
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const createReceiptAllocation = createAsyncThunk<
  Allocation,
  { state: RootState; rejectValue: string }
>("receiptAllocation/create", async (payload, thunkAPI) => {
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
      `${djangoUrl}/api/finance/receipt-allocations/`,
      payload,
      config
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const updateReceiptAllocation = createAsyncThunk<
  Allocation,
  UpdatePayload,
  { state: RootState; rejectValue: string }
>(
  "receiptAllocation/update",
  async ({ id, receiptAllocationData }, thunkAPI) => {
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
        `${djangoUrl}/api/finance/receipt-allocations/${id}/`,
        receiptAllocationData,
        config
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const deleteReceiptAllocation = createAsyncThunk<
  { id: number },
  number,
  { state: RootState; rejectValue: string }
>("receiptAllocation/delete", async (id, thunkAPI) => {
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
    await axios.delete(
      `${djangoUrl}/api/finance/receipt-allocations/${id}/`,
      config
    );
    return { id };
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

// === Thunks: Payment ===
export const listPaymentAllocations = createAsyncThunk<
  Allocation[],
  void,
  { state: RootState; rejectValue: string }
>("paymentAllocation/list", async (_, thunkAPI) => {
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
      `${djangoUrl}/api/finance/payment-allocations/`,
      config
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const paymentAllocationDetails = createAsyncThunk<
  Allocation,
  number,
  { state: RootState; rejectValue: string }
>("paymentAllocation/details", async (id, thunkAPI) => {
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
      `${djangoUrl}/api/finance/payment-allocations/${id}`,
      config
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const createPaymentAllocation = createAsyncThunk<
  Allocation,
  Allocation,
  { state: RootState; rejectValue: string }
>("paymentAllocation/create", async (payload, thunkAPI) => {
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
      `${djangoUrl}/api/finance/payment-allocations/`,
      payload,
      config
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const updatePaymentAllocation = createAsyncThunk<
  Allocation,
  UpdatePayload,
  { state: RootState; rejectValue: string }
>(
  "paymentAllocation/update",
  async ({ id, paymentAllocationData }, thunkAPI) => {
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
        `${djangoUrl}/api/finance/payment-allocations/${id}/`,
        paymentAllocationData,
        config
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const deletePaymentAllocation = createAsyncThunk<
  { id: number },
  number,
  { state: RootState; rejectValue: string }
>("paymentAllocation/delete", async (id, thunkAPI) => {
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
    await axios.delete(
      `${djangoUrl}/api/finance/payment-allocations/${id}/`,
      config
    );
    return { id };
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

// === Slice ===
const initialState: FinanceState = {
  receiptAllocations: [],
  receiptAllocation: null,
  paymentAllocations: [],
  paymentAllocation: null,
  loading: false,
  error: null,
  successCreate: false,
  loadingCreate: false,
  errorCreate: null,
};

const financeSlice = createSlice({
  name: "finance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listReceiptAllocations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        listReceiptAllocations.fulfilled,
        (state, action: PayloadAction<Allocation[]>) => {
          state.loading = false;
          state.receiptAllocations = action.payload;
        }
      )
      .addCase(listReceiptAllocations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Error loading receipt allocations";
      });
    // ... continue handling all other thunks similarly
  },
});

export default financeSlice.reducer;
