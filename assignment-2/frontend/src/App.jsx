// src/App.jsx
import { useState } from 'react';
import SearchBar from './components/SearchBar';
import FileList from './components/FileList';
import RepoList from './components/RepoList';
import { searchGithubCode, searchGithubRepo } from './services/api';

function App() {
  const [activeTab, setActiveTab] = useState('code'); // 'code' or 'repos'
  const [searchQuery, setSearchQuery] = useState('');
  const [codeResults, setCodeResults] = useState(null);
  const [repoResults, setRepoResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    setIsLoading(true);
    setError(null);
    
    try {
      if (activeTab === 'code') {
        const data = await searchGithubCode(query);
        setCodeResults(data);
      } else {
        const data = await searchGithubRepo(query);
        setRepoResults(data);
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'An error occurred while searching');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setError(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">GitHub Code Explorer</h1>
        <p className="text-gray-600 mt-2">
          Search for code on GitHub and get AI-powered summaries
        </p>
      </header>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium border rounded-l-lg ${
              activeTab === 'code'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
            }`}
            onClick={() => handleTabChange('code')}
          >
            Code Search
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium border rounded-r-lg ${
              activeTab === 'repos'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
            }`}
            onClick={() => handleTabChange('repos')}
          >
            Repository Search
          </button>
        </div>
      </div>

      <SearchBar onSearch={handleSearch} isLoading={isLoading} />

      {isLoading && (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">
            {activeTab === 'code' ? 'Searching and analyzing code...' : 'Searching repositories...'}
          </p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-8">
          {error}
        </div>
      )}

      {activeTab === 'code' && codeResults && !isLoading && (
        <div className="space-y-8">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-2">Overall Summary</h2>
            <p>{codeResults.overall_summary}</p>
          </div>
          
          <FileList files={codeResults.files} />
        </div>
      )}

      {activeTab === 'repos' && repoResults && !isLoading && (
        <div className="space-y-8">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-2">Overall Summary</h2>
            <p>{repoResults.summary}</p>
          </div>
          
          <RepoList repos={repoResults.files} />
        </div>
      )}
    </div>
  );
}

export default App;