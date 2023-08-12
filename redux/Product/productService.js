import JwtIntercepter from "../../utils/config";
import axios from "axios";

const getAllProduct = async () => {
  const reponces = await JwtIntercepter.get("/api/products");
  console.log(reponces.data);
  return reponces.data;
};

const createProduct = async (data) => {
  const reponces = await JwtIntercepter.get("/api/products/create", data);
  console.log(reponces.data);
  return reponces.data;
};

const getSingleProduct = async (id) => {
  const reponces = await JwtIntercepter.get(`/api/products/${id}`);
  console.log(reponces.data);
  if (reponces.data) {
    return reponces.data;
  }
};
const searchProduct = async (key) => {
  const reponces = await JwtIntercepter.get(`/api/products/search/${key}`);
  console.log(reponces.data);
  if (reponces.data) {
    return reponces.data;
  }
};

const productService = {
  getAllProduct,
  getSingleProduct,
  createProduct,
  searchProduct,
};
export default productService;
