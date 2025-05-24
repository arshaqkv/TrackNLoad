import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createProductAPI,
  createTruckDriverAPI,
  createVendorAPI,
  deleteProductAPI,
  deleteTruckDriverAPI,
  deleteVendorAPI,
  editProductAPI,
  editTruckDriverAPI,
  editVendorAPI,
  getAllOrdersAPI,
  getAllProductsAPI,
  getAllTruckDriversAPI,
  getAllVendorsAPI,
  getProductAPI,
  getTruckDriverAPI,
  getVendorAPI,
  loginAdminAPI,
} from "../../api/adminApi";

export const loginAdmin = createAsyncThunk(
  "auth/Adminlogin",
  async (data: { mobile: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await loginAdminAPI(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const getAllTruckDrivers = createAsyncThunk(
  "admin/allTruckDrivers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllTruckDriversAPI();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const getAllVendors = createAsyncThunk(
  "admin/allVendors",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllVendorsAPI();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const getAllProducts = createAsyncThunk(
  "admin/allProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllProductsAPI();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const createTruckDriver = createAsyncThunk(
  "admin/createTruckDriver",
  async (
    data: {
      name: string;
      mobile: string;
      password: string;
      address: string;
      dlNumber: string;
      profilePic?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await createTruckDriverAPI(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const editTruckDriver = createAsyncThunk(
  "admin/editTruckDriver",
  async (
    {
      id,
      data,
    }: {
      id: string;
      data: {
        name: string;
        mobile: string;
        address: string;
        dlNumber: string;
        profilePic?: string;
      };
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await editTruckDriverAPI(id, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const getTruckDriver = createAsyncThunk(
  "admin/getTruckDriver",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await getTruckDriverAPI(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const deleteTruckDriver = createAsyncThunk(
  "admin/deleteTruckDriver",
  async (id: any, { rejectWithValue }) => {
    try {
      const response = await deleteTruckDriverAPI(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const createVendor = createAsyncThunk(
  "admin/createVendor",
  async (
    data: {
      name: string;
      email: string;
      phone: string;
      location: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await createVendorAPI(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const editVendor = createAsyncThunk(
  "admin/editVendor",
  async (
    {
      id,
      data,
    }: {
      id: string;
      data: {
        name: string;
        email: string;
        phone: string;
        location: string;
      };
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await editVendorAPI(id, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const getVendor = createAsyncThunk(
  "admin/getVendor",
  async (id: any, { rejectWithValue }) => {
    try {
      const response = await getVendorAPI(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const deleteVendor = createAsyncThunk(
  "admin/deleteVendor",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await deleteVendorAPI(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const createProduct = createAsyncThunk(
  "admin/createProduct",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await createProductAPI(formData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const editProduct = createAsyncThunk(
  "admin/editProduct",
  async (
    {
      id,
      formData,
    }: {
      id: string;
      formData: FormData;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await editProductAPI(id, formData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const getProduct = createAsyncThunk(
  "admin/getProduct",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await getProductAPI(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "admin/deleteProduct",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await deleteProductAPI(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const getAllOrders = createAsyncThunk(
  "admin/getOrder",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllOrdersAPI();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
