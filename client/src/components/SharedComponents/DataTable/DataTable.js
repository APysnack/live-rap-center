import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableCellContent from './TableCellContent';
import Toolbar from './Toolbar';
import {
  DataTableContainer,
  ToolbarContainer,
  TableFooter,
} from './DataTable.styles';
import Pagination from './Pagination';
import { ROWS_TO_DISPLAY } from './Constants';

const TABLE_CELL_HEIGHT = '5em';

function DataTable({ tableProps, setVirtualFrame, totalDataCount }) {
  // controls managed by pagination component
  // array of data that is actively being displayed in table
  const [visibleRows, setVisibleRows] = useState([]);

  // vpt is an acronym for "virtual page tracker"
  // used by pagination to manage current page states
  const [vpt, setVpt] = useState({
    currentDisplayedFrame: 1,
    currentVirtualPage: 1,
    nextVirtualPage: 1,
    pageDisplayedInBrowser: 1,
  });

  return (
    <DataTableContainer>
      {tableProps ? (
        <TableContainer component={Paper} class='table-container'>
          <ToolbarContainer>
            <Toolbar onSearch={tableProps.onSearch} />
          </ToolbarContainer>

          <Table sx={{ minWidth: 650 }} aria-label='simple table' class='table'>
            <TableHead>
              <TableRow class='table-row'>
                {tableProps.columns.map((column) => (
                  <TableCell key={column.title} class='column-title'>
                    {column.title.toUpperCase()}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.map((rowData, i) => (
                <TableRow
                  onClick={() => tableProps.onRowClick(rowData)}
                  key={i}
                  class='table-row table-row-body'
                >
                  {tableProps.columns.map((column) => (
                    <TableCell
                      key={`row-${column.title}-${i}`}
                      component='th'
                      scope='row'
                      class='table-cell-content-wrapper'
                      style={{
                        width: column.width,
                        height: TABLE_CELL_HEIGHT,
                        position: 'relative',
                      }}
                    >
                      <TableCellContent
                        rowNumber={i}
                        currentPage={vpt.pageDisplayedInBrowser}
                        rowsPerPage={ROWS_TO_DISPLAY}
                        column={column}
                        rowData={rowData}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TableFooter>
            <Pagination
              vpt={vpt}
              setVpt={setVpt}
              rowData={tableProps.rowData}
              setVisibleRows={setVisibleRows}
              setVirtualFrame={setVirtualFrame}
              totalDataCount={totalDataCount}
            />
          </TableFooter>
        </TableContainer>
      ) : null}
    </DataTableContainer>
  );
}

export default DataTable;
