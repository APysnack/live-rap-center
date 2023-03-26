import React from 'react';
import Thumbnail from '../Thumbnail/Thumbnail';
import Square from '@mui/icons-material/Square';
import { StyledRating } from './DataTable.styles';

function TableCellContent({
  currentPage,
  rowsPerPage,
  rowNumber,
  column,
  rowData,
}) {
  const enumerate = () => {
    const number = (currentPage - 1) * rowsPerPage + (rowNumber + 1);
    return number < 10 ? '0' + number : number;
  };

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

  const roundToDecimal = (number) => {
    return Math.round((number / 10) * 2) / 2;
  };

  const renderStarRating = () => {
    return (
      <StyledRating
        name='customized-color'
        defaultValue={roundToDecimal(rowData['score'])}
        precision={0.5}
        max={10}
        sx={{
          fontSize: '0.7rem',
        }}
        icon={<Square fontSize='inherit' />}
        emptyIcon={<Square fontSize='inherit' />}
      />
    );
  };

  const contentContainer = () => {
    return (
      <div class={column.starRatingUnderneath ? 'cell-with-rating' : ''}>
        {renderContent()}
        {column.starRatingUnderneath ? renderStarRating() : null}
      </div>
    );
  };

  const renderContent = () => {
    switch (column.behavior) {
      case 'enumerate':
        return enumerate();
      case 'image':
        return renderImage();
      case 'versus':
        return generateVersusTitle();
      default:
        return rowData[column.accessor];
    }
  };

  return contentContainer();
}

export default TableCellContent;
