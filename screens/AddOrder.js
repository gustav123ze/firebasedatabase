import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { getDatabase, ref, push } from 'firebase/database';

const AddOrder = ({ navigation }) => {
    const db = getDatabase();

    const [orderDetails, setOrderDetails] = useState({
        item: '',
        pickupAddress: '',
        pickupDate: '',
        deliveryDate: '',
        deliveryAddress: '',
        weight: '',
        price: ''
    });

    const handleSave = async () => {
        const { item, pickupAddress, pickupDate, deliveryDate, deliveryAddress, weight, price } = orderDetails;

        if (!item || !pickupAddress || !pickupDate || !deliveryDate || !deliveryAddress || !weight || !price) {
            return Alert.alert('Et af felterne er tomme!');
        }

        const ordersRef = ref(db, '/Orders/');
        const newOrder = { item, pickupAddress, pickupDate, deliveryDate, deliveryAddress, weight, price };

        await push(ordersRef, newOrder)
            .then(() => {
                Alert.alert("Ordre gemt!");
                setOrderDetails({
                    item: '',
                    pickupAddress: '',
                    pickupDate: '',
                    deliveryDate: '',
                    deliveryAddress: '',
                    weight: '',
                    price: ''
                });
                navigation.goBack(); // Naviger tilbage til forrige skærm
            })
            .catch((error) => {
                console.error(`Fejl: ${error.message}`);
            });
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text style={styles.title}>Tilføj Ordre</Text>
                {Object.keys(orderDetails).map((key, index) => (
                    <View key={index} style={styles.inputContainer}>
                        <Text style={styles.label}>{key.replace(/([A-Z])/g, ' $1').charAt(0).toUpperCase() + key.slice(1)}:</Text>
                        <TextInput
                            style={styles.input}
                            value={orderDetails[key]}
                            onChangeText={(value) => setOrderDetails({ ...orderDetails, [key]: value })}
                            placeholder={`Indtast ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                            keyboardType={key === 'weight' || key === 'price' ? 'numeric' : 'default'} // Numeriske tastaturer for vægt og pris
                        />
                    </View>
                ))}
                <Button title="Gem Ordre" onPress={handleSave} color="#2F67B2" />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f8ff', // Lys baggrund
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#2F67B2', // Farve til titlen
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
});

export default AddOrder;
