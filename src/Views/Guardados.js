import {
  Image,
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Button,
} from "react-native";
import React, { Component } from "react";
import { getDataJson, storeDataJson, clearDataJson } from "../Constants/Guarda";
import { styleHome } from "../Constants/Styles";
import { AntDesign } from "@expo/vector-icons";
import Home from "./Home";

export default class Guardados extends Component {
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
    console.log(x);
    this.setState({ Comic: x });
    if (x == null) {
      console.log("sin");
    } else if (Array.isArray(x))
      x.includes(this.state.Comic.num) //Editar id
        ? this.setState({ Guardar: true })
        : this.setState({ Guardar: false });
    else
      x == this.state.Comic.num && x != null
        ? this.setState({ Guardar: true })
        : this.setState({ Guardar: false });
    console.log(this.state.Comic);
  }

  MostrarGuardados() {
    return this.state.Comic.map((item, i) => {
      return (
        <View key={i}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("Home", {
                itemId: item[0],
              })
            }
          >
            <Text style={styleHome.guardado}>{item[1]}</Text>
          </TouchableOpacity>
        </View>
      );
    });
  }

  render() {
    return (
      <View>
        <View style={styleHome.tituloView}>
          <TouchableOpacity onPress={() => this.Cargar()}>
            <AntDesign
              style={styleHome.borrar}
              name="reload1"
              size={40}
              color="black"
            />
          </TouchableOpacity>

          <Text style={styleHome.titulo}>Guardados</Text>
          <TouchableOpacity onPress={() => clearDataJson()}>
            <AntDesign
              style={styleHome.borrar}
              name="delete"
              size={40}
              color="black"
            />
          </TouchableOpacity>
        </View>

        {this.state.Comic != null ? (
          this.MostrarGuardados()
        ) : (
          <Text style={styleHome.titulo}>Nada Guardado</Text>
        )}
      </View>
    );
  }
}
