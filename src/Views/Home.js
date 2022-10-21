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

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Comic: [],
      trans: "",
      More: true,
    };
  }
  componentDidMount() {
    this.get();
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
        <View style={styles.container}>
          <DoubleClick
            singleTap={() => {
              console.log("single tap");
            }}
            doubleTap={() => {
              console.log("double tap");
            }}
            delay={200}
          >
            <Text style={styleHome.titulo}>{this.state.Comic.title}</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
