import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { icons } from '@/constants';
import { formatTime } from '@/lib/utils';
import { DriverCardProps } from '@/types/type';
import i18n from '@/i18n';
import { useTranslation } from 'react-i18next';

const DriverCard = ({ item, selected, setSelected }: DriverCardProps) => {
  const { t } = useTranslation();

  const fullName =
    i18n.language === 'ru'
      ? `${item.first_name_ru ?? item.first_name} ${item.last_name_ru ?? item.last_name}`
      : `${item.first_name} ${item.last_name}`;

  return (
    <TouchableOpacity
      onPress={setSelected}
      className={`${
        selected === item.id ? 'bg-general-600' : 'bg-white'
      } flex flex-row items-center justify-between rounded-xl px-3 py-5`}>
      <Image source={{ uri: item.profile_image_url }} className="h-14 w-14 rounded-full" />

      <View className="mx-3 flex flex-1 flex-col items-start justify-center">
        <View className="mb-1 flex flex-row items-center justify-start">
          <Text className="font-JakartaRegular text-lg">{fullName}</Text>

          <View className="ml-2 flex flex-row items-center space-x-1">
            <Image source={icons.star} className="h-3.5 w-3.5" />
            <Text className="font-JakartaRegular text-sm">{item.rating}</Text>
          </View>
        </View>

        <View className="flex flex-row items-center justify-start">
          <View className="flex flex-row items-center">
            <Image source={icons.dollar} className="h-4 w-4" />
            <Text className="font-JakartaRegular ml-1 text-sm">${item.price}</Text>
          </View>

          <Text className="font-JakartaRegular mx-1 text-sm text-general-800">|</Text>

          <Text className="font-JakartaRegular text-sm text-general-800">
            {formatTime(item.time!)}
          </Text>

          <Text className="font-JakartaRegular mx-1 text-sm text-general-800">|</Text>

          <Text className="font-JakartaRegular text-sm text-general-800">
            {t('driver.seats', { count: item.car_seats })}
          </Text>
        </View>
      </View>

      <Image source={{ uri: item.car_image_url }} className="h-14 w-14" resizeMode="contain" />
    </TouchableOpacity>
  );
};

export default DriverCard;
