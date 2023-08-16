'use client';

import Image from 'next/image';
import { Box, VStack, Heading, Tag, Text } from '@chakra-ui/react';
import { Icon, IconsName } from '@components/Icon';
import { PetAd } from '@pet-ad/model';
import { Breed } from '@breed/model';

export type PetAdCardProps = Pick<
  PetAd,
  'name' | 'gender' | 'images' | 'petType' | 'address'
> & { breeds: Pick<Breed, 'name'>[] };

export const PetAdCard = ({
  name,
  breeds,
  gender,
  images,
  petType,
  address,
}: PetAdCardProps) => (
  <VStack
    as="section"
    width="100%"
    border="1px solid #e2e2e2"
    borderRadius="6px"
    transition="transform 0.3s ease"
    _hover={{
      transform: 'translateY(-3px)',
    }}
  >
    <Box
      as="figure"
      width="100%"
      height="auto"
      aspectRatio="4/3"
      position="relative"
      borderRadius={8}
    >
      <Image
        fill
        sizes="300px"
        src={images[0].url}
        alt={petType}
        style={{
          objectFit: 'cover',
          borderTopLeftRadius: '6px',
          borderTopRightRadius: '6px',
        }}
      />
    </Box>

    <Box as="main" width="100%" px={4} pb={3}>
      <Box display="flex" alignItems="center">
        <Icon iconName={gender.toLowerCase() as IconsName} />
        <Heading
          as="h3"
          ml={2}
          fontSize="lg"
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
        >
          {name}
        </Heading>
      </Box>

      <Box mt={1.5} display="flex" alignItems="center" color="gray.600">
        <Icon iconName="locationPin" size={14} />
        <Text ml={1} fontSize="sm">
          {address.city}
        </Text>
      </Box>

      <Box mt={1.5} display="flex" flexWrap="wrap" columnGap={2}>
        {breeds.map(breed => (
          <Tag key={breed.name.es} size="sm">
            {breed.name.es}
          </Tag>
        ))}
      </Box>
    </Box>
  </VStack>
);
