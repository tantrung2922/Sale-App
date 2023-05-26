
import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import ProductList from '../components/ProductList';

const Home = () => {

  return (

    <View style={styles.container}>

      <ProductList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginVertical: 40
  },
});

export default Home;