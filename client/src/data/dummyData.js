export const dummyActivities = [
  {
    emoji: "🎨",
    title: "Children's Art Workshop at Creative Studio",
    description: "Perfect for ages 5-12 with hands-on painting and clay sculpting sessions. Professional instructors guide kids through fun projects they can take home. Open Saturday 10am-4pm in downtown, just 8 miles away. Features special weekend family discount pricing.",
    details: ["Ages 5-12", "8 miles away", "Saturday 10am-4pm", "Family discount"]
  },
  {
    emoji: "🌲",
    title: "Discovery Park Nature Adventure Trail",
    description: "Family-friendly hiking trails with easy 2-mile loop perfect for mixed ages. Beautiful scenic views and educational nature signs along the way. Free admission and accessible parking available. Great for outdoor enthusiasts who want fresh air and exercise.",
    details: ["All ages", "Free admission", "2-mile loop", "Educational signs"]
  },
  {
    emoji: "🎪",
    title: "Community Center Family Fun Festival",
    description: "This Saturday features live music, food trucks, and interactive kid activities from 1-6pm. Age-appropriate entertainment including face painting, balloon animals, and mini carnival games. Local vendors and family-friendly atmosphere in the heart of the city.",
    details: ["Saturday 1-6pm", "Food trucks", "Face painting", "City center"]
  },
  {
    emoji: "⚽",
    title: "Youth Soccer Skills Clinic at Riverside Park",
    description: "Drop-in soccer clinic Saturday 2-4pm for ages 5-15 with age-grouped instruction. Professional coaches provide skill-building exercises and fun mini-games. Great way to be active outdoors and learn teamwork. All skill levels welcome with equipment provided.",
    details: ["Ages 5-15", "Saturday 2-4pm", "Equipment provided", "All skill levels"]
  },
  {
    emoji: "🧪",
    title: "Interactive Science Museum Weekend Special",
    description: "Hands-on exhibits and live demonstrations perfect for curious minds aged 4-14. Special weekend programming includes rocket building workshop and chemistry magic shows. Educational and entertaining with something for every family member to enjoy together.",
    details: ["Ages 4-14", "Live demonstrations", "Weekend special", "Educational"]
  }
];

// Function to simulate API delay for realistic UX
export const getRecommendations = (formData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyActivities);
    }, 2000); // 2 second delay to simulate API call
  });
};