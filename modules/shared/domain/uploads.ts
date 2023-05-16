import { UserRole } from '@user/model';

export type UploadType = 'BREED_IMAGES';

export const UPLOAD_OPTIONS: {
  type: UploadType;
  roles: UserRole[];
  maxFiles: number;
  folder?: string;
}[] = [
  {
    type: 'BREED_IMAGES',
    maxFiles: 4,
    roles: ['ADMIN'],
    folder: 'breeds',
  },
];
