import React from 'react';

const Resultcol = ({ text }) => {
  return (
    <div className='w-full h-full'>
      <textarea 
        className="w-full h-full px-7 py-5" 
        disabled
        value={text || ''}
        placeholder="Extracted text will appear here..."
      ></textarea>
    </div>
  );
};

export default Resultcol;