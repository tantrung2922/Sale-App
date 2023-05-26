import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { firebase } from '../config';
import { useNavigation } from '@react-navigation/native';
import ProductsDeltail from './ProductsDeltail';

const ProductItem = ({ id, name, price, image, description }) => {
  const navigation = useNavigation();
  const [favorites, setFavorites] = useState([]);
  const handleDeleteProduct = () => {
    Alert.alert(
      'Xác nhận xóa sản phẩm',
      'Bạn có chắc muốn xóa sản phẩm này không?',
      [
        { text: 'Cancel', onPress: () => { }, style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            const productRef = firebase.database().ref('products/' + id);
            productRef.remove();
          },
        },
      ],
    );
  };

  const handleAddToFavorites = async () => {
    // Kiểm tra xem biến "favorites" đã được khởi tạo hay chưa
    if (!favorites) {
      Alert.alert('Vui lòng đợi cho danh sách yêu thích được tải');
      return;
    }
    // Kiểm tra sản phẩm đã được thêm vào danh sách yêu thích trước đó chưa
    const snapshot = await firebase.database().ref('favorites').orderByChild('id').equalTo(id).once('value');
    if (snapshot.exists()) {
      Alert.alert('Sản phẩm đã có trong danh sách yêu thích');
    } else {
      const newFavorite = {
        id,
        name,
        price,
        image,
        description,
      };
      firebase.database().ref('favorites').push(newFavorite);
      Alert.alert('Thông báo', 'Đã thêm sản phẩm vào danh sách yêu thích');
    }
  }
  const handleEditProduct = () => {
    navigation.navigate('UpdateProduct', {
      id,
      name,
      price,
      image,
      description,
    });
  };

  const handleShowProductDetails = () => {
    navigation.navigate('ProductsDeltail', {
      id,
      name,
      price,
      image,
      description,
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleShowProductDetails}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>{price}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={{ flexDirection: 'column' }}>
        <TouchableOpacity onPress={handleEditProduct} style={{ marginTop: 20 }}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
  
        <TouchableOpacity onPress={handleDeleteProduct} style={{ marginTop: 20 }}>
          <Text style={styles.buttonText}>Remove</Text>
        </TouchableOpacity>
  
        <TouchableOpacity onPress={handleAddToFavorites} style={{ marginTop: 20 }}>
          <Text style={styles.buttonText}>Add to favorites</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: 'green',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
  },
});

export default ProductItem;
