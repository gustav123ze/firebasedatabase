//screens/AddOrder.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView, SafeAreaView } from 'react-native';
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
            })
            .catch((error) => {
                console.error(`Error: ${error.message}`);
            });
    };

    return (
        <SafeAreaView>
            <ScrollView>
                {Object.keys(orderDetails).map((key, index) => (
                    <View key={index}>
                        <Text>{key}</Text>
                        <TextInput
                            value={orderDetails[key]}
                            onChangeText={(value) => setOrderDetails({ ...orderDetails, [key]: value })}
                        />
                    </View>
                ))}
                <Button title="Add Order" onPress={handleSave} />
            </ScrollView>
        </SafeAreaView>
    );
};

export default AddOrder;
