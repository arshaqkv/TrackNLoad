import axios from "./axios/authInstance";

export const getVendorForTDAPI = async () => {
  const response = await axios.get("/td/vendor");
  return response;
};

export const getProductsForTDAPI = async () => {
  const response = await axios.get("/td/product");
  return response;
};

export const createOrderAPI = async (data: any) => {
  const response = await axios.post("/td/order", data);
  return response;
};

export const getOrdersForTDAPI = async () => {
  const response = await axios.get("/td/order");
  return response;
};
