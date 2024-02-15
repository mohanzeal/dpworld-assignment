import { defineStore } from "pinia";
import { AuthStoreState } from "./types";

export const useAuthStore = defineStore({
  id: "authStore",
  state: () =>
    ({
      accessToken: null,
      user: {},
    } as AuthStoreState),
  getters: {},
  actions: {
    setAccessToken(token: string) {
      this.accessToken = token;
    },
    setUser(user: any) {
      this.user = user;
    },
  },
});
