import { Address } from '@shared/domain/address';
import { controller } from '@shared/application/controller';
import { httpHandler } from '@shared/application/http/http-handler';
import { addressValidator } from '@shared/application/address-validator';

export const addressPut = controller(
  async req => {
    const body = await req.json();

    const addressFields: (keyof Address)[] = [
      'city',
      'country',
      'postalCode',
      'streetName',
      'streetNumber',
    ];

    if (!addressFields.every(field => typeof body[field] === 'string')) {
      return httpHandler.invalidParams();
    }

    const address = await addressValidator({ address: body });

    return httpHandler.ok(address);
  },
  { roles: ['USER', 'ADMIN'] }
);
