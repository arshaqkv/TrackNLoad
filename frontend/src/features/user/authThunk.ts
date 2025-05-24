import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUserAPI, logoutUserAPI } from "../../api/authApi";
import {
  createOrderAPI,
  getOrdersForTDAPI,
  getProductsForTDAPI,
  getVendorForTDAPI,
} from "../../api/truckDriverApi";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data: { mobile: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await loginUserAPI(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await logoutUserAPI();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const getVendorsForTD = createAsyncThunk(
  "auth/allVendors",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getVendorForTDAPI();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const getProductsForTD = createAsyncThunk(
  "auth/allProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getProductsForTDAPI();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const createOrder = createAsyncThunk(
  "auth/createOrder",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await createOrderAPI(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);


export const getOrdersForTD = createAsyncThunk(
  "auth/getOrderForTD",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getOrdersForTDAPI();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

