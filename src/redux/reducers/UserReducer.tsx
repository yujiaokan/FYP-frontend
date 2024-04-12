
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

export const submitFormAsync = createAsyncThunk(
  'form/submitFormAsync',
  async (formData: { name: string, email: string,phone:string,address:string,city:string,country:string ,eircode:string,chargertypes:string,availbleTime:string,description:string,image:string,useruid:string,coordinate:Object}, { rejectWithValue }) => {
    try {
      const response = await fetch('https://fyp-server-dh91.onrender.com/api/v1/maps/charger', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data:any = await response.json();
      console.log("User id is ",data);
      return data;
    } catch (error:any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateFormAsync = createAsyncThunk(
  'form/updateFormAsync',
  async (updateData: { userId: number; formData: {address:string,email:string,phone:string,city:string,eircode:string,availbleTime:string,description:string,coordinate:Object} }, { rejectWithValue }) => {
    const { userId, formData } = updateData;
    try {
      console.log("reducer",formData);
      const response = await fetch(`http://192.168.0.11:5000/api/v1/maps/updateprofile/${userId}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitFormAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(submitFormAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload;
      })
      .addCase(submitFormAsync.rejected, (state) => {
        state.status = 'failed';
      });

      builder
    .addCase(updateFormAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(updateFormAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      // Update the state with the new data
      state.data = action.payload;
    })
    .addCase(updateFormAsync.rejected, (state) => {
      state.status = 'failed';
    });
  },
});



export const selectFormData = (state: RootState) => state.form.data;

export default formSlice.reducer;
