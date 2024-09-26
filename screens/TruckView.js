// screens/TruckView.js

// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert } from 'react-native';
// import { getDatabase, ref, onValue } from "firebase/database";
// import MapView, { Marker } from 'react-native-maps';

// const TruckView = () => {
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [region, setRegion] = useState({
//         latitude: 56.2639, // Standard latitude (Danmark)
//         longitude: 9.5018, // Standard longitude (Danmark)
//         latitudeDelta: 10, // Zoom niveau
//         longitudeDelta: 10,
//     });

//     useEffect(() => {
//         const db = getDatabase();
//         const ordersRef = ref(db, 'Cars'); // Ændre til den korrekte sti til dine ordrer

//         const unsubscribe = onValue(ordersRef, (snapshot) => {
//             const data = snapshot.val();
//             if (data) {
//                 const orderList = Object.keys(data).map(key => ({ id: key, ...data[key] }));
//                 setOrders(orderList);

//                 // Opdater kortets region til den første ordre
//                 if (orderList.length > 0) {
//                     const firstOrder = orderList[0];
//                     // Antag at leveringsadresse kan konverteres til koordinater (her skal du muligvis bruge en geokodningsservice)
//                     setRegion({
//                         latitude: firstOrder.latitude || 56.2639, // Brug faktiske koordinater hvis tilgængelige
//                         longitude: firstOrder.longitude || 9.5018,
//                         latitudeDelta: 0.0922,
//                         longitudeDelta: 0.0421,
//                     });
//                 }
//             } else {
//                 Alert.alert("Ingen data", "Der blev ikke fundet nogen ordrer.");
//             }
//             setLoading(false);
//         }, (error) => {
//             console.error(error);
//             Alert.alert("Fejl", "Der opstod en fejl ved indlæsning af ordrer.");
//             setLoading(false);
//         });

//         // Ryd op ved at afmelde fra Firebase
//         return () => unsubscribe();
//     }, []);

//     if (loading) {
//         return <ActivityIndicator size="large" color="#0000ff" />;
//     }

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Ordrer</Text>

//             {/* Kort til at vise adresser */}
//             <MapView style={styles.map} region={region}>
//                 {orders.map((order) => (
//                     <Marker
//                         key={order.id}
//                         coordinate={{
//                             latitude: order.latitude || 56.2639, // Brug faktiske koordinater hvis tilgængelige
//                             longitude: order.longitude || 9.5018,
//                         }}
//                         title={order.genstand}
//                         description={order.afhentningsadresse} // Vis afhentningsadresse som beskrivelse
//                     />
//                 ))}
//             </MapView>

//             <FlatList
//                 data={orders}
//                 keyExtractor={item => item.id}
//                 renderItem={({ item }) => (
//                     <View style={styles.orderContainer}>
//                         <Text>{`Genstand: ${item.genstand}`}</Text>
//                         <Text>{`Afhentningsadresse: ${item.afhentningsadresse}`}</Text>
//                         <Text>{`Afhentningsdato: ${item.afhentningsdato}`}</Text>
//                         <Text>{`Leveringsdato: ${item.leveringsdato}`}</Text>
//                         <Text>{`Leveringsadresse: ${item.leveringsadresse}`}</Text>
//                         <Text>{`Vægt: ${item.vægt}`}</Text>
//                         <Text>{`Dimensioner: ${item.dimensioner}`}</Text>
//                         <Text>{`Pris: ${item.pris}`}</Text>
//                     </View>
//                 )}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 16,
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 16,
//     },
//     orderContainer: {
//         padding: 10,
//         marginVertical: 8,
//         backgroundColor: '#f9c2ff',
//         borderRadius: 5,
//     },
//     map: {
//         width: '100%',
//         height: 200, // Sæt højden på kortet
//         marginBottom: 16, // Afstand til listen
//     },
// });

// export default TruckView;



























import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert } from 'react-native';
import { getDatabase, ref, onValue } from "firebase/database";

const TruckView = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const db = getDatabase();
        const ordersRef = ref(db, 'Cars'); // Ændre til den korrekte sti til dine ordrer

        const unsubscribe = onValue(ordersRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const orderList = Object.keys(data).map(key => ({ id: key, ...data[key] }));
                setOrders(orderList);
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

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ordrer</Text>
            <FlatList
                data={orders}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.orderContainer}>
                        <Text>{`Genstand: ${item.genstand}`}</Text>
                        <Text>{`Afhentningsadresse: ${item.afhentningsadresse}`}</Text>
                        <Text>{`Afhentningsdato: ${item.afhentningsdato}`}</Text>
                        <Text>{`Leveringsdato: ${item.leveringsdato}`}</Text>
                        <Text>{`Leveringsadresse: ${item.leveringsadresse}`}</Text>
                        <Text>{`Vægt: ${item.vægt}`}</Text>
                        <Text>{`Dimensioner: ${item.dimensioner}`}</Text>
                        <Text>{`Pris: ${item.pris}`}</Text>
                    </View>
                )}
            />
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
    orderContainer: {
        padding: 10,
        marginVertical: 8,
        backgroundColor: '#f9c2ff',
        borderRadius: 5,
    },
});

export default TruckView;
  