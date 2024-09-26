import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, TouchableOpacity, Button, Linking } from 'react-native';
import { getDatabase, ref, onValue } from "firebase/database";

const TruckView = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [routeDetails, setRouteDetails] = useState({ totalEarnings: 0, totalOrders: 0 });
    const [isRouteVisible, setIsRouteVisible] = useState(false); // For at styre synlighed af ruten

    useEffect(() => {
        const db = getDatabase();
        const ordersRef = ref(db, 'Orders'); // Ændre til den korrekte sti til dine ordrer

        const unsubscribe = onValue(ordersRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const orderList = Object.keys(data).map(key => ({ id: key, ...data[key] }));
                setOrders(orderList);

                // Beregn samlede indtjening og antal ordrer
                const totalEarnings = orderList.reduce((acc, order) => acc + parseFloat(order.price || 0), 0);
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

    const openGoogleMaps = () => {
        if (orders.length === 0) {
            Alert.alert("Ingen ordrer", "Der er ingen ordrer at rute.");
            return;
        }

        // Angiv startpunkt som det første afhentningssted
        const startPoint = orders[0].pickupAddress;

        // Saml unikke adresser for leveringsstederne
        const destinationsSet = new Set(orders.map(order => order.deliveryAddress));
        const destinations = Array.from(destinationsSet).join('|'); // Brug '|' til at separere adresserne

        // Opret URL'en til Google Maps
        const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(startPoint)}&destination=${encodeURIComponent(destinations)}&waypoints=${encodeURIComponent(Array.from(destinationsSet).join('|'))}`;

        Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
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
                            <Text>{`Genstand: ${item.item}`}</Text>
                            <Text>{`Afhentningsadresse: ${item.deliveryAddress}`}</Text>
                            <Text>{`Afhentningsdato: ${item.pickupDate}`}</Text>
                            <Text>{`Leveringsdato: ${item.deliveryDate}`}</Text>
                            <Text>{`Leveringsadresse: ${item.pickupAddress}`}</Text>
                            <Text>{`Vægt: ${item.weight}`}</Text>
                            <Text>{`Pris: ${item.price}`}</Text>
                        </View>
                    ))}
                    {/* Knappen til at åbne Google Maps */}
                    <Button title="Åben rute i Maps" onPress={openGoogleMaps} />
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



 