import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../config';
import Icon from 'react-native-vector-icons/Ionicons';
import Background from '../components/Background';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const loginUser = async (email, password) => {
    if (!email) {
      Alert.alert("Lỗi", "Bạn chưa nhập Email!");
      return;
    }else if(!password){
      Alert.alert("Bạn chưa nhập Password!");
      return;
    }

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      Alert.alert("Lỗi", "Bạn đã nhập sai email hoặc password");
      return
    }
  }

  const resetPassword = async () => {
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      Alert.alert('Thông báo', 'Một email khôi phục mật khẩu đã được gửi đến địa chỉ email của bạn.')
    } catch (error) {
      Alert.alert('Lỗi hệ thống', error.message);
    }
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
          Login User
        </Text>

        <Text style={{
          fontSize: 18,
          fontWeight: '500',
          color: 'white'
        }}>
          Shop your way!
        </Text>
      </View>


      <View style={{}}>
        <View style={{ marginTop: 30 }}>
          <View style={{ paddingHorizontal: 20 }}>
            <Text style={{
              fontSize: 28, fontWeight: 'bold',
              color: 'white'
            }}>
              Welcome back
            </Text>

            <Text style={{
              fontSize: 18,
              color: 'white'
            }}>
              Enter your account
            </Text>
          </View>
          <TextInput
            style={{
              backgroundColor: 'white',
              marginHorizontal: 20,
              paddingVertical: 15,
              borderRadius: 20,
              paddingHorizontal: 15,
              marginTop: 35,
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
              fontSize: 20,
            }}
            placeholder="Password"
            onChangeText={(password) => setPassword(password  )}
            autoCapitalize='none'
            autoCorrect={false}
            secureTextEntry={true} />
        </View>

        <View>
          < TouchableOpacity
            onPress={() => loginUser(email, password)}
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
              marginTop: 25
            }}>
            <Text style={{
              color: 'white', fontWeight: 'bold',
              fontSize: 20, paddingVertical: 15
            }}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity
            onPress={() => resetPassword(email) }
            style={{ marginTop: 20, marginHorizontal: 20 }}>
            <Text style={{ color: '#f24444', fontSize: 18, fontWeight: 'bold' }}>Fogot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Registration')}
            style={{ marginTop: 20, marginHorizontal: 20 }}>
            <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>Registration Here!!!</Text>
          </TouchableOpacity>
        </View>


      </View>
    </Background>
  )
}
export default Login;

const styles = StyleSheet.create({

})
