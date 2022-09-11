import React, { useEffect, useState, useRef } from 'react';
import { PaginationContainer } from './DataTable.styles';
import {
  CLIENT_MEMORY_LIMIT,
  ROWS_TO_DISPLAY,
  PAGES_PER_FRAME,
} from './Constants';
import PaginationButton from './PaginationButton';

function Pagination({
  rowData,
  setVisibleRows,
  setVirtualFrame,
  totalDataCount,
}) {
  const maxPages = Math.ceil(totalDataCount / ROWS_TO_DISPLAY);
  const maxFrame = Math.floor(maxPages / ROWS_TO_DISPLAY) * ROWS_TO_DISPLAY + 1;
  const maxVirtualPage = Math.ceil(
    (totalDataCount - (maxFrame - 1) * ROWS_TO_DISPLAY) / ROWS_TO_DISPLAY
  );
  const componentIsMounted = useRef(false);

  // vpt is an acronym for "virtual page tracker"
  const [vpt, setVpt] = useState({
    currentDisplayedFrame: 1,
    currentVirtualPage: 1,
    nextVirtualPage: 1,
    pageDisplayedInBrowser: 1,
  });

  useEffect(() => {
    setVirtualFrame(vpt.currentDisplayedFrame);
  }, [vpt.currentDisplayedFrame]);

  useEffect(() => {
    if (rowData?.length > 0) {
      console.log(rowData);
      setVisibleRows(
        rowData.slice(
          (vpt.currentVirtualPage - 1) * ROWS_TO_DISPLAY,
          (vpt.currentVirtualPage - 1) * ROWS_TO_DISPLAY + ROWS_TO_DISPLAY
        )
      );
    }
  }, [vpt.currentVirtualPage, rowData]);

  // updates the actual page number being displayed in the pagination e.g. page 12 (out of 89)
  useEffect(() => {
    const newState = {
      pageDisplayedInBrowser:
        PAGES_PER_FRAME * (vpt.currentDisplayedFrame - 1) +
        vpt.currentVirtualPage,
    };
    setVpt({ ...vpt, ...newState });
  }, [vpt.currentVirtualPage]);

  useEffect(() => {
    console.log(vpt);
  }, [vpt]);

  useEffect(() => {
    if (componentIsMounted.current) {
      // this block triggers only when we have to make a db call to fetch more data
      if (
        vpt.nextVirtualPage * ROWS_TO_DISPLAY > CLIENT_MEMORY_LIMIT ||
        vpt.nextVirtualPage * ROWS_TO_DISPLAY === 0
      ) {
        // handles the case where user clicked "prev" button (we've reached the beginning of the frame)
        if (vpt.nextVirtualPage * ROWS_TO_DISPLAY === 0) {
          // if no previous frame exists, there is no more data to fetch
          const previousFrameExists = vpt.currentDisplayedFrame - 1 > 0;

          // if the previous frame exists in database, direct user to previous frame on last virtual page
          if (previousFrameExists) {
            const newState = {
              currentDisplayedFrame: vpt.currentDisplayedFrame - 1,
              currentVirtualPage: PAGES_PER_FRAME,
              nextVirtualPage: PAGES_PER_FRAME,
            };
            setVpt({
              ...vpt,
              ...newState,
            });
          }
        }
        // else, user clicked "next" button
        else {
          const newState = {
            currentDisplayedFrame: vpt.currentDisplayedFrame + 1,
            currentVirtualPage: 1,
            nextVirtualPage: 1,
          };
          setVpt({
            ...vpt,
            ...newState,
          });
        }
      } else {
        if (vpt.nextVirtualPage !== vpt.currentVirtualPage) {
          setVpt({
            ...vpt,
            currentVirtualPage: vpt.nextVirtualPage,
          });
        }
      }
    } else {
      componentIsMounted.current = true;
    }
  }, [vpt.nextVirtualPage]);

  return (
    <PaginationContainer>
      <div>Current page: {vpt.pageDisplayedInBrowser}</div>
      <PaginationButton
        type='prev'
        disabled={vpt.pageDisplayedInBrowser === 1}
        vpt={vpt}
        setVpt={setVpt}
      />
      <PaginationButton
        type='next'
        disabled={vpt.pageDisplayedInBrowser === maxPages}
        vpt={vpt}
        setVpt={setVpt}
      />
    </PaginationContainer>
  );
}

export default Pagination;
