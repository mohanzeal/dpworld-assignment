import { Notify, QNotifyCreateOptions } from "quasar";
import { CatchError } from "../auth/types";

const NOTIFY_DEFAULT_POSITION = "bottom";
const successObj: QNotifyCreateOptions = {
  color: "positive",
  position: NOTIFY_DEFAULT_POSITION,
  message: "",
  icon: "check",
};

const negativeObj: QNotifyCreateOptions = {
  color: "negative",
  position: NOTIFY_DEFAULT_POSITION,
  message: "",
  icon: "warning",
};
const infoObj: QNotifyCreateOptions = {
  color: "info",
  position: NOTIFY_DEFAULT_POSITION,
  message: "",
  icon: "info",
};

const notify = Notify;

export const toast = (
  message: string,
  type: "positive" | "negative" | "info" = "positive"
) => {
  let messageType = infoObj;
  switch (type) {
    case "positive":
      messageType = { ...successObj, message };
      break;
    case "negative":
      messageType = { ...negativeObj, message };
      break;
    case "info":
      messageType = { ...infoObj, message };
      break;

    default:
      break;
  }

  if (notify) return notify.create(messageType);
};

export const showApiError = (error: CatchError) => {
  if (!error.response) {
    toast("Network error", "negative");
  }

  return error?.response?.data;
};
