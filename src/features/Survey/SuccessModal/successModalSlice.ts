import { createSlice } from '@reduxjs/toolkit';

export const successModalSlice = createSlice({
  name: 'successModal',
  initialState: {
    isOpen: false,
  },
  reducers: {
    openSuccessModal: state => {
      state.isOpen = true;
    },
    closeSuccessModal: state => {
      state.isOpen = false;
    }
  }
});

export const { openSuccessModal, closeSuccessModal } = successModalSlice.actions;
