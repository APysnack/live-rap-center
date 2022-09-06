import React from 'react';
import { Avatar } from '@mui/material';
const { REACT_APP_SERVER_URL } = process.env;

const IMAGE_WIDTH = 60;
const IMAGE_HEIGHT = 60;

function TableCellContent({ rowNumber, column, rowData }) {
  React.useEffect(() => {
    console.log(rowData);
  }, []);

  const renderImage = () =>
    rowData?.user?.profilePictureUrl ? (
      <Avatar
        src={REACT_APP_SERVER_URL + rowData.user.profilePictureUrl}
        sx={{ width: IMAGE_WIDTH, height: IMAGE_HEIGHT }}
        className='image'
      />
    ) : (
      <Avatar
        src={REACT_APP_SERVER_URL + rowData.image}
        sx={{ width: IMAGE_WIDTH, height: IMAGE_HEIGHT }}
        className='image'
      />
    );

  const renderContent = () => {
    switch (column.behavior) {
      case 'enumerate':
        return rowNumber + 1;
      case 'image':
        return renderImage();
      default:
        return rowData[column.accessor];
    }
  };
  return <div>{renderContent()}</div>;
}

export default TableCellContent;
