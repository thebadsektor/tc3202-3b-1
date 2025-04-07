import React, { useState, useRef } from 'react';
import { pdfjs } from 'react-pdf';

// Initialize pdfjs worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

const EssayInput = ({ onTextExtracted }) => {
  const [text, setText] = useState('');
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    if (onTextExtracted) {
      onTextExtracted(newText);
    }
  };
  
  const handleUpload = () => {
    fileInputRef.current.click();
  };
  
  const handleFileChange = async (e) => {
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
        const extractedText = event.target.result;
        setText(extractedText);
        if (onTextExtracted) {
          onTextExtracted(extractedText);
        }
      };
      reader.readAsText(file);
    } 
    else {
      // In a real app, you'd send doc/docx to a server for processing
      alert(`Bale wala pang back end`);
    }
  };


  return (
    <div className="w-full h-full bg-white rounded-lg shadow p-4 flex flex-col">
      <textarea
        className="w-full flex-1 p-4 border border-gray-300 rounded-lg resize-none"
        placeholder="Start by writing, pasting (Ctrl + V) text, or uploading a document (doc, pdf)."
        value={text}
        onChange={handleTextChange}
      />
      
      {isLoading && (
        <div className="mt-2 text-blue-400">
          Extracting text from PDF... This may take a moment.
        </div>
      )}
      
      <button
        className="flex items-center gap-2 px-2 py-1 w-1/3 mt-2 text-blue-400 border border-blue-400 rounded-full hover:bg-blue-400 hover:text-white transition-colors"
        onClick={handleUpload}
        disabled={isLoading}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
        Upload Document
      </button>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".doc,.docx,.pdf,.txt"
        onChange={handleFileChange}
      />

      <button
        type="button"
        className="mt-4 block self-end text-white bg-blue-400 hover:bg-white hover:text-blue-400 border border-blue-400 px-4 py-1 rounded-md"
        disabled={isLoading}
      >
        Check
      </button>
    </div>
  );
};

export default EssayInput;