import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import {themeColor} from '@/hooks/theme'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';



export default class AddFoodModal extends React.Component {
    
    constructor(props) {
        super(props);
      }
  
    render() {
    return (
        
    <Modal animationType="slide" transparent={true} visible={this.props.isVisible}>
        <View style={styles.modalContent}>
            <Pressable onPress={this.props.onClose}>
              <Text style={styles.closeButton}>X</Text>
            </Pressable>


          {this.props.children}
        </View>


    </Modal>
    
  );
}
}




const styles = StyleSheet.create({
    modalContent: {
      height: '95%',
      width: '100%%',
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
      marginLeft: 20,
      marginTop: 5,
      fontFamily: 'Arial',
      fontWeight: 900,
    }
  });
  
