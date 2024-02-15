import { api } from "../../boot/axios";
import { showApiError } from "./../common/app-notify";
import { CatchError } from "./types";

const baseRoute = "/auth";

export const refreshAccessTokenFn = async () => {
  try {
    const response = await api.get(baseRoute + "/refresh");
    return response.data;
  } catch (e) {
    return showApiError(e as CatchError);
  }
};

export const me = async () => {
  try {
    const response = await api.get(baseRoute + "/me");
    return response.data;
  } catch (e) {
    return showApiError(e as CatchError);
  }
};
