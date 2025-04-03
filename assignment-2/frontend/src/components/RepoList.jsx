// src/components/RepoList.jsx
import { useState } from 'react';
import RepoDetails from './RepoDetails';

const RepoList = ({ repos }) => {
  const [selectedRepo, setSelectedRepo] = useState(null);

  if (!repos || repos.length === 0) {
    return <div className="text-center text-gray-500">No repositories found</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 space-y-4">
        <h2 className="text-xl font-bold mb-4">Repositories</h2>
        {repos.map((repo, index) => (
          <div 
            key={index}
            className={`p-4 border rounded-lg cursor-pointer ${selectedRepo === index ? 'bg-blue-50 border-blue-500' : 'hover:bg-gray-50'}`}
            onClick={() => setSelectedRepo(index)}
          >
            <div className="font-medium text-lg">{repo.name}</div>
            <div className="text-sm text-gray-600">
              {repo.full_name}
            </div>
          </div>
        ))}
      </div>
      <div className="lg:col-span-2">
        {selectedRepo !== null ? (
          <RepoDetails repo={repos[selectedRepo]} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a repository to view details
          </div>
        )}
      </div>
    </div>
  );
};

export default RepoList;