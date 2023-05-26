import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Background from '../components/Background'
import { useNavigation } from '@react-navigation/native';

const Welcome = () => {
    const navigation = useNavigation();
    return (
        <Background>
            <View style={{ paddingHorizontal: 20, paddingVertical: 80 }}>
                <Text style={{ color: 'white', fontSize: 50, fontWeight: 'bold' }}>
                    AppStore
                </Text>

                <Text style={{ color: 'white', fontSize: 28 }}>
                    Welcome to App
                </Text>
            </View>

            <View>
                < TouchableOpacity
                    onPress={() => navigation.navigate('Registration')}
                    style={{
                        backgroundColor: '#538c51',
                        alignItems: 'center',
                        marginHorizontal: 50,
                        borderRadius: 50,
                        elevation: 25,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: 0.8,
                        shadowRadius: 10,
                    }}>
                    <Text style={{
                        color: 'white', fontWeight: 'bold',
                        fontSize: 20, paddingVertical: 15
                    }}>Registration</Text>
                </TouchableOpacity>
            </View>
            <View
                style={{
                    marginVertical: 20,
                    flexDirection: 'row',
                    marginHorizontal: 50,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>

                <View style={{
                    height: 2,
                    width: 100,
                    backgroundColor: 'white'
                }} />

                <Text style={{
                    color: 'white',
                    fontSize: 18,
                    paddingHorizontal: 10
                }}>or</Text>

                <View style={{
                    height: 2,
                    width: 100,
                    backgroundColor: 'white'
                }} />

            </View>

            <View>
                < TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                    style={{
                        backgroundColor: 'white',
                        alignItems: 'center',
                        marginHorizontal: 50,
                        borderRadius: 50,
                        elevation: 25,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: 0.8,
                        shadowRadius: 10,
                    }}>
                    <Text style={{
                        color: '#538c51', fontWeight: 'bold',
                        fontSize: 20, paddingVertical: 15
                    }}>Login</Text>
                </TouchableOpacity>
            </View>
        </Background >
    )
}

export default Welcome