import React, { useEffect, useState } from 'react';
import { ROWS_TO_DISPLAY, PAGES_PER_FRAME } from './Constants';

function PaginationButton({ type, vpt, setVpt, totalDataCount }) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [boundaries, setBoundaries] = useState({});

  useEffect(() => {
    if (totalDataCount) {
      const maxPages = Math.ceil(totalDataCount / ROWS_TO_DISPLAY);
      const maxFrame = Math.floor(maxPages / PAGES_PER_FRAME) + 1;
      const maxVirtualPage = Math.ceil(
        (totalDataCount - PAGES_PER_FRAME * (maxFrame - 1) * ROWS_TO_DISPLAY) /
          ROWS_TO_DISPLAY
      );

      const tempObj = {
        maxPages: maxPages,
        maxFrame: maxFrame,
        maxVirtualPage: maxVirtualPage,
      };
      setBoundaries({ ...boundaries, ...tempObj });
    }
  }, [totalDataCount]);

  useEffect(() => {
    checkIfDisabled();
  }, [vpt.pageDisplayedInBrowser]);

  const checkIfDisabled = () => {
    switch (type) {
      case 'to-last':
        setIsDisabled(vpt.pageDisplayedInBrowser === boundaries.maxPages);
        break;
      case 'next':
        setIsDisabled(vpt.pageDisplayedInBrowser === boundaries.maxPages);
        break;
      default:
        setIsDisabled(vpt.pageDisplayedInBrowser === 1);
        break;
    }
  };

  const handleClick = () => {
    if (!isDisabled) {
      let newState = null;

      switch (type) {
        case 'prev':
          newState = {
            nextVirtualPage: vpt.currentVirtualPage - 1,
          };
          break;
        case 'next':
          newState = {
            nextVirtualPage: vpt.currentVirtualPage + 1,
          };
          break;
        case 'to-last':
          newState = {
            currentDisplayedFrame: boundaries.maxFrame,
            currentVirtualPage: boundaries.maxVirtualPage,
            nextVirtualPage: boundaries.maxVirtualPage,
            pageDisplayedInBrowser: boundaries.maxPages,
          };
          break;
        default:
          newState = {
            currentDisplayedFrame: 1,
            currentVirtualPage: 1,
            nextVirtualPage: 1,
            pageDisplayedInBrowser: 1,
          };
          break;
      }
      setVpt({ ...vpt, ...newState });
    }
  };

  const generateButtonText = () => {
    switch (type) {
      case 'prev':
        return 'Previous';
      case 'next':
        return 'Next';
      case 'to-first':
        return 'First';
      case 'to-last':
        return 'Last';
      default:
        return '';
    }
  };

  return (
    <div
      className={`pagination-btn ${isDisabled ? 'disabled' : null}`}
      onClick={handleClick}
    >
      {generateButtonText()}
    </div>
  );
}

export default PaginationButton;
