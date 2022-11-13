import React from 'react';

function FloatButtonContainer({ children }) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '5px'
      }}>
      {children}
    </div>
  );
}

export default FloatButtonContainer;
