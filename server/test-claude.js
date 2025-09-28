const Anthropic = require('@anthropic-ai/sdk');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Test Claude API directly
async function testClaudeAPI() {
  console.log('🧪 Testing Claude API directly...');
  console.log('🔑 API Key present:', !!process.env.ANTHROPIC_API_KEY);
  console.log('🔑 API Key length:', process.env.ANTHROPIC_API_KEY ? process.env.ANTHROPIC_API_KEY.length : 'N/A');

  try {
    // Initialize Anthropic client
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    console.log('📞 Making test API call to Claude...');

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system: 'You are a helpful assistant. Respond with exactly one specific family activity in Boston.',
      messages: [
        {
          role: 'user',
          content: 'Find one real family activity happening this Saturday in Boston with specific timing and a website.'
        }
      ],
      tools: [
        {
          name: "web_search",
          description: "Search the web for current information",
          input_schema: {
            type: "object",
            properties: {
              query: {
                type: "string",
                description: "Search query"
              }
            },
            required: ["query"]
          }
        }
      ]
    });

    console.log('✅ Claude API call successful!');
    console.log('📄 Response:', JSON.stringify(response, null, 2));

  } catch (error) {
    console.error('❌ Claude API call failed:');
    console.error('Error message:', error.message);
    console.error('Error name:', error.name);
    console.error('Error status:', error.status);
    console.error('Error code:', error.code);
    console.error('Full error:', error);
  }
}

// Run the test
testClaudeAPI();