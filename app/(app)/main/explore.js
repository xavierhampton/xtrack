import {View, Text, Pressable, ScrollView} from 'react-native'
import React from 'react'
import { StyleSheet } from "react-native";
import {themeColor} from '@/hooks/theme'
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';



export default function Home() {
    const clearAsyncStorage = async() => {
        AsyncStorage.clear();
     }
     


    return (
        <ScrollView style={styles.container}>
            <View style={styles.pageContainer}>
                <Pressable onPress={() => {router.push('screens/account')}} style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }]}>
                    <View style={styles.itemContainer}>
                        <MaterialCommunityIcons style={styles.icon} name="account" size={30} color="white" />
                        <Text style={styles.title}>Account</Text>
                    </View>
                </Pressable>
                <Pressable onPress={() => {router.push('screens/targets')}} style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }]}>
                    <View style={styles.itemContainer}>
                        <MaterialCommunityIcons style={styles.icon} name="target" size={30} color="white" />
                        <Text style={styles.title}>Daily Targets</Text>
                    </View>
                </Pressable>
                <Pressable onPress={() => {router.push('screens/dev_options')}} style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }]}>
                    <View style={styles.itemContainer}>
                        <MaterialIcons style={styles.icon} name="code" size={30} color="white" />
                        <Text style={styles.title}>Developer Options</Text>
                    </View>
                </Pressable>
            
                
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: themeColor().primary,
    },
    title: {
        fontFamily: 'JetBrainsMono',
        fontSize: 20,
        color: 'white',
        marginLeft: 15,
    },
    icon: {
        marginLeft: 10,
    },
    pageContainer: {
        marginTop: 50,
        display: 'flex',
        alignItems: 'center',
    },
    itemContainer: {
        marginBottom: 6,
        display: 'flex',
        flexDirection: 'row',
        
        alignItems: 'center',

        backgroundColor: themeColor().secondary,
        width: 350,
        height: 80,
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
    
})