import { ICommonStore } from "./common.types";
import { defineStore } from "pinia";

export const useCommonStore = defineStore({
  id: "commonStore",
  state: () =>
    ({
      app: {
        title: "placements.app",
        tagLine: "Get Placed",
        logo: "assets/logo.svg",
      },
    } as ICommonStore),
  getters: {},
  actions: {},
});
