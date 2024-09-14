import { Modal, View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import React, {useState, useEffect} from 'react';
import {themeColor} from '@/hooks/theme'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';



export default class AddFoodModal extends React.Component {
    constructor(props) {
        super(props);
      }
    
  
    render() {
      const [recentsToggled, setRecentToggle] = useState(false)

      openRecents = () => {
      
      }

    return (
        
    <Modal animationType="slide" transparent={true} visible={this.props.isVisible}>
        <View style={styles.modalContent}>
            <Pressable onPress={this.props.onClose} style={{width: '100%'}}>
              <Text style={styles.closeButton}>X</Text>
            </Pressable>
            <View>

            </View>
          {this.props.children}
        
        <View style={styles.catagoryPicker}>
            <Pressable><Text style={{color: 'white', }}>Recents</Text></Pressable>
            <View style={{backgroundColor: 'white', width: 1, height: 30, opacity: 0.4}}></View>
            <Pressable><Text style={{color: 'white'}}>Search</Text></Pressable>
            <View style={{backgroundColor: 'white', width: 1, height: 30, opacity: 0.4}}></View>
            <Pressable><Text style={{color: 'white'}}>Favorites</Text></Pressable>
            
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
      color: 'white',
      fontSize: 30,
      marginRight: 'auto',
      marginLeft: 25,
      marginTop: 40,
      fontFamily: 'Arial',
      fontWeight: 900,
    },
    catagoryPicker: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 20,
      backgroundColor: themeColor().secondary,
      width: 280,
      height: 50,
      borderRadius: 40,
      
    },
    foodContent: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: themeColor().secondary,
      borderRadius: 50,
      width: 370,
      height: 570,
      marginTop: 30,
    }
  });
  
