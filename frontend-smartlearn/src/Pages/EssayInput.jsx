import React, { useState } from 'react';

const EssayInput = () => {
  const [text, setText] = useState('');

  return (
    <div className="w-full h-full bg-white rounded-lg shadow p-4 flex flex-col">
      <textarea
        className="w-full flex-1 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        placeholder="Start by writing, pasting (Ctrl + V) text, or uploading a document (doc, pdf)."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      
      <button
        type="button"
        className="mt-4 self-end text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
      >
        Try
      </button>
    </div>
  );
};

export default EssayInput;
