import AsyncStorage from "@react-native-community/async-storage";

export const saveData = async (key, data, isString = false) => {
  try {
    await AsyncStorage.setItem(key, isString ? data : JSON.stringify(data));
    // console.log("response from ", await getData(key));
  } catch (err) {
    throw err;
  }
};
export const clearAllData = async () => {
  const keys = await AsyncStorage.getAllKeys()
  console.log('remove', keys)
  const result = await AsyncStorage.multiRemove(keys)
  console.log('remove result', result)
  return true;
}
export const getData = async (key, isString = false) => {
  try {
    const data = await AsyncStorage.getItem(key);
    if (data !== null && typeof data != "undefined") {
      if (isString) return data;
      //console.log("data============================>"+data    )
      let dta = JSON.parse(data);
      return dta;
    }
  } catch (err) {
    // throw err;
  }
  return null;
};

export const removeAsyncItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (exception) {
    console.log("error remove item from async store", exception);
    return false;
  }
};
