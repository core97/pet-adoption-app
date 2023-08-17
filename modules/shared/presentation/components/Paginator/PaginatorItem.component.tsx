'use client';

import Link from 'next/link';
import { Box, SpaceProps } from '@chakra-ui/react';

export const PaginatorItem = ({
  children,
  disable,
  href,
  hideBorder,
  isActivated,
  ariaLabel,
  ...rest
}: {
  children: React.ReactNode;
  href: string;
  hideBorder?: boolean;
  ariaLabel?: string;
  isActivated?: boolean;
  disable?: boolean;
} & SpaceProps) => (
  <Box
    as="li"
    py={2}
    px={3.5}
    height="100%"
    {...(isActivated && { backgroundColor: 'teal.500', color: 'white' })}
    {...(!hideBorder && { borderRight: '1px solid', borderColor: 'gray.300' })}
    {...rest}
  >
    <Link
      href={href}
      style={{
        ...(disable && { pointerEvents: 'none', opacity: '30%' }),
      }}
      {...(ariaLabel && {
        'aria-label': ariaLabel,
        'aria-current': isActivated,
      })}
    >
      {children}
    </Link>
  </Box>
);
