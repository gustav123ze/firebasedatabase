// screens/ConstraintsView.js

import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { getDatabase, ref, set, onValue, remove } from "firebase/database";
import { Calendar } from 'react-native-calendars';


const ConstraintsView = () => { 
    const [truckSize, setTruckSize] = useState('');
    const [minWage, setMinWage] = useState('');
    const [availableDates, setAvailableDates] = useState('');
    const [markedDates, setMarkedDates] = useState({});
    const [selectedDatesCount, setSelectedDatesCount] = useState(0);

    useEffect(() => {
        const db = getDatabase();
        const constraintsRef = ref(db, 'Constraints');

        const unsubscribe = onValue(constraintsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setTruckSize(data.truckSize || '');
                setMinWage(data.minWage || '');
                setAvailableDates(data.availableDates || '');

                // Opdater marked dates fra databasen
                const datesArray = data.availableDates.split(' - ').filter(date => date); // Filtrer tomme værdier
                const newMarkedDates = {};
                datesArray.forEach(date => {
                    newMarkedDates[date] = { selected: true, marked: true };
                });
                setMarkedDates(newMarkedDates);
                setSelectedDatesCount(datesArray.length); // Opdater antallet af valgte datoer
            }
        });

        return () => unsubscribe();
    }, []);

    const formatDateString = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const onDayPress = (day) => {
        const selectedDate = day.dateString;
        const newMarkedDates = { ...markedDates };

        // Hvis datoen allerede er valgt, fjern den
        if (newMarkedDates[selectedDate]) {
            delete newMarkedDates[selectedDate];
            setSelectedDatesCount(selectedDatesCount - 1); // Reducer tælleren
        } else {
            // Hvis færre end 2 datoer er valgt, tilføj den
            if (selectedDatesCount < 2) {
                newMarkedDates[selectedDate] = { selected: true, marked: true };
                setSelectedDatesCount(selectedDatesCount + 1); // Forøg tælleren
            } else {
                Alert.alert("Begrænsning", "Du kan kun vælge to datoer."); // Vis advarsel
                return; // Stop hvis grænsen er nået
            }
        }

        setMarkedDates(newMarkedDates);

        // Opdater tilgængelige datoer
        const selectedDatesArray = Object.keys(newMarkedDates);
        if (selectedDatesArray.length > 0) {
            // Sorter datoerne
            selectedDatesArray.sort();
            const formattedDates = selectedDatesArray.map(date => formatDateString(new Date(date))).join(' - '); // Opdater formatet til dd-mm-yyyy
            setAvailableDates(formattedDates);
        } else {
            setAvailableDates(''); // Ryd hvis ingen datoer er valgt
        }
    };

    const saveConstraints = () => {
        const db = getDatabase();
        const constraintsRef = ref(db, 'Constraints');

        set(constraintsRef, {
            truckSize,
            minWage,
            availableDates,
        })
        .then(() => Alert.alert("Success", "Constraints saved successfully"))
        .catch(error => Alert.alert("Error", error.message));
    };


    const deleteConstraints = () => {
        const db = getDatabase();
        const constraintsRef = ref(db, 'Constraints');
    
        remove(constraintsRef)
            .then(() => {
                setTruckSize('');
                setMinWage('');
                setAvailableDates('');
                setMarkedDates({});
                setSelectedDatesCount(0);
                Alert.alert("Success", "Constraints deleted successfully");
            })
            .catch(error => Alert.alert("Error", error.message));
    };
    








    return (
        <View style={styles.container}>
            <Text style={styles.title}>Indtast begrænsninger</Text>
            <TextInput
                style={styles.input}
                placeholder="Max vægt på lastbil"
                value={truckSize}
                onChangeText={setTruckSize}
            />
            <TextInput
                style={styles.input}
                placeholder="Mindstekrav til løn"
                value={minWage}
                onChangeText={setMinWage}
            />
            <TextInput
                style={styles.input}
                placeholder="Datoer hvor man kan arbejde"
                value={availableDates}
                editable={false} // Gør inputfeltet ikke-redigerbart
            />
            <Calendar
                markedDates={markedDates}
                onDayPress={onDayPress}
                style={styles.calendar}
                theme={{
                    selectedDayBackgroundColor: '#00adf5',
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: '#00adf5',
                    dayTextColor: '#2d4150',
                    textDisabledColor: '#d9e1e8',
                }}
            />
            <Button title="Gem begrænsninger" onPress={saveConstraints} />
            <Button title="Slet begrænsninger" onPress={deleteConstraints} color="red" />
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
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 10,
    },
    calendar: {
        marginBottom: 16,
    },
});

export default ConstraintsView;
