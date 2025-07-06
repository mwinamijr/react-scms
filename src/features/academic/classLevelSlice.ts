import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../../app/store"; // Adjust the import path as necessary
import { djangoUrl, getErrorMessage } from "../utils";

// Type Definitions
interface ClassLevel {
  id: number;
  name: string;
}

interface ClassLevelState {
  classLevel: ClassLevel | null;
  classLevels: ClassLevel[];
  loading: boolean;
  error: string | null;
  createdClassLevel: ClassLevel | null;
  successCreate: boolean;
  loadingCreate: boolean;
  errorCreate: string | null;
}

// Async Thunks
export const getClassLevelDetails = createAsyncThunk<
  ClassLevel,
  number,
  { state: RootState; rejectValue: string }
>("classLevel/details", async (id, thunkAPI) => {
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
      `${djangoUrl}/api/academic/class-levels/${id}/`,
      config
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const listClassLevels = createAsyncThunk<
  ClassLevel[],
  void,
  { state: RootState; rejectValue: string }
>("classLevel/list", async (_, thunkAPI) => {
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
      `${djangoUrl}/api/academic/class-levels/`,
      config
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const createClassLevel = createAsyncThunk<
  ClassLevel,
  Partial<ClassLevel>,
  { state: RootState; rejectValue: string }
>("classLevel/create", async (classLevelData, thunkAPI) => {
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
      `${djangoUrl}/api/academic/class-levels/`,
      classLevelData,
      config
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const deleteClassLevel = createAsyncThunk<
  number,
  number,
  { state: RootState; rejectValue: string }
>("classLevel/delete", async (id, thunkAPI) => {
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
    await axios.delete(`${djangoUrl}/api/academic/class-levels/${id}/`, config);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const updateClassLevel = createAsyncThunk<
  ClassLevel,
  { id: number } & Partial<ClassLevel>,
  { state: RootState; rejectValue: string }
>("classLevel/update", async ({ id, ...values }, thunkAPI) => {
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
      `${djangoUrl}/api/academic/class-levels/${id}/`,
      values,
      config
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

// Slice
const initialState: ClassLevelState = {
  classLevel: null,
  classLevels: [],
  loading: false,
  error: null,
  createdClassLevel: null,
  successCreate: false,
  loadingCreate: false,
  errorCreate: null,
};

const classLevelSlice = createSlice({
  name: "classLevel",
  initialState,
  reducers: {
    resetCreateState: (state) => {
      state.successCreate = false;
      state.createdClassLevel = null;
      state.errorCreate = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Details
      .addCase(getClassLevelDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getClassLevelDetails.fulfilled,
        (state, action: PayloadAction<ClassLevel>) => {
          state.loading = false;
          state.classLevel = action.payload;
        }
      )
      .addCase(getClassLevelDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch class level details";
      })

      // List
      .addCase(listClassLevels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        listClassLevels.fulfilled,
        (state, action: PayloadAction<ClassLevel[]>) => {
          state.loading = false;
          state.classLevels = action.payload;
        }
      )
      .addCase(listClassLevels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch class levels";
      })

      // Create
      .addCase(createClassLevel.pending, (state) => {
        state.loadingCreate = true;
        state.errorCreate = null;
      })
      .addCase(
        createClassLevel.fulfilled,
        (state, action: PayloadAction<ClassLevel>) => {
          state.loadingCreate = false;
          state.successCreate = true;
          state.createdClassLevel = action.payload;
        }
      )
      .addCase(createClassLevel.rejected, (state, action) => {
        state.loadingCreate = false;
        state.errorCreate = action.payload || "Failed to create class level";
      })

      // Delete
      .addCase(deleteClassLevel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteClassLevel.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.loading = false;
          state.classLevels = state.classLevels.filter(
            (classLevel) => classLevel.id !== action.payload
          );
        }
      )
      .addCase(deleteClassLevel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete class level";
      })

      // Update
      .addCase(updateClassLevel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateClassLevel.fulfilled,
        (state, action: PayloadAction<ClassLevel>) => {
          state.loading = false;
          state.classLevel = action.payload;
        }
      )
      .addCase(updateClassLevel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update class level";
      });
  },
});

// Export
export const { resetCreateState } = classLevelSlice.actions;
export default classLevelSlice.reducer;
