import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { styleHome } from "../Constants/Styles";
import { TouchableOpacity } from 'react-native-gesture-handler';

const DataComponet = ({titulo}) => {
  return (
    <View >
      <TouchableOpacity onPress={() => this.props.navigation.navigate('Home',{
          itemId: titulo[0],
        } )}>
      <Text style={styleHome.guardado}>{titulo[1]}</Text>
      </TouchableOpacity>
    </View>
  )
}

export const style = StyleSheet.create({
  View:{
    padding: 20,
  },

})

export default DataComponet