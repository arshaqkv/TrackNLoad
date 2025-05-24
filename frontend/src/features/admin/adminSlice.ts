import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getAllOrders,
  getAllProducts,
  getAllTruckDrivers,
  getAllVendors,
} from "./adminThunk";

export interface User {
  _id: string;
  name: string;
  mobile: string;
  address: string;
  dlNumber: string;
  profilePic?: string;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
}

export interface Vendor {
  _id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
}

// 2. Define state type
export interface AdminState {
  loading: boolean;
  error: string | null;
  message: string | null;
  truckDrivers: User[] | null;
  vendors: Vendor[] | null;
  products: Product[] | null;
  orders: any | null;
}

// 3. Initial state
const initialState: AdminState = {
  loading: false,
  error: null,
  message: null,
  truckDrivers: null,
  vendors: null,
  products: null,
  orders: null,
};

// 4. Create the slice
const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    startLoading(state) {
      state.loading = true;
      state.error = null;
    },
    endLoading(state) {
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Truck Drivers
      .addCase(getAllTruckDrivers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllTruckDrivers.fulfilled,
        (state, action: PayloadAction<{ users: User[] }>) => {
          state.loading = false;
          state.truckDrivers = action.payload.users;
        }
      )
      .addCase(
        getAllTruckDrivers.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // Vendors
      .addCase(getAllVendors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllVendors.fulfilled,
        (state, action: PayloadAction<{ vendors: Vendor[] }>) => {
          state.loading = false;
          state.vendors = action.payload.vendors;
        }
      )
      .addCase(getAllVendors.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Products
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllProducts.fulfilled,
        (state, action: PayloadAction<{ products: Product[] }>) => {
          state.loading = false;
          state.products = action.payload.products;
        }
      )
      .addCase(getAllProducts.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Orders
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllOrders.fulfilled,
        (state, action: PayloadAction<{ orders: any }>) => {
          state.loading = false;
          state.orders = action.payload.orders;
        }
      )
      .addCase(getAllOrders.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// 5. Export actions and reducer
export const { startLoading, endLoading } = adminSlice.actions;
export default adminSlice.reducer;
