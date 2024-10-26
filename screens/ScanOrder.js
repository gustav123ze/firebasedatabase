// screens/ScanOrder.js
import React, { useState, useRef } from 'react';
import { Camera } from 'expo-camera/legacy';
import { StatusBar } from 'expo-status-bar';
import { Button, Text, TouchableOpacity, View, SafeAreaView, StyleSheet, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TextRecognition from 'react-native-text-recognition';

export default function ScanOrder({ navigation }) {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [loading, setLoading] = useState(false);
  const [scannedText, setScannedText] = useState("");
  const cameraRef = useRef(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  // Håndterer manglende tilladelser
  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>Vi har brug for din tilladelse til at vise kameraet</Text>
        <Button onPress={requestPermission} title="Giv tilladelse" />
      </View>
    );
  }

  // Skifter mellem front- og bagkamera
  const toggleCameraType = () => {
    setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back);
  };

  // Håndterer tekstgenkendelse
  const handleTextRecognition = async () => {
    if (!cameraRef.current) {
      console.log("Ingen kamerareference");
      return;
    }
    setLoading(true);
    try {
      const photo = await cameraRef.current.takePictureAsync();
      const text = await TextRecognition.recognize(photo.uri);
      setScannedText(text.join(" "));
    } catch (error) {
      console.error("Fejl ved genkendelse af tekst: ", error);
      setScannedText("Fejl ved scanning af tekst.");
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.safeview}>
      <View style={styles.container}>
        <Camera style={styles.camera} type={type} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.flipbtn} onPress={toggleCameraType}>
              <Ionicons name="camera-reverse-outline" size={32} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.scanbtn} onPress={handleTextRecognition}>
              <Text style={styles.text}>{loading ? "Scanning..." : "Scan Text"}</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
      {loading && <ActivityIndicator size="large" color="#fff" />}
      {scannedText ? <Text style={styles.resultText}>{scannedText}</Text> : null}
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    borderRadius: 20,
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 32,
    alignSelf: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'semibold',
    color: 'white',
    alignSelf: 'center',
  },
  scanbtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  flipbtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 100,
    padding: 5,
    alignSelf: 'baseline',
  },
  safeview: {
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  resultText: {
    color: 'white',
    fontSize: 16,
    padding: 20,
    textAlign: 'center',
  },
});
