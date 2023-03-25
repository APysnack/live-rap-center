import React, { useEffect, useState } from 'react';
import { ROWS_TO_DISPLAY, PAGES_PER_FRAME } from './Constants';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import DoubleArrow from '@mui/icons-material/DoubleArrow';

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
  }, [vpt.pageDisplayedInBrowser, boundaries.maxPages]);

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

  const generateIcon = () => {
    switch (type) {
      case 'prev':
        return <KeyboardArrowRight style={{ transform: 'rotate(180deg)' }} />;
      case 'next':
        return <KeyboardArrowRight />;
      case 'to-first':
        return <DoubleArrow style={{ transform: 'rotate(180deg)' }} />;
      case 'to-last':
        return <DoubleArrow />;
      default:
        return '';
    }
  };

  return (
    <IconButton
      aria-label='next'
      className={`pagination-btn ${isDisabled ? 'disabled' : null}`}
      onClick={handleClick}
    >
      {generateIcon()}
    </IconButton>
  );
}

export default PaginationButton;
