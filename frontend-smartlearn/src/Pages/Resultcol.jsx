import React from 'react';

const Resultcol = ({ result, issues, originalText, isLoading, metrics }) => {
  const highlightedText = () => {
    if (!issues || issues.length === 0) return null;

    let html = originalText;
    let offset = 0;

    // Sort issues by start position (ascending)
    const sortedIssues = [...issues].sort((a, b) => a.start - b.start);

    sortedIssues.forEach(issue => {
      const startPos = issue.start + offset;
      const endPos = issue.end + offset;
      
      const before = html.substring(0, startPos);
      const highlighted = html.substring(startPos, endPos);
      const after = html.substring(endPos);
      
      const highlightedSpan = `<span class="bg-yellow-200 border-b-2 border-red-400 cursor-pointer" title="${issue.message}: '${issue.original}' → '${issue.suggestion}'">${highlighted}</span>`;
      
      html = before + highlightedSpan + after;
      offset += highlightedSpan.length - highlighted.length;
    });

    return html;
  };

  // Get color class based on score
  const getScoreColor = (score) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 70) return 'bg-blue-500';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Get text color based on score
  const getTextColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Get score label
  const getScoreLabel = (score) => {
    if (score >= 90) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 50) return 'Fair';
    return 'Needs Work';
  };

  return (
    <div className="w-full h-full bg-white rounded-lg shadow p-4 flex flex-col">
      <div className="mb-3 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Results</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            {issues && issues.length > 0 ? `${issues.length} issue${issues.length !== 1 ? 's' : ''} found` : 'No issues found'}
          </span>
        </div>
      </div>

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <svg className="animate-spin h-10 w-10 text-blue-400 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-gray-600">Analyzing your text...</p>
          </div>
        </div>
      ) : (
        originalText && (
          <div className="flex flex-col h-full">
            {/* Metrics Section - Show only when we have results */}
            {issues && issues.length > 0 && metrics && metrics.writingScore > 0 && (
              <div className="bg-white rounded-lg p-4 mb-4 border shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Writing Score</h3>
                  <div className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-600">
                    {getScoreLabel(metrics.writingScore)}
                  </div>
                </div>
                
                {/* Main Score Display */}
                <div className="flex items-center justify-between mb-6">
                  {/* Score Circle */}
                  <div className="relative flex items-center justify-center w-24 h-24">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle 
                        cx="50" 
                        cy="50" 
                        r="45" 
                        fill="transparent" 
                        stroke="#E5E7EB" 
                        strokeWidth="8"
                      />
                      <circle 
                        cx="50" 
                        cy="50" 
                        r="45" 
                        fill="transparent" 
                        stroke={metrics.writingScore >= 90 ? "#10B981" : metrics.writingScore >= 70 ? "#3B82F6" : metrics.writingScore >= 50 ? "#F59E0B" : "#EF4444"} 
                        strokeWidth="8"
                        strokeDasharray={`${2 * Math.PI * 45 * metrics.writingScore / 100} ${2 * Math.PI * 45}`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={`text-2xl font-bold ${getTextColor(metrics.writingScore)}`}>
                        {metrics.writingScore}
                      </span>
                    </div>
                  </div>
                  
                  {/* Score Breakdown */}
                  <div className="flex-1 ml-6">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                      {/* Grammar */}
                      <div className="flex flex-col">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-700">Grammar</span>
                          <span className={`text-sm font-bold ${getTextColor(metrics.grammar)}`}>{Math.round(metrics.grammar)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${getScoreColor(metrics.grammar)}`} 
                            style={{ width: `${metrics.grammar}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      {/* Fluency */}
                      <div className="flex flex-col">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-700">Fluency</span>
                          <span className={`text-sm font-bold ${getTextColor(metrics.fluency)}`}>{Math.round(metrics.fluency)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${getScoreColor(metrics.fluency)}`} 
                            style={{ width: `${metrics.fluency}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      {/* Clarity */}
                      <div className="flex flex-col">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-700">Clarity</span>
                          <span className={`text-sm font-bold ${getTextColor(metrics.clarity)}`}>{Math.round(metrics.clarity)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${getScoreColor(metrics.clarity)}`} 
                            style={{ width: `${metrics.clarity}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      {/* Engagement */}
                      <div className="flex flex-col">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-700">Engagement</span>
                          <span className={`text-sm font-bold ${getTextColor(metrics.engagement)}`}>{Math.round(metrics.engagement)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${getScoreColor(metrics.engagement)}`} 
                            style={{ width: `${metrics.engagement}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Error Rate */}
                    <div className="mt-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700">Error Rate</span>
                        <span className={`text-sm font-bold ${metrics.errorPercentage > 50 ? 'text-red-600' : metrics.errorPercentage > 20 ? 'text-yellow-600' : 'text-green-600'}`}>
                          {metrics.errorPercentage}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            metrics.errorPercentage > 50 ? 'bg-red-500' : 
                            metrics.errorPercentage > 20 ? 'bg-yellow-500' : 'bg-green-500'
                          }`} 
                          style={{ width: `${metrics.errorPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Text Display */}
            <div className="border rounded-md p-4 mb-4 overflow-auto flex-1">
              {issues && issues.length > 0 ? (
                <div 
                  className="text-wrap break-words" 
                  dangerouslySetInnerHTML={{ __html: highlightedText() }}
                />
              ) : (
                <div className="text-wrap break-words">
                  {originalText}
                </div>
              )}
            </div>
            
            {/* Corrected Text Section */}
            {issues && issues.length > 0 && (
              <div className="flex flex-col">
                <h3 className="text-md font-semibold mb-2">Corrected Text</h3>
                <div className="border rounded-md p-4 overflow-auto flex-1 bg-green-50">
                  <div className="text-wrap break-words">{result}</div>
                </div>
              </div>
            )}

            {/* Issues Table */}
            {issues && issues.length > 0 && (
              <div className="mt-4">
                <h3 className="text-md font-semibold mb-2">Issues</h3>
                <div className="overflow-auto max-h-60">
                  <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 border-b">Type</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 border-b">Issue</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 border-b">Suggestion</th>
                      </tr>
                    </thead>
                    <tbody>
                      {issues.map((issue, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-2 text-sm border-b border-gray-200">{issue.type}</td>
                          <td className="px-4 py-2 text-sm border-b border-gray-200">{issue.message}</td>
                          <td className="px-4 py-2 text-sm border-b border-gray-200">
                            <span className="line-through text-red-500 mr-2">{issue.original}</span>
                            <span className="text-green-500">{issue.suggestion}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )
      )}

      {!originalText && !isLoading && (
        <div className="flex-1 flex items-center justify-center text-gray-400">
          <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-lg">Enter text to check for grammar errors</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Resultcol;