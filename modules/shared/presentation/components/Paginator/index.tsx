'use client';

import { useMemo } from 'react';
import { Link } from '@chakra-ui/next-js';
import { HStack, Box } from '@chakra-ui/react';
import { useUrl } from '@hooks/useUrl';
import { Icon } from '@components/Icon';
import { PAGES_TO_SHOW, PAGE_HALF_TO_SHOW } from './Paginator.contants';

/**
 * Contemplate "0" page as the first page
 */
export const Paginator = ({
  currentPage,
  pageSearchParam,
  totalPages,
}: {
  currentPage: number;
  pageSearchParam: string;
  totalPages: number;
}) => {
  const { addParam } = useUrl();

  const pages = useMemo(() => {
    const pagesToShow: number[] = [];

    if (totalPages < PAGES_TO_SHOW) {
      pagesToShow.push(...Array(totalPages).keys());
    } else if (currentPage >= 0 && currentPage <= PAGE_HALF_TO_SHOW) {
      pagesToShow.push(...Array(PAGES_TO_SHOW).keys());
    } else if (
      currentPage > PAGE_HALF_TO_SHOW &&
      currentPage + 1 < totalPages - PAGE_HALF_TO_SHOW
    ) {
      const nextPages = Array(...Array(PAGE_HALF_TO_SHOW).keys()).map(
        value => currentPage + value + 1
      );

      const previousPages = Array(...Array(PAGE_HALF_TO_SHOW).keys()).map(
        value => currentPage - (value + 1)
      );

      pagesToShow.push(...[...previousPages.sort(), currentPage, ...nextPages]);
    } else if (
      currentPage + 1 <= totalPages &&
      currentPage + 1 >= totalPages - PAGE_HALF_TO_SHOW
    ) {
      const lastPages = Array(...Array(PAGES_TO_SHOW).keys()).map(
        value => totalPages - value
      );

      pagesToShow.push(...lastPages);
    }

    return pagesToShow;
  }, [currentPage, totalPages]);

  return (
    <Box as="nav" role="navigation" aria-label="Pagination Navigation">
      <HStack as="ul">
        <li>
          <Link
            href={addParam(pageSearchParam, currentPage - 1)}
            style={{ ...(currentPage === 0 && { pointerEvents: 'none' }) }}
          >
            <Icon iconName="chevronLeft" />
          </Link>
        </li>
        {pages.map(pageIndex => {
          const isActivated = currentPage === pageIndex;

          return (
            <Box as="li" key={pageIndex.toString()}>
              <Link
                href={addParam(pageSearchParam, pageIndex)}
                style={{ color: isActivated ? 'red' : 'gray' }}
                aria-label={`Current Page, Page ${pageIndex + 1}`}
                aria-current={isActivated}
              >
                {(pageIndex + 1).toString()}
              </Link>
            </Box>
          );
        })}

        <li>
          <Link
            href={addParam(pageSearchParam, currentPage + 1)}
            style={{
              ...(currentPage + 1 >= totalPages && { pointerEvents: 'none' }),
            }}
          >
            <Icon iconName="chevronRight" />
          </Link>
        </li>
      </HStack>
    </Box>
  );
};
