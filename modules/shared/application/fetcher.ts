import { AppError } from '@shared/application/errors/app-error';
import { canParseToJSON } from '@shared/application/string-utils';

export type FetchCacheConfig<T = void> = {
  data: T;
  cacheConfig?: Pick<RequestInit, 'cache' | 'next'>;
};

export const fetcher = async <T = void>(
  url: string,
  init?: RequestInit
): Promise<T> => {
  const bodyIsFormData = init?.body && init.body instanceof FormData;

  const requestInit: RequestInit = {
    ...(!!Object.keys(init || {}).length && init),
    headers: {
      ...(!bodyIsFormData && {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
      ...(!!Object.keys(init?.headers || {}).length && init?.headers),
    },
  };

  const res = await fetch(url, requestInit);

  const contentType =
    res.headers.get('content-type') || res.headers.get('Content-Type');

  const isJson = contentType?.includes('application/json');

  if (!res.ok) {
    const { status } = res;
    const errorFromRequest = (await res.text?.()) || '';

    const errorMsg = `An error occurred (${status}) while fetching to "${
      init?.method || 'GET'
    } ${url}". ${errorFromRequest}`;

    if (canParseToJSON(errorFromRequest)) {
      const error = JSON.parse(errorFromRequest);
      throw new AppError(errorMsg, error.httpCode, error.businessCode);
    }

    throw new Error(errorMsg);
  }

  if (!isJson) return undefined as unknown as Exclude<T, void>;

  return res.json();
};
