import { Modal, View, Text, Pressable, StyleSheet, ScrollView, TextInput } from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {themeColor} from '@/hooks/theme'

export default class CreateFoodModal extends React.Component {
    constructor(props) {
        super(props);
      }
    
      render() {
        return (
            <Modal animationType="slide" transparent={true} visible={this.props.isVisible}>
              <View style={styles.modalContent}>
        <ScrollView>
          
            <Pressable onPress={this.props.onClose} style={{width: '100%', marginBottom: 10, }}>
              <Text style={styles.closeButton}>-       -       v      -       -</Text>
            </Pressable>

            <View style={styles.modalContent}>
            

              <View style={styles.titleContainer}></View>
              <View style={styles.titleContainer}></View>
              <View style={styles.titleContainer}></View>
              <View style={styles.titleContainer}></View>
              <View style={styles.titleContainer}></View>



            </View>
          </ScrollView>
          </View>
            </Modal>
        )
      }
}


const styles = StyleSheet.create({
  
  modalContent: {
    height: '100%',
    width: '100%',

    backgroundColor: themeColor().primary,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    gap: 10,
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
  titleContainer: {
    width: 340,
    height: 70,
    backgroundColor: themeColor().secondary,
    borderRadius: 10,
  }
})