import axios, { AxiosResponse } from "axios";
export function jwtInterceptor(token: AxiosResponse<any, any> | null) {
  axios.interceptors.request.use((request) => {
    console.log(token?.data);
    request.headers.Authorization = `Bearer ${token?.data}`;
    return request;
  });
}
