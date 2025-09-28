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
        {activities.map((activity, index) => {
          // Extract emoji from title if it exists, or use a default
          const titleParts = activity.title ? activity.title.match(/^([\u{1F300}-\u{1F9FF}]|\u{2600}-\u{27BF}|\u{1F900}-\u{1F9FF})\s*(.*)$/u) : null;
          const emoji = titleParts ? titleParts[1] : '🎯';
          const title = titleParts ? titleParts[2] : (activity.title || 'Activity');

          return (
            <div key={activity.id || index} className="activity-item">
              <div className="activity-number">
                #{index + 1}
              </div>
              <div className="activity-icon">
                {emoji}
              </div>
              <div className="activity-content">
                <h3 className="activity-title">{title}</h3>
                <p className="activity-description">{activity.description}</p>

                {/* Contact Information and Links */}
                {(activity.website || activity.phone) && (
                  <div className="activity-contact">
                    {activity.website && (
                      <a
                        href={activity.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-link website-link"
                      >
                        🌐 Visit Website
                      </a>
                    )}
                    {activity.phone && (
                      <a
                        href={`tel:${activity.phone}`}
                        className="contact-link phone-link"
                      >
                        📞 {activity.phone}
                      </a>
                    )}
                  </div>
                )}

                {/* Display timing and cost information if available */}
                {(activity.timeInfo || activity.costInfo || activity.venue) && (
                  <div className="activity-meta">
                    {activity.timeInfo && (
                      <span className="meta-item">
                        ⏰ {activity.timeInfo}
                      </span>
                    )}
                    {activity.costInfo && (
                      <span className="meta-item">
                        💰 {activity.costInfo}
                      </span>
                    )}
                    {activity.venue && (
                      <span className="meta-item">
                        📍 {activity.venue}
                      </span>
                    )}
                  </div>
                )}

                {/* Real activity indicator */}
                {activity.details?.isReal && (
                  <div className="real-activity-badge">
                    ✅ Real venue with current info
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityResults;