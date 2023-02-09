import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Callout,
  Circle,
} from "react-native-maps";

export const Playground = () => {
  const latitudeDelta = 0.0922;
  const longitudeDelta = latitudeDelta;
  return (
    <View style={{ flex: 1 }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 10.530345,
          longitude: 76.214729,
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta,
        }}
        style={styles.map}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},

  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
