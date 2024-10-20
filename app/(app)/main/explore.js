import {View, Text, Pressable, ScrollView, Alert} from 'react-native'
import React from 'react'
import { StyleSheet } from "react-native";
import {themeColor} from '@/hooks/theme'
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Home() {
    const clearAsyncStorage = async() => {
        AsyncStorage.clear();
     }
     const showConfirmAlert = () => {
        Alert.alert(
          'Delete Storage Cache?',
          'This will permanently remove everything from your local device.',
          [
            {
              text: 'Cancel',
              onPress: () => {},
              style: 'cancel',
            },
            {
              text: 'Confirm',
              onPress: () => {clearAsyncStorage()},
            },
          ],
          { cancelable: false } 
        );
      };


    return (
        <ScrollView style={styles.container}>
            <View style={styles.pageContainer}>
                <View style={styles.itemContainer}>
                    
                </View>
                <View style={styles.itemContainer}>
                    
                </View>
                <View style={styles.itemContainer}>
                    
                </View>
                <View style={styles.itemContainer}>
                    
                </View>
                <View style={styles.itemContainer}>
                    
                </View>
                <Pressable style={{marginTop: 30}} onPress={showConfirmAlert}>
                    <Text style={styles.wipeButton}>Wipe Storage Cache</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: themeColor().primary,
    },
    pageContainer: {
        marginTop: 50,
        display: 'flex',
        alignItems: 'center',
    },
    itemContainer: {
        marginBottom: 6,
        display: 'flex',
        alignItems: 'center',

        backgroundColor: themeColor().secondary,
        width: 350,
        height: 90,
        borderRadius: 10,
    },
    headerContainer: {
        marginTop: 50,
        marginBottom: 10,
        backgroundColor: themeColor().secondary,
        width: 350,
        height: 100,
        borderRadius: 30,
        
    },
    macroContainer: {
        marginBottom: 10,
        backgroundColor: themeColor().secondary,
        width: 350,
        height: 200,
        borderRadius: 30,
    },
    foodContainer: {
        backgroundColor: themeColor().secondary,
        width: 350,
        height: 400,
        borderRadius: 30,
    },
    wipeButton: {
        color: 'red',
        fontFamily: 'JetBrainsMono',
        fontSize: 14,
        opacity: 0.6,

    }
})