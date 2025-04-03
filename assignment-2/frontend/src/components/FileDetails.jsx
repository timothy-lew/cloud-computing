// src/components/FileDetails.jsx
const FileDetails = ({ file }) => {
  if (!file) return null;
  
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
      
      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-2">Summary</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-700">{file.file_summary}</p>
        </div>
      </div>
    </div>
  );
};

export default FileDetails;