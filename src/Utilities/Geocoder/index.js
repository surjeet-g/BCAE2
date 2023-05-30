import get from "lodash.get";
import {
  Platform
} from "react-native";
import RNLocation from "react-native-location";
import geocderLocalDb from "../../LocalData/geocoder.json";
const getGeoAddress = async (postal) => {
  // console.warn("postal code", postal);
  const res = geocderLocalDb.filter((addr) => addr.postalCode === postal);
  // console.warn("res", postal, res);
  if (get(res, "length", 0) != 0) {
    return [
      { lat: parseFloat(res[0].latitude), lon: parseFloat(res[0].longitude) },
    ];
  } else {
    // console.warn("htting else case");
    return [
      {
        lat: parseFloat("4.5353"),
        lon: parseFloat("114.7277"),
      },
    ];
  }
};

export const getCurrentLocation = async (setCurrentLatitude = () => { }, setCurrentLongitude = () => { }) => {
  try {
    if (Platform.OS === "android") {
      CheckForGPSEnablement()
    }
    const permission = await RNLocation.checkPermission({
      ios: "whenInUse", // or 'always'
      android: {
        detail: "coarse", // or 'fine'
      },
    });

    if (!permission) {
      permission = await RNLocation.requestPermission({
        ios: "whenInUse",
        android: {
          detail: "coarse",
          rationale: {
            title: "We need to access your location",
            message: "We use your location to show where you are on the map",
            buttonPositive: "OK",
            buttonNegative: "Cancel",
          },
        },
      });


      await RNLocation.getLatestLocation({ timeout: 60000 }).then(
        (locationCurrent) => {
          // Use the location here
          setCurrentLatitude(locationCurrent.latitude + 0.0025);
          setCurrentLongitude(locationCurrent.longitude + 0.001);
        }
      );
      return true;
    } else {
      await RNLocation.getLatestLocation({ timeout: 60000 }).then(
        (locationCurrent) => {
          setCurrentLatitude(locationCurrent.latitude + 0.0025);
          setCurrentLongitude(locationCurrent.longitude + 0.001);
        }
      );
      return true
    }
  } catch (error) {
    console.log(
      "There has been a problem with RNLocation fetch operation: " +
      error.message
    );
    return false;
  }
}

const CheckForGPSEnablement = () => {
  return new Promise((resolve) => {
    RNLocation.configure({
      distanceFilter: 100, // Meters
      desiredAccuracy: {
        ios: "best",
        android: "balancedPowerAccuracy",
      },
      // Android only
      androidProvider: "auto",
      interval: 5000, // Milliseconds
      fastestInterval: 10000, // Milliseconds
      maxWaitTime: 5000, // Milliseconds
      // iOS Only
      activityType: "other",
      allowsBackgroundLocationUpdates: false,
      headingFilter: 1, // Degrees
      headingOrientation: "portrait",
      pausesLocationUpdatesAutomatically: false,
      showsBackgroundLocationIndicator: false,
    })
      .then((x) => {
        console.log({ x });
        resolve(true);
      })
      .catch((err) => {
        console.log({ err });
        resolve(false);
      });
  });
};

export default getGeoAddress;


