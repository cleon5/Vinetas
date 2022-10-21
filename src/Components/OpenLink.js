import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useCallback } from "react";

const OpenLink = ({ url }) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return (
    <TouchableOpacity style={styles.Button} onPress={handlePress}>
      <Text style={styles.txt}>Info</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  txt: {
    color: "white",
    textAlignVertical: "center",
    alignItems: "center",
    padding: 10,
    fontSize: 20,
  },
  Button: {
    alignItems: "center",
    borderRadius: 10,
    width: 80,
    backgroundColor: "#38006b",
    alignSelf: "center",
    color: "black",
    margin: 10,
  },
});
export default OpenLink;
