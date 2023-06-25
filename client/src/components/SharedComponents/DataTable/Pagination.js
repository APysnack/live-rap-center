import React, { useEffect, useState, useRef } from 'react';
import { PaginationContainer } from './DataTable.styles';
import {
  CLIENT_MEMORY_LIMIT,
  ROWS_TO_DISPLAY,
  PAGES_PER_FRAME,
} from './Constants';
import PaginationButton from './PaginationButton';
import useViewType from '../../../utils/useViewType';

function Pagination({
  rowData,
  setVisibleRows,
  setVirtualFrame,
  totalDataCount,
  vpt,
  setVpt,
}) {
  const componentIsMounted = useRef(false);
  const viewType = useViewType();

  useEffect(() => {
    setVirtualFrame(vpt.currentDisplayedFrame);
  }, [vpt.currentDisplayedFrame]);

  useEffect(() => {
    if (rowData?.length > 0) {
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
      {viewType === 'mobile' ? null : (
        <PaginationButton
          type='to-first'
          vpt={vpt}
          setVpt={setVpt}
          totalDataCount={totalDataCount}
        />
      )}

      <PaginationButton
        type='prev'
        vpt={vpt}
        setVpt={setVpt}
        totalDataCount={totalDataCount}
      />
      <div class='pagination-text'>
        {viewType === 'mobile' ? null : `Page: ${vpt.pageDisplayedInBrowser}`}
      </div>
      <PaginationButton
        type='next'
        vpt={vpt}
        setVpt={setVpt}
        totalDataCount={totalDataCount}
      />
      {viewType === 'mobile' ? null : (
        <PaginationButton
          type='to-last'
          vpt={vpt}
          setVpt={setVpt}
          totalDataCount={totalDataCount}
        />
      )}
    </PaginationContainer>
  );
}

export default Pagination;
