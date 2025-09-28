const express = require('express');
const router = express.Router();
const claudeService = require('../services/claudeService');

// POST /api/recommendations - Get family activity recommendations
router.post('/recommendations', async (req, res) => {
  try {
    console.log('🎯 === API ROUTE HIT ===');
    console.log('📝 Received recommendation request:', req.body);
    console.log('⏰ Timestamp:', new Date().toISOString());

    // Validate request body
    const { city, ages, availability, miles, preferences } = req.body;

    if (!city || !ages || !availability || !miles) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['city', 'ages', 'availability', 'miles']
      });
    }

    // Call Claude service to get recommendations
    const recommendations = await claudeService.getRecommendations({
      city,
      ages,
      availability,
      miles,
      preferences: preferences || ''
    });

    console.log('✅ Successfully generated recommendations');

    res.json({
      success: true,
      data: recommendations,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Error generating recommendations:', error);

    res.status(500).json({
      error: 'Failed to generate recommendations',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Please try again later'
    });
  }
});

module.exports = router;