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

export default class Home extends Component {
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
    this.get();
    this.Cargar();
  }

  async Guardar(name, data) {
    let get = [];
    let x = [];
    x = await getDataJson("FavComic");
    console.log(x);
    if (x == null) {
      await storeDataJson(name, data);
    } else {
      get.push(data);
      if (Array.isArray(x)) {
        if (x.includes(data)) {
          get = x;
          get.splice(x.indexOf(data), 1);
          console.log(x.indexOf(data));
        } else x.map((a) => get.push(a));
      } else x != get ? get.push(x) : (get = null);
      console.log(get);
      await storeDataJson(name, get);
    }
    this.setState({ Guardar: !this.state.Guardar });
  }

  async Cargar() {
    let x = await getDataJson("FavComic");
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
  async get() {
    let x = await getComic(2500);
    this.setState({ Comic: x });
    console.log(this.state.Comic);
    this.transcript();
  }

  transcript() {
    const regex = /\[\[|\]\]|{.*}/gi;
    if (this.state.Comic.transcrip != "") {
      this.setState({
        trans: this.state.Comic.transcript.replace(regex, ""),
      });
    } else {
      this.setState({
        trans: "",
      });
    }
  }

  render() {
    return (
      <ScrollView>
        <View style={{flex:1}}>
          <DoubleClick
            singleTap={() => {
              console.log("single tap");
            }}
            doubleTap={() => {
              this.Guardar("FavGames", this.state.Comic.num);
              console.log("double tap");
            }}
            delay={200}
          >
            <Text style={styleHome.titulo}>{this.state.Comic.title}</Text>
            <Text style={styleHome.titulo}>{this.state.Guardar} "am"</Text>

            <Image
              style={styleHome.img}
              source={{ uri: this.state.Comic.img }}
            />
          </DoubleClick>

          <View>
            <Text style={styleHome.titulo}>Information</Text>
            <Text style={styleHome.alt}>{this.state.Comic.alt}</Text>
          </View>

          {/* data del comic*/}
          <View style={styleHome.ViewData}>
            <Text style={styleHome.titulo}>Data</Text>

            <TouchableOpacity
              style={styleHome.boton}
              onPress={() => this.setState({ More: !this.state.More })}
            >
              {this.state.More ? (
                <Entypo name="chevron-small-up" size={24} color="black" />
              ) : (
                <Entypo name="chevron-down" size={24} color="black" />
              )}
            </TouchableOpacity>
          </View>

          {this.state.More ? (
            <View>
              <Text style={styleHome.alt}>Number: {this.state.Comic.num}</Text>
              <Text style={styleHome.alt}>
                Date: {this.state.Comic.day}/{this.state.Comic.month}/
                {this.state.Comic.year}
              </Text>
              {this.state.Comic.link != "" ? (
                <OpenLink url={this.state.Comic.link} />
              ) : null}
            </View>
          ) : (
            <Text style={styles.Texto}>{this.state.More}</Text>
          )}

          {this.state.trans != "" ? (
            <View>
              <Text style={styleHome.titulo}>Transcripcion</Text>
              <Text style={styleHome.transcrip}>nnn{this.state.trans}</Text>
            </View>
          ) : null}
        </View>
      </ScrollView>
    );
  }
}