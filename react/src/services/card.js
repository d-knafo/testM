import axios from "axios";
import { config } from "./../config/config";

export async function checkout(ids) {
  let data = await axios.post(`${config.API_URL}/card`, { ids });
  return data;
}

export async function getStats() {
  let data = await axios.get(`${config.API_URL}/card`);
  return data;
}
