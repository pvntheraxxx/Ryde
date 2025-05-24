import { View, Text } from 'react-native';
import MapView, { PROVIDER_DEFAULT } from 'react-native-maps';

const Map = () => {
  const region = {};
  return (
    <MapView
      provider={PROVIDER_DEFAULT}
      className="h-full w-full rounded-2xl"
      tintColor="black"
      // showsPointsOfInterest={false}
      // initialRegion={region}
      showsUserLocation={true}
      userInterfaceStyle="light"
      mapType="mutedStandard">
      <Text>Map</Text>
    </MapView>
  );
};

export default Map;
