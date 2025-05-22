import arrowDown from '@/assets/icons/arrow-down.png';
import arrowUp from '@/assets/icons/arrow-up.png';
import backArrow from '@/assets/icons/back-arrow.png';
import chat from '@/assets/icons/chat.png';
import checkmark from '@/assets/icons/check.png';
import close from '@/assets/icons/close.png';
import dollar from '@/assets/icons/dollar.png';
import email from '@/assets/icons/email.png';
import eyecross from '@/assets/icons/eyecross.png';
import google from '@/assets/icons/google.png';
import home from '@/assets/icons/home.png';
import list from '@/assets/icons/list.png';
import lock from '@/assets/icons/lock.png';
import map from '@/assets/icons/map.png';
import marker from '@/assets/icons/marker.png';
import out from '@/assets/icons/out.png';
import person from '@/assets/icons/person.png';
import pin from '@/assets/icons/pin.png';
import point from '@/assets/icons/point.png';
import profile from '@/assets/icons/profile.png';
import search from '@/assets/icons/search.png';
import selectedMarker from '@/assets/icons/selected-marker.png';
import star from '@/assets/icons/star.png';
import target from '@/assets/icons/target.png';
import to from '@/assets/icons/to.png';
import { ImageSourcePropType } from 'react-native';

export const images = {
  onboarding1: require('@/assets/images/onboarding1.png'),
  onboarding2: require('@/assets/images/onboarding2.png'),
  onboarding3: require('@/assets/images/onboarding3.png'),
  getStarted: require('@/assets/images/get-started.png'),
  signUpCar: require('@/assets/images/signup-car.png'),
  check: require('@/assets/images/check.png'),
  noResult: require('@/assets/images/no-result.png'),
  message: require('@/assets/images/message.png'),
};

export const icons = {
  arrowDown,
  arrowUp,
  backArrow,
  chat,
  checkmark,
  close,
  dollar,
  email,
  eyecross,
  google,
  home,
  list,
  lock,
  map,
  marker,
  out,
  person,
  pin,
  point,
  profile,
  search,
  selectedMarker,
  star,
  target,
  to,
};

interface OnboardingItem {
  id: number;
  title: string;
  description: string;
  image: ImageSourcePropType;
}

export const onboarding: OnboardingItem[] = [
  {
    id: 1,
    title: 'The perfect ride is just a tap away!',
    description: 'Your journey begins with Ryde. Find your ideal ride effortlessly.',
    image: images.onboarding1,
  },
  {
    id: 2,
    title: 'Best car in your hands with Ryde',
    description: 'Discover the convenience of finding your perfect ride with Ryde',
    image: images.onboarding2,
  },
  {
    id: 3,
    title: "Your ride, your way. Let's go!",
    description: 'Enter your destination, sit back, and let us take care of the rest.',
    image: images.onboarding3,
  },
];

export const data = {
  onboarding,
};
