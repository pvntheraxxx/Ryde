import { Text, TouchableOpacity, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Swiper from 'react-native-swiper';
import { useRef, useState } from 'react';
import { onboarding } from '@/constants';
import CustomButton from '@/components/CustomButton';
import { useTranslation } from 'react-i18next';

const Onboarding = () => {
  const { t } = useTranslation();
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboarding.length - 1;

  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-white">
      <TouchableOpacity
        onPress={() => router.replace('/(auth)/sign-up')}
        className="flex w-full items-end justify-end p-5">
        <Text className="text-md font-JakartaBold text-black">{t('onboarding.skip')}</Text>
      </TouchableOpacity>

      <Swiper
        ref={swiperRef}
        loop={false}
        dot={<View className="mx-1 h-[4px] w-[32px] rounded-full bg-[#E2E8F0]" />}
        activeDot={<View className="mx-1 h-[4px] w-[32px] rounded-full bg-[#0286FF]" />}
        onIndexChanged={(index) => setActiveIndex(index)}>
        {onboarding.map((item) => (
          <View key={item.id} className="flex items-center justify-center p-5">
            <Image source={item.image} className="h-[300px] w-full" resizeMode="contain" />
            <View className="mt-10 flex w-full flex-row items-center justify-center">
              <Text className="mx-10 text-center text-3xl font-bold text-black">
                {t(item.titleKey)}
              </Text>
            </View>
            <Text className="mx-10 mt-3 text-center font-JakartaSemiBold text-lg text-[#858585]">
              {t(item.descriptionKey)}
            </Text>
          </View>
        ))}
      </Swiper>

      <CustomButton
        title={isLastSlide ? t('onboarding.get_started') : t('onboarding.next')}
        onPress={() =>
          isLastSlide ? router.replace('/(auth)/sign-up') : swiperRef.current?.scrollBy(1)
        }
        className="mt-10 w-11/12"
      />
    </SafeAreaView>
  );
};

export default Onboarding;
