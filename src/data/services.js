import homeCleaningImg from '../assets/images/home-cleaning.svg';
import salonImg from '../assets/images/salon.svg';
import plumbingImg from '../assets/images/plumbing.svg';
import electricalImg from '../assets/images/electrical.svg';
import applianceImg from '../assets/images/appliance.svg';
import massageImg from '../assets/images/massage.svg';

export const services = [
  {
    id: 1,
    name: 'Home Cleaning',
    price: 499,
    image: homeCleaningImg,
    category: 'Cleaning',
    duration: '3 hours'
  },
  {
    id: 2,
    name: 'Salon at Home',
    price: 799,
    image: salonImg,
    category: 'Beauty',
    duration: '2 hours'
  },
  {
    id: 3,
    name: 'Plumbing Services',
    price: 599,
    image: plumbingImg,
    category: 'Repair',
    duration: '1.5 hours'
  },
  {
    id: 4,
    name: 'Electrical Services',
    price: 699,
    image: electricalImg,
    category: 'Repair',
    duration: '2 hours'
  },
  {
    id: 5,
    name: 'Appliance Repair',
    price: 899,
    image: applianceImg,
    category: 'Repair',
    duration: '2.5 hours'
  },
  {
    id: 6,
    name: 'Massage Therapy',
    price: 1299,
    image: massageImg,
    category: 'Wellness',
    duration: '1 hour'
  }
];
