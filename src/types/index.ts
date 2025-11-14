export interface Plant {
  id: string;
  name: string;
  scientificName: string;
  price: number;
  image: string;
  category: 'indoor' | 'outdoor' | 'succulent' | 'flowering' | 'fern' | 'cactus';
  difficulty: 'easy' | 'medium' | 'hard';
  light: 'low' | 'medium' | 'bright';
  water: 'low' | 'medium' | 'high';
  description: string;
  benefits: string[];
  idealFor: ('home' | 'office' | 'bedroom' | 'bathroom')[];
  size: 'small' | 'medium' | 'large';
  inStock: boolean;
  featured?: boolean;
  bestseller?: boolean;
  isGift?: boolean;
}

export interface CartItem extends Plant {
  quantity: number;
}

export type SubscriptionPlan = 'eco' | 'pro' | null;

export interface User {
  id: string;
  name: string;
  email: string;
  subscription: SubscriptionPlan;
}

export interface SubscriptionDetails {
  name: string;
  price: number;
  features: string[];
  color: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  subtotal: number;
  discount: number;
  shipping: number;
  status: 'pending' | 'delivered' | 'cancelled';
  orderDate: string;
  deliveryDate: string;
  address: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  paymentMethod: 'upi' | 'cod';
  upiId?: string;
  couponCode?: string;
  couponDiscount?: number;
}
