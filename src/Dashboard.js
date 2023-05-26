import { View, Text, Button, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { firebase } from '../config';
import { useNavigation } from '@react-navigation/native';

const Dashboard = () => {
  const [name, setName] = useState('')

  useEffect(() => {
    firebase.firestore().collection('users')
    .doc(firebase.auth().currentUser.uid).get()
    .then((snapshot) => {
      if(snapshot.exists){
        setName(snapshot.data())
      }else{
        console.log('user does not exit')
      }
    })
  })
  return (
    <View>
      <SafeAreaView style = {{margin: 30}} >
        <Text style = {{fontSize: 20}}>
          FirstName: {name.firstName}
        </Text>

        <Text style = {{fontSize: 20, marginVertical: 10}}>
          LastName: {name.lastName}
        </Text>

        <Text style = {{fontSize: 20}}>
          Email: {name.email}
        </Text>

      </SafeAreaView>
      <TouchableOpacity onPress={() => { firebase.auth().signOut() }} style={{
        backgroundColor: '#538c51',
        alignItems: 'center',
        marginHorizontal: 20,
        borderRadius: 50,
        elevation: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        marginTop: 30,
        marginBottom: 20
      }}>
        <Text style={{
          color: 'white', fontWeight: 'bold',
          fontSize: 20, paddingVertical: 15
        }}>Sign out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Dashboard