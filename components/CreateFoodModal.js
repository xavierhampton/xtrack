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
            

              <View style={styles.titleContainer}>
                <Text style={styles.headerText}>Custom Food</Text>
              </View>

              <View style={{display: 'block', width: '100%'}}>
                <Text style={styles.subHeaderText}>Food Information</Text>
              </View>
              <View style={styles.foodInformationContainer}>

              </View>


              <View style={{display: 'block', width: '100%'}}>
                <Text style={styles.subHeaderText}>Food Macros</Text>
              </View>
              <View style={styles.foodMacrosContainer}>

              </View>


              



            </View>
          </ScrollView>
          <Pressable style={styles.createFoodButton}>
              <Text style={styles.createFoodButtonText}>Create Food</Text>
          </Pressable>
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
    height: 40,
    backgroundColor: themeColor().secondary,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    color: 'white',
    fontFamily: 'JetBrainsMono',
    fontSize: 20,
    opacity: .6,
  },
  subHeaderText: {
    color: 'white',
    fontFamily: 'JetBrainsMono',
    fontSize: 16,
    paddingLeft: 10,
    marginBottom: -10,
  },
  foodInformationContainer: {
    width: 360,
    height: 200,
    backgroundColor: themeColor().secondary,
    
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  foodMacrosContainer: {
    width: 360,
    height: 300,
    backgroundColor: themeColor().secondary,
    
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  createFoodButton: {
    width: 320,
    height: 60,
    borderRadius: 10,
    position: 'absolute',
    backgroundColor: 'green',
    bottom: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  createFoodButtonText: {
    color: 'white',
    fontFamily: 'JetBrainsMono',
    fontSize: 20,
  }

})