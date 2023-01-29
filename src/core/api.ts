import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

api.interceptors.response.use(
  response => response,
  err => {
    let error;
    try {
      error = err.toJSON();
    } catch (e) {
      error = err;
    }

    const status = err.response?.status;

    if (status === 401) {
      // removeToken();
      // removeUserId();
      // history.push('/login');
    } else if (status >= 500) {
      // toast.error(error.message);
    }
    if (err && err.response) {
      error.response = err.response.data;
    }
    return Promise.reject(error);
  }
);

export default api;
