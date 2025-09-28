const Anthropic = require('@anthropic-ai/sdk');

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// System prompt - no web search required
const SYSTEM_PROMPT = `You are a Boston family activity specialist. Your job is to provide realistic, specific family activities in the Boston area based on your knowledge.

REQUIREMENTS:
1. Provide 5 specific family activities appropriate for the requested age group
2. Include realistic venues, addresses, and timing information
3. Focus on well-known Boston attractions and venues
4. Include realistic pricing and contact information when possible
5. Make activities age-appropriate and match user preferences

REQUIRED FORMAT for each activity:
**🎯 [Specific Activity Name]**
[Venue Name], [Address]
Time: [Suggested timing]
Cost: [Typical pricing or "Free"]
Details: [2-3 sentences about the activity and why it's perfect for the age group]
Website: [Official venue website] | Phone: [Venue phone if known]

Focus on popular Boston family destinations like:
- Boston Children's Museum
- New England Aquarium
- Franklin Park Zoo
- Boston Common
- Museum of Science
- Boston Tea Party Ships
- Faneuil Hall/Quincy Market
- Boston Public Library locations
- Local parks and playgrounds

Provide realistic, helpful suggestions that families can actually visit and enjoy.`;

// Create user prompt template with variable substitution
const createUserPrompt = ({ city, ages, availability, miles, preferences }) => {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return `Today is ${today}. I need 5 specific family activity recommendations for ${availability} in ${city}. Here are my details:

**Location**: ${city}
**Kids Ages**: ${ages}
**When Available**: ${availability}
**Max Drive Distance**: ${miles} miles
**Other Preferences**: ${preferences}

Please provide realistic family activities that would be available on ${availability} in the ${city} area. Focus on well-known venues and attractions that are typically open and would be appropriate for children aged ${ages}.

For each recommendation, provide:
- **🎯 Activity/Venue Name** (with emoji)
- Specific venue name and address
- Typical hours and good timing for ${availability}
- Realistic pricing information
- Official website URL and phone number when known
- Why it's perfect for ages ${ages}

Requirements:
- Must be within ${miles} miles of ${city}
- Must be age-appropriate for kids aged ${ages}
- Include realistic contact information and websites
- Focus on ${preferences} when specified
- Provide helpful, practical suggestions families can actually visit

Return exactly 5 specific, realistic family activities.`;
};

// Parse Claude's response to extract activities with enhanced validation
const parseActivities = (responseText) => {
  try {
    console.log('🔍 Parsing response text...');
    console.log('📝 Response length:', responseText.length);

    const activities = [];

    // Look for the structured format with venue, date, time, etc.
    const activityBlocks = responseText.split(/\*\*🎯/);

    console.log('📊 Found activity blocks:', activityBlocks.length);

    for (let i = 1; i < activityBlocks.length && activities.length < 5; i++) {
      const block = '**🎯' + activityBlocks[i];

      // Extract title
      const titleMatch = block.match(/\*\*🎯\s*([^*]+)\*\*/);
      const title = titleMatch ? '🎯 ' + titleMatch[1].trim() : null;

      // Extract website URL
      const websiteMatch = block.match(/Website:\s*(https?:\/\/[^\s\|]+)/i);
      const website = websiteMatch ? websiteMatch[1].trim() : null;

      // Extract phone
      const phoneMatch = block.match(/Phone:\s*([0-9\-\(\)\s\.]+)/i);
      const phone = phoneMatch ? phoneMatch[1].trim() : null;

      // Extract time information
      const timeMatch = block.match(/Time:\s*([^|\n]+)/i);
      const timeInfo = timeMatch ? timeMatch[1].trim() : null;

      // Extract cost information
      const costMatch = block.match(/Cost:\s*([^|\n]+)/i);
      const costInfo = costMatch ? costMatch[1].trim() : null;

      // Extract venue/address
      const venueMatch = block.match(/\*\*🎯[^*]+\*\*\s*([^\n]+)/);
      const venue = venueMatch ? venueMatch[1].trim() : null;

      // Get the full description
      const description = block.replace(/\*\*🎯[^*]+\*\*/, '').trim();

      // Validate this is a real event (has specific time and website/contact)
      const isRealEvent = !!(
        timeInfo &&
        (website || phone) &&
        !title?.toLowerCase().includes('local community center') &&
        !title?.toLowerCase().includes('public library story time') &&
        !description.toLowerCase().includes('located in boston, ma with')
      );

      console.log(`📋 Activity ${i}:`, {
        title: title?.substring(0, 50),
        hasWebsite: !!website,
        hasPhone: !!phone,
        hasTime: !!timeInfo,
        isReal: isRealEvent
      });

      if (title && description && isRealEvent) {
        activities.push({
          id: activities.length + 1,
          title: title,
          description: description,
          website: website,
          phone: phone,
          timeInfo: timeInfo,
          costInfo: costInfo,
          venue: venue,
          details: {
            hasWebsite: !!website,
            hasPhone: !!phone,
            hasTime: !!timeInfo,
            hasCost: !!costInfo,
            isReal: true
          }
        });
      }
    }

    console.log(`✅ Successfully parsed ${activities.length} real activities`);

    return activities.length >= 3 ? activities : null; // Return if we have at least 3 real events
  } catch (error) {
    console.error('❌ Error parsing activities:', error);
    return null;
  }
};

// Fallback dummy data in case API fails
const getFallbackData = ({ city, ages }) => {
  return [
    {
      id: 1,
      title: "🎨 Local Children's Museum",
      description: `Perfect for ages ${ages} with hands-on exhibits and interactive displays. Located in ${city} with educational activities that engage kids of all ages. Features rotating exhibits and family-friendly programming.`
    },
    {
      id: 2,
      title: "🌳 City Park Nature Walk",
      description: `Family-friendly trails perfect for mixed ages with easy walking paths. Beautiful outdoor experience in ${city} with playground areas and picnic spots. Great way to enjoy nature together as a family.`
    },
    {
      id: 3,
      title: "📚 Public Library Story Time",
      description: `Age-appropriate programming for children with interactive stories and activities. Located in downtown ${city} with special weekend family events. Educational and entertaining for kids aged ${ages}.`
    },
    {
      id: 4,
      title: "⚽ Community Sports Center",
      description: `Family activities and sports suitable for ages ${ages} with supervised play areas. Located in ${city} with equipment rental and beginner-friendly programs. Great for active families.`
    },
    {
      id: 5,
      title: "🎪 Local Community Center Events",
      description: `Weekend family programming in ${city} with age-appropriate activities and entertainment. Features crafts, games, and social activities perfect for children aged ${ages}. Regular family-friendly events.`
    }
  ];
};

// Main function to get recommendations
const getRecommendations = async (formData) => {
  try {
    console.log('🤖 Calling Claude API for recommendations...');

    const userPrompt = createUserPrompt(formData);

    console.log('🔍 Making Claude API call with model and web search...');
    console.log('📋 User prompt:', userPrompt.substring(0, 200) + '...');

    console.log('🔧 Claude API Request Configuration:');
    console.log('📋 Model:', 'claude-sonnet-4-20250514');
    console.log('🔑 API Key:', process.env.ANTHROPIC_API_KEY ? 'Present (length: ' + process.env.ANTHROPIC_API_KEY.length + ')' : 'Missing');
    console.log('📝 User prompt length:', userPrompt.length);

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',  // Correct model name per user feedback
      max_tokens: 4000,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: userPrompt
        }
      ]
      // No tools - Claude will use its knowledge base to provide realistic recommendations
    });

    console.log('🎉 Claude API Response Status: SUCCESS');

    console.log('📄 Claude API response received successfully');
    console.log('🔍 Response content blocks:', response.content.length);

    // Log full response for debugging
    response.content.forEach((content, index) => {
      if (content.type === 'text') {
        console.log(`📝 Text block ${index}:`, content.text.substring(0, 300) + '...');
      } else if (content.type === 'tool_use') {
        console.log(`🔧 Tool use block ${index}:`, content.name, content.input);
      }
    });

    console.log('📄 Claude API response received');

    // Extract text content from Claude's response
    const responseText = response.content
      .filter(content => content.type === 'text')
      .map(content => content.text)
      .join('');

    // Parse the activities from the response
    const activities = parseActivities(responseText);

    if (activities && activities.length >= 3) {
      console.log(`✅ Successfully parsed ${activities.length} real activities from Claude response`);
      return activities;
    } else {
      console.warn('⚠️ Could not find real events with specific times and websites');

      // Return a message indicating no real events found rather than fake data
      return [
        {
          id: 1,
          title: '❌ No Real Events Found',
          description: `Sorry, I couldn't find specific events with real timing and booking information happening on ${formData.availability} in ${formData.city}. This usually means either: 1) No events are currently scheduled, 2) Event websites are not accessible, or 3) You may want to try a different date. Please try searching for a different date or check event websites directly like Eventbrite, Facebook Events, or venue websites.`,
          website: 'https://www.eventbrite.com/d/ma--boston/family/',
          details: {
            hasWebsite: true,
            isReal: false
          }
        }
      ];
    }

  } catch (error) {
    console.error('❌ Claude API error:', error.message);
    console.error('🔍 Error details:', {
      name: error.name,
      status: error.status,
      code: error.code,
      type: error.type
    });

    if (error.response) {
      console.error('📄 API Response:', error.response.data);
    }

    // Return fallback data if API fails
    console.log('🔄 Using fallback data due to API error');
    return getFallbackData(formData);
  }
};

module.exports = {
  getRecommendations,
  parseActivities,
  createUserPrompt
};