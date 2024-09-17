import { Modal, View, Text, Pressable, StyleSheet, ScrollView, } from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {themeColor} from '@/hooks/theme'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import SearchBar from "react-native-dynamic-search-bar";
import MaskedView from '@react-native-masked-view/masked-view'
import { LinearGradient } from 'expo-linear-gradient';





export default class AddFoodModal extends React.Component {
    constructor(props) {
        super(props);
      }
    
  
    render() {
      
      openRecents = () => {

      }

    return (
        
    <Modal animationType="slide" transparent={true} visible={this.props.isVisible}>
        <View style={styles.modalContent}>
            <Pressable onPress={this.props.onClose} style={{width: '100%', marginBottom: 10, }}>
              <Text style={styles.closeButton}>-       -       v      -       -</Text>
            </Pressable>
              <View style={{display: 'flex', gap: 5, flexDirection: 'row', justifyContent: 'center', alignContent: 'center'}}>
                <SearchBar
                placeholder="Search here"
                onPress={() => {}}
                onChangeText={(text) => console.log(text)}
                darkMode={true}
                style={{height: 60, backgroundColor: themeColor().secondary, width: 280}}
                fontSize={16}
                fontFamily='JetBrainsMono'
              />
              <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }, {width: 60, height: 60}]}>
                  <MaskedView
                  style={{width: 60, height: 60}}
                  maskElement={<View style={{width: 60, height: 60, backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'white', borderWidth: 3, borderRadius: 10}}><Text></Text></View>}>
                  <LinearGradient colors={['#12c2e9', '#c471ed' , '#f7797d']}  style={{ flex: 1 }}/>
                  </MaskedView>
                  <Text style={{position: 'absolute', fontFamily: 'JetBrainsMono', fontSize: 60, color: 'white', width: 60, height: 60, textAlign: 'center', bottom: 12}}>+</Text>
              </Pressable>
              </View>
            <View>

            </View>
          {this.props.children}
        
        <View style={styles.catagoryPicker}>
            <Pressable onPress={this.props.selectRecents}><View style={[this.props.recentsSelected ? {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderBottomLeftRadius: 40,
              borderTopLeftRadius: 40,
              height: 40,
              width: 95,
            }
            :{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: themeColor().secondary,
              borderBottomLeftRadius: 40,
              borderTopLeftRadius: 40,
              height: 40,
              width: 95,
            }]}><Text style={{color: 'white'}}>Recents</Text></View></Pressable>
            <View style={{backgroundColor: themeColor().secondary, width: 1, height: 40, display: 'flex', justifyContent: 'center'}}><View style={{backgroundColor: 'white', width: 1, height: 30, opacity: 0.4}}></View></View>
            <Pressable onPress={this.props.selectSearch}><View
            style={[this.props.searchSelected ? {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: 40,
              width: 95,
              backgroundColor: 'rgba(255,255,255,0.1)',
            }: 
              {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: themeColor().secondary,
              height: 40,
              width: 95,
            }]}><Text style={{color: 'white'}}>Search</Text></View></Pressable>
            <View style={{backgroundColor: themeColor().secondary, width: 1, height: 40, display: 'flex', justifyContent: 'center'}}>
            <View style={{backgroundColor: 'white', width: 1, height: 30, opacity: 0.4}}></View>
            </View>
            <Pressable onPress={this.props.selectFavorites}><View style= {[this.props.favoritesSelected ? {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderBottomRightRadius: 40,
              borderTopRightRadius: 40,
              height: 40,
              width: 95,
            }:
            {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: themeColor().secondary,
              borderBottomRightRadius: 40,
              borderTopRightRadius: 40,
              height: 40,
              width: 95,
            }]}><Text style={{color: 'white'}}>Favorites</Text></View></Pressable>
            
        </View>
        <ScrollView style={styles.foodContent}>

        </ScrollView>
        </View>
    </Modal>
    
  );
}
}




const styles = StyleSheet.create({
  
    modalContent: {
      height: '100%',
      width: '100%',
      backgroundColor: themeColor().primary,
      position: 'absolute',
      bottom: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      alignContent: 'center',
    },
    closeButton: {
      width: '100%',
      color: 'white',
      fontSize: 30,
      marginTop: 40,
      fontFamily: 'Arial',
      fontWeight: 900,
      textAlign: 'center',
      opacity: 0.4,
    },
    catagoryPicker: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      
      width: 280,
      height: 40,
      borderRadius: 40,
      marginTop: 10,
      
    },
    foodContent: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: themeColor().secondary,
      borderRadius: 50,
      width: 370,
      height: 570,
      marginTop: 20,
    }
  });
  
