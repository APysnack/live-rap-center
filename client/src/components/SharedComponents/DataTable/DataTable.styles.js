import styled from 'styled-components';

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
    background-color: ${(props) => props.theme.tableHeaders};
  }

  .table-row {
    border: 2px solid black;
    align-items: center;
  }

  .table-row-body {
    background-color: ${(props) => props.theme.primary};
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

  .pagination-btn {
    padding: 0.5em;
    margin: 1em 0.5em 1em 0.5em;
    width: 5%;
    text-align: center;
    border-radius: 5px;
    background-color: ${(props) => props.theme.primary};
    color: white;
    border: 2px solid black;
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
  }
`;

export const ToolbarContainer = styled.div`
  width: 80%;
  display: flex;
  justify-content: flex-end;
`;

export const TableRowStyle = {
  backgroundColor: 'red',
  border: 'black',
};
