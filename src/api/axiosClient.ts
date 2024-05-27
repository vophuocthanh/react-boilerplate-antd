import axios, { AxiosResponse } from 'axios';
import { appAction } from '@/redux/store/appSlice';
import { history } from '@/utils/history';
import { useAppDispatch } from '@/redux/hooks';
const baseURL = import.meta.env.VITE_API_URL;

export interface LoginResponse {
  access: string;
  refresh: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const getLocalRefreshToken = () => {
  const token = localStorage.getItem('refresh');
  return token;
};
const updateLocalAccessToken = (res: LoginResponse) => {
  localStorage.setItem('access', res.access);
  localStorage.setItem('refresh', res.refresh);
};
const axiosClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});
// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('access');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    return response.data;
  },
  async function (error) {
    const originalConfig = error.config;
    const dispatch = useAppDispatch();
    if (error.response.status === 403) {
      await dispatch(appAction.setAPIState(403));
    }
    if (error.response.status === 401) {
      try {
        const url = `${originalConfig.baseURL}/auth/refresh-token`;
        const result = await getLocalRefreshToken();
        const rs: LoginResponse = await axios.post(url, {
          refresh_token: result,
        });
        updateLocalAccessToken(rs.data);
        return axiosClient(originalConfig);
      } catch (_error) {
        localStorage.clear();
        history.push('/');
        return Promise.reject(_error);
      }
    }
    return Promise.reject(error);
  }
);
export default axiosClient;
