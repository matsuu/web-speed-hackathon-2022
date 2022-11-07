import React from "react";
import { useParams, Outlet } from "react-router-dom";
import styled from "styled-components";

import { Container } from "../../components/layouts/Container";
import { Section } from "../../components/layouts/Section";
import { Spacer } from "../../components/layouts/Spacer";
import { TrimmedImage } from "../../components/media/TrimmedImage";
import { TabNav } from "../../components/navs/TabNav";
import { Heading } from "../../components/typographies/Heading";
import { useFetch } from "../../hooks/useFetch";
import { Color, Radius, Space } from "../../styles/variables";
import { formatTime } from "../../utils/DateUtils";
import { jsonFetcher } from "../../utils/HttpUtils";

const LiveBadge = styled.span`
  background: ${Color.red};
  border-radius: ${Radius.SMALL};
  color: ${Color.mono[0]};
  font-weight: bold;
  padding: ${Space * 1}px;
  text-transform: uppercase;
`;

/** @type {React.VFC} */
export const RaceLayout = () => {
  const { raceId } = useParams();
  const { data } = useFetch(`/api/races/${raceId}`, jsonFetcher);
  return (
    <Container>
      <Spacer mt={Space * 2} />
      <Heading as="h1">{data?.name ?? ''}</Heading>
      <p>
        開始 {formatTime(data?.startAt) ?? '2022-11-01'} 締切 {formatTime(data?.closeAt ?? '2022-11-01')}
      </p>

      <Spacer mt={Space * 2} />

      <Section dark shrink>
        <LiveBadge>Live</LiveBadge>
        <Spacer mt={Space * 2} />
        <TrimmedImage height={225} src={data?.image ?? ''} width={400} />
      </Section>

      <Spacer mt={Space * 2} />

      <Outlet context={{ data }} />

    </Container>

  );
};
