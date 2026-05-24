// Application Constants

export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
};

export const ORDER_STATUS_COLORS = {
  pending: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30',
  confirmed: 'bg-blue-500/20 text-blue-500 border-blue-500/30',
  processing: 'bg-purple-500/20 text-purple-500 border-purple-500/30',
  shipped: 'bg-cyan-500/20 text-cyan-500 border-cyan-500/30',
  delivered: 'bg-green-500/20 text-green-500 border-green-500/30',
  cancelled: 'bg-red-500/20 text-red-500 border-red-500/30'
};

export const PAYMENT_METHODS = {
  COD: 'cod'
};

export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin'
};

export const DELIVERY_FEE = 0; // Free delivery
export const MIN_ORDER_AMOUNT = 0;

export const CATEGORIES = [
  { id: 'laptops', name: 'Laptops', icon: 'Laptop' },
  { id: 'keyboards', name: 'Keyboards', icon: 'Keyboard' },
  { id: 'mice', name: 'Mice', icon: 'Mouse' },
  { id: 'headsets', name: 'Headsets', icon: 'Headphones' },
  { id: 'monitors', name: 'Monitors', icon: 'Monitor' },
  { id: 'components', name: 'PC Components', icon: 'Cpu' },
  { id: 'storage', name: 'Storage', icon: 'HardDrive' },
  { id: 'accessories', name: 'Accessories', icon: 'Gamepad2' }
];

export const CITIES = [
  'Karachi',
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Quetta',
  'Sialkot',
  'Gujranwala',
  'Sargodha',
  'Hyderabad',
  'Other'
];
