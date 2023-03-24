import styled from 'styled-components';

export const DataTableContainer = styled.div`
  .search-bar {
    border: 2px solid black;
    border-radius: 4px;
    padding: 0.5em;
  }

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
    background-color: blue;
    color: white;
    font-weight: bold;
    font-size: 1.2em;
    text-align: center;
  }

  .table-row {
    border: 2px solid black;
    align-items: center;
  }

  .table-row-body {
    background-color: green;
  }

  .table-cell {
    display: flex;
    align-items: center;
    background-color: green;
  }

  .table-cell-content {
    border: black 2px solid;
  }
`;

export const TableBottom = styled.div`
  background-color: red;
  width: 80%;
`;

// note this is for pagination.js don't use in datatable.js
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

export const ToolbarContainer = styled.div`
  width: 80%;
  display: flex;
  justify-content: flex-end;
`;

export const TableRowStyle = {
  backgroundColor: 'red',
  border: 'black',
};
