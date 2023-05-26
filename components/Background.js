import { View, Text, ImageBackground } from 'react-native'
import React from 'react'

const Background = ({children}) => {
  return (
    <View style ={{flex: 1}}>
      <ImageBackground source={require('../assets/backgroundd.jpg')} 
      style = {{height: '100%'}}/>
      <View style = {{position: 'absolute', width: '100%'}}>
        {children}
      </View>
    </View>
  )
}

export default Background