import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, TouchableOpacity, Button, Linking } from 'react-native';
import { getDatabase, ref, onValue } from "firebase/database";

// Funktion til at konvertere dato fra "DD-MM-YYYY" til et Date-objekt
const parseDate = (dateString) => {
    const parts = dateString.split("-");
    return new Date(parts[2], parts[1] - 1, parts[0]); // år, måned (0-baseret), dag
};

const TruckView = () => {
    const [routeDetails, setRouteDetails] = useState([]); // Ændret til at være en liste af ruter
    const [loading, setLoading] = useState(true);
    const [expandedRouteIndex, setExpandedRouteIndex] = useState(null); // Tilstand til at styre, hvilken rute der er foldet ud

    useEffect(() => {
        const db = getDatabase();
        const ordersRef = ref(db, 'Orders'); // Ændre til den korrekte sti til dine ordrer

        const unsubscribe = onValue(ordersRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const orderList = Object.keys(data).map(key => ({ id: key, ...data[key] }));

                // Filtrere ordrer for at inkludere kun dem fra i dag eller frem
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1); // Sætter datoen til i går

                const filteredOrders = orderList.filter(order => {
                    const orderDate = parseDate(order.pickupDate);
                    return orderDate >= yesterday; // Sammenlign med i går
                });

                // Gruppere ordrer efter dato
                const routesMap = {};
                filteredOrders.forEach(order => {
                    const orderDate = order.pickupDate;
                    if (!routesMap[orderDate]) {
                        routesMap[orderDate] = { totalEarnings: 0, totalOrders: 0, orders: [] };
                    }
                    routesMap[orderDate].totalEarnings += parseFloat(order.price || 0);
                    routesMap[orderDate].totalOrders += 1;
                    routesMap[orderDate].orders.push(order);
                });

                // Konvertere til en liste for at bruge i render
                const routesArray = Object.entries(routesMap).map(([date, details]) => ({
                    date,
                    ...details,
                }));

                setRouteDetails(routesArray);
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

    const toggleRouteVisibility = (index) => {
        // Hvis den klikkede rute allerede er åben, lukkes den. Ellers åbnes den.
        setExpandedRouteIndex(expandedRouteIndex === index ? null : index);
    };

    const openGoogleMaps = (orders) => {
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

            {/* Vis ruter */}
            {routeDetails.map((route, index) => (
                <TouchableOpacity key={index} style={styles.routeContainer} onPress={() => toggleRouteVisibility(index)}>
                    <Text style={styles.routeText}>{`Rute for ${route.date}: ${route.totalOrders} ordrer`}</Text>
                    <Text style={styles.routeText}>{`Samlet indtjening: ${route.totalEarnings.toFixed(2)} DKK`}</Text>

                    {/* Vis ordrene, hvis den aktuelle rute er synlig */}
                    {expandedRouteIndex === index && (
                        <View>
                            {route.orders.map((item) => (
                                <View key={item.id} style={styles.orderContainer}>
                                    <Text>{`Genstand: ${item.item}`}</Text>
                                    <Text>{`Afhentningsadresse: ${item.pickupAddress}`}</Text>
                                    <Text>{`Afhentningsdato: ${item.pickupDate}`}</Text>
                                    <Text>{`Leveringsdato: ${item.deliveryDate}`}</Text>
                                    <Text>{`Leveringsadresse: ${item.deliveryAddress}`}</Text>
                                    <Text>{`Vægt: ${item.weight}`}</Text>
                                    <Text>{`Pris: ${item.price}`}</Text>
                                </View>
                            ))}
                            {/* Knappen til at åbne Google Maps */}
                            <Button title="Åben rute i Maps" onPress={() => openGoogleMaps(route.orders)} />
                        </View>
                    )}
                </TouchableOpacity>
            ))}
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
