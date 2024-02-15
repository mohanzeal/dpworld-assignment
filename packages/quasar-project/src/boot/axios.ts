import { boot } from "quasar/wrappers";
import axios, { AxiosInstance } from "axios";
import { LocalStorage } from "quasar";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

const apiDomain = process.env.VUE_API_DOMAIN;
export const api = axios.create({
  baseURL: `${apiDomain}/api/v1`,
});

const accessToken = LocalStorage.getItem("accessToken");
if (accessToken) {
  api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
}

// auth interceptor.. check for token expire and request refresh token.
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const errMessage = error.response.data.message as string;
    if (errMessage.includes("Unauthorized Access") && !originalRequest._retry) {
      // https://codevoweb.com/pinia-vue-query-axios-jwt-authentication/
      // below two lines are used to generate a refresh token
      originalRequest._retry = true;
      // await refreshAccessTokenFn();
      if (window) {
        window.location.href = "/#/login";
      }
      return api(originalRequest);
    }
    return Promise.reject(error);
  }
);
export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});
