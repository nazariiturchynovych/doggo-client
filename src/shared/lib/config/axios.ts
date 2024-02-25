import axios from 'axios';
import { BaseResultWithData } from '@/shared/api/result';
import { SignInDto } from '@/shared/api/auth-api/models/dtos.ts';

const $api = axios.create({
  baseURL: import.meta.env.VITE_DOGGO_BASE_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

  return config;
});

export type RefreshParams = {
  token: string;
  refreshToken: string;
};

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status == 401) {
      try {
        const params: RefreshParams = {
          token: localStorage.getItem('token') || '',
          refreshToken: localStorage.getItem('refreshToken') || '',
        };

        const { data } = await axios.post<BaseResultWithData<SignInDto>>(
          `${import.meta.env.VITE_DOGGO_BASE_URL}/Authentication/Refresh-token`,
          params,
        );
        if (data.isSuccess) {
          localStorage.setItem('token', data.data.token);
          localStorage.setItem('refreshToken', data.data.refreshToken);

          console.log(data.data);
          return $api.request(originalRequest);
        }
      } catch (e) {
        console.log(e);
      }
    }
  },
);

export default $api;
