import React from 'react'
import {View, Text, Pressable} from 'react-native'
import PropTypes from 'prop-types';
import { StyleSheet } from "react-native";
import {themeColor} from '@/hooks/theme'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


export default class Food extends React.Component {
    constructor(props) {
        super(props);
      }

    render()
    {
    return (
        <View>
            <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }, styles.defaultStyling]}>
                <View style={styles.container}>

                    <MaterialCommunityIcons name="food-apple" size={35} color="white" opacity={1} style={{marginLeft: 15}}/>
                    <Text style={styles.text}>{this.props.name}</Text>
                    <View style={{display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems: 'center', alignContent: 'center', marginLeft:'auto'}}>
                        <Text style={[styles.text,{ marginLeft: 'auto', marginRight: 15, fontSize: 15, width: 20}]}>{this.props.cal}</Text>
                        <Text style={[styles.text,{ marginLeft: 'auto', marginRight: 15, fontSize: 12}]}>kcal</Text>
                    </View>
                </View>



            </Pressable>
        </View>
    )}
}

Food.propTypes = { name: PropTypes.string.isRequired, cal: PropTypes.number.isRequired , pro: PropTypes.number.isRequired, car: PropTypes.number.isRequired, fat: PropTypes.number.isRequired};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection:'row',
        height: 55, 
       
         alignItems: 'center',
         backgroundColor: themeColor().secondary,
         borderRadius: 30,
         marginBottom: 5,
         borderBottomWidth: 0.5,
         borderBottomColor: 'black',
         
         
         
    },
    text: {
        fontSize: 20,
        color: 'white',
        fontFamily:'JetBrainsMono',
        marginLeft: 10,
    }

})