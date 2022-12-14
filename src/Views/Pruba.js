import {
  Image,
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { Component } from "react";
import { getComic } from "../Constants/Consultas";
import { styleHome } from "../Constants/Styles";
import { Entypo } from "@expo/vector-icons";
import OpenLink from "../Components/OpenLink";
import DoubleClick from "react-native-double-tap";
import {getDataJson, storeDataJson} from "../Constants/Guarda";

export default class Pruba extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Comic: [],
      trans: "",
      More: true,
      Guardar: false,
    };
  }
  componentDidMount() {
    this.Cargar();
  }

  async Cargar() {
    let x = await getDataJson("FavComic");
    this.setState({Comic:x})
    console.log(x)
    if (Array.isArray(x))
      x.includes(this.state.Comic.num)//Editar id
        ? this.setState({ Guardar: true })
        : this.setState({ Guardar: false });
    else
      x == this.state.Comic.num && x != null
        ? this.setState({ Guardar: true })
        : this.setState({ Guardar: false });
  }
  render() {
    return (
      <View>
        <TouchableOpacity onPress={()=>this.Cargar()} >
          <Text>Pruba</Text>
          </TouchableOpacity>
        <Text>{this.state.Comic}</Text>
      </View>
    )
  }
}