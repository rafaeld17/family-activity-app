// API configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Fallback dummy data in case API fails
export const dummyActivities = [
  {
    id: 1,
    title: "🎨 Children's Art Workshop at Creative Studio",
    description: "Perfect for ages 5-12 with hands-on painting and clay sculpting sessions. Professional instructors guide kids through fun projects they can take home. Open Saturday 10am-4pm in downtown, just 8 miles away. Features special weekend family discount pricing."
  },
  {
    id: 2,
    title: "🌲 Discovery Park Nature Adventure Trail",
    description: "Family-friendly hiking trails with easy 2-mile loop perfect for mixed ages. Beautiful scenic views and educational nature signs along the way. Free admission and accessible parking available. Great for outdoor enthusiasts who want fresh air and exercise."
  },
  {
    id: 3,
    title: "🎪 Community Center Family Fun Festival",
    description: "This Saturday features live music, food trucks, and interactive kid activities from 1-6pm. Age-appropriate entertainment including face painting, balloon animals, and mini carnival games. Local vendors and family-friendly atmosphere in the heart of the city."
  },
  {
    id: 4,
    title: "⚽ Youth Soccer Skills Clinic at Riverside Park",
    description: "Drop-in soccer clinic Saturday 2-4pm for ages 5-15 with age-grouped instruction. Professional coaches provide skill-building exercises and fun mini-games. Great way to be active outdoors and learn teamwork. All skill levels welcome with equipment provided."
  },
  {
    id: 5,
    title: "🧪 Interactive Science Museum Weekend Special",
    description: "Hands-on exhibits and live demonstrations perfect for curious minds aged 4-14. Special weekend programming includes rocket building workshop and chemistry magic shows. Educational and entertaining with something for every family member to enjoy together."
  }
];

// Real API call to Claude backend
export const getRecommendations = async (formData) => {
  try {
    console.log('🔄 Calling API with data:', formData);

    const response = await fetch(`${API_BASE_URL}/api/recommendations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        city: formData.city,
        ages: formData.ages,
        availability: formData.availability,
        miles: formData.miles,
        preferences: formData.preferences
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log('✅ API response received:', result);

    // Return the activities from the API response
    if (result.success && result.data && Array.isArray(result.data)) {
      return result.data;
    } else {
      throw new Error('Invalid API response format');
    }

  } catch (error) {
    console.error('❌ API call failed:', error);
    console.log('🔄 Falling back to dummy data');

    // Return dummy data as fallback with a slight delay for UX consistency
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(dummyActivities);
      }, 1000);
    });
  }
};