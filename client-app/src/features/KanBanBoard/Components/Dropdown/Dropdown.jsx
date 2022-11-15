import React, { useEffect, useRef } from 'react';

import './Dropdown.css';

function Dropdown({ onClose, children }) {
  const dropdownRef = useRef();

  const handleClick = (event) => {
    if (dropdownRef && !dropdownRef.current?.contains(event.target) && onClose) onClose();
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });

  return (
    <div ref={dropdownRef} className={`dropdown custom-scroll`}>
      {children}
    </div>
  );
}

export default React.memo(Dropdown, document.getElementById('root-dropdown'));
