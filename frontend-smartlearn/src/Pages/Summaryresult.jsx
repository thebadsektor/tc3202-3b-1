import React, { useState } from 'react';

const Summaryresult = ({ text, placedes, isError }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (text) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      
      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  return (
    <div className="w-full h-full bg-white rounded-lg shadow p-4">
      <div className="border border-gray-300 rounded-lg h-full p-4 overflow-auto relative">
        {text ? (
          <>
            <div className={`whitespace-pre-wrap ${isError ? 'text-red-500' : 'text-gray-800'} pb-12`}>
              {text}
            </div>
            <div className="absolute bottom-4 right-4">
              <button
                onClick={handleCopy}
                className={`px-4 py-2 rounded-md flex items-center ${
                  copied ? 'bg-green-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {copied ? (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </div>
          </>
        ) : (
          <div className="text-gray-500">{placedes || "Summary results will appear here..."}</div>
        )}
      </div>
    </div>
  );
};

export default Summaryresult;