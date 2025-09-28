# Family Activity Finder - Specification

## Overview
A simple web app that helps parents find family activities by collecting their preferences and returning 5 personalized recommendations with bold titles, emojis, and descriptions.

## Requirements

### User Inputs
- City location
- Kids ages (multiple ages supported)
- Availability (e.g., "Saturday afternoon")
- Maximum driving distance (in miles)
- Additional preferences (optional text field)

### Output
- Exactly 5 activity recommendations
- Each recommendation includes:
  - Bold title with emoji
  - 2-4 sentence description
  - Age-appropriate content

## Tech Stack
- **Frontend**: React (create-react-app)
- **Backend**: Express.js
- **AI**: Claude Messages API with Web Search tool
- **Styling**: CSS modules or styled-components
- **HTTP Client**: Axios

## Design Guidelines
- Clean, mobile-first responsive design
- Simple form layout with clear labels
- Card-based results display
- Minimal color palette (blues/greens for family-friendly feel)
- Loading states during API calls
- Error handling with user-friendly messages

## Milestones

### Milestone 1: UI Setup with Dummy Data
**Goal**: Working frontend with static recommendations

**Tasks**:
- Set up React app with basic routing
- Create input form component with all required fields
- Build results display component
- Add dummy data for 5 sample activities
- Implement basic responsive styling
- Add form validation

**Deliverable**: Functional UI that shows mock recommendations

### Milestone 2: Claude API Integration
**Goal**: Connect to Claude API with web search capabilities

**Tasks**:
- Set up Express backend with Claude API client
- Implement API endpoint for activity recommendations
- Use Claude's web search tool to find real activity data
- Create prompt template for activity recommendations
- Connect frontend to backend API
- Add loading states and error handling

**Deliverable**: App generates real recommendations using Claude API

### Milestone 3: Polish and Enhancement
**Goal**: Production-ready app with improved UX

**Tasks**:
- Improve recommendation quality with better prompts
- Add activity filtering and sorting
- Implement location validation
- Add "Get New Recommendations" functionality
- Performance optimization and caching
- Final styling and mobile optimization

**Deliverable**: Polished, deployable family activity finder