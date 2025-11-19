import Order from '../models/Order.js';
import Plant from '../models/Plant.js';



export const createOrder = async (req, res) => {
  try {
    const { items, deliveryAddress, totalAmount } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    
    for (let item of items) {
      const plant = await Plant.findById(item.plant);
      if (!plant || !plant.availability) {
        return res.status(400).json({ message: `Plant ${item.title} is not available` });
      }
    }

    const order = await Order.create({
      user: req.user._id,
      items,
      deliveryAddress,
      totalAmount,
      paymentMethod: 'Cash on Delivery'
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.plant', 'title')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.plant', 'title')
      .populate('user', 'name email');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    
    if (order.user._id.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};