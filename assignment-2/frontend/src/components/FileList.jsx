// src/components/FileList.jsx
import { useState } from 'react';
import FileDetails from './FileDetails';

const FileList = ({ files }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  if (!files || files.length === 0) {
    return <div className="text-center text-gray-500">No files found</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 space-y-4">
        <h2 className="text-xl font-bold mb-4">Files</h2>
        {files.map((file, index) => (
          <div 
            key={index}
            className={`p-4 border rounded-lg cursor-pointer ${selectedFile === index ? 'bg-blue-50 border-blue-500' : 'hover:bg-gray-50'}`}
            onClick={() => setSelectedFile(index)}
          >
            <div className="font-medium text-lg">{file.file_name}</div>
            <div className="text-sm text-gray-600">
              {file.repository}
            </div>
          </div>
        ))}
      </div>
      <div className="lg:col-span-2">
        {selectedFile !== null ? (
          <FileDetails file={files[selectedFile]} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a file to view details
          </div>
        )}
      </div>
    </div>
  );
};

export default FileList;