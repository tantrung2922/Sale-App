import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image, Button } from 'react-native';
import { firebase } from '../config';
import * as ImagePicker from 'expo-image-picker';

const UpdateProduct = ({ route, navigation }) => {
    const { id, name: initialName, price: initialPrice, image: initialImage, description: initialDescription } = route.params;
    const [name, setName] = useState(initialName);
    const [price, setPrice] = useState(initialPrice);
    const [image, setImage] = useState(initialImage);
    const [description, setDescription] = useState(initialDescription);

    const handleUpdateProduct = () => {
        if (!name || !price || !image || !description) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        const productRef = firebase.database().ref('products/' + id);
        productRef.update({
            name,
            price,
            image,
            description,
        });
        navigation.goBack();
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.uri);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Name"
                value={name}
                onChangeText={setName}
                style={{
                    backgroundColor: 'white',
                    marginHorizontal: 20,
                    paddingVertical: 15,
                    borderRadius: 20,
                    paddingHorizontal: 15,
                    marginTop: 15,
                    fontSize: 20
                }}
            />
            <TextInput
                placeholder="Price"
                value={price}
                keyboardType={'numeric'}
                onChangeText={setPrice}
                style={{
                    backgroundColor: 'white',
                    marginHorizontal: 20,
                    paddingVertical: 15,
                    borderRadius: 20,
                    paddingHorizontal: 15,
                    marginTop: 15,
                    fontSize: 20
                }}
            />

            <TextInput
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                style={{
                    backgroundColor: 'white',
                    marginHorizontal: 20,
                    paddingVertical: 15,
                    borderRadius: 20,
                    paddingHorizontal: 15,
                    marginTop: 15,
                    fontSize: 20,
                    height: 200,
                    textAlignVertical: 'top'
                }}
            />


            <View style={{ flex: 1 }}>
                <TouchableOpacity
                    onPress={pickImage}
                    style={{
                        backgroundColor: '#f24444',
                        alignItems: 'center',
                        marginHorizontal: 80,
                        borderRadius: 20,
                        elevation: 25,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: 0.8,
                        shadowRadius: 10,
                        marginTop: 15,
                        marginBottom: 5,
                    }}>
                    <Text style={{
                        color: 'white', fontWeight: 'bold',
                        fontSize: 20, paddingVertical: 15,
                    }}>Chọn ảnh từ thư viện</Text>
                </TouchableOpacity>
                {image && <Image source={{ uri: image }} style={{ flex: 1, marginHorizontal: 20, borderRadius: 20 }} />}
            </View>

            <TouchableOpacity onPress={handleUpdateProduct} style={{
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
                }}>Update Product</Text>
            </TouchableOpacity>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default UpdateProduct;