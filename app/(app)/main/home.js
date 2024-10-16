import {View, Text, Pressable, ScrollView} from 'react-native'
import {auth} from '@/firebase'
import {router} from 'expo-router'
import React, {Component, useDebugValue, useEffect, useState} from 'react'
import { StyleSheet } from "react-native";
import {themeColor} from '@/hooks/theme'
import { Circle, Bar } from 'react-native-progress';
import {LinearGradient} from 'expo-linear-gradient';
import Feather from '@expo/vector-icons/Feather';
import MaskedView from '@react-native-masked-view/masked-view'
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Food from '@/components/food'

export default function Home() {

    const [data, setData] = useState(new Date())

    const storeFoods = async (value) => {
        try {
          const jsonValue = JSON.stringify(value);
          await AsyncStorage.setItem('1/20/2024', jsonValue);
        } catch (e) {
          return
        }
      };

      const [foodArr, setFoodArr] = useState({})

    const fetchFoods = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(String(data.getMonth()) + '/' + String(data.getDate()) + '/' + String(data.getFullYear()));
            return setFoodArr(jsonValue != null ? JSON.parse(jsonValue) : null)          } catch (e) {
            console.log('fetch error')
            return
          }
          
        };

        useEffect(() => {
            fetchFoods()
        }, [data])
        

    const handleSignOut = () => {
        auth
        .signOut()
        .then(() => {
            router.push('/')
        })
        .catch(error => console.log(error.message))
    }

    const getDailyFood = (foodArr) => {
        if (!foodArr) {
            return (<View><Text style={styles.emptyText}>This is where your food will display. Add food below to get started.</Text>
            <Text style={styles.emptyDesign}>|</Text>
            <Text style={styles.emptyDesign}>|</Text>
            <Text style={styles.emptyDesign}>|</Text>
            <Text style={styles.emptyDesign}>|</Text>
            <Text style={styles.emptyDesign}>|</Text>
            <Text style={styles.emptyDesign}>|</Text>
            <Text style={styles.emptyDesign}>|</Text>
            <Text style={styles.emptyDesign}>V</Text></View>)
        }
        const arr = []
        for (let i = 0; i < foodArr.length; i++) {
            arr.push(<Food key={i} name={foodArr[i].name} cal={foodArr[i].servings[foodArr[i].selectedServing].cal * foodArr[i].mult}></Food>)
        } 
        return arr
    }



    const increaseDate = () => {
            const newDate = new Date(); newDate.setDate(data.getDate()); newDate.setMonth(data.getMonth()); newDate.setFullYear(data.getFullYear());
            newDate.setDate(data.getDate() + 1)

            setData(newDate)
    } 
    const decreaseDate = () => {
            const newDate = new Date(); newDate.setDate(data.getDate()); newDate.setMonth(data.getMonth()); newDate.setFullYear(data.getFullYear());
            newDate.setDate(data.getDate() - 1)

            setData(newDate)
    }
    

    return (
        <ScrollView style={styles.container}>
            <View style={styles.pageContainer}>

                <View style={styles.headerContainer}>

                    <View style={{display: 'flex', flexDirection: 'column'}}>
                        <MaskedView style={{ width: 120, height: 40, marginLeft: 15}} maskElement={<Text  style={styles.logo}>xTracK</Text>}>
                            <LinearGradient colors={['#12c2e9', '#c471ed' , '#f7797d']}  style={{ flex: 1 }}/>
                        </MaskedView>
                        <Text style={{color: 'white', fontFamily: 'JetBrainsMono', fontSize: 12, paddingLeft: 25, paddingTop: 8}}>Welcome Back!</Text>
                    </View>
                    
                    {/*<Pressable onPress={handleSignOut} style={{marginLeft: 'auto', justifyContent: 'center', marginRight: 20,}}>
                            <Feather name="log-out" size={24} color='#B22222'/>
                    </Pressable>*/}
                </View>

                <View style={styles.macroContainer}>
                    <View style={styles.innerMacroContainer}>
                        <Text style={{color: 'white', fontFamily: 'JetBrainsMono', fontSize: 17, marginBottom: 5}}>Calories</Text> 
                        <Circle color={'#9da2b0'}thickness={6}progress={.6} showsText={true} size={110} textStyle={styles.circleText}></Circle>
                        <Text style={{color: 'white', fontFamily: 'JetBrainsMono', fontSize: 13, marginTop: 7}}>1000/2000</Text> 

                    </View>
                    <View style={styles.innerMacroContainer}> 
                        <View style={{display: 'flex', flexDirection: 'column', gap: 20, marginRight: 20}}>
                            <View>
                                <View style={{display: 'flex', flexDirection: 'row',}}>
                                    <Text style={styles.macroText}>Carbs</Text>
                                    <Text style={styles.smallMacroText}>145/160 g</Text>
                                </View>
                                <Bar color={'#43d07c'} progress={.7}></Bar>
                            </View>
                                <View>
                                <View style={{display: 'flex', flexDirection: 'row',}}>
                                    <Text style={styles.macroText}>Protein</Text>
                                    <Text style={styles.smallMacroText}>35/160 g</Text>
                                </View>
                                <Bar color={'#1cc9d8'} progress={.3}></Bar>
                            </View>
                            <View>
                                <View style={{display: 'flex', flexDirection: 'row',}}>
                                    <Text style={styles.macroText}>Fat</Text>
                                    <Text style={styles.smallMacroText}>80/160 g</Text>
                                </View>
                                <Bar color={'#eb3c05'} progress={.5}></Bar>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.dateContainer}>

                    <Pressable  style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }]} hitSlop={35} onPress={decreaseDate}><Text style={{fontFamily: 'JetBrainsMono', fontSize: 30, color: 'white', lineHeight: 40,}}>&lt;</Text></Pressable>
                    <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: 200, justifyContent: 'center'}}>
                        <DateTimePicker onChange={(event, Date) => {setData(Date)}} value={data} minimumDate={new Date(2024, 0, 1)} maximumDate={new Date(2035, 10, 20)} style={{width: 130}}></DateTimePicker>
                    </View>
                    <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }]} hitSlop={35} onPress={increaseDate}><Text style={{fontFamily: 'JetBrainsMono', fontSize: 30, color: 'white', lineHeight: 40,}}>&gt;</Text></Pressable>

                </View>

                <View style={styles.foodContainer}>
                    {getDailyFood(foodArr)}

                </View>
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    logo: {
        fontSize: 35,
        fontFamily: 'JetBrainsMono',
        letterSpacing: -3,
    },
    container: {
      backgroundColor: themeColor().primary,
    },
    pageContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 50,
        marginBottom: 10,
        backgroundColor: themeColor().secondary,
        width: 350,
        height: 70,
        borderRadius: 10,
        
    },
    macroContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 10,
        backgroundColor: themeColor().secondary,
        width: 350,
        height: 185,
        borderRadius: 10,
    },
    innerMacroContainer: {
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
    },
    macroText: {
        color: 'white',
        fontFamily: 'JetBrainsMono',
        fontSize: 16,
    },
    smallMacroText: {
        color: 'white',
        fontFamily: 'JetBrainsMono',
        marginLeft: 'auto',
        fontSize: 12,
    },
    circleText: {
        fontFamily: 'JetBrainsMono',
        color: 'white',
    },
    dateContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        
        backgroundColor: themeColor().secondary,
        width: 280,
        height: 40,
        borderRadius: 10,
        marginBottom: 10,
    },
    foodContainer: {
        backgroundColor: themeColor().primary,
        width: '95%',
        borderRadius: 30,
    },
    emptyText: {
        fontFamily: 'JetBrainsMono',
        color: 'white',
        fontSize: 12,
        margin: 30,
        textAlign: 'center',
        opacity: 0.4,
    },
    emptyDesign: {
        fontFamily: 'JetBrainsMono',
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        opacity: 0.4,
    }
})