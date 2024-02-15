import axiosInstance from "../axiosInstance";
export const loginUserApi = async (userData) => {
    try{
      return axiosInstance.post('/users/sign_in', userData).then((res)=>{
      return res.data
    })
   } catch(error){
      if(error.response){
        throw new Error(error.response.data.message || "Sign-in failed")
      }else{
        throw new Error('Network error. Please try again')
    }
  }
};
export const logoutUserApi = () => {
        return axiosInstance.delete('users/sign_out').then((res)=> {
        
        return res.data

    })
}
export const registerUserApi = async (user) => {
    try{
      const requestData = {
      user: user,  
    };
      return axiosInstance.post('/users', requestData).then((res)=>{
      return res.data
        })

  } catch(error){
    if(error.response){
      throw new Error(error.response.data.message || "Sign up failed!")
    }else{
      throw new Error('Network error. Please try again')
    } 
  }
  };
  
  export const addToCartApi = async (cartId, itemId, quantity) => {
    try{
      return axiosInstance.post(`/carts/${cartId}/add_item`, {
        product_id: itemId,
        quantity: quantity
      })
    }catch(error){
      if(error.response){
      throw new Error(error.response.data.message || "Something went wrong")
    }else{
      throw new Error('Network error. Please try again')
    } 
  }
  };

export const removeCartItemApi = async (cartId, cartItemId) => {
  try{
    return axiosInstance.delete(`/carts/${cartId}/cart_items/${cartItemId}`);
  }catch(error){
    if(error.response){
      throw new Error(error.response.data.message || "Something went wrong")
    }else{
      throw new Error('Network error. Please try again')
    }
  }
   

};
export const updateCartItemApi = (cartId, cartItemId, newQuantity) => {
  return axiosInstance.patch(`/carts/${cartId}/cart_items/${cartItemId}`, {
      quantity: newQuantity
  });
}

export const createOrderFromCartApi = async (token) => {
  try {
    const response = await axiosInstance.post('/orders/create_from_cart', {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Error creating order:')
  }
};