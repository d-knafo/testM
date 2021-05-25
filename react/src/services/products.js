import axios from "axios";
import { config } from "./../config/config";

export async function getProducts() {
  let data = await axios.get(`${config.API_URL}/products`);
  return data;
}

export async function updateProduct(id, data) {
  let res = await axios.put(`${config.API_URL}/products/${id}`, data);
  return res;
}

export async function createProduct(data) {
  let res = await axios.post(`${config.API_URL}/products`, data);
  return res;
}

export async function deleteProduct(id) {
  let res = await axios.delete(`${config.API_URL}/products/${id}`);
  return res;
}
