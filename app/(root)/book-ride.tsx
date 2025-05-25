import { useUser } from '@clerk/clerk-expo';
import { Image, Text, View } from 'react-native';

import RideLayout from '@/components/RideLayout';
import { icons } from '@/constants';
import { formatTime } from '@/lib/utils';
import { useDriverStore, useLocationStore } from '@/store';
import Payment from '@/components/Payment'; // пока оставим, как заглушку
import { useTranslation } from 'react-i18next';

const BookRide = () => {
  const { t } = useTranslation();
  const { user } = useUser();
  const { userAddress, destinationAddress } = useLocationStore();
  const { drivers, selectedDriver } = useDriverStore();

  const driverDetails = Array.isArray(drivers)
    ? drivers.find((driver) => +driver.id === selectedDriver)
    : undefined;

  if (!driverDetails) {
    return (
      <RideLayout title={t('book.title')}>
        <Text className="mt-10 text-center text-red-500">{t('book.no_driver_selected')}</Text>
      </RideLayout>
    );
  }

  return (
    <RideLayout title={t('book.title')}>
      <>
        <Text className="mb-3 font-JakartaSemiBold text-xl">{t('book.info')}</Text>

        <View className="mt-10 flex w-full flex-col items-center justify-center">
          <Image
            source={{ uri: driverDetails.profile_image_url }}
            className="h-28 w-28 rounded-full"
          />

          <View className="mt-5 flex flex-row items-center justify-center space-x-2">
            <Text className="font-JakartaSemiBold text-lg">
              {driverDetails.first_name} {driverDetails.last_name}
            </Text>

            <View className="flex flex-row items-center space-x-0.5">
              <Image source={icons.star} className="h-5 w-5" resizeMode="contain" />
              <Text className="font-JakartaRegular text-lg">{driverDetails.rating}</Text>
            </View>
          </View>
        </View>

        <View className="mt-5 flex w-full flex-col items-start justify-center rounded-3xl bg-general-600 px-5 py-3">
          <View className="flex w-full flex-row items-center justify-between border-b border-white py-3">
            <Text className="font-JakartaRegular text-lg">{t('book.price')}</Text>
            <Text className="font-JakartaRegular text-lg text-[#0CC25F]">
              ${driverDetails.price}
            </Text>
          </View>

          <View className="flex w-full flex-row items-center justify-between border-b border-white py-3">
            <Text className="font-JakartaRegular text-lg">{t('book.pickup_time')}</Text>
            <Text className="font-JakartaRegular text-lg">{formatTime(driverDetails.time!)}</Text>
          </View>

          <View className="flex w-full flex-row items-center justify-between py-3">
            <Text className="font-JakartaRegular text-lg">{t('book.seats')}</Text>
            <Text className="font-JakartaRegular text-lg">{driverDetails.car_seats}</Text>
          </View>
        </View>

        <View className="mt-5 flex w-full flex-col items-start justify-center">
          <View className="mt-3 flex w-full flex-row items-center justify-start border-b border-t border-general-700 py-3">
            <Image source={icons.to} className="h-6 w-6" />
            <Text className="font-JakartaRegular ml-2 text-lg">{userAddress}</Text>
          </View>

          <View className="flex w-full flex-row items-center justify-start border-b border-general-700 py-3">
            <Image source={icons.point} className="h-6 w-6" />
            <Text className="font-JakartaRegular ml-2 text-lg">{destinationAddress}</Text>
          </View>
        </View>

        {/* Здесь будет подключён российский платёжный сервис в будущем */}
        <Payment />
      </>
    </RideLayout>
  );
};

export default BookRide;
