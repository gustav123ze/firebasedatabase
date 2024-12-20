// root/app.js

import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { initializeApp, getApps } from 'firebase/app';
import React, { useState } from 'react';

import OrderList from './screens/OrderList';
import AddOrder from './screens/AddOrder';
import TruckView from './screens/TruckView';
import ConstraintsView from './screens/ConstraintsView';
import CargoConnectScreen from './screens/FirmorTruck';
import ScanOrder from './screens/ScanOrder';



// Firebase konfiguration fra .env-filen
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: "https://fir-database-ace30-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialiser Firebase, hvis det ikke allerede er gjort
if (getApps().length < 1) { 
  initializeApp(firebaseConfig);
  console.log("Firebase On!");
}


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={'Order List'} component={OrderList} options={{ headerShown: null }} />
      <Stack.Screen name={'Add Order'} component={AddOrder} options={{ headerShown: null }} />
      <Stack.Screen name={'Truck View'} component={TruckView} options={{ headerShown: null }} />
      <Stack.Screen name={'Constraints'} component={ConstraintsView} options={{ headerShown: null }} />
      <Stack.Screen name={'ScanOrder'} component={ScanOrder} options={{headerShown: false}} />
    </Stack.Navigator>
  );
};

const BottomNavigation = ({ userType, setUserType }) => {
  return (
    <Tab.Navigator>
      <Tab.Screen name={'Vælg type'}>
        {() => <CargoConnectScreen setUserType={setUserType} />}
      </Tab.Screen>
      {userType === 'driver' && (
        <>
          <Tab.Screen name={'Truck'} component={TruckView} options={{ tabBarIcon: () => (<Ionicons name="car" size={20} />) }} />
          <Tab.Screen name={'Begrænsninger'} component={ConstraintsView} options={{ tabBarIcon: () => (<Ionicons name="settings" size={20} />) }} />
        </>
      )}
      {userType === 'company' && (
        <>
          <Tab.Screen name={'Afhentninger'} component={StackNavigation} options={{ tabBarIcon: () => (<Ionicons name="basket" size={20} />) }} />
          <Tab.Screen name={'Tilføj'} component={AddOrder} options={{ tabBarIcon: () => (<Ionicons name="add" size={20} />) }} />
          <Tab.Screen name={'ScanOrder'} component={ScanOrder} options={{ tabBarIcon: () => (<Ionicons name="camera" size={20} />) }} />
        </>
      )}
    </Tab.Navigator>
  );
};

export default function App() {
  const [userType, setUserType] = useState(null); // Tilføj state til bruger type

  return (
    <NavigationContainer>
      <BottomNavigation userType={userType} setUserType={setUserType} />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
