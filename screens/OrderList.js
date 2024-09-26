//screen/OrderList.js

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';

const OrderList = ({ navigation }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const db = getDatabase();
        const ordersRef = ref(db, '/Orders/');

        const unsubscribe = onValue(ordersRef, (snapshot) => {
            const data = snapshot.val();
            const orderList = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
            setOrders(orderList);
            setLoading(false);
        }, (error) => {
            Alert.alert("Fejl", error.message);
            setLoading(false);
        });

        return () => unsubscribe(); // Clean up the listener on unmount
    }, []);

    const renderOrderItem = ({ item }) => (
        <View style={styles.orderItem}>
            <Text style={styles.orderText}>Ordre: {item.item}</Text>
            <Text style={styles.orderText}>Pickup Adresse: {item.pickupAddress}</Text>
            <Text style={styles.orderText}>Pickup Dato: {item.pickupDate}</Text>
            <Text style={styles.orderText}>Leverings Dato: {item.deliveryDate}</Text>
            <Text style={styles.orderText}>Leverings Adresse: {item.deliveryAddress}</Text>
            <Text style={styles.orderText}>Vægt: {item.weight}</Text>
            <Text style={styles.orderText}>Pris: {item.price}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={orders}
                    renderItem={renderOrderItem}
                    keyExtractor={item => item.id}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    orderItem: {
        marginBottom: 15,
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
    },
    orderText: {
        fontSize: 16,
    },
});

export default OrderList;
































// //screen/OrderList.js

// import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
// //import firebase from 'firebase/compat';
// import {useEffect, useState} from "react";
// import { getDatabase, ref, onValue } from "firebase/database";

// function CarList({navigation}){

//     const [cars,setCars] = useState()

//     useEffect(() => {
//         const db = getDatabase();
//         const carsRef = ref(db, "Cars");
    
//         // Use the 'onValue' function to listen for changes in the 'Cars' node
//         onValue(carsRef, (snapshot) => {
//             const data = snapshot.val();
//             if (data) {
//                 // If data exists, set it in the 'cars' state
//                 setCars(data);
//             }
//         });
    
//         // Clean up the listener when the component unmounts
//         return () => {
//             // Unsubscribe the listener
//             off(carsRef);
//         };
//     }, []); // The empty dependency array means this effect runs only once

//     // Vi viser ingenting hvis der ikke er data
//     if (!cars) {
//         return <Text>Loading...</Text>;
//     }

//     const handleSelectCar = id => {
//         /*Her søger vi direkte i vores array af biler og finder bil objektet som matcher idet vi har tilsendt*/
//         const car = Object.entries(cars).find( car => car[0] === id /*id*/)
//         navigation.navigate('Car Details', { car });
//     };
    
//     // Flatlist forventer et array. Derfor tager vi alle values fra vores cars objekt, og bruger som array til listen
//     const carArray = Object.values(cars);
//     const carKeys = Object.keys(cars);

//     return (
//         <FlatList
//             data={carArray}
//             // Vi bruger carKeys til at finde ID på den aktuelle bil og returnerer dette som key, og giver det med som ID til CarListItem
//             keyExtractor={(item, index) => carKeys[index]}
//             renderItem={({ item, index }) => {
//                 return(
//                     <TouchableOpacity style={styles.container} onPress={() => handleSelectCar(carKeys[index])}>
//                         <Text>
//                             {item.genstand} {item.pris}
//                         </Text>
//                     </TouchableOpacity>
//                 )
//             }}
//         />
//     );
// }

// export default CarList;


// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         borderWidth: 1,
//         borderRadius:10,
//         margin: 5,
//         padding: 5,
//         height: 50,
//         justifyContent:'center'
//     },
//     label: { fontWeight: 'bold' },
// });