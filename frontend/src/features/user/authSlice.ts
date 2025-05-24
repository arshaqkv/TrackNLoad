import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  getOrdersForTD,
  getProductsForTD,
  getVendorsForTD,
  loginUser,
  logoutUser,
} from "./authThunk";
import { loginAdmin } from "../admin/adminThunk";

export interface User {
  id: string;
  name: string;
  mobile: string;
  role?: string;
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

export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  message: string | null;
  vendors: Vendor[] | null;
  products: Product[] | null;
  orders: any | null;
}

// 2. Initial state
const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  message: null,
  vendors: null,
  products: null,
  orders: null,
};

// 3. Create the slice
const userSlice = createSlice({
  name: "auth",
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
      // loginUser
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<{ user: User; message: string }>) => {
          state.loading = false;
          state.user = action.payload.user;
          state.isAuthenticated = true;
          state.message = action.payload.message;
        }
      )
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Vendors
      .addCase(getVendorsForTD.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getVendorsForTD.fulfilled,
        (state, action: PayloadAction<{ vendors: Vendor[] }>) => {
          state.loading = false;
          state.vendors = action.payload.vendors;
        }
      )
      .addCase(
        getVendorsForTD.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // Products
      .addCase(getProductsForTD.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getProductsForTD.fulfilled,
        (state, action: PayloadAction<{ products: Product[] }>) => {
          state.loading = false;
          state.products = action.payload.products;
        }
      )
      .addCase(
        getProductsForTD.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // Orders
      .addCase(getOrdersForTD.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getOrdersForTD.fulfilled,
        (state, action: PayloadAction<{ orders: any }>) => {
          state.loading = false;
          state.orders = action.payload.orders;
        }
      )
      .addCase(getOrdersForTD.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // loginAdmin
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginAdmin.fulfilled,
        (state, action: PayloadAction<{ user: User; message: string }>) => {
          state.loading = false;
          state.user = action.payload.user;
          state.isAuthenticated = true;
          state.message = action.payload.message;
        }
      )
      .addCase(loginAdmin.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // logoutUser
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        logoutUser.fulfilled,
        (state, action: PayloadAction<{ message: string }>) => {
          state.loading = false;
          state.user = null;
          state.isAuthenticated = false;
          state.message = action.payload.message;
        }
      )
      .addCase(logoutUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// 4. Export actions and reducer
export const { startLoading, endLoading } = userSlice.actions;
export default userSlice.reducer;
