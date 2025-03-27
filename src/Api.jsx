
export const fetchProducts = async () => {
    try {
      const response = await fetch('/products.json'); 
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  };
  

  export const fetchProductById = async (id) => {
    try {
      const products = await fetchProducts();
      const product = products.find((p) => p.id === parseInt(id));
      if (!product) {
        throw new Error('Product not found');
      }
      return product;
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  };

  import axios from 'axios';
  import Cookies from 'js-cookie'
  import { toast } from "react-hot-toast";
  
  var apiUrl = "";
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      apiUrl = import.meta.env.VITE_DEV_API_URL || "/api/"
  }
  else {
      apiUrl = import.meta.env.VITE_API_URL || "/api/"
  }
  
  const tokenUrl = `${apiUrl}token/`
  const refreshTokenUrl = `${apiUrl}token/refresh/`
  
  const userUrl = `${apiUrl}user/`
  const emailotpUrl = `${userUrl}emailotp/`
  // const phoneotpUrl = `${userUrl}phoneotp/`
  const setPasswordUrl = `${userUrl}setpassword/`
  const profileUrl = `${userUrl}profile/`
  const addressUrl = `${userUrl}address/`

  const shopUrl = `${apiUrl}shop/`
  const productsUrl = `${shopUrl}products/`
  const cartUrl = `${shopUrl}cart/`
  const ordersUrl = `${shopUrl}orders/`
  
  export const Logout = () => {
      Cookies.remove('token');
      Cookies.remove('refresh');
  }
  
  const handleError = (error, toastify = true) => {
      if (error === undefined || error === null)
          handleError('An error occurred', toastify);
      else if (Array.isArray(error))
          error.map((val) => handleError(val, toastify));
      else if (typeof error === 'object') {
          if (error.name === 'Error') {
              handleError(error.message, toastify);
          }
          else if (error.name === 'AxiosError') {
              if (error.response && typeof error.response.data === 'object' && error.response.data !== null)
                  handleError(error.response.data, toastify);
              else
                  handleError(error.message, toastify);
          }
          else
              Object.values(error).map((val) => handleError(val, toastify));
      }
      else {
          if (toastify)
              toast.error(error);
          console.error(error);
      }
  }
  
  const handleUnauthorized = async (error) => {
      if (error.response.data.code === 'token_not_valid') {
          if (error.response.data.messages[0].token_type === 'access') {
              return await RefreshToken();
          }
          else
              Logout();
      }
      return 1;
  }
  
  const showUploadProgress = (progressEvent) => {
      const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
  
      if (percentCompleted < 100) {
          toast.loading(`Uploading... ${percentCompleted}%`, { id: "progressToast" });
      }
  
      if (percentCompleted === 100) {
          toast.success('Upload successful!', { id: "progressToast" });
      }
  };
  
  const getToken = async () => {
      var token = Cookies.get('token');
  
      if (!token) {
          RefreshToken();
          token = Cookies.get('token');
  
          if (!token) {
              throw new Error('Please Login');
          }
      }
  
      return token;
  }
  
  export const getParamsFromUrl = (url) => {
      const params = {};
      const queryString = url.split('?')[1]; // Get the part after `?`
      if (!queryString) return params;
  
      const searchParams = new URLSearchParams(queryString);
  
      for (const [key, value] of searchParams.entries()) {
          params[key] = value;
      }
  
      return params;
  }
  
  export const Login = async ({ data = null }) => {
      try {
          const response = await axios.post(tokenUrl, data, {
              headers: { 'Content-Type': 'multipart/form-data' }
          });
          Cookies.set('token', response.data.access);
          Cookies.set('refresh', response.data.refresh);
          return 0;
      } catch (error) {
          handleError(error);
          return 1;
      }
  }
  
  export const RefreshToken = async () => {
      try {
          const refresh = Cookies.get('refresh');
  
          if (!refresh) {
              throw new Error('Refresh Token not found');
          }
  
          const response = await axios.post(refreshTokenUrl, { 'refresh': refresh }, {
              headers: { 'Content-Type': 'multipart/form-data' }
          });
          Cookies.set('token', response.data.access);
          Cookies.set('refresh', response.data.refresh);
          return 0;
      } catch (error) {
          if (error.response && error.response.status === 401)
              await handleUnauthorized(error);
          else
              handleError(error, false);
          return 1;
      }
  }
  
  export const CreateUser = async ({ data = null }) => {
      try {
          await axios.post(userUrl, data, {
              headers: { 'Content-Type': 'multipart/form-data' }
          });
          return 0;
      } catch (error) {
          handleError(error);
          return 1;
      }
  }
  
  export const SetPassword = async ({ data = null }) => {
      try {
          await axios.post(setPasswordUrl, data, {
              headers: { 'Content-Type': 'multipart/form-data' }
          });
          return 0;
      } catch (error) {
          handleError(error);
          return 1;
      }
  }
  
  export const GetEmailOtp = async ({ data = null }) => {
      try {
          await axios.post(emailotpUrl, data, {
              headers: { 'Content-Type': 'multipart/form-data' }
          });
          toast.success('Email sent');
          return 0;
      } catch (error) {
          handleError(error);
          return 1;
      }
  }
  
  // export const GetPhoneOtp = async ({ data = null }) => {
  //     try {
  //         await axios.post(phoneotpUrl, data, {
  //             headers: { 'Content-Type': 'multipart/form-data' }
  //         });
  //         toast.success('Phone OTP sent');
  //         return 0;
  //     } catch (error) {
  //         handleError(error);
  //         return 1;
  //     }
  // }
  
  export const RetrieveUpdateProfile = async ({ data = null, showToast = true }) => {
      try {
          const token = await getToken();
  
          var response;
          if (data === null) {
              response = await axios.get(profileUrl, {
                  headers: { Authorization: `Bearer ${token}` }
              });
          }
          else {
              response = await axios.patch(profileUrl, data, {
                  headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
                  onUploadProgress: showUploadProgress,
              });
          }
          return response.data;
      } catch (error) {
          if (error.response && error.response.status === 401) {
              if (await handleUnauthorized(error) == 0)
                  return await RetrieveUpdateProfile({ data, showToast });
          }
          handleError(error, showToast);
          return null;
      }
  }
  
  export const ListCreateRetrieveUpdateRemoveAddress = async ({ data = null, id = null, remove = false }) => {
      try {
          const token = await getToken();
  
          var response;
          if (id === null && data === null) { // List
              response = await axios.get(addressUrl, {
                  headers: { Authorization: `Bearer ${token}` }
              });
          }
          else if (id === null && data !== null) { // Create
              response = await axios.post(addressUrl, data, {
                  headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
              });
          }
          else if (id !== null && data === null && !remove) { // Retrieve
              response = await axios.get(`${addressUrl}${id}/`, {
                  headers: { Authorization: `Bearer ${token}` }
              });
          }
          else if (id !== null && data !== null) { // Update
              response = await axios.put(`${addressUrl}${id}/`, data, {
                  headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
              });
          }
          else if (id !== null && remove) { // Remove
              response = await axios.delete(`${addressUrl}${id}/`, {
                  headers: { Authorization: `Bearer ${token}` }
              });
          }
          return response.data;
      }
      catch (error) {
          if (error.response && error.response.status === 401) {
              if (await handleUnauthorized(error) == 0)
                  return await ListCreateRetrieveUpdateRemoveAddress({ data, id, remove });
          }
          handleError(error);
          return null;
      }
  }
  
  export const ListRetrieveProducts = async ({ id, params = {} }) => {
      try {
          var response;
          if (id === null) {
              response = await axios.get(productsUrl, {
                  params: params
              });
          }
          else {
              response = await axios.get(`${productsUrl}${id}/`);
          }
          return response.data;
      } catch (error) {
          handleError(error);
          return null;
      }
  }
  
  export const ListCreateRetrieveUpdateRemoveCart = async ({ data = null, id = null, remove = false, showToast = true }) => {
      try {
          const token = await getToken();
  
          var response;
          if (id === null && data === null) { // List
              response = await axios.get(cartUrl, {
                  headers: { Authorization: `Bearer ${token}` }
              });
          }
          else if (id === null && data !== null) { // Create
              response = await axios.post(cartUrl, data, {
                  headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
              });
              toast.success('Added to cart');
          }
          else if (id !== null && data === null && !remove) { // Retrieve
              response = await axios.get(`${cartUrl}${id}/`, {
                  headers: { Authorization: `Bearer ${token}` }
              });
          }
          else if (id !== null && data !== null) { // Update
              response = await axios.put(`${cartUrl}${id}/`, data, {
                  headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
              });
              toast.success('Cart quantity updated');
          }
          else if (id !== null && remove) { // Remove
              response = await axios.delete(`${cartUrl}${id}/`, {
                  headers: { Authorization: `Bearer ${token}` }
              });
          }
          return response.data;
      }
      catch (error) {
          if (error.response && error.response.status === 401) {
              if (await handleUnauthorized(error) == 0)
                  return await ListCreateRetrieveUpdateRemoveCart({ data, id, remove, showToast });
          }
          handleError(error, showToast);
          return null;
      }
  }
  
  export const ListCreateRetrieveOrders = async ({ data = null, id = null }) => {
      try {
          const token = await getToken();
  
          var response;
          if (id === null && data === null) { // List
              response = await axios.get(ordersUrl, {
                  headers: { Authorization: `Bearer ${token}` }
              });
          }
          else if (id === null && data !== null) { // Create
              response = await axios.post(ordersUrl, data, {
                  headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
              });
          }
          else if (id !== null) { // Retrieve
              response = await axios.get(`${ordersUrl}${id}/`, {
                  headers: { Authorization: `Bearer ${token}` }
              });
          }
          return response.data;
      }
      catch (error) {
          if (error.response && error.response.status === 401) {
              if (await handleUnauthorized(error) == 0)
                  return await ListCreateRetrieveOrders({ data, id });
          }
          handleError(error);
          return null;
      }
  }