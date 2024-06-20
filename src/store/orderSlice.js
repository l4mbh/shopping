import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER;


const orderState = {orders: []};

const createOrder = createAsyncThunk(
  "order/createOrder",
  async ( order , thunkAPI) => {
    try {
      const response = await axios.post(
        `${SERVER_URL}/order/`,order,
        { withCredentials: true }
      );
      if (response.status !== 200) {
        return thunkAPI.rejectWithValue(response.data);
      }
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const getOrder = createAsyncThunk(
  "order/getOrder",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${SERVER_URL}/order/`,
        { withCredentials: true }
      );
      if (response.status !== 200) {
        return thunkAPI.rejectWithValue(response.data);
      }
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: orderState,
  extraReducers:{
    [createOrder.fulfilled]: (state, action) => {
      state.loading = false;
      console.log(action.payload);
      state.orders = action.payload.orders;
    },
    [createOrder.rejected]: (state, action) => {
      state.loading = false;
      if (action.payload) {
        console.log(action.payload);
      }
    },
    [createOrder.pending]: (state) => {
      state.loading = true;
    },

    [getOrder.fulfilled]: (state, action) => {
      state.loading = false;
      state.orders = action.payload.orders;
    },
    [getOrder.rejected]: (state, action) => {
      state.loading = false;
      if (action.payload) {
        console.log(action.payload);
      }
    },
    [getOrder.pending]: (state) => {  
      state.loading = true;
    },
  }
});

export default orderSlice.reducer;
export { createOrder, getOrder };