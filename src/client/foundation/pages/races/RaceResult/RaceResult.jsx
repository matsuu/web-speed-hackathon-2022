import React from "react";
import { useParams, useOutletContext } from "react-router-dom";

import { Section } from "../../../components/layouts/Section";
import { Spacer } from "../../../components/layouts/Spacer";
import { TabNav } from "../../../components/navs/TabNav";
import { Heading } from "../../../components/typographies/Heading";
import { useAuthorizedFetch } from "../../../hooks/useAuthorizedFetch";
import { Space } from "../../../styles/variables";
import { authorizedJsonFetcher } from "../../../utils/HttpUtils";

import { BettingTicketList } from "./internal/BettingTicketList";
import { RaceResultSection } from "./internal/RaceResultSection";

/** @type {React.VFC} */
export const RaceResult = () => {
  const { raceId } = useParams();
  const { data } = useOutletContext();
  const { data: ticketData } = useAuthorizedFetch(
    `/api/races/${raceId}/betting-tickets`,
    authorizedJsonFetcher,
  );

  return (
      <Section>
        <TabNav>
          <TabNav.Item to={`/races/${raceId}/race-card`}>出走表</TabNav.Item>
          <TabNav.Item to={`/races/${raceId}/odds`}>オッズ</TabNav.Item>
          <TabNav.Item aria-current to={`/races/${raceId}/result`}>
            結果
          </TabNav.Item>
        </TabNav>

        <Spacer mt={Space * 4} />
        <Heading as="h2">購入した買い目</Heading>

        <Spacer mt={Space * 2} />
        <BettingTicketList>
          {(ticketData?.bettingTickets ?? []).map((ticket) => (
            <BettingTicketList.Item key={ticket.id} ticket={ticket} />
          ))}
        </BettingTicketList>

        <Spacer mt={Space * 4} />
        <Heading as="h2">勝負結果</Heading>

        <Spacer mt={Space * 2} />
        <RaceResultSection />
      </Section>
  );
};
