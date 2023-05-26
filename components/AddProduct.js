import React, { useEffect, useState } from 'react';
import { TextInput, Button, Image, View, TouchableOpacity, Text, Alert } from 'react-native';
import { firebase } from '../config';
import uuid from 'react-native-uuid';
import * as ImagePicker from 'expo-image-picker';

const AddProduct = () => {
  const uid = uuid.v4();
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');

  useEffect(() => {
    (async () => {
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      path: 'image',
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      console.log(uri);
      setImage(uri);
    }
  };

  if (hasGalleryPermission === false) {
    return <Text>No access to Internal Storage</Text>;
  }

  const addProduct = () => {
    if (!name || !price || !image || !description) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin')
      return;
    }

    firebase.database().ref('products').push({
      id: uid,
      name: name,
      price: price,
      image: image,
      description: description,
    });
    setName('');
    setPrice('');
    setImage(null);
    setDescription('');
  };

  return (
    <>
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
        placeholder="Product Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
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
        placeholder="Product Price"
        keyboardType={'numeric'}
        value={price}
        onChangeText={(text) => setPrice(text)}
      />

      <TextInput
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
        placeholder="Product Description"
        value={description}
        onChangeText={(text) => setDescription(text)}
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
          {image && <Image source={{ uri: image }} style={{ flex: 1, marginHorizontal: 20, borderRadius: 20}} />}
      </View>

      {/* <View style={{flex:1,justifyContent: 'center' , marginHorizontal: 20}}>
        <Button title="Pick Image" onPress={pickImage} style = {{}} />
        {image && <Image source={{ uri: image }} style={{ flex: 1 / 2, marginTop: 20 }} />}
      </View> */}
      <TouchableOpacity
        onPress={addProduct}
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
        }}>Thêm sản phẩm</Text>
      </TouchableOpacity>

    </>
  );
};

export default AddProduct;
