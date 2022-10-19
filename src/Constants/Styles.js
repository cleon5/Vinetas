import { StyleSheet } from "react-native";

export const styleHome = StyleSheet.create({
  img: {
    width: "100%",
    height: 250,
    resizeMode: "contain",
  },
  titulo: {
    paddingVertical: 20,
    fontSize: 30,
    textAlign: "center",
  },
  transcrip: {
    padding: 20,
    fontSize: 20,
  },
  alt: {
    paddingHorizontal: 20,
    fontSize: 22,
  },
  boton: {
    borderRadius: 10,
    padding :1,
    backgroundColor:"yellow",
    borderColor: "black",
    color: "black",
    margin: 10,
  },
  ViewData:{
    alignContent:"center",
    alignItems:"center",
    flexDirection:"row",
    alignSelf:"center"
  },
});
