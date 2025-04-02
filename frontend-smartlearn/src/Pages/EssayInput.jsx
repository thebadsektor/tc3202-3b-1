import React, { useState, useRef } from 'react';

const EssayInput = () => {
  const [text, setText] = useState('');
  const fileInputRef = useRef(null);

  const handlePaste = () => {
    navigator.clipboard.readText()
      .then(clipText => {
        setText(clipText);
      })
      .catch(err => {
        console.error('Failed to read clipboard: ', err);
        alert('Could not access clipboard. Please paste manually or check permissions.');
      });
  };

  const handleUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file type
    const fileType = file.name.split('.').pop().toLowerCase();
    if (fileType !== 'doc' && fileType !== 'docx' && fileType !== 'pdf' && fileType !== 'txt') {
      alert('Please upload a document file (doc, docx, pdf, txt)');
      return;
    }

    // Handle text files directly
    if (fileType === 'txt') {
      const reader = new FileReader();
      reader.onload = (event) => {
        setText(event.target.result);
      };
      reader.readAsText(file);
    } else {
      // In a real app, you'd send this to a server for processing
      // or use a library to handle doc/pdf extraction
      alert(`File "${file.name}" uploaded. In a real application, this would be processed to extract text.`);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <div className="mb-4">
        <textarea
          className="w-full p-4 min-h-[200px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="Start by writing, pasting (Ctrl + V) text, or uploading a document (doc, pdf)."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      
      <div className="flex flex-wrap gap-3">
        <button
          className="flex items-center gap-2 px-4 py-2 text-green-700 border border-green-700 rounded-full hover:bg-green-50 transition-colors"
          onClick={handlePaste}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
            <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2H6zm0 2h8v11H6V5z" />
          </svg>
          Paste Text
        </button>
        
        <button
          className="flex items-center gap-2 px-4 py-2 text-green-700 border border-green-700 rounded-full hover:bg-green-50 transition-colors"
          onClick={handleUpload}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          Upload Document
        </button>
      </div>
      
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".doc,.docx,.pdf,.txt"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default EssayInput;