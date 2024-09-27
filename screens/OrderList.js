import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';

// Funktion til at konvertere dato fra "DD-MM-YYYY" til et Date-objekt
const parseDate = (dateString) => {
    const parts = dateString.split("-");
    return new Date(parts[2], parts[1] - 1, parts[0]); // år, måned (0-baseret), dag
};

const OrderList = ({ navigation }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const db = getDatabase();
        const ordersRef = ref(db, '/Orders/');

        const unsubscribe = onValue(ordersRef, (snapshot) => {
            const data = snapshot.val();
            const orderList = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];

            // Filtrere ordrer for at inkludere kun dem fra i går eller frem
            //den viser kun ordrer fra i dag og frem, selvom det ser ud til at være fra i går og frem i koden. 
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1); // Sætter datoen til i går

            const filteredOrders = orderList.filter(order => {
                const orderDate = parseDate(order.pickupDate);
                return orderDate >= yesterday; // Sammenlign med i går
            });

            setOrders(filteredOrders);
            setLoading(false);
        }, (error) => {
            Alert.alert("Fejl", error.message);
            setLoading(false);
        });

        return () => unsubscribe(); // Ryd op ved at afmelde fra Firebase
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
