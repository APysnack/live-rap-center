import styled from 'styled-components';
import { DoubleArrow } from '@mui/icons-material';
import { KeyboardArrowRight } from '@mui/icons-material';
import { MOBILE_VIEW_WIDTH } from '../../../globalConstants';

export const DataTableContainer = styled.div`
  .search-bar {
    border: 2px solid black;
    border-radius: 4px;
    padding: 0.5em;
  }

  font-size: 1.3em;
  letter-spacing: 1px;

  .table {
    margin: 2em 0 0 0;
    width: 80%;

    @media (max-width: ${MOBILE_VIEW_WIDTH}) {
      width: 95%;
    }
  }

  .table-container {
    padding: 2em, 0 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .column-title {
    background-color: ${(props) => props.theme.secondary};
    color: ${(props) => props.theme.headerFontColor};
    font-weight: bold;
    font-size: 1.2em;
    text-align: center;
    padding: 0.25em;
  }

  .header-row {
    background-color: ${(props) => props.theme.secondary};
  }

  .table-row {
    border: 2px solid black;
    align-items: center;
  }

  .table-row-body {
    cursor: pointer;
    background-color: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.primaryContrast};

    &:hover {
      background-color: ${(props) => props.theme.primaryContrast};
      color: ${(props) => props.theme.primary};
    }
  }

  .table-cell-content-wrapper {
    border: black 2px solid;
  }

  .cell-with-rating {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5em;
  }
`;

export const TableFooter = styled.div`
  background-color: ${(props) => props.theme.secondary};
  width: 80%;

  @media (max-width: ${MOBILE_VIEW_WIDTH}) {
    width: 95%;
  }
`;

export const RatingContainer = styled.div`
  width: 5px;
`;

// note this is for pagination.js don't use in datatable.js
export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  padding: 1em;

  .pagination-btn {
    padding: 0.5em;
    width: 4.5em;
    text-align: center;
    border-radius: 5px;
    margin-right: 1em;
    background-color: ${(props) => props.theme.primary};
    color: white;
    border: 2px solid black;

    @media (max-width: ${MOBILE_VIEW_WIDTH}) {
      margin: 0 0.5em 0 0.5em;
      width: 6em;
    }
  }

  .pagination-btn:hover {
    background-color: ${(props) => props.theme.tertiary};
  }

  .disabled {
    background-color: ${(props) => props.theme.disabled};
    visibility: hidden;
  }

  .disabled:hover {
    background-color: ${(props) => props.theme.disabled};
    pointer-events: none;
  }

  .pagination-text {
    color: white;
    margin: 0 3em 0 3em;
    user-select: none;

    @media (max-width: ${MOBILE_VIEW_WIDTH}) {
      margin: 0;
    }
  }

  @media (max-width: ${MOBILE_VIEW_WIDTH}) {
    gap: 0.3em;
  }
`;

export const ToolbarContainer = styled.div`
  width: 80%;
  display: flex;
  justify-content: flex-end;

  @media (max-width: ${MOBILE_VIEW_WIDTH}) {
    width: 95%;
  }
`;

export const TableRowStyle = {
  backgroundColor: 'red',
  border: 'black',
};

export const LeftDoubleArrow = styled(DoubleArrow)`
  transform: rotate(180deg);
  color: ${(props) => props.theme.primaryContrast};
`;

export const RightDoubleArrow = styled(DoubleArrow)`
  color: ${(props) => props.theme.primaryContrast};
`;

export const RightSingleArrow = styled(KeyboardArrowRight)`
  color: ${(props) => props.theme.primaryContrast};
`;

export const LeftSingleArrow = styled(KeyboardArrowRight)`
  transform: rotate(180deg);
  color: ${(props) => props.theme.primaryContrast};
`;
