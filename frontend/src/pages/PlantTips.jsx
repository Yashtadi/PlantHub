import Navbar from '../components/Navbar';

const PlantTips = () => {
  const tips = [
    {
      id: 1,
      icon: '💧',
      title: 'Watering Guidelines',
      content: 'Water your plants when the top inch of soil feels dry. Overwatering is more harmful than underwatering. Most indoor plants need watering 1-2 times per week.',
      tips: [
        'Check soil moisture before watering',
        'Use room temperature water',
        'Ensure proper drainage',
        'Adjust frequency based on season'
      ]
    },
    {
      id: 2,
      icon: '☀️',
      title: 'Light Requirements',
      content: 'Different plants need different amounts of light. Understanding your plant\'s light needs is crucial for its health and growth.',
      tips: [
        'Low light: Snake plants, Pothos',
        'Medium light: Peace lily, Ferns',
        'Bright indirect: Most flowering plants',
        'Direct sunlight: Succulents, Cacti'
      ]
    },
    {
      id: 3,
      icon: '🌡️',
      title: 'Temperature & Humidity',
      content: 'Most houseplants thrive in temperatures between 65-75°F (18-24°C). Tropical plants prefer higher humidity levels.',
      tips: [
        'Avoid placing plants near heating vents',
        'Keep away from cold drafts',
        'Mist plants for humidity',
        'Use pebble trays for tropical plants'
      ]
    },
    {
      id: 4,
      icon: '✂️',
      title: 'Pruning & Maintenance',
      content: 'Regular pruning helps maintain plant shape and encourages new growth. Remove dead or yellowing leaves promptly.',
      tips: [
        'Use clean, sharp scissors',
        'Prune during growing season',
        'Remove dead leaves immediately',
        'Clean leaves to remove dust'
      ]
    },
    {
      id: 5,
      icon: '🌱',
      title: 'Fertilizing Tips',
      content: 'Feed your plants during the growing season (spring and summer) with a balanced fertilizer. Reduce feeding in fall and winter.',
      tips: [
        'Dilute fertilizer to half strength',
        'Feed every 2-4 weeks in growing season',
        'Reduce feeding in dormant period',
        'Use organic options when possible'
      ]
    },
    {
      id: 6,
      icon: '🪴',
      title: 'Repotting Guide',
      content: 'Repot your plants when roots start growing out of drainage holes or when growth slows. Usually every 1-2 years.',
      tips: [
        'Choose pot 1-2 inches larger',
        'Use fresh, quality potting mix',
        'Repot in spring for best results',
        'Water thoroughly after repotting'
      ]
    },
    {
      id: 7,
      icon: '🐛',
      title: 'Pest Control',
      content: 'Regular inspection helps catch pest problems early. Common pests include aphids, spider mites, and mealybugs.',
      tips: [
        'Inspect plants regularly',
        'Isolate infected plants',
        'Use neem oil for treatment',
        'Maintain plant hygiene'
      ]
    },
    {
      id: 8,
      icon: '🌿',
      title: 'Air Purifying Plants',
      content: 'Some plants are excellent at purifying indoor air by removing toxins and producing oxygen.',
      tips: [
        'Snake Plant - removes toxins',
        'Spider Plant - absorbs CO2',
        'Peace Lily - filters air',
        'Aloe Vera - produces oxygen'
      ]
    }
  ];

  const blogs = [
    {
      id: 1,
      title: 'Beginner\'s Guide to Indoor Plants',
      excerpt: 'Starting your indoor plant journey? Here are the easiest plants for beginners and how to care for them.',
      date: 'November 19, 2025',
      image: '🌱',
      
      url: 'https://www.pickuplimes.com/article/houseplant-care-tips-for-beginners-99'
    },
    {
      id: 2,
      title: '10 Low Maintenance Plants for Busy People',
      excerpt: 'Don\'t have much time? These resilient plants can thrive with minimal care and attention.',
      date: 'November 19, 2025',
      image: '🪴',
      
      url: 'https://www.idyl.co.in/blogs/blog/10-easy-care-plants-for-busy-people'
    },
    {
      id: 3,
      title: 'I am Groot?',
      excerpt: 'Intergalactic Plants produce oxygen?',
      date: 'November 19, 2025',
      image: '👽',
      
      url: 'https://www.reddit.com/r/marvelstudios/comments/9xr69t/does_groot_breath_co2_or_oxygen/'
    }
  ];

  return (
    <>
      <Navbar />
      <div className="plant-tips-page">
        <div className="tips-header">
          <h1>🌿 Plant Care Tips & Guides</h1>
          <p>Everything you need to know to keep your plants healthy and thriving</p>
        </div>

        
        <section className="tips-section">
          <h2>Essential Plant Care Tips</h2>
          <div className="tips-grid">
            {tips.map((tip) => (
              <div key={tip.id} className="tip-card">
                <div className="tip-icon">{tip.icon}</div>
                <h3>{tip.title}</h3>
                <p className="tip-content">{tip.content}</p>
                <ul className="tip-list">
                  {tip.tips.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

       
        <section className="blog-section">
          <h2>Latest Blog Posts</h2>
          <div className="blog-grid">
            {blogs.map((blog) => (
              <div key={blog.id} className="blog-card">
                <div className="blog-image">{blog.image}</div>
                <div className="blog-content">
                  <h3>{blog.title}</h3>
                  <p className="blog-date">{blog.date}</p>
                  <p className="blog-excerpt">{blog.excerpt}</p>
                  
                  <a
                    href={blog.url}                     
                    target="_blank"                     
                    rel="noopener noreferrer"         
                    className="btn-read-more"           
                  >
                    Read More →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        
        <section className="problems-section">
          <h2>Common Plant Problems & Solutions</h2>
          <div className="problems-list">
            <div className="problem-item">
              <h3>🍂 Yellow Leaves</h3>
              <p><strong>Causes:</strong> Overwatering, poor drainage, or nutrient deficiency</p>
              <p><strong>Solution:</strong> Check soil moisture, improve drainage, and fertilize if needed</p>
            </div>
            <div className="problem-item">
              <h3>🥀 Wilting</h3>
              <p><strong>Causes:</strong> Underwatering, root rot, or extreme temperatures</p>
              <p><strong>Solution:</strong> Adjust watering schedule and check root health</p>
            </div>
            <div className="problem-item">
              <h3>🍃 Brown Leaf Tips</h3>
              <p><strong>Causes:</strong> Low humidity, fluoride in water, or over-fertilizing</p>
              <p><strong>Solution:</strong> Increase humidity, use filtered water, reduce fertilizer</p>
            </div>
            <div className="problem-item">
              <h3>📉 Slow Growth</h3>
              <p><strong>Causes:</strong> Insufficient light, poor soil, or being root-bound</p>
              <p><strong>Solution:</strong> Move to brighter location, repot, or add nutrients</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PlantTips;