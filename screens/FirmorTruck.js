import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const CargoConnectScreen = () => {
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue', // Lys baggrund
  },
  headerContainer: {
    flexDirection: 'row', // Gør det muligt at placere billede og tekst ved siden af hinanden
    alignItems: 'center', // Centrerer vertikalt
  },
  image: {
    width: 100, // Juster bredde på billedet
    height: 100, // Juster højde på billedet
    marginRight: 10, // Plads mellem billede og tekst
  },
  textContainer: {
    alignItems: 'center', // Centrerer teksten
  },
  title: {
    fontSize: 32, // Størrelse på overskriften
    fontWeight: 'bold',
    color: '#4682b4', // Farve på teksten
  },
  text: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#555', // Farve på teksten
  },
});

export default CargoConnectScreen;
