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
import { DataTableContainer } from './DataTable.styles';
import Pagination from './Pagination';

function DataTable({ tableProps, setVirtualFrame, totalDataCount }) {
  // controls managed by pagination component
  const [visibleRows, setVisibleRows] = useState([]);

  return (
    <DataTableContainer>
      {tableProps ? (
        <TableContainer component={Paper}>
          <Toolbar onSearch={tableProps.onSearch} />
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                {tableProps.columns.map((column) => (
                  <TableCell key={column.title}>
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
                >
                  {tableProps.columns.map((column) => (
                    <TableCell
                      key={`row-${column.title}-${i}`}
                      component='th'
                      scope='row'
                    >
                      <TableCellContent
                        rowNumber={i}
                        column={column}
                        rowData={rowData}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination
            rowData={tableProps.rowData}
            setVisibleRows={setVisibleRows}
            setVirtualFrame={setVirtualFrame}
            totalDataCount={totalDataCount}
          />
        </TableContainer>
      ) : null}
    </DataTableContainer>
  );
}

export default DataTable;
