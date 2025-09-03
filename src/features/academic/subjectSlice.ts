import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import type { RootState } from "../../app/store";
import { djangoUrl, getErrorMessage } from "../utils";

interface Subject {
  id: number;
  name: string;
  subject_code: string;
  is_selectable: boolean;
  graded: boolean;
  department: string;
  description: string;
}

interface SubjectState {
  subject: Subject | null;
  subjects: Subject[];
  loading: boolean;
  error: string | null;
  createdSubject: Subject | null;
  successCreate: boolean;
  loadingCreate: boolean;
  errorCreate: string | null;
}

interface UpdateSubjectPayload {
  id: number;
}

export const getSubjectDetails = createAsyncThunk<
  Subject,
  number,
  { state: RootState; rejectValue: string }
>("subject/details", async (id, thunkAPI) => {
  try {
    const { getState } = thunkAPI;
    const {
      getUsers: { userInfo },
    } = getState() as { getUsers: { userInfo: { access: string } } };

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get<Subject>(
      `${djangoUrl}/api/academic/subjects/${id}/`,
      config
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const listSubjects = createAsyncThunk<
  Subject[],
  void,
  { state: RootState; rejectValue: string }
>("subject/list", async (_, thunkAPI) => {
  try {
    const { getState } = thunkAPI;
    const {
      getUsers: { userInfo },
    } = getState() as { getUsers: { userInfo: { access: string } } };

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.get<Subject[]>(
      `${djangoUrl}/api/academic/subjects/`,
      config
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const createSubject = createAsyncThunk<
  Subject,
  Partial<Subject>,
  { state: RootState; rejectValue: string }
>("subject/create", async (subjectData, thunkAPI) => {
  try {
    const { getState } = thunkAPI;
    const {
      getUsers: { userInfo },
    } = getState() as { getUsers: { userInfo: { access: string } } };

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.post<Subject>(
      `${djangoUrl}/api/academic/subjects/`,
      subjectData,
      config
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const bulkCreateSubjects = createAsyncThunk<
  void,
  File,
  { state: RootState; rejectValue: string }
>("subject/bulkCreate", async (file, thunkAPI) => {
  try {
    const { getState } = thunkAPI;
    const {
      getUsers: { userInfo },
    } = getState() as { getUsers: { userInfo: { access: string } } };

    const formData = new FormData();
    formData.append("file", file);

    const config = {
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    await axios.post(
      `${djangoUrl}/api/academic/subjects/bulk-upload/`,
      formData,
      config
    );
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const deleteSubject = createAsyncThunk<
  number,
  number,
  { state: RootState; rejectValue: string }
>("subject/delete", async (id, thunkAPI) => {
  try {
    const { getState } = thunkAPI;
    const {
      getUsers: { userInfo },
    } = getState() as { getUsers: { userInfo: { access: string } } };

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    await axios.delete(`${djangoUrl}/api/academic/subjects/${id}/`, config);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const updateSubject = createAsyncThunk<
  Subject,
  UpdateSubjectPayload,
  { state: RootState; rejectValue: string }
>("subject/update", async ({ id, ...values }, thunkAPI) => {
  try {
    const { getState } = thunkAPI;
    const {
      getUsers: { userInfo },
    } = getState() as { getUsers: { userInfo: { access: string } } };

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.put<Subject>(
      `${djangoUrl}/api/academic/subjects/${id}/`,
      values,
      config
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

// ====================

const initialState: SubjectState = {
  subject: null,
  subjects: [],
  loading: false,
  error: null,
  createdSubject: null,
  successCreate: false,
  loadingCreate: false,
  errorCreate: null,
};

const subjectSlice = createSlice({
  name: "subject",
  initialState,
  reducers: {
    resetCreateState: (state) => {
      state.successCreate = false;
      state.createdSubject = null;
      state.errorCreate = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Subject Details
      .addCase(getSubjectDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getSubjectDetails.fulfilled,
        (state, action: PayloadAction<Subject>) => {
          state.loading = false;
          state.subject = action.payload;
        }
      )
      .addCase(getSubjectDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
      })

      // List Subjects
      .addCase(listSubjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        listSubjects.fulfilled,
        (state, action: PayloadAction<Subject[]>) => {
          state.loading = false;
          state.subjects = action.payload;
        }
      )
      .addCase(listSubjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
      })

      // Create Subject
      .addCase(createSubject.pending, (state) => {
        state.loadingCreate = true;
        state.errorCreate = null;
      })
      .addCase(
        createSubject.fulfilled,
        (state, action: PayloadAction<Subject>) => {
          state.loadingCreate = false;
          state.successCreate = true;
          state.createdSubject = action.payload;
        }
      )
      .addCase(createSubject.rejected, (state, action) => {
        state.loadingCreate = false;
        state.errorCreate = action.payload || null;
      })

      // Delete Subject
      .addCase(deleteSubject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteSubject.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.loading = false;
          state.subjects = state.subjects.filter(
            (subject) => subject.id !== action.payload
          );
        }
      )
      .addCase(deleteSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
      })

      // Update Subject
      .addCase(updateSubject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateSubject.fulfilled,
        (state, action: PayloadAction<Subject>) => {
          state.loading = false;
          state.subject = action.payload;
        }
      )
      .addCase(updateSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
      })

      // Bulk Create
      .addCase(bulkCreateSubjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bulkCreateSubjects.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(bulkCreateSubjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || null;
      });
  },
});

export const { resetCreateState } = subjectSlice.actions;
export default subjectSlice.reducer;
