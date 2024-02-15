import axiosInstance from "../axiosInstance";

export const fetchProductDetailsApi = (productId) => {
    return axiosInstance.get(`/products/${productId}`)
    .catch((error) => {
        console.error('Error:', error);
      });
};

export const searchByCategoryApi = (category) => {
  return axiosInstance.get(`/products?search[category]=${category}`);
};

export const fetchProductsByPage = (currentPage, itemsPerPage = 7) => {
  return axiosInstance.get(`/products?page=${currentPage}&per_page=${itemsPerPage}`);
};

export const searchByNameApi = (prodName) => {
return axiosInstance.get(`/products?search[name]=${prodName}`);
}