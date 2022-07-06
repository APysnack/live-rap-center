import styled from "styled-components";
import { Link } from "react-router-dom";

export const BattlerListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const BattlerLink = styled(Link)`
  display: flex;

  border: 1px solid black;

  div {
    margin-right: 0.4em;
  }
`;
