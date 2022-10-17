import { Image, Text, View, StyleSheet, ScrollView } from "react-native";
import React, { Component } from "react";
import { getComic } from "../Constants/Consultas";
import { styleHome } from "../Constants/Styles";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Comic: [],
      transcript: "",
    };
  }
  componentDidMount() {
    this.get();
  }

  async get() {
    let x = await getComic(542);
    this.setState({ Comic: x });
    console.log(this.state.Comic);
    this.transcript();
  }

  transcript() {
    let x = this.state.Comic.transcript.split("[[");
    console.log()
    const regex  = /\[\[|\]\]|{.*}/gi
    this.setState({transcript:this.state.Comic.transcript.replace(regex, "")});
  }
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styleHome.titulo}>{this.state.Comic.title}</Text>
          <Image style={styleHome.img} source={{ uri: this.state.Comic.img }} />
          { this.state.Comic.transcript != "" || transcript != "" ?
            (
            <View>
              <Text style={styleHome.titulo}>Transcripcion</Text>
              <Text>{this.state.transcript}</Text> 
            </View>
            )
          :null
          }
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
