import styled from 'styled-components';

export const DataTableContainer = styled.div`
  .search-bar {
    border: 2px solid black;
    border-radius: 4px;
    padding: 0.25em;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  text-align: center;
  align-items: center;

  .pagination-btn {
    padding: 0.5em;
    margin: 1.5em;
    width: 5%;
    text-align: center;
    border-radius: 5px;
    background-color: #87cefa;
    color: white;
    border: 2px solid black;
  }

  .disabled {
    background-color: red;
  }
`;
