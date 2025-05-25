import { ImageSourcePropType } from 'react-native';
import { useTranslation } from 'react-i18next';

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
  arrowDown: require('@/assets/icons/arrow-down.png'),
  arrowUp: require('@/assets/icons/arrow-up.png'),
  backArrow: require('@/assets/icons/back-arrow.png'),
  chat: require('@/assets/icons/chat.png'),
  checkmark: require('@/assets/icons/check.png'),
  close: require('@/assets/icons/close.png'),
  dollar: require('@/assets/icons/dollar.png'),
  email: require('@/assets/icons/email.png'),
  eyecross: require('@/assets/icons/eyecross.png'),
  google: require('@/assets/icons/google.png'),
  home: require('@/assets/icons/home.png'),
  list: require('@/assets/icons/list.png'),
  lock: require('@/assets/icons/lock.png'),
  map: require('@/assets/icons/map.png'),
  marker: require('@/assets/icons/marker.png'),
  out: require('@/assets/icons/out.png'),
  person: require('@/assets/icons/person.png'),
  pin: require('@/assets/icons/pin.png'),
  point: require('@/assets/icons/point.png'),
  profile: require('@/assets/icons/profile.png'),
  search: require('@/assets/icons/search.png'),
  selectedMarker: require('@/assets/icons/selected-marker.png'),
  star: require('@/assets/icons/star.png'),
  target: require('@/assets/icons/target.png'),
  to: require('@/assets/icons/to.png'),
};

interface OnboardingItem {
  id: number;
  titleKey: string;
  descriptionKey: string;
  image: ImageSourcePropType;
}

interface OnboardingItem {
  id: number;
  titleKey: string;
  descriptionKey: string;
  image: ImageSourcePropType;
}

export const onboarding: OnboardingItem[] = [
  {
    id: 1,
    titleKey: 'onboarding.step1.title',
    descriptionKey: 'onboarding.step1.description',
    image: images.onboarding1,
  },
  {
    id: 2,
    titleKey: 'onboarding.step2.title',
    descriptionKey: 'onboarding.step2.description',
    image: images.onboarding2,
  },
  {
    id: 3,
    titleKey: 'onboarding.step3.title',
    descriptionKey: 'onboarding.step3.description',
    image: images.onboarding3,
  },
];

export const data = {
  onboarding,
};
