import { Image, Text, View, StyleSheet } from "react-native";
import React, { Component } from "react";
import { getComic } from "../Constants/Consultas";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Comic: [],
    };
  }
  componentDidMount() {
    this.get();
    
  }

  async get() {
    let x = await getComic(2);
    this.setState({ Comic: x });
    console.log(this.state.Comic)
  }

  render() {
    return (
      <View>
        <Image style={styles.img} source={{uri:this.state.Comic.img}}/>
      </View>
    );
  }

}
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    img:{
      width:300,
      height:300,
    }
  });