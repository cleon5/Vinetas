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
import { getComic, getRandom } from "../Constants/Consultas";
import { styleHome } from "../Constants/Styles";
import { Entypo, AntDesign, FontAwesome5 } from "@expo/vector-icons";
import OpenLink from "../Components/OpenLink";
import DoubleClick from "react-native-double-tap";
import { getDataJson, storeDataJson } from "../Constants/Guarda";

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

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.route.params != undefined &&
      prevProps.route.params.itemId != this.props.route.params.itemId
    ) {
      this.get(this.props.route.params.itemId);
      this.Cargar();
    }
  }

  componentDidMount() {
    console.log(this.props);
    this.getRamdom();
    this.Cargar();
  }

  Concat(arr) {
    return arr.reduce((acc, val) => {
      Array.isArray(val) ? acc.concat(this.Concat(val)) : acc.concat(val), [];
    });
  }
  async getRamdom() {
    let comic = await getRandom();
    this.setState({ Comic: comic });
    console.log(this.state.Comic);
    this.transcript();
    this.Cargar();
  }

  async Guardar(name, data) {
    let get = [];
    let x = [];
    x = await getDataJson("FavComic");
    if (this.state.Guardar) {
      x.map((c) => {
        console.log("a " + c);
        if (c[0] != data[0]) {
          get.push(c);
          console.log("push");
        } else {
          console.log("no push");
        }
      });
      await storeDataJson(name, get);
    } else {
      if (x == null || x.length == 0) {
        await storeDataJson(name, [data]);
      } else {
        x.push(data);
        await storeDataJson(name, x);
      }
    }
    this.setState({ Guardar: !this.state.Guardar });
  }

  async Cargar() {
    console.log(this.props);
    console.log(this.state.Comic.num);
    let x = await getDataJson("FavComic");
    if (x != null) {
      x.map((c) => {
        c[0] == this.state.Comic.num
          ? this.setState({ Guardar: true })
          : this.setState({ Guardar: false });
      });
    }
  }
  async get(n) {
    let x = await getComic(n);
    this.setState({ Comic: x });
    console.log(this.state.Comic);
    this.transcript();
    this.Cargar();
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
        <View style={{ flex: 1 }}>
          <DoubleClick
            singleTap={() => {
              console.log("single tap");
              this.Cargar();
            }}
            doubleTap={() => {
              this.Guardar("FavComic", [
                this.state.Comic.num,
                this.state.Comic.title,
              ]);
              console.log("double tap");
            }}
            delay={200}
          ></DoubleClick>

          <View style={styleHome.tituloView}>
            <TouchableOpacity
              style={styleHome.icono}
              onPress={() => {
                this.Guardar("FavComic", [
                  this.state.Comic.num,
                  this.state.Comic.title,
                ]);
              }}
            >
              {this.state.Guardar ? (
                <AntDesign name="heart" size={30} color="red" />
              ) : (
                <AntDesign name="hearto" size={30} color="red" />
              )}
            </TouchableOpacity>
            <Text style={styleHome.titulo}>{this.state.Comic.title}</Text>

            <TouchableOpacity
              style={styleHome.icono}
              onPress={() => this.getRamdom()}
            >
              <FontAwesome5 name="random" size={30} color="black" />
            </TouchableOpacity>
          </View>

          <Image style={styleHome.img} source={{ uri: this.state.Comic.img }} />

          <View>
            <Text style={styleHome.titulo}>Information</Text>
            <Text style={styleHome.alt}>{this.state.Comic.alt}</Text>
          </View>
          {/*
          <Button
            title="Go to Details... again"
            onPress={() => this.props.navigation.navigate("Guardados")}
          ></Button>

           data del comic*/}
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
            <Text>{this.state.More}</Text>
          )}

          {this.state.trans != "" ? (
            <View>
              <Text style={styleHome.titulo}>Transcripcion</Text>
              <Text style={styleHome.transcrip}>{this.state.trans}</Text>
            </View>
          ) : null}

          <TouchableOpacity
            style={styleHome.icono}
            onPress={() => this.getRamdom()}
          >
            <FontAwesome5 name="random" size={40} color="black" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
