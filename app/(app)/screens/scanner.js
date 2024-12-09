import { CameraView, CameraType, useCameraPermissions, launchScanner } from 'expo-camera';
import { useEffect, useState } from 'react';
import {themeColor} from '@/hooks/theme'
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const scanner = (props) => {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [header, setHeader] = useState('Scanning for barcodes.')

  useEffect(() => {
    const loadingCycle = ['Scanning for barcodes.', 'Scanning for barcodes..', 'Scanning for barcodes...'];
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % loadingCycle.length;
      setHeader(loadingCycle[index]);
    }, 500); 

    
    return () => clearInterval(interval);
  }, []);

  if (!permission) {
    // Camera permissions are still loading.
    return <View style={{backgroundColor: themeColor().secondary}} />;
  }

  

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={[styles.container, themeColor().secondary]}>
        <Text style={styles.message}>xTrack Needs Camera Permissions to Scan Barcodes</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }



  return (
    <View style={styles.container}>
      <CameraView barcodeScannerSettings={{barcodeTypes: ['ean13']}} onBarcodeScanned={(e) => {console.log(e.data)}}style={styles.camera} facing={facing}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>x</Text>
          </TouchableOpacity>
          
        </View>
        <View style={[styles.buttonContainer, {justifyContent: 'center'}]}>
          <Text style={styles.header}>{header}</Text>
        </View>
       
      </CameraView>
    </View>
  );
}
export default scanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 0,
  },
  button: {
    alignSelf: 'flex-start',
    alignItems: 'flex-end',

    marginLeft: 'auto',
    marginRight: 30,
    marginTop: 30,

    width: 50,
    height: 50,
  },
  text: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',

  },
  header: {
    fontFamily: 'JetBrainsMono',
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
    marginTop: 20
  }
});