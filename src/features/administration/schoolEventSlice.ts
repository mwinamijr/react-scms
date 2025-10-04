import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { djangoUrl, getErrorMessage } from "../utils";

export interface SchoolEvent {
  id: number;
  name: string;
  event_type: string;
  term: number;
  term_name?: string;
  academic_year?: string;
  start_date: string;
  end_date: string | null;
  description?: string;
}

interface SchoolEventState {
  events: SchoolEvent[];
  loading: boolean;
  error: string | null;
}

const initialState: SchoolEventState = {
  events: [],
  loading: false,
  error: null,
};

export const fetchEvents = createAsyncThunk(
  "schoolEvents/fetch",
  async (_, thunkAPI) => {
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
      const res = await axios.get(
        `${djangoUrl}/api/administration/school-events/`,
        config
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const createEvent = createAsyncThunk(
  "schoolEvents/create",
  async (data: Partial<SchoolEvent>, thunkAPI) => {
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
      const res = await axios.post(
        `${djangoUrl}/api/administration/school-events/`,
        data,
        config
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const updateEvent = createAsyncThunk(
  "schoolEvents/update",
  async (
    { id, data }: { id: number; data: Partial<SchoolEvent> },
    thunkAPI
  ) => {
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
      const res = await axios.put(
        `${djangoUrl}/api/administration/school-events/${id}/`,
        data,
        config
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const deleteEvent = createAsyncThunk(
  "schoolEvents/delete",
  async (id: number, thunkAPI) => {
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
      await axios.delete(
        `${djangoUrl}/api/administration/school-events/${id}/`,
        config
      );
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const uploadExcel = createAsyncThunk(
  "schoolEvents/bulkUpload",
  async (file: File, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const { getState } = thunkAPI;
      const {
        getUsers: { userInfo },
      } = getState() as { getUsers: { userInfo: { access: string } } };

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.access}`,
        },
      };
      const res = await axios.post(
        `${djangoUrl}/api/administration/school-events/bulk-upload/`,
        formData,
        config
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

const schoolEventSlice = createSlice({
  name: "schoolEvents",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH EVENTS
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchEvents.fulfilled,
        (state, action: PayloadAction<SchoolEvent[]>) => {
          state.loading = false;
          state.events = action.payload;
        }
      )
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // CREATE EVENT
      .addCase(createEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createEvent.fulfilled,
        (state, action: PayloadAction<SchoolEvent>) => {
          state.loading = false;
          state.events.push(action.payload);
        }
      )
      .addCase(createEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // UPDATE EVENT
      .addCase(updateEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateEvent.fulfilled,
        (state, action: PayloadAction<SchoolEvent>) => {
          state.loading = false;
          state.events = state.events.map((event) =>
            event.id === action.payload.id ? action.payload : event
          );
        }
      )
      .addCase(updateEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // DELETE EVENT
      .addCase(deleteEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteEvent.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.loading = false;
          state.events = state.events.filter(
            (event) => event.id !== action.payload
          );
        }
      )
      .addCase(deleteEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // UPLOAD EXCEL
      .addCase(uploadExcel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        uploadExcel.fulfilled,
        (state, action: PayloadAction<SchoolEvent[]>) => {
          state.loading = false;
          state.events = [...state.events, ...action.payload];
        }
      )
      .addCase(uploadExcel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default schoolEventSlice.reducer;
