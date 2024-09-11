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
          <Pressable>
            <MaterialIcons name="close" color="#fff" size={35} />
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
    },
  });
  
