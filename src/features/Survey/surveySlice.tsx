import { AxiosError } from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '@/core/api';

interface SurveyState {
  data: any;
  submitting: boolean;
}

export const submitAnswer = createAsyncThunk(
  'survey/submitAnswer',
  async (data: { payload: any; includesFiles: boolean }) => {
    try {
      const response = await api.post('submission_create/', data.payload, {
        headers: data.includesFiles
          ? {
              Accept: 'application/json',
              'content-type': 'multipart/form-data'
            }
          : {}
      });
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return {
        status: 'error',
        ...err.response
      };
    }
  }
);

export const surveySlice = createSlice({
  name: 'survey',
  initialState: {
    data: {},
    submitting: false
  } as SurveyState,
  reducers: {
    setData: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
    resetData: (state) => {
      state.data = {};
    }
  },
  extraReducers: builder => {
    builder.addCase(submitAnswer.fulfilled, (state, { payload }) => {
      state.submitting = false;
    });
    builder.addCase(submitAnswer.pending, (state, { payload }) => {
      state.submitting = true;
    });
    builder.addCase(submitAnswer.rejected, (state, { payload }) => {
      state.submitting = false;
    });
  }
});

export const { setData, resetData } = surveySlice.actions;
