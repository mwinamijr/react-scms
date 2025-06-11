import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { djangoUrl } from "../utils";
import { getErrorMessage } from "../utils";

// Define TypeScript interfaces for Parent and state
interface Parent {
  id: number;
  // Add other parent fields as needed, e.g.:
  // name: string;
  // email: string;
  // ...
}

interface ParentListResponse {
  results: Parent[];
  count: number;
  next?: string | null;
  previous?: string | null;
  // Add pagination metadata if needed
}

interface ParentState {
  parent: Parent | null;
  parents: Parent[];
  loading: boolean;
  error: string | null;
  successDelete: boolean;
}

// Define thunk params and return types
type ParentFilters = Record<string, any>; // or more specific filters interface

export const parentDetails = createAsyncThunk<
  Parent, // Return type
  number, // Argument type (id)
  { state: any; rejectValue: string } // thunkAPI types
>("parent/details", async (id, { getState, rejectWithValue }) => {
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
    const { data } = await axios.get<Parent>(
      `${djangoUrl}/api/users/parents/${id}/`,
      config
    );
    return data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const listParents = createAsyncThunk<
  Parent[], // Return type - simplified to array of Parent
  ParentFilters | undefined, // Argument type (filters)
  { state: any; rejectValue: string }
>("parent/list", async (filters = {}, { getState, rejectWithValue }) => {
  try {
    const {
      getUsers: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      params: filters,
    };
    const response = await axios.get<ParentListResponse>(
      `${djangoUrl}/api/users/parents/`,
      config
    );
    return response.data.results; // return only the array of parents
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const deleteParent = createAsyncThunk<
  number, // Return type: ID of deleted parent
  number, // Argument type: ID
  { state: any; rejectValue: string }
>("user/delete", async (id, { getState, rejectWithValue }) => {
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
    await axios.delete(`${djangoUrl}/api/users/users/delete/${id}/`, config);
    return id;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// Initial state typed
const initialState: ParentState = {
  parent: null,
  parents: [],
  loading: false,
  error: null,
  successDelete: false,
};

const parentSlice = createSlice({
  name: "parent",
  initialState,
  reducers: {
    resetSuccessDelete(state) {
      state.successDelete = false;
    },
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(parentDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        parentDetails.fulfilled,
        (state, action: PayloadAction<Parent>) => {
          state.loading = false;
          state.parent = action.payload;
        }
      )
      .addCase(parentDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(listParents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        listParents.fulfilled,
        (state, action: PayloadAction<Parent[]>) => {
          state.loading = false;
          state.parents = action.payload;
        }
      )
      .addCase(listParents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(deleteParent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteParent.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.loading = false;
          state.successDelete = true;
          state.parents = state.parents.filter(
            (parent) => parent.id !== action.payload
          );
        }
      )
      .addCase(deleteParent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetSuccessDelete, resetError } = parentSlice.actions;
export default parentSlice.reducer;
