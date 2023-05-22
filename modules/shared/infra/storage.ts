import { v2 as cloudinary, UploadApiOptions } from 'cloudinary';
import { FileStoraged } from '@shared/domain/file-storaged';

/**
 * Documentation
 * @see https://cloudinary.com/documentation/cloudinary_sdks#backend
 * @see https://cloudinary.com/documentation/image_upload_api_reference
 *
 * Image optimization
 * @see https://cloudinary.com/documentation/image_optimization
 * 
 * Cloudinary with Next Image
 * @see https://cloudinary.com/guides/front-end-development/integrating-cloudinary-with-next-js
 */

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function uploadFile(
  filepath: string,
  options?: Pick<UploadApiOptions, 'folder'>
): Promise<FileStoraged> {
  try {
    const uploadResponse = await cloudinary.uploader.upload(filepath, {
      resource_type: 'image',
      ...(options || {}),
    });

    return {
      publicId: uploadResponse.public_id,
      url: uploadResponse.url,
    };
  } catch (error) {
    if (error instanceof Error) {
      error.message = `Failed to upload the file. ${error.message}`;
    }

    throw error;
  }
}

export async function deleteFile(publicId: string) {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    if (error instanceof Error) {
      error.message = `Failed to delete the file. ${error.message}`;
    }

    throw error;
  }
}
