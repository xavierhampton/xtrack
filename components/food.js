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
            <Pressable onPress={this.props.pressFunc} style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }, styles.defaultStyling]}>
                <View style={styles.container}>

                    <MaterialCommunityIcons name="food-apple" size={30} color="white" opacity={1} style={{marginLeft: 15}}/>
                    <View style={{display: 'flex', flexDirection: 'column'}}>
                        <Text style={styles.text}>{this.props.name}</Text>
                        <Text style={styles.subText}>{(this.props.mult != 1) ? '(' + this.props.mult + 'x) ': ''}{this.props.servingName}</Text>
                    </View>
                    <View style={{display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems: 'center', alignContent: 'center', marginLeft:'auto'}}>
                        <Text style={[styles.text,{ marginLeft: 'auto', marginRight: 15, fontSize: 15, width: 40}]}>{this.props.cal}</Text>
                        <Text style={[styles.text,{ marginLeft: 'auto', marginRight: 15, fontSize: 12}]}>kcal</Text>
                    </View>
                </View>



            </Pressable>
        </View>
    )}
}

Food.propTypes = { name: PropTypes.string.isRequired, cal: PropTypes.number.isRequired};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection:'row',
        height: 65, 
       
         alignItems: 'center',
         backgroundColor: themeColor().secondary,
         borderRadius: 10,
         marginBottom: 5,
         borderBottomWidth: 0.5,
         borderBottomColor: 'black',
        
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