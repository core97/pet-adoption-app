'use client';

import { useMemo } from 'react';
import { Box } from '@chakra-ui/react';
import { useUrl } from '@hooks/useUrl';
import { Icon } from '@components/Icon';
import { PaginatorItem } from './PaginatorItem.component';
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
    <Box
      as="nav"
      role="navigation"
      aria-label="Pagination Navigation"
      border="1px solid"
      borderColor="gray.300"
      borderRadius={6}
    >
      <Box as="ul" display="flex" alignItems="center">
        <PaginatorItem
        px={2.5}
          disable={currentPage === 0}
          href={addParam(pageSearchParam, currentPage - 1)}
        >
          <Icon iconName="chevronLeft" />
        </PaginatorItem>

        {pages.map(pageIndex => {
          const isActivated = currentPage === pageIndex;

          return (
            <PaginatorItem
              key={pageIndex.toString()}
              href={addParam(pageSearchParam, pageIndex)}
              isActivated={isActivated}
              ariaLabel={`Current Page, Page ${pageIndex + 1}`}
            >
              {(pageIndex + 1).toString()}
            </PaginatorItem>
          );
        })}

        <PaginatorItem
        px={2.5}

          hideBorder
          disable={currentPage + 1 >= totalPages}
          href={addParam(pageSearchParam, currentPage + 1)}
        >
          <Icon iconName="chevronRight" />
        </PaginatorItem>
      </Box>
    </Box>
  );
};
