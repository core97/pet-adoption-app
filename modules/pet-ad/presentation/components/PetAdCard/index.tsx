'use client';

import Image from 'next/image';
import { Box, VStack, HStack, Heading, Tag, Text } from '@chakra-ui/react';
import { Icon, IconsName } from '@components/Icon';
import { PetAd } from '@pet-ad/model';
import { Breed } from '@breed/model';

export type PetAdCardProps = Pick<
  PetAd,
  'name' | 'gender' | 'images' | 'petType'
> & { breeds: Pick<Breed, 'name'>[] };

export const PetAdCard = ({
  name,
  breeds,
  gender,
  images,
  petType,
}: PetAdCardProps) => (
  <VStack width="100%" border="1px solid #e2e2e2">
    <Box width="100%" height="auto" aspectRatio="4/3" position="relative">
      <Image
        fill
        src={images[0].url}
        alt={petType}
        style={{ objectFit: 'cover' }}
      />
    </Box>
    <Box as="main" width="100%">
      <Heading fontSize="lg">{name}</Heading>
      <HStack>
        <Icon iconName={gender.toLowerCase() as IconsName} />
        <Text>{gender}</Text>
      </HStack>
      <HStack>
        {breeds.map(breed => (
          <Tag key={breed.name.es}>{breed.name.es}</Tag>
        ))}
      </HStack>
    </Box>
  </VStack>
);
