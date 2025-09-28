# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
Family Activity Finder - A React + Express.js web application that helps parents find 5 personalized family activity recommendations using Claude Messages API with web search capabilities.

## Architecture
**Frontend**: React (create-react-app) with form-based UI collecting user preferences
**Backend**: Express.js server integrating Claude Messages API with web search tool
**AI Integration**: Claude API generates contextual recommendations based on location, kids ages, availability, and preferences

## Development Phases
The project follows a 3-milestone approach:
1. **Milestone 1**: Static UI with dummy data (currently planned)
2. **Milestone 2**: Claude API integration with web search
3. **Milestone 3**: Production polish and optimization

## Key Components Architecture
- `ActivityForm.js`: Main input form (city, kids ages, availability, driving distance, preferences)
- `ActivityResults.js`: Card-based display of exactly 5 recommendations
- `dummyData.js`: Static sample data for Milestone 1 testing
- Backend API endpoint: Processes form data and calls Claude Messages API

## Claude API Integration Pattern
Uses structured prompt template from `prompt.md`:
- System prompt defines Claude as family activity assistant
- User prompt template with variable substitution for form inputs
- Web search tool integration for real-time activity discovery
- Output format: Bold titles with emojis + 2-4 sentence descriptions

## Common Commands
*Note: Project not yet initialized. Initial setup requires:*
- `npx create-react-app family-activity-app` (frontend)
- `npm init` and Express setup (backend)
- Claude API client configuration

## Design Guidelines
- Mobile-first responsive design
- Family-friendly color palette (blues/greens)
- Card-based results layout
- Form validation for all required fields
- Loading states during API calls

## Output Format Requirements
Recommendations must follow exact format:
- Exactly 5 activity suggestions
- Bold title with appropriate emoji per activity
- 2-4 sentences describing the activity
- Age-appropriate content matching user input

## Development Notes
- Form accepts multiple kids ages (comma-separated or multi-select)
- Distance validation in miles
- Availability accepts natural language ("Saturday afternoon")
- Claude web search tool finds current, local activities
- Error handling for API failures and validation