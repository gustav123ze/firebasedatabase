import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { initializeApp, getApps } from 'firebase/app';

import CarList from './screens/OrderList';
import CarDetails from './screens/OrderDetails';
import Add_edit_Car from './screens/Add_edit_Order';
import TruckView from './screens/TruckView'; 



//Firebase konfiguration fra .env-filen
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
      <Stack.Screen name={'Order List'} component={CarList} options={{ headerShown: null }} />
      <Stack.Screen name={'Order Details'} component={CarDetails} options={{ headerShown: null }} />
      <Stack.Screen name={'Edit Order'} component={Add_edit_Car} options={{ headerShown: null }} />
      <Stack.Screen name={'Truck View'} component={TruckView} options={{ headerShown: null }} />
    </Stack.Navigator>
  );
};

const BottomNavigation = () => { 
  return (
    <Tab.Navigator>
      <Tab.Screen name={'Home'} component={StackNavigation} options={{ tabBarIcon: () => ( <Ionicons name="home" size={20} /> )}} />
      <Tab.Screen name={'Add'} component={Add_edit_Car} options={{ tabBarIcon: () => ( <Ionicons name="add" size={20} /> )}} />
      <Tab.Screen name={'Truck'} component={TruckView} options={{ tabBarIcon: () => ( <Ionicons name="car" size={20} /> )}} />           
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <BottomNavigation />
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
