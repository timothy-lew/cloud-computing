// src/components/FileDetails.jsx
import { useState } from 'react';

const FileDetails = ({ file }) => {
  const [showFullCode, setShowFullCode] = useState(false);
  
  if (!file) return null;
  
  // Function to determine if code should be truncated
  const isCodeLong = file.file_content && file.file_content.split('\n').length > 15;
  
  // Get displayable code (either truncated or full based on state)
  const displayCode = () => {
    if (!file.file_content) return "No content available";
    
    if (isCodeLong && !showFullCode) {
      return file.file_content.split('\n').slice(0, 15).join('\n') + '\n...';
    }
    
    return file.file_content;
  };
  
  return (
    <div className="border rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">{file.file_name}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Repository</h3>
          <p>{file.repository}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Path</h3>
          <p>{file.file_path}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Score</h3>
          <p>{file.score}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">View on GitHub</h3>
          <a 
            href={file.html_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Open File
          </a>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Description</h3>
        <p className="text-gray-700">{file.description}</p>
      </div>
      
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Summary</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-700">{file.file_summary}</p>
        </div>
      </div>
      
      {/* Code Viewer Section */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-500">File Content</h3>
          {isCodeLong && (
            <button 
              onClick={() => setShowFullCode(!showFullCode)}
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              {showFullCode ? 'Show Less' : 'Show Full Code'}
            </button>
          )}
        </div>
        
        <div className="bg-gray-900 text-gray-200 p-4 rounded-lg overflow-x-auto">
          <pre className="whitespace-pre-wrap font-mono text-sm">
            {displayCode()}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default FileDetails;