import { FileStoraged } from '@shared/domain/file-storaged';
import { UploadType } from '@shared/domain/uploads';
import { fetcher } from '@shared/application/fetcher';

export const uploadFiles = async (
  files: File | File[],
  uploadType: UploadType
) => {
  const formData = new FormData();

  if (Array.isArray(files)) {
    Array.from(files).forEach(file =>
      formData.append(`${new Date().getTime()}`, file)
    );
  } else {
    formData.append(`${new Date().getTime()}`, files);
  }

  const res = await fetcher<FileStoraged[]>(
    `/api/storage?uploadType=${uploadType}`,
    {
      method: 'POST',
      body: formData,
    }
  );

  return res;
};
