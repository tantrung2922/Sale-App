import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { firebase } from './config';

import Login from "./src/Login";
import Registration from "./src/Registration";
import Dashboard from "./src/Dashboard";
import Home from "./src/Home";
import AddProduct from "./components/AddProduct";
import UpdateProduct from "./components/UpdateProduct";
import Welcome from "./src/Welcome";
import FavoriteList from "./components/FavoriteList";
import ProductsDeltail from "./components/ProductsDeltail";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Trang chủ') {
            iconName = 'home';
          } else if (route.name === 'Thông tin người dùng') {
            iconName = 'dashboard';
          } else if (route.name === 'Thêm sản phẩm') {
            iconName = 'add-circle';
          } else if (route.name === 'Sản phẩm yêu thích') {
            iconName = 'favorite';
          }

          // You can return any component that you like here!
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#026efd',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          display: 'flex',
        },
      })}
    >
      <Tab.Screen name="Trang chủ" component={Home} />
      <Tab.Screen name="Thông tin người dùng" component={Dashboard} />
      <Tab.Screen name="Thêm sản phẩm" component={AddProduct} />
      <Tab.Screen name="Sản phẩm yêu thích" component={FavoriteList} />
    </Tab.Navigator>
  );
}

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            headerShown: false
          }} />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false
          }} />

        <Stack.Screen
          name="Registration"
          component={Registration}
          options={{
            headerShown: false
          }} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeTabs}
        options={{
          headerShown: false
        }} />
      <Stack.Screen
        name="UpdateProduct"
        component={UpdateProduct}
        options={{
          headerShown: false
        }} />

      <Stack.Screen
        name="FavoriteList"
        component={FavoriteList}
        options={{
          headerShown: false
        }} />

      <Stack.Screen
        name="ProductsDeltail"
        component={ProductsDeltail} />
    </Stack.Navigator>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
}
