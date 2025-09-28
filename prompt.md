# Claude API Prompt Template

## System Prompt
```
You are a family activity recommendation assistant. Your job is to find and recommend exactly 5 family-friendly activities based on the user's specific criteria. Use the web search tool to find current, relevant activities and events.

Format each recommendation with:
- Bold title with appropriate emoji
- 2-4 sentences describing the activity
- Why it's suitable for the family's needs

Be specific about locations, times, and age-appropriateness.
```

## User Prompt Template
```
I need 5 family activity recommendations for this weekend. Here are my details:

**Location**: {city}
**Kids Ages**: {ages}
**When Available**: {availability}
**Max Drive Distance**: {miles} miles
**Other Preferences**: {preferences}

Please search for current family activities, events, and attractions in and around {city}. Consider:
- Age-appropriate activities for kids aged {ages}
- Activities happening during {availability}
- Venues within {miles} miles of {city}
- {preferences}

Return exactly 5 recommendations in this format:

**🎯 Activity Name**
Description of the activity in 2-4 sentences. Explain what makes it perfect for this family's ages and preferences. Include practical details like location, timing, and any special features.

Use web search to find real, current activities and events. Prioritize:
1. Age-appropriate content
2. Activities available during the specified time
3. Locations within driving distance
4. Highly rated family venues
5. Special events or seasonal activities
```

## Example Variables
```javascript
const promptVariables = {
  city: "Seattle, WA",
  ages: "5, 8, 12",
  availability: "Saturday afternoon",
  miles: "15",
  preferences: "outdoor activities, educational experiences"
};
```

## API Call Structure
```javascript
const message = {
  role: "user",
  content: `I need 5 family activity recommendations for this weekend. Here are my details:

**Location**: ${city}
**Kids Ages**: ${ages}
**When Available**: ${availability}
**Max Drive Distance**: ${miles} miles
**Other Preferences**: ${preferences}

[... rest of prompt template ...]`
};
```

## Expected Output Format
```
**🎨 Children's Museum Interactive Exhibits**
Perfect for ages 5-12 with hands-on science and art stations. Open Saturday 10am-5pm in downtown Seattle, just 8 miles away. Features new dinosaur exhibit that will captivate all three kids.

**🌲 Discovery Park Nature Walk**
Family-friendly trails with easy 2-mile loop perfect for mixed ages. Beautiful views of Puget Sound and educational nature signs. Free admission and only 12 miles from your location.

**🎪 Seattle Center Family Festival**
This Saturday features live music, food trucks, and kid activities from 1-6pm. Age-appropriate entertainment for all three children including face painting and interactive games. Located in the heart of Seattle.

**⚽ Youth Soccer Skills Clinic**
Drop-in clinic Saturday 2-4pm at Magnuson Park for ages 5-15. Professional coaches provide age-grouped instruction. Great way to be active outdoors and learn new skills.

**🧪 Pacific Science Center**
Interactive exhibits and IMAX shows perfect for curious minds aged 5-12. Special weekend programming includes rocket building workshop. Educational and entertaining for the whole family.
```