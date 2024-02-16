import { api } from "src/boot/axios";
import { showApiError } from "./app-notify";
import { CatchError } from "../auth/types";

export async function uploadImage(
  imageBlob: Blob,
  fileName: string,
  userName: string,
  userId: string
) {
  try {
    const formData = new FormData();

    formData.append("name", userName);
    formData.append("userId", userId);
    formData.append("image", imageBlob, fileName); // 'image' is the field name

    const response = await api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (e) {
    return showApiError(e as CatchError);
  }
}
export async function uploadVideo(
  videoBlob: Blob,
  fileName: string,
  userName: string,
  userId: string
) {
  try {
    const formData = new FormData();

    formData.append("name", userName);
    formData.append("userId", userId);
    formData.append("video", videoBlob, fileName); // 'video' is the field name

    const response = await api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (e) {
    return showApiError(e as CatchError);
  }
}

export async function getUserImages(userId: string) {
  try {
    const response = await api.get(`/user/images/${userId}`);
    return response.data;
  } catch (e) {
    return showApiError(e as CatchError);
  }
}

export async function getPaginatedUsers(payload: Record<string, unknown>) {
  let queryParams = "?";
  if (payload.documentType)
    queryParams += `&documentType=${payload.documentType}`;

  // send pagination fields
  if (payload.page) queryParams += `&current=${payload.page}`;
  if (payload.rowsPerPage) queryParams += `&pageSize=${payload.rowsPerPage}`;

  // send search fields
  if (payload.searchField) queryParams += `&searchField=${payload.searchField}`;
  if (payload.searchVal) queryParams += `&searchVal=${payload.searchVal}`;

  // send sort fields
  if (payload.sortBy) queryParams += `&sortField=${payload.sortBy}`;

  if (typeof payload.descending === "boolean")
    queryParams += `&sortOrder=${payload.descending ? "desc" : "asc"}`;

  try {
    const response = await api.get(`/user/all${queryParams}`);
    return response.data;
  } catch (e) {
    return showApiError(e as CatchError);
  }
}

export async function getUserVideos(userId: string) {
  try {
    const response = await api.get(`/user/videos/${userId}`);
    return response.data;
  } catch (e) {
    return showApiError(e as CatchError);
  }
}
