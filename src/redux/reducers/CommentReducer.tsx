import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {  RootState } from '../Store';

interface FormState {
  data: any;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: FormState = {
  data: null,
  status: 'idle',
};

export const submitComFormAsync = createAsyncThunk(
  'form/submitComFormAsync',
  async ( comformData: {chargerId:number,userName:String,commentText:String,useruuid:string}, { rejectWithValue }) => {
    const { chargerId, userName, commentText, useruuid} = comformData;
    try {
      
      const response = await fetch(`https://fyp-server-dh91.onrender.com/api/v1/comments/postcomments/${chargerId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userName,commentText,useruuid}),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data:any = await response.json();
      return data;
    } catch (error:any) {
      return rejectWithValue(error.message);
    }
  }
);



export const comformSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitComFormAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(submitComFormAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload;
      })
      .addCase(submitComFormAsync.rejected, (state) => {
        state.status = 'failed';
      });   
  },
});

export const selectFormData = (state: RootState) => state.form.data;
export default comformSlice.reducer;
