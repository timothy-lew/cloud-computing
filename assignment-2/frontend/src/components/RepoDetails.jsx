// src/components/RepoDetails.jsx
const RepoDetails = ({ repo }) => {
  if (!repo) return null;
  
  return (
    <div className="border rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">{repo.name}</h2>
      
      <div className="grid grid-cols-1 gap-4 mb-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
          <p>{repo.full_name}</p>
        </div>
        {repo.description && (
          <div>
            <h3 className="text-sm font-medium text-gray-500">Description</h3>
            <p>{repo.description || "No description available"}</p>
          </div>
        )}
        <div>
          <h3 className="text-sm font-medium text-gray-500">Score</h3>
          <p>{repo.score}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">View on GitHub</h3>
          <a 
            href={repo.html_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Open Repository
          </a>
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-2">Summary</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-700">{repo.repository_summary}</p>
        </div>
      </div>
    </div>
  );
};

export default RepoDetails;