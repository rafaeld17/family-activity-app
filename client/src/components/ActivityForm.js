import React, { useState } from 'react';
import './ActivityForm.css';

const ActivityForm = ({ onSubmit, isLoading, hasResults, onNewSearch }) => {
  const [formData, setFormData] = useState({
    city: '',
    ages: '',
    availability: '',
    maxDistance: 15, // Set default value
    preferences: ''
  });

  const [useTextInput, setUseTextInput] = useState(true);

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.ages.trim()) {
      newErrors.ages = 'Kids ages are required';
    } else {
      // Validate ages are numbers or comma-separated numbers
      const agePattern = /^(\d+)(\s*,\s*\d+)*$/;
      if (!agePattern.test(formData.ages.trim())) {
        newErrors.ages = 'Please enter ages as numbers (e.g., "5, 8, 12")';
      }
    }

    if (!formData.availability.trim()) {
      newErrors.availability = 'Availability is required';
    }

    if (!formData.maxDistance || isNaN(formData.maxDistance) || Number(formData.maxDistance) <= 0) {
      newErrors.maxDistance = 'Please enter a valid positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const isFormValid = formData.city && formData.ages && formData.availability && formData.maxDistance > 0;

  return (
    <div className="activity-form">
      <div className="form-header">
        <h1>🎯 Family Activity Finder</h1>
        <p>Discover perfect activities for your family</p>
        {hasResults && (
          <button className="new-search-btn" onClick={onNewSearch}>
            New Search
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="city">
            📍 City
            <span className="required">*</span>
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="e.g., Seattle, WA"
            className={errors.city ? 'error' : ''}
          />
          {errors.city && <span className="error-message">{errors.city}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="ages">
            👶 Kids Ages
            <span className="required">*</span>
          </label>
          <input
            type="text"
            id="ages"
            name="ages"
            value={formData.ages}
            onChange={handleChange}
            placeholder="e.g., 5, 8, 12"
            className={errors.ages ? 'error' : ''}
          />
          {errors.ages && <span className="error-message">{errors.ages}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="availability">
            ⏰ When Available
            <span className="required">*</span>
          </label>
          <div className="input-toggle">
            <button
              type="button"
              className={`toggle-btn ${useTextInput ? 'active' : ''}`}
              onClick={() => setUseTextInput(true)}
            >
              Text
            </button>
            <button
              type="button"
              className={`toggle-btn ${!useTextInput ? 'active' : ''}`}
              onClick={() => setUseTextInput(false)}
            >
              Date
            </button>
          </div>
          {useTextInput ? (
            <input
              type="text"
              id="availability"
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              placeholder="e.g., Saturday afternoon"
              className={errors.availability ? 'error' : ''}
            />
          ) : (
            <input
              type="date"
              id="availability"
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              className={errors.availability ? 'error' : ''}
              min={new Date().toISOString().split('T')[0]} // Prevent past dates
            />
          )}
          {errors.availability && <span className="error-message">{errors.availability}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="maxDistance">
            🚗 Max Driving Distance: <span className="distance-value">{formData.maxDistance} miles</span>
            <span className="required">*</span>
          </label>
          <input
            type="range"
            id="maxDistance"
            name="maxDistance"
            value={formData.maxDistance}
            onChange={handleChange}
            min="1"
            max="50"
            step="1"
            className={`distance-slider ${errors.maxDistance ? 'error' : ''}`}
          />
          <div className="slider-labels">
            <span>1 mile</span>
            <span>25 miles</span>
            <span>50+ miles</span>
          </div>
          {errors.maxDistance && <span className="error-message">{errors.maxDistance}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="preferences">
            💡 Other Preferences (optional)
          </label>
          <textarea
            id="preferences"
            name="preferences"
            value={formData.preferences}
            onChange={handleChange}
            placeholder="e.g., outdoor activities, educational experiences, budget-friendly"
            rows="3"
          />
        </div>

        <button
          type="submit"
          className="submit-button"
          disabled={!isFormValid || isLoading}
        >
          {isLoading ? '🔍 Search Activities' : '🔍 Search Activities'}
        </button>
      </form>
    </div>
  );
};

export default ActivityForm;