import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Plant from './models/Plant.js';
import connectDB from './config/db.js';

dotenv.config();

const plants = [
  {
    title: 'Monstera Deliciosa',
    description: 'The Monstera Deliciosa, also known as the Swiss Cheese Plant, is a stunning tropical plant with large, glossy leaves that develop unique splits and holes as they mature.',
    price: 599,
    category: 'Indoor',
    image: '/uploads/plants/monstera.jpg',
    availability: true,
    stock: 25,
    featured: false
  },
  {
    title: 'Snake Plant',
    description: 'One of the easiest houseplants to care for. The Snake Plant is nearly indestructible and thrives on neglect, making it perfect for beginners.',
    price: 299,
    category: 'Indoor',
    image: '/uploads/plants/snake-plant.jpg',
    availability: true,
    stock: 50,
    featured: false
  },
  {
    title: 'Peace Lily',
    description: 'Beautiful flowering plant that purifies air and thrives in low light conditions. Known for its elegant white blooms and glossy green leaves.',
    price: 449,
    category: 'Air Purifying',
    image: '/uploads/plants/peace-lily.jpg',
    availability: true,
    stock: 30,
    featured: true
  },
  {
    title: 'Aloe Vera',
    description: 'A medicinal succulent that is easy to grow. Known for its healing properties and air-purifying abilities.',
    price: 199,
    category: 'Medicinal',
    image: '/uploads/plants/aloe-vera.jpg',
    availability: true,
    stock: 40,
    featured: true
  },
  {
    title: 'Spider Plant',
    description: 'One of the most adaptable houseplants. Great for hanging baskets with its cascading leaves and easy propagation.',
    price: 249,
    category: 'Air Purifying',
    image: '/uploads/plants/spider-plant.jpg',
    availability: true,
    stock: 35,
    featured: false
  },
  {
    title: 'Jade Plant',
    description: 'A popular succulent with thick, woody stems and oval-shaped leaves. Brings good luck according to feng shui.',
    price: 349,
    category: 'Succulents',
    image: '/uploads/plants/jade-plant.jpg',
    availability: true,
    stock: 20,
    featured: false
  },
  {
    title: 'Money Plant',
    description: 'Easy-to-grow vine that can be grown in water or soil. Believed to bring prosperity and good luck.',
    price: 179,
    category: 'Indoor',
    image: '/uploads/plants/money-plant.jpg',
    availability: true,
    stock: 60,
    featured: false
  },
  {
    title: 'Rose Plant',
    description: 'Classic flowering plant available in various colors. Perfect for adding beauty to your garden.',
    price: 399,
    category: 'Flowering',
    image: '/uploads/plants/rose.jpg',
    availability: true,
    stock: 15,
    featured: true
  },
  {
    title: 'Tulsi (Holy Basil)',
    description: 'Sacred plant in Hindu culture with numerous medicinal properties. Easy to grow and maintain.',
    price: 149,
    category: 'Medicinal',
    image: '/uploads/plants/tulsi.jpg',
    availability: true,
    stock: 45,
    featured: true
  },
  {
    title: 'Bamboo Plant',
    description: 'Lucky bamboo brings good fortune and positive energy. Grows in water and requires minimal care.',
    price: 279,
    category: 'Outdoor',
    image: '/uploads/plants/bamboo.jpg',
    availability: true,
    stock: 30,
    featured: false
  },
  {
    title: 'Cactus Mix',
    description: 'A collection of small cacti perfect for desk decoration. Low maintenance and water-efficient.',
    price: 229,
    category: 'Succulents',
    image: '/uploads/plants/cactus.jpg',
    availability: true,
    stock: 25,
    featured: false
  },
  {
    title: 'Bougainvillea',
    description: 'Vibrant flowering climber with colorful bracts. Perfect for outdoor gardens and fences.',
    price: 499,
    category: 'Climbers',
    image: '/uploads/plants/bougainvillea.jpg',
    availability: true,
    stock: 18,
    featured: true
  },
  {
    title: 'Pothos (Golden)',
    description: 'Trailing vine with heart-shaped leaves. One of the easiest plants to grow indoors.',
    price: 199,
    category: 'Indoor',
    image: '/uploads/plants/pothos.jpg',
    availability: true,
    stock: 55,
    featured: false
  },
  {
    title: 'Rubber Plant',
    description: 'Large glossy leaves make this plant a statement piece. Great air purifier for large spaces.',
    price: 549,
    category: 'Air Purifying',
    image: '/uploads/plants/rubber-plant.jpg',
    availability: true,
    stock: 22,
    featured: false
  },
  {
    title: 'Ferns',
    description: 'Ferns are vascular plants that reproduce via spores instead of seeds or flowers. They have complex leaves.',
    price: 549,
    category: 'Outdoor',
    image: '/uploads/plants/ferns.jpg',
    availability: true,
    stock: 22,
    featured: true
  },
  {
    title: 'Areca',
    description: 'Areca plants are known for their graceful, feathery fronds, resembling bamboo stalks. Good for air purifying and ambiance',
    price: 549,
    category: 'Outdoor',
    image: '/uploads/plants/areca.jpg',
    availability: true,
    stock: 22,
    featured: false
  },
  {
    title: 'Krishnakamal (Passion Flower)',
    description: 'The Krishna Kamal, or passion flower (Passiflora), is known for its strikingly intricate and colorful blooms. It holds deep symbolism in Indian culture',
    price: 329,
    category: 'Flowering',
    image: '/uploads/plants/krishnakamal.jpg',
    availability: true,
    stock: 22,
    featured: true
  },
  {
    title: 'Lavender',
    description: 'Aromatic flowering plant known for its calming fragrance. Perfect for gardens and pots.',
    price: 329,
    category: 'Flowering',
    image: '/uploads/plants/lavender.jpg',
    availability: true,
    stock: 28,
    featured: true
  }
];

const seedPlants = async () => {
  try {
    await connectDB();


    await Plant.deleteMany({});
    console.log('Existing plants deleted');

    await Plant.insertMany(plants);
    console.log('Sample plants added successfully!');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding plants:', error);
    process.exit(1);
  }
};

seedPlants();