import React from 'react';
import Thumbnail from '../Thumbnail/Thumbnail';
import Rating from '@mui/material/Rating';
import Square from '@mui/icons-material/Square';
import { styled } from '@mui/material/styles';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
});

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
      <div>
        <div>{rowData[column.accessor]}</div>
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
      case 'star-rating':
        return renderStarRating();
      default:
        return rowData[column.accessor];
    }
  };
  return <div>{renderContent()}</div>;
}

export default TableCellContent;
