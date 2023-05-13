'use client';

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Heading,
  VStack,
} from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';
import { NAVBAR_ITEMS } from './DashboardNavbar.constants';

export const DashboardNavbar = () => (
  <Accordion>
    {NAVBAR_ITEMS.map(({ links, title }) => (
      <AccordionItem key={title}>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              <Heading as="h4" size="md">
                {title}
              </Heading>
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <VStack alignItems="flex-start">
            {links.map(({ href, label }) => (
              <Link href={href} key={label}>
                {label}
              </Link>
            ))}
          </VStack>
        </AccordionPanel>
      </AccordionItem>
    ))}
  </Accordion>
);
