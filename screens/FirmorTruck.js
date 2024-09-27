import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CargoConnectScreen = ({ setUserType }) => {
  
  const handleSelectDriver = () => {
    setUserType('driver');
  };

  const handleSelectCompany = () => {
    setUserType('company');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image 
          source={require('../assets/logo.png')} 
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>CargoConnect</Text>
          <Text style={styles.text}>Optimize routes, Maximize profits</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSelectDriver}>
          <Ionicons name="car" size={50} color="#2F67B2" />
          <Text style={styles.buttonText}>Chauffør</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleSelectCompany}>
          <Ionicons name="briefcase" size={50} color="#2F67B2" />
          <Text style={styles.buttonText}>Virksomhed</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2F67B2',
  },
  text: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#555',
  },
  buttonContainer: {
    flexDirection: 'row', // Sætter knapperne ved siden af hinanden
    marginTop: 20,
    width: '80%',
    justifyContent: 'space-around', // Giver plads mellem knapperne
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    marginTop: 5, // Plads mellem ikonet og teksten
    fontSize: 16,
    color: '#2F67B2',
  },
});

export default CargoConnectScreen;
