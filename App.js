import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from "@react-navigation/drawer";
import Pruba from "./src/Views/Pruba";
import Home from "./src/Views/Home";
import Guardados from "./src/Views/Guardados";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  function MyDrawer() {
    return (
      <Drawer.Navigator useLegacyImplementation>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Article" component={Guardados} />
      </Drawer.Navigator>
    );
  }
  return (
      <NavigationContainer>
        <MyDrawer/> 
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
