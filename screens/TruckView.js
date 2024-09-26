// screens/TruckView.js

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { getDatabase, ref, onValue } from "firebase/database";

const TruckView = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [routeDetails, setRouteDetails] = useState({ totalEarnings: 0, totalOrders: 0 });
    const [isRouteVisible, setIsRouteVisible] = useState(false); // For at styre synlighed af ruten

    useEffect(() => {
        const db = getDatabase();
        const ordersRef = ref(db, 'Cars'); // Ændre til den korrekte sti til dine ordrer

        const unsubscribe = onValue(ordersRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const orderList = Object.keys(data).map(key => ({ id: key, ...data[key] }));
                setOrders(orderList);

                // Beregn samlede indtjening og antal ordrer
                const totalEarnings = orderList.reduce((acc, order) => acc + parseFloat(order.pris || 0), 0);
                const totalOrders = orderList.length;
                setRouteDetails({ totalEarnings, totalOrders });
            } else {
                Alert.alert("Ingen data", "Der blev ikke fundet nogen ordrer.");
            }
            setLoading(false);
        }, (error) => {
            console.error(error);
            Alert.alert("Fejl", "Der opstod en fejl ved indlæsning af ordrer.");
            setLoading(false);
        });

        // Ryd op ved at afmelde fra Firebase
        return () => unsubscribe();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    const toggleRouteVisibility = () => {
        setIsRouteVisible(!isRouteVisible);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ledige ruter</Text>

            {/* Vis ruten */}
            <TouchableOpacity style={styles.routeContainer} onPress={toggleRouteVisibility}>
                <Text style={styles.routeText}>{`Rute: ${routeDetails.totalOrders} ordrer`}</Text>
                <Text style={styles.routeText}>{`Samlet indtjening: ${routeDetails.totalEarnings.toFixed(2)} DKK`}</Text>
            </TouchableOpacity>

            {/* Vis ordrene, hvis ruten er synlig */}
            {isRouteVisible && (
                <View>
                    {orders.map((item) => (
                        <View key={item.id} style={styles.orderContainer}>
                            <Text>{`Genstand: ${item.genstand}`}</Text>
                            <Text>{`Afhentningsadresse: ${item.afhentningsadresse}`}</Text>
                            <Text>{`Afhentningsdato: ${item.afhentningsdato}`}</Text>
                            <Text>{`Leveringsdato: ${item.leveringsdato}`}</Text>
                            <Text>{`Leveringsadresse: ${item.leveringsadresse}`}</Text>
                            <Text>{`Vægt: ${item.vægt}`}</Text>
                            <Text>{`Dimensioner: ${item.dimensioner}`}</Text>
                            <Text>{`Pris: ${item.pris}`}</Text>
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    routeContainer: {
        padding: 15,
        backgroundColor: '#d1e7dd',
        borderRadius: 5,
        marginBottom: 16,
    },
    routeText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    orderContainer: {
        padding: 10,
        marginVertical: 8,
        backgroundColor: '#f9c2ff',
        borderRadius: 5,
    },
});

export default TruckView;
