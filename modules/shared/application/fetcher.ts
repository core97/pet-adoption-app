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
    const info = isJson ? await res.json() : undefined;

    const errorMsg = `An error occurred (${status}) while fetching to "${
      init?.method || 'GET'
    } ${url}". ${info || ''}`;

    console.error(errorMsg);

    throw new Error(errorMsg);
  }

  if (!isJson) return undefined as unknown as Exclude<T, void>;

  return res.json();
};
