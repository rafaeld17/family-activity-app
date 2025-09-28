# Milestone 1 Tasks - UI Setup with Dummy Data

## Project Setup
- [ ] Initialize React app with `create-react-app family-activity-app`
- [ ] Clean up default files and structure
- [ ] Install additional dependencies (if needed for styling)
- [ ] Set up basic folder structure (`components/`, `styles/`, `data/`)

## Form Component
- [ ] Create `ActivityForm.js` component
- [ ] Add input field for city (text input)
- [ ] Add kids ages input (multiple age selection or comma-separated)
- [ ] Add availability input (text input for "Saturday afternoon", etc.)
- [ ] Add max driving distance input (number input with "miles" label)
- [ ] Add preferences input (textarea for additional preferences)
- [ ] Add submit button
- [ ] Implement form state management with React hooks

## Form Validation
- [ ] Add required field validation for city, ages, availability, and distance
- [ ] Validate ages are numbers/reasonable ranges
- [ ] Validate distance is a positive number
- [ ] Show validation error messages
- [ ] Disable submit button when form is invalid

## Results Component
- [ ] Create `ActivityResults.js` component
- [ ] Design card layout for individual recommendations
- [ ] Display bold titles with emojis
- [ ] Display 2-4 sentence descriptions
- [ ] Handle empty/loading states

## Dummy Data
- [ ] Create `dummyData.js` with 5 sample activities
- [ ] Include varied activity types (indoor, outdoor, educational, recreational)
- [ ] Add realistic titles with emojis
- [ ] Write engaging 2-4 sentence descriptions
- [ ] Ensure activities span different age ranges

## Main App Component
- [ ] Create main `App.js` layout
- [ ] Implement form submission handler
- [ ] Show/hide results based on form submission
- [ ] Add loading state simulation (2-3 second delay)
- [ ] Add "New Search" button to reset form

## Styling
- [ ] Create responsive CSS layout (mobile-first)
- [ ] Style the form with clean, family-friendly design
- [ ] Style result cards with consistent spacing
- [ ] Add hover effects and transitions
- [ ] Choose color palette (blues/greens as specified)
- [ ] Ensure good contrast and readability
- [ ] Test on mobile devices

## Final Polish
- [ ] Add page title and favicon
- [ ] Test all form interactions
- [ ] Test responsive design on different screen sizes
- [ ] Add any missing error handling
- [ ] Clean up console warnings/errors

## Testing Checklist
- [ ] Form accepts all types of input
- [ ] Validation works correctly
- [ ] Dummy results display properly
- [ ] Mobile layout looks good
- [ ] All buttons and interactions work
- [ ] Loading states are smooth