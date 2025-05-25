import { View, Text } from 'react-native';
import { useLocationStore } from '@/store';

const FindRide = () => {
  const { userAddress, destinationAddress, setDestinationLocation, setUserLocation } =
    useLocationStore();
  return (
    <View>
      <Text className="text-2xl">You are here: {userAddress}</Text>
      <Text className="text-2xl">You are goint to: {destinationAddress}</Text>
    </View>
  );
};

export default FindRide;
