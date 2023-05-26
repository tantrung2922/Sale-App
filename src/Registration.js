import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Alert } from 'react-native';
import React, { useState } from "react";
import { firebase } from '../config';
import Background from '../components/Background';

const Registration = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confimPassword, setConfimPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [error, setError] = useState(null);

  const registerUser = async (email, password, firstName, lastName, confimPassword) => {
    const isEmailValid = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    if (!email) {
      Alert.alert("Lỗi", "Bạn chưa nhập Email!");
      return;
    } else if (!password) {
      Alert.alert("Bạn chưa nhập Password!");
      return;
    } else if (!confimPassword) {
      Alert.alert("Lỗi", "Bạn chưa xác nhận mật khẩu!");
      return;
    } else if (confimPassword != password) {
      Alert.alert("Lỗi", "Mật khẩu không khớp!");
      return;
    } else if (password.length < 6) {
      Alert.alert("Lỗi", "Password phải chứa ít nhất 6 ký tự!");
      return;
    }else if (!isEmailValid) {
      Alert.alert("Lỗi", "Định dạng email không hợp lệ");
      return;
    }

    await firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase.auth().currentUser.sendEmailVerification({
          handleCodeInApp: true,
          url: "http://appmanager-69b88.firebaseapp.com",
        })
          .then(() => {
            Alert.alert('Xác minh Email của bạn')
          }).catch((error) => {
            console.error(error);
          })
          .then(() => {
            firebase.firestore().collection('users')
              .doc(firebase.auth().currentUser.uid)
              .set({
                firstName,
                lastName,
                email
              })
          })
          .catch((error) => {
            console.error(error);
          })
      })
      .catch((error => {
        console.error(error);
      }))
  }


  return (

    <Background>

      <View style={{
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '50%'
      }}>
        <Text style={{
          fontSize: 30,
          fontWeight: 'bold',
          color: 'white'
        }}>
          Register an account
        </Text>

        <Text style={{
          fontSize: 18,
          fontWeight: '500',
          color: 'white'
        }}>
          Welcome to the app!
        </Text>
      </View>

      <View style={{ flex: 1, borderWidth: 1, borderColor: 'white', }}>
        <TextInput
          style={{
            backgroundColor: 'white',
            marginHorizontal: 20,
            paddingVertical: 15,
            borderRadius: 20,
            paddingHorizontal: 15,
            marginTop: 15,
            fontSize: 20
          }}
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
          autoCapitalize='none'
          autoCorrect={false} />

        <TextInput
          style={{
            backgroundColor: 'white',
            marginHorizontal: 20,
            paddingVertical: 15,
            borderRadius: 20,
            paddingHorizontal: 15,
            marginTop: 15,
            fontSize: 20
          }}
          placeholder="First Name"
          onChangeText={(firstName) => setFirstName(firstName)}
          autoCapitalize='none'
          autoCorrect={false} />

        <TextInput
          style={{
            backgroundColor: 'white',
            marginHorizontal: 20,
            paddingVertical: 15,
            borderRadius: 20,
            paddingHorizontal: 15,
            marginTop: 15,
            fontSize: 20
          }}
          placeholder="Last Name"
          onChangeText={(lastName) => setLastName(lastName)}
          autoCapitalize='none'
          autoCorrect={false} />

        <TextInput
          style={{
            backgroundColor: 'white',
            marginHorizontal: 20,
            paddingVertical: 15,
            borderRadius: 20,
            paddingHorizontal: 15,
            marginTop: 15,
            fontSize: 20
          }}
          placeholder="Password"
          onChangeText={(password) => setPassword(password)}
          autoCapitalize='none'
          autoCorrect={false}
          secureTextEntry={true} />

        <TextInput
          style={{
            backgroundColor: 'white',
            marginHorizontal: 20,
            paddingVertical: 15,
            borderRadius: 20,
            paddingHorizontal: 15,
            marginTop: 15,
            fontSize: 20
          }}
          placeholder="Confim Password"
          onChangeText={(confimPassword) => setConfimPassword(confimPassword)}
          autoCapitalize='none'
          autoCorrect={false}
          secureTextEntry={true} />

        <TouchableOpacity
          onPress={() => registerUser(email, password, firstName, lastName, confimPassword)}
          style={{
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
            fontSize: 20, paddingVertical: 15,

          }}>Register</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

export default Registration

const styles = StyleSheet.create({

})