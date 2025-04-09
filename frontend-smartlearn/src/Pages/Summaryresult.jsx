import React from 'react';

const Summaryresult = ({ text, placedes }) => {
  return (
    <div className='w-full h-full'>
      <textarea 
        className="w-full h-full px-7 py-5" 
        disabled
        value={text || ''}
        placeholder="Summary results...."
      ></textarea>
    </div>
  );
};

export default Summaryresult;