import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { firebase } from '../config';

const FavoriteList = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favoritesRef = firebase.database().ref('favorites');
    favoritesRef.on('value', (snapshot) => {
      const favoritesList = [];
      snapshot.forEach((childSnapshot) => {
        const favorite = childSnapshot.val();
        favoritesList.push(favorite);
      });
      setFavorites(favoritesList);
    }, (error) => {
      console.error(error);
    });

    // Thoát khỏi component hoặc unmount component
    return () => {
      favoritesRef.off('value');
    };
  }, []);

  // const handleDelete = (id) => {
  //   const favoriteRef = firebase.database().ref('favorites').child(id);
  //   favoriteRef.remove()
  //     .then(() => {
  //       // Xóa thành công, cập nhật lại danh sách yêu thích
  //       const newFavorites = favorites.filter((item) => item.id !== id);
  //       setFavorites(newFavorites);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const handleDelete = (id) => {
    Alert.alert(
      'Xác nhận xóa sản phẩm',
      'Bạn có chắc muốn xóa sản phẩm này khỏi danh sách yêu thích không?',
      [
        { text: 'Cancel', onPress: () => { }, style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            const favoriteRef = firebase.database().ref('favorites/').child(id);
            console.log(id);
            favoriteRef.remove()
              .then(() => {
                // Xóa thành công, cập nhật lại danh sách yêu thích
                const newFavorites = favorites.filter((item) => item.id !== id);
                setFavorites(newFavorites);
              })
              .catch((error) => {
                console.log(error);
              });
          },
        },
      ],
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.favoriteItem}>
      <Image source={{ uri: item.image }} style={styles.favoriteImage} />
      <View style={styles.favoriteDetails}>
        <Text style={styles.favoriteName}>{item.name}</Text>
        <Text style={styles.favoritePrice}>{item.price}</Text>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
        <Text style={styles.deleteButtonText}>Xóa</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No favorites yet.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  favoriteItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
  },
  favoriteImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  favoriteDetails: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  favoriteName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  favoritePrice: {
    fontSize: 16,
    color: 'green',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'gray',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default FavoriteList;
