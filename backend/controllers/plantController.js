import Plant from '../models/Plant.js';



export const getPlants = async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice, sort } = req.query;

    let query = {};

    
    if (search) {
      query.$text = { $search: search };
    }

    
    if (category && category !== 'All') {
      query.category = category;
    }

    
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    
    query.availability = true;

    let plantsQuery = Plant.find(query);

    
    if (sort === 'price-asc') {
      plantsQuery = plantsQuery.sort({ price: 1 });
    } else if (sort === 'price-desc') {
      plantsQuery = plantsQuery.sort({ price: -1 });
    } else if (sort === 'name') {
      plantsQuery = plantsQuery.sort({ title: 1 });
    } else {
      plantsQuery = plantsQuery.sort({ createdAt: -1 });
    }

    const plants = await plantsQuery;

    res.json({
      count: plants.length,
      plants
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



export const getPlantById = async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);

    if (!plant) {
      return res.status(404).json({ message: 'Plant not found' });
    }

    res.json(plant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



export const getFeaturedPlants = async (req, res) => {
  try {
    const plants = await Plant.find({ featured: true, availability: true }).limit(8);
    res.json(plants);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



export const getCategories = async (req, res) => {
  try {
    const categories = await Plant.distinct('category');
    res.json(categories);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};