'use client';

import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
} from '@chakra-ui/react';
import { AdoptionRequestsList } from '@adoption-request/presentation/components/AdoptionRequestsList';
import { AdoptionRequestsTabsProps } from './AdoptionRequestsTabs.interface';

export const AdoptionRequestsTabs = ({
  requestsFromMe,
  requestsFromPetAds,
}: AdoptionRequestsTabsProps) => (
  <Tabs>
    <TabList>
      <Tab>Solicitudes que has hecho</Tab>
      <Tab>Solicitudes de mis anuncios</Tab>
    </TabList>

    <TabPanels>
      <TabPanel>
        {requestsFromMe.length ? (
          <AdoptionRequestsList isUserRequest requests={requestsFromMe} />
        ) : (
          <Text>Aún no has hecho ninguna solicitud</Text>
        )}
      </TabPanel>
      <TabPanel>
        {requestsFromPetAds.length ? (
          <AdoptionRequestsList requests={requestsFromPetAds} />
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
