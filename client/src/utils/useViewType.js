import React, { useState, useEffect } from 'react';
import { removeUnits, MOBILE_VIEW_WIDTH } from '../globalConstants';

function useViewType() {
  const [viewType, setViewType] = useState('');

  useEffect(() => {
    function handleResize() {
      const { innerWidth } = window;
      if (innerWidth < removeUnits(MOBILE_VIEW_WIDTH)) {
        setViewType('mobile');
      } else if (innerWidth < 800) {
        setViewType('tablet');
      } else {
        setViewType('desktop');
      }
    }

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return viewType;
}

export default useViewType;
