import React from 'react'
import {View, Text, Pressable} from 'react-native'
import PropTypes from 'prop-types';
import { StyleSheet } from "react-native";
import {themeColor} from '@/hooks/theme'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import * as Progress from 'react-native-progress';
import { useEffect, useState } from 'react';
import getTargets from '@/components/getTargets.js'


const SearchFood = (props) => {

    const [targetCar, setTargetCar] = useState(250)
    const [targetFat, setTargetFat] = useState(66)
    const [targetPro, setTargetPro] = useState(100)

    const fetchGoals = async () => {
        const d = await getTargets()
        setTargetCar(d['car'])
        setTargetPro(d['pro'])
        setTargetFat(d['fat'])
    }

    useEffect(() => {
        fetchGoals()
    }, [])

    return (
        <View>
            <Pressable onPress={props.pressFunc} style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 },]}>
                <View style={styles.container}>
                    

                <MaterialCommunityIcons name="food-apple" size={30} color="white" opacity={1} style={{marginLeft: 15}}/>
                <View style={{display: 'flex', flexDirection: 'column'}}>
                        <Text style={styles.text}>{props.name}</Text>

                </View>
                    <View style={{display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems: 'center', alignContent: 'center', marginLeft:'auto'}}>
                        <Text style={[styles.text,{ marginLeft: 'auto', marginRight: 15, fontSize: 15, width: 40}]}>{props.cal}</Text>
                        <Text style={[styles.text,{ marginLeft: 'auto', marginRight: 15, fontSize: 12}]}>kcal</Text>
                    </View>
                    
                </View>
                <View style={{display: 'flex',  flexDirection: 'row', height: 5, width: 300, zIndex: 100, marginLeft: 'auto', transform: 'translateY(-38px) translateX(190px)'}}>
                    <Progress.Bar  color={'#43d07c'} height={10} width={45} progress={props.car/targetCar} style={{transform: 'rotate(-90deg)', marginRight: -35}}></Progress.Bar>
                    <Progress.Bar  color={'#1cc9d8'} height={10} progress={props.pro/targetPro} width={45} style={{transform: 'rotate(-90deg)'}}></Progress.Bar>
                    <Progress.Bar  color={'#eb3c05'} height={10} progress={props.fat/targetCar} width={45} style={{transform: 'rotate(-90deg)', marginLeft: -35}}></Progress.Bar>
                </View>
                



            </Pressable>
        </View>
    )
}
export default SearchFood


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection:'row',
        height: 65, 
        width: 370,
         alignItems: 'center',
         backgroundColor: themeColor().secondary,
         borderRadius: 10,
         marginBottom: 5,
         borderBottomWidth: 0.5,
         borderBottomColor: 'black',
        marginBottom: 1,
    },
    text: {
        fontSize: 16,
        color: 'white',
        fontFamily:'JetBrainsMono',
        marginLeft: 10,
        marginTop: 5,
    },
    subText: {
        fontSize: 12,
        color: 'white',
        opacity: 0.6,
        fontFamily:'JetBrainsMono',
        marginLeft: 10,
        marginTop: -3,
    }

})