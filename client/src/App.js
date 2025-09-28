import React, { useState } from 'react';
import ActivityForm from './components/ActivityForm';
import ActivityResults from './components/ActivityResults';
import { getRecommendations } from './data/dummyData';
import './App.css';

function App() {
  const [activities, setActivities] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);

    try {
      // Simulate API call with dummy data
      const recommendations = await getRecommendations(formData);
      setActivities(recommendations);
    } catch (error) {
      console.error('Error getting recommendations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewSearch = () => {
    setActivities(null);
    setIsLoading(false);
  };

  return (
    <div className="App">
      <div className="app-layout">
        {/* Left Sidebar - Form */}
        <div className="sidebar">
          <ActivityForm
            onSubmit={handleFormSubmit}
            isLoading={isLoading}
            hasResults={!!activities}
            onNewSearch={handleNewSearch}
          />
        </div>

        {/* Right Panel - Results */}
        <div className="main-content">
          {isLoading && (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <h2>🔍 Finding Perfect Activities...</h2>
              <p>Searching for family-friendly activities in your area</p>
            </div>
          )}

          {!activities && !isLoading && (
            <div className="empty-state">
              <div className="empty-icon">🎯</div>
              <h2>Ready to Find Activities?</h2>
              <p>Fill out the form on the left to get personalized family activity recommendations.</p>
            </div>
          )}

          {activities && !isLoading && (
            <ActivityResults activities={activities} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
