// src/layouts/AuthLayout.jsx
import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: 'url(/Dark.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'right',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      {children}
    </div>
  );
};

export default AuthLayout;
