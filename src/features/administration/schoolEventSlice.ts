import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { djangoUrl } from "../utils";
import { getErrorMessage } from "../utils";

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
      } = getState() as { getUsers: { userInfo: { token: string } } };

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
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
      } = getState() as { getUsers: { userInfo: { token: string } } };

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
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
      } = getState() as { getUsers: { userInfo: { token: string } } };

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
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
      } = getState() as { getUsers: { userInfo: { token: string } } };

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
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
      } = getState() as { getUsers: { userInfo: { token: string } } };

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
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
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
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
        state.error = action.error.message || "Failed to fetch events";
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.events = state.events.filter((e) => e.id !== action.payload);
      });
  },
});

export default schoolEventSlice.reducer;
