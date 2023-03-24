import React from 'react';
import Thumbnail from '../Thumbnail/Thumbnail';

function TableCellContent({
  currentPage,
  rowsPerPage,
  rowNumber,
  column,
  rowData,
}) {
  const renderImage = () => {
    return (
      <Thumbnail type={column.accessor} object={rowData} style={'table-cell'} />
    );
  };

  const generateVersusTitle = () => {
    let str = '';
    rowData[column.accessor].forEach((data, i) =>
      i % 2 === 1 ? (str += ` versus ${data.name}`) : (str += data.name)
    );
    return str;
  };

  const renderContent = () => {
    switch (column.behavior) {
      case 'enumerate':
        return (currentPage - 1) * rowsPerPage + (rowNumber + 1);
      case 'image':
        return renderImage();
      case 'versus':
        return generateVersusTitle();
      default:
        return rowData[column.accessor];
    }
  };
  return <div>{renderContent()}</div>;
}

export default TableCellContent;
