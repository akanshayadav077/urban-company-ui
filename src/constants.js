import {
  cleaningImage,
  salonImage,
  repairImage,
  massageImage,
  plumbingImage,
  electricalImage
} from './assets/images';

export const API_DELAY_MS = 700;

export const SERVICE_CATEGORIES = [
  {
    id: 'cleaning',
    name: 'Home Cleaning',
    description: 'Professional deep cleaning for your home',
    price: 499,
    icon: '🧹',
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=600&auto=format&fit=crop'
  },
  {
    id: 'repair',
    name: 'Appliance Repair',
    description: 'Expert repair services for all appliances',
    price: 399,
    icon: '🔧',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop'
  },
  {
    id: 'massage',
    name: 'Massage Therapy',
    description: 'Relaxing massage therapy for wellness',
    price: 1199,
    icon: '🧘',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&auto=format&fit=crop'
  },
  {
    id: 'plumbing',
    name: 'Plumbing Services',
    description: 'Professional plumbing solutions',
    price: 599,
    icon: '🔨',
    image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=600&auto=format&fit=crop'
  },
  {
    id: 'electrical',
    name: 'Electrical Services',
    description: 'Safe and reliable electrical work',
    price: 699,
    icon: '⚡',
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&auto=format&fit=crop'
  },
  {
    id: 'salon',
    name: 'Salon at Home',
    description: 'Premium beauty and grooming services at your doorstep',
    price: 899,
    icon: '💇',
    image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&auto=format&fit=crop'
  }
];

export const BOOKINGS = [
  {
    id: 'BK-101',
    service: 'Home Cleaning',
    bookedAt: '2026-04-07T10:30:00.000Z',
    status: 'confirmed',
    amount: 499
  },
  {
    id: 'BK-102',
    service: 'Appliance Repair',
    bookedAt: '2026-04-05T16:00:00.000Z',
    status: 'completed',
    amount: 399
  }
];
