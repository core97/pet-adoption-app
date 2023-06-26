'use client';

import { Link } from '@chakra-ui/next-js';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';
import { PAGES } from '@shared/application/pages';
import { AdoptionRequestsTabsProps } from './AdoptionRequestsTabs.interface';

export const AdoptionRequestsTabs = ({
  requestsFromMe,
  petAds,
}: AdoptionRequestsTabsProps) => (
  <Tabs>
    <TabList>
      <Tab>Solicitudes que has hecho</Tab>
      <Tab>Solicitudes de mis anuncios</Tab>
    </TabList>

    <TabPanels>
      <TabPanel>
        {requestsFromMe.length ? (
          <UnorderedList listStyleType="none">
            {requestsFromMe.map(request => (
              <ListItem key={request.id}>
                <Text>{request.petAd.name}</Text>
                <Text>{`Estado: ${request.status}`}</Text>
              </ListItem>
            ))}
          </UnorderedList>
        ) : (
          <Text>Aún no has hecho ninguna solicitud</Text>
        )}
      </TabPanel>
      <TabPanel>
        {petAds.map(petAd => (
          <Link
            key={petAd.id}
            href={`${PAGES.ADOPTION_REQUESTS_LIST}/${petAd.id}`}
          >
            {petAd.name}
          </Link>
        ))}
      </TabPanel>
    </TabPanels>
  </Tabs>
);
