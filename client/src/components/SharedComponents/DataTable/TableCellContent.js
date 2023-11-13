import React from 'react';
import Thumbnail from '../Thumbnail/Thumbnail';
import StyledRating from '../../SharedComponents/StyledRating/StyledRating';

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
      <div>
        <Thumbnail
          type={column.accessor}
          object={rowData}
          width={column.width}
        />
      </div>
    );
  };

  const renderStarRating = () => {
    return <StyledRating value={rowData['score']}></StyledRating>;
  };

  const renderContent = () => {
    switch (column.behavior) {
      case 'enumerate':
        return enumerate();
      case 'image':
        return renderImage();
      default:
        return typeof rowData[column.accessor] === 'string'
          ? rowData[column.accessor].toUpperCase()
          : rowData[column.accessor];
    }
  };

  const contentContainer = () => {
    return (
      <div
        className={
          'table-cell' +
          (column.starRatingUnderneath ? ' cell-with-rating' : '')
        }
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {renderContent()}
        {column.starRatingUnderneath ? renderStarRating() : null}
      </div>
    );
  };

  return contentContainer();
}

export default TableCellContent;
