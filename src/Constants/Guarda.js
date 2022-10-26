import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (name, data) => {
  try {
    await AsyncStorage.setItem(name, data);
  } catch (e) {
    console.log(e);
  }
};

export const getData = async (name) => {
    let value;
    try {
    value = await AsyncStorage.getItem(name);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log(e + 'erro');
  }
}
//Json saves fuctions
export const storeDataJson = async (name, data) => {
  try {
    const jsonValue = JSON.stringify(data)
    await AsyncStorage.setItem(name, jsonValue)
    console.log(jsonValue + name)
  } catch (e) {
    console.log(e);
  }
}

export const getDataJson = async (name) => {
  try {
    const jsonValue = await AsyncStorage.getItem(name)
    console.log(jsonValue)
    return jsonValue != null ? JSON.parse(jsonValue) : null
  } catch(e) {
    console.log(e);
  }
}