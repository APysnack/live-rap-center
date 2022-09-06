import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableCellContent from './TableCellContent';

function DataTable({ tableProps }) {
  return (
    <>
      {tableProps ? (
        <TableContainer component={Paper}>
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
              {tableProps.rowData.map((rowData, i) => (
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
        </TableContainer>
      ) : null}
    </>
  );
}

export default DataTable;
