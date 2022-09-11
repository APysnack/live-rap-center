import React, { useEffect, useState } from 'react';

function PaginationButton({ type, vpt, setVpt, disabled = false }) {
  const [isDisabled, setIsDisabled] = useState(disabled);

  useEffect(() => {
    setIsDisabled(disabled);
  }, [disabled]);

  const handleClick = () => {
    if (!isDisabled) {
      let newState = null;

      if (type === 'next') {
        newState = {
          nextVirtualPage: vpt.currentVirtualPage + 1,
        };
      } else {
        newState = {
          nextVirtualPage: vpt.currentVirtualPage - 1,
        };
      }
      setVpt({ ...vpt, ...newState });
    }
  };

  return (
    <div
      className={`pagination-btn ${disabled ? 'disabled' : null}`}
      onClick={handleClick}
    >
      {type === 'next' ? 'Next' : 'Previous'}
    </div>
  );
}

export default PaginationButton;
