import mongoose from 'mongoose';

const plantSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a plant title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a description']
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
    min: 0
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: ['Indoor', 'Outdoor', 'Succulents', 'Flowering', 'Medicinal', 'Air Purifying', 'Low Maintenance', 'Climbers']
  },
  image: {
    type: String,
    required: [true, 'Please provide an image']
  },
  availability: {
    type: Boolean,
    default: true
  },
  stock: {
    type: Number,
    default: 50,
    min: 0
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});


plantSchema.index({ title: 'text', description: 'text' });

export default mongoose.model('Plant', plantSchema);