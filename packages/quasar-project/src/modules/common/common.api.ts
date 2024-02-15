import { api } from 'src/boot/axios';
import { showApiError } from './app-notify';
import { CatchError } from '@placements/common';

export async function uploadImage(imageBlob: Blob, fileName: string) {
  try {
    const formData = new FormData();
    formData.append('files', imageBlob, fileName); // 'image' is the field name

    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (e) {
    return showApiError(e as CatchError);
  }
}
