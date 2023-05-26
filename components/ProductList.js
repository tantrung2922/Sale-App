import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, ActivityIndicator } from 'react-native';
import { firebase } from '../config';
import ProductItem from './ProductItem';

const ProductList = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productsRef = firebase.database().ref('products');
    productsRef.on('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const productList = Object.keys(data).map((key) => ({
          ...data[key],
          id: key,
        }));
        setProducts(productList);
      }
      setLoading(false);
    });
  }, []);

  const renderProductItem = ({ item }) => {
    return (
      <ProductItem
        id={item.id}
        name={item.name}
        price={item.price}
        image={item.image}
        description={item.description}
      />
    );
  };

  const renderHeader = () => {
    if (loading) {
      return (
        <View style={{ padding: 10 }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      return null;
    }
  };

  const renderFooter = () => {
    if (loading && products.length > 0) {
      return (
        <View style={{ padding: 10 }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      return null;
    }
  };

  const renderEmpty = () => {
    if (!loading && products.length === 0) {
      return (
        <View style={{ padding: 10 }}>
          <Text>No products found</Text>
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <FlatList
      data={products}
      renderItem={renderProductItem}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={renderEmpty}
    />
  );
};

export default ProductList;
