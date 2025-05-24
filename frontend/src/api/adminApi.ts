import axios from "./axios/authInstance";

export const loginAdminAPI = async (data: {
  mobile: string;
  password: string;
}) => {
  const response = await axios.post("/admin/login", data);
  return response;
};

export const getAllTruckDriversAPI = async () => {
  const response = await axios.get("/admin/truck-driver");
  return response;
};

export const getAllVendorsAPI = async () => {
  const response = await axios.get("/admin/vendor");
  return response;
};

export const getAllProductsAPI = async () => {
  const response = await axios.get("/admin/product");
  return response;
};

export const createTruckDriverAPI = async (data: {
  name: string;
  mobile: string;
  password: string;
  address: string;
  dlNumber: string;
  profilePic?: string;
}) => {
  const response = await axios.post("/admin/truck-driver", data);
  return response;
};

export const editTruckDriverAPI = async (
  id: string,
  data: { name: string; address: string; dlNumber: string; profilePic?: string }
) => {
  const response = await axios.put(`/admin/truck-driver/${id}`, data);
  return response;
};

export const getTruckDriverAPI = async (id: string) => {
  const response = await axios.get(`/admin/truck-driver/${id}`);
  return response;
};

export const deleteTruckDriverAPI = async (id: string) => {
  const response = await axios.delete(`/admin/truck-driver/${id}`);
  return response;
};

export const createVendorAPI = async (data: {
  name: string;
  email: string;
  phone: string;
  location: string;
}) => {
  const response = await axios.post("/admin/vendor", data);
  return response;
};

export const editVendorAPI = async (
  id: string,
  data: { name: string; email: string; phone: string; location: string }
) => {
  const response = await axios.put(`/admin/vendor/${id}`, data);
  return response;
};

export const getVendorAPI = async (id: string) => {
  const response = await axios.get(`/admin/vendor/${id}`);
  return response;
};

export const deleteVendorAPI = async (id: string) => {
  const response = await axios.delete(`/admin/vendor/${id}`);
  return response;
};

export const createProductAPI = async (formData: FormData) => {
  const response = await axios.post("/admin/product", formData);
  return response;
};

export const editProductAPI = async (id: string, formData: FormData) => {
  const response = await axios.put(`/admin/product/${id}`, formData);
  return response;
};

export const getProductAPI = async (id: string) => {
  const response = await axios.get(`/admin/product/${id}`);
  return response;
};

export const deleteProductAPI = async (id: string) => {
  const response = await axios.delete(`/admin/product/${id}`);
  return response;
};

export const getAllOrdersAPI = async () => {
  const response = await axios.get("/admin/order");
  return response;
};
