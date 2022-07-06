import styled from "styled-components";
import { Link } from "react-router-dom";

export const LeagueListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LeagueLink = styled(Link)`
  display: flex;

  border: 1px solid black;

  div {
    margin-right: 0.4em;
  }
`;
