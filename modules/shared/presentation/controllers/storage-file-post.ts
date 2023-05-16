import { FileStoraged } from '@shared/domain/file-storaged';
import { UPLOAD_OPTIONS } from '@shared/domain/uploads';
import { nextApiController } from '@shared/application/next-api-controller';
import { nextApiHttpHandler } from '@shared/application/http/next-api-http-handler';
import { parseFilesFromRequest } from '@shared/application/parse-files';
import { uploadFile } from '@shared/infra/storage';

export const storageFilePost = nextApiController(
  async (req, res) => {
    const uploadType = UPLOAD_OPTIONS.find(
      ({ type }) => req.query.uploadType === type
    );

    if (!uploadType) {
      return nextApiHttpHandler.invalidParams(res, 'Invalid upload');
    }

    if (!uploadType.roles.some(role => req.context.user?.role === role)) {
      return nextApiHttpHandler.forbidden(res);
    }

    const filesFromRequest = await parseFilesFromRequest(req);

    if (!filesFromRequest?.length) {
      return nextApiHttpHandler.invalidParams(res, 'Files are required');
    }

    if (filesFromRequest.length > uploadType.maxFiles) {
      return nextApiHttpHandler.contentTooLarge(res);
    }

    const files = Array.from(filesFromRequest);
    const uploads: FileStoraged[] = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const file of files) {
      // eslint-disable-next-line no-await-in-loop
      const { publicId, url } = await uploadFile(file.filepath, {
        folder: uploadType.folder,
      });

      uploads.push({
        publicId,
        url,
      });
    }

    return nextApiHttpHandler.ok(res, uploads);
  },
  {
    roles: ['ADMIN', 'USER'],
  }
);
