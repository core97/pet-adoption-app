'use client';

import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
} from '@chakra-ui/react';
import { PetAdRequestList } from '@pet-ad-request/presentation/components/PetAdsRequestsList';
import { PetAdsRequestsTabsProps } from './PetAdsRequestsTabs.interface';

export const PetAdRequestsTabs = ({
  requestsFromMe,
  requestsFromPetAds,
}: PetAdsRequestsTabsProps) => (
  <Tabs>
    <TabList>
      <Tab>Solicitudes que has hecho</Tab>
      <Tab>Solicitudes de mis anuncios</Tab>
    </TabList>

    <TabPanels>
      <TabPanel>
        {requestsFromMe.length ? (
          <PetAdRequestList isUserRequest requests={requestsFromMe} />
        ) : (
          <Text>Aún no has hecho ninguna solicitud</Text>
        )}
      </TabPanel>
      <TabPanel>
        {requestsFromPetAds.length ? (
          <PetAdRequestList requests={requestsFromPetAds} />
        ) : (
          <Text>
            Aún no te han hecho ninguna solicitud sobre los anuncios que has
            publicado
          </Text>
        )}
      </TabPanel>
    </TabPanels>
  </Tabs>
);
