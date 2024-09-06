import {View, Text, Button, ScrollView} from 'react-native'
import {auth} from '@/firebase'
import {router} from 'expo-router'
import React from 'react'
import { StyleSheet } from "react-native";
import {themeColor} from '@/hooks/theme'

export default function Home() {

    const handleSignOut = () => {
        auth
        .signOut()
        .then(() => {
            router.push('/')
        })
        .catch(error => console.log(error.message))
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.pageContainer}>
                <View style={styles.headerContainer}>



                </View>
                <View style={styles.macroContainer}>


                </View>
                <View style={styles.foodContainer}>


                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: themeColor().primary,
    },
    pageContainer: {
        display: 'flex',
        alignItems: 'center',
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
    }
})