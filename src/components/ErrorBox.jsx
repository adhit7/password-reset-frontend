import React from 'react';

const ErrorBox = ({ message }) => {
  return (
    <div className='bg-danger p-1 text-white d-flex rounded'>
      <p className='align-self-center'>{message}</p>
    </div>
  );
};

export default ErrorBox;
