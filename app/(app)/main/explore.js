import {View, Text, Button, ScrollView} from 'react-native'
import React from 'react'
import { StyleSheet } from "react-native";
import {themeColor} from '@/hooks/theme'

export default function Home() {


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
    }
})