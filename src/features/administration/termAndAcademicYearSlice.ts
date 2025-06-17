import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { djangoUrl } from "../utils";
import { getErrorMessage } from "../utils";

export interface AcademicYear {
  id: number;
  name: string;
  start_date: string;
  end_date: string | null;
  active_year: boolean;
}

export interface Term {
  id: number;
  name: string;
  academic_year: string;
  default_term_fee: number;
  start_date: string;
  end_date: string | null;
}

interface TermAndAcademicYearState {
  academicYears: AcademicYear[];
  terms: Term[];
  loading: boolean;
  error: string | null;
  loadingCreate: boolean;
  loadingUpdate: boolean;
  successCreate: boolean;
  successUpdate: boolean;
}

const initialState: TermAndAcademicYearState = {
  academicYears: [],
  terms: [],
  loading: false,
  error: null,
  loadingCreate: false,
  loadingUpdate: false,
  successCreate: false,
  successUpdate: false,
};

export const fetchAcademicYears = createAsyncThunk(
  "schoolAcademicYears/fetch",
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
      const res = await axios.get(
        `${djangoUrl}/api/administration/academic-years/`,
        config
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const createAcademicYear = createAsyncThunk(
  "schoolAcademicYears/create",
  async (data: Partial<AcademicYear>, thunkAPI) => {
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
      const res = await axios.post(
        `${djangoUrl}/api/administration/academic-years/`,
        data,
        config
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const updateAcademicYear = createAsyncThunk(
  "schoolAcademicYears/update",
  async (
    { id, data }: { id: number; data: Partial<AcademicYear> },
    thunkAPI
  ) => {
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
      const res = await axios.put(
        `${djangoUrl}/api/administration/academic-years/${id}/`,
        data,
        config
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const deleteAcademicYear = createAsyncThunk(
  "schoolAcademicYears/delete",
  async (id: number, thunkAPI) => {
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
        `${djangoUrl}/api/administration/academic-years/${id}/`,
        config
      );
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const fetchTerms = createAsyncThunk(
  "schoolTerms/fetch",
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
      const res = await axios.get(
        `${djangoUrl}/api/administration/terms/`,
        config
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const createTerm = createAsyncThunk(
  "schoolTerms/create",
  async (data: Partial<Term>, thunkAPI) => {
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
      const res = await axios.post(
        `${djangoUrl}/api/administration/terms/`,
        data,
        config
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const updateTerm = createAsyncThunk(
  "schoolTerms/update",
  async ({ id, data }: { id: number; data: Partial<Term> }, thunkAPI) => {
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
      const res = await axios.put(
        `${djangoUrl}/api/administration/terms/${id}/`,
        data,
        config
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const deleteTerm = createAsyncThunk(
  "schoolTerms/delete",
  async (id: number, thunkAPI) => {
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
        `${djangoUrl}/api/administration/terms/${id}/`,
        config
      );
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

const termAndAcademicYearSlice = createSlice({
  name: "schoolTermsAndYears",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAcademicYears.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAcademicYears.fulfilled,
        (state, action: PayloadAction<AcademicYear[]>) => {
          state.loading = false;
          state.academicYears = action.payload;
        }
      )
      .addCase(fetchAcademicYears.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(createAcademicYear.pending, (state) => {
        state.loadingCreate = true;
        state.successCreate = false;
        state.error = null;
      })
      .addCase(
        createAcademicYear.fulfilled,
        (state, action: PayloadAction<AcademicYear>) => {
          state.loadingCreate = false;
          state.successCreate = true;
          state.academicYears.push(action.payload);
        }
      )
      .addCase(createAcademicYear.rejected, (state, action) => {
        state.loadingCreate = false;
        state.successCreate = false;
        state.error = action.payload as string;
      })

      .addCase(updateAcademicYear.pending, (state) => {
        state.loadingUpdate = true;
        state.successUpdate = false;
        state.error = null;
      })
      .addCase(
        updateAcademicYear.fulfilled,
        (state, action: PayloadAction<AcademicYear>) => {
          state.loadingUpdate = false;
          state.successUpdate = true;
          state.academicYears = state.academicYears.map((academicYear) =>
            academicYear.id === action.payload.id
              ? action.payload
              : academicYear
          );
        }
      )
      .addCase(updateAcademicYear.rejected, (state, action) => {
        state.loadingUpdate = false;
        state.successUpdate = false;
        state.error = action.payload as string;
      })

      .addCase(deleteAcademicYear.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteAcademicYear.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.loading = false;
          state.academicYears = state.academicYears.filter(
            (academicYear) => academicYear.id !== action.payload
          );
        }
      )
      .addCase(deleteAcademicYear.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchTerms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTerms.fulfilled, (state, action: PayloadAction<Term[]>) => {
        state.loading = false;
        state.terms = action.payload;
      })
      .addCase(fetchTerms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(createTerm.pending, (state) => {
        state.loadingCreate = true;
        state.error = null;
      })
      .addCase(createTerm.fulfilled, (state, action: PayloadAction<Term>) => {
        state.loadingCreate = false;
        state.terms.push(action.payload);
      })
      .addCase(createTerm.rejected, (state, action) => {
        state.loadingCreate = false;
        state.error = action.payload as string;
      })

      .addCase(updateTerm.pending, (state) => {
        state.loadingUpdate = true;
        state.error = null;
      })
      .addCase(updateTerm.fulfilled, (state, action: PayloadAction<Term>) => {
        state.loadingUpdate = false;
        state.terms = state.terms.map((term) =>
          term.id === action.payload.id ? action.payload : term
        );
      })
      .addCase(updateTerm.rejected, (state, action) => {
        state.loadingUpdate = false;
        state.error = action.payload as string;
      })

      .addCase(deleteTerm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTerm.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.terms = state.terms.filter((term) => term.id !== action.payload);
      })
      .addCase(deleteTerm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default termAndAcademicYearSlice.reducer;
