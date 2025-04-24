import React, { useState, useRef } from 'react';
import * as mammoth from 'mammoth';

const SummaryInput = ({ text, onTextChange, onAnalyze, isLoading, wordCount, wordLimit }) => {
  const fileInputRef = useRef(null);

  const handleUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileType = file.name.split('.').pop().toLowerCase();

    if (!['txt', 'docx'].includes(fileType)) {
      alert('Please upload a .txt or .docx file.');
      return;
    }

    if (fileType === 'txt') {
      const reader = new FileReader();
      reader.onload = (event) => {
        onTextChange(event.target.result);
      };
      reader.readAsText(file);
    }

    if (fileType === 'docx') {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const arrayBuffer = event.target.result;
        const result = await mammoth.extractRawText({ arrayBuffer });
        onTextChange(result.value);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div className="w-full h-full bg-white rounded-lg shadow p-4 flex flex-col">
      <textarea
        className="w-full flex-1 p-4 border border-gray-300 rounded-lg resize-none"
        placeholder="Enter your summary or upload a document (docx, txt)."
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
        disabled={isLoading}
      />

      {/* WORD COUNT DISPLAY */}
      <p className={`text-sm mt-2 ${wordCount > wordLimit ? 'text-red-600 font-semibold' : 'text-gray-700'}`}>
        Word Count: {wordCount} / {wordLimit}
      </p>

      <div className="flex justify-between mt-4">
        <button
          className="flex items-center gap-2 px-3 py-1 text-blue-400 border border-blue-400 rounded-full hover:bg-blue-400 hover:text-white transition-colors"
          onClick={handleUpload}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          Upload Document
        </button>

        <button
          type="button"
          className={`text-white border px-6 py-2 rounded-md flex items-center gap-2 transition-colors
            ${wordCount > wordLimit || isLoading ? 'bg-gray-300 border-gray-300 cursor-not-allowed' : 'bg-blue-400 hover:bg-blue-500 border-blue-400'}
          `}
          onClick={onAnalyze}
          disabled={isLoading || wordCount > wordLimit}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Summarize
            </>
          )}
        </button>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".docx,.txt"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default SummaryInput;