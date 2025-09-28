import React from 'react';
import './ActivityResults.css';

const ActivityResults = ({ activities }) => {
  if (!activities || activities.length === 0) {
    return null;
  }

  return (
    <div className="activity-results">
      <div className="results-header">
        <h2>Top 5 Recommendations</h2>
        <p>Perfect matches for your family</p>
        <div className="sort-by">
          <span>SORTED BY RELEVANCE</span>
        </div>
      </div>

      <div className="activities-list">
        {activities.map((activity, index) => (
          <div key={index} className="activity-item">
            <div className="activity-number">
              #{index + 1}
            </div>
            <div className="activity-icon">
              {activity.emoji}
            </div>
            <div className="activity-content">
              <h3 className="activity-title">{activity.title}</h3>
              <p className="activity-description">{activity.description}</p>
              {activity.details && (
                <div className="activity-meta">
                  {activity.details.map((detail, idx) => (
                    <span key={idx} className="meta-item">
                      {detail}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityResults;