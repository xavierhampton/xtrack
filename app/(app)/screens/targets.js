import { View, Pressable, Text, StyleSheet, TextInput, KeyboardAvoidingView} from "react-native"
import { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router"
import {themeColor} from '@/hooks/theme';
import MaskedView from "@react-native-masked-view/masked-view";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";


const targets = (props) => {

    const [cal, setCal] = useState('')
    const [car, setCar] = useState('')
    const [pro, setPro] = useState('')
    const [fat, setFat] = useState('')

    const saveTargets = async () => {
        try {
            const targetsObj = {'cal': cal ? cal : 0, 'car': car ? car : 0, 'pro': pro ? pro : 0, 'fat': fat ? fat : 0}
            await AsyncStorage.setItem('targets', JSON.stringify(targetsObj))
        }
        catch {
            console.log('Save Error')
        }
    }

    const getTargets = async () => {
        try {
            const targetsObj = await AsyncStorage.getItem('targets')
            const data = JSON.parse(targetsObj)
            setCal(data['cal']);
            setCar(data['pro'])
            setPro(data['pro'])
            setFat(data['fat'])
        }
        catch {
            console.log('Fetch Error')
        }
    }
    useEffect(() => {
        getTargets()
    }, [])

    return (
        <View style={{backgroundColor: themeColor().primary}}>
            <KeyboardAvoidingView behavior='padding' style={{width: '100%', height: '100%'}} contentContainerStyle={{backgroundColor: 'black'}}>

            <View style={styles.Content}>
            

            <View style={[styles.headerContainer, {display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center'}]}>
              
              <View style={{display: 'flex', gap: 10, marginTop: 30, width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row',}}>
                <Text style={[styles.headerText, {marginLeft: 'auto', paddingLeft: 48, marginTop: 5}]}>Targets</Text>
                
                <Pressable onPress={() => {router.back()}} style={{marginLeft: 'auto', marginRight: 10, width: 26, backgroundColor: themeColor().secondary}}>
                    <Text style={[styles.closeButton, {marginLeft: 'auto', fontSize: 40}]}>x</Text>
                  </Pressable>
              </View>
            </View>
            

            <ScrollView>

            <View style={{display: 'block', width: '100%'}}>
                <Text style={[styles.subHeaderText, {width: 375, textAlign: 'left', marginBottom: 5, marginTop: 10}]}>Daily Targets</Text>
              </View>

            <View style={styles.foodMacrosContainer}>
                  <View style={[styles.flexContainer, {height: 70, width: 375, borderBottomLeftRadius: 0, borderBottomRightRadius: 0}]}>
                    <Text style={styles.label}>Calories</Text>
                    <TextInput placeholder={"0"} onChangeText={(text) => setCal(text)} value={cal}maxLength={4}keyboardType="numeric" style={[styles.textInput, {width: 80, textAlign: 'right', paddingRight: 10}]}></TextInput>
                    <Text style={[styles.subHeaderText, {width: 60, textAlign: 'center', height: 30}]}>kcal</Text>
                  </View>
                  <View style={[styles.flexContainer, {height: 70, width: 375, borderRadius: 0}]}>
                    <Text style={styles.label}>Carbs</Text>
                    <TextInput placeholder={"0"} onChangeText={(text) => setCar(text)} value={car} maxLength={4}keyboardType="numeric" style={[styles.textInput, {width: 60, textAlign: 'right', paddingRight: 10}]}></TextInput>
                    <Text style={[styles.subHeaderText, {width: 80, textAlign: 'right', height: 30, paddingRight: 5,}]}>g</Text>
                  </View>
                  <View style={[styles.flexContainer, {height: 70, width: 375, borderRadius: 0}]}>
                    <Text style={styles.label}>Protein</Text>
                    <TextInput placeholder={"0"} onChangeText={(text) => setPro(text)} value={pro} maxLength={4} keyboardType="numeric" style={[styles.textInput, {width: 60, textAlign: 'right', paddingRight: 10}]}></TextInput>
                    <Text style={[styles.subHeaderText, {width: 80, textAlign: 'right', height: 30, paddingRight: 5,}]}>g</Text>
                  </View>
                  <View style={[styles.flexContainer, {height: 70, width: 375, borderTopLeftRadius: 0, borderTopRightRadius: 0}]}>
                    <Text style={styles.label}>Fat</Text>
                    <TextInput placeholder={"0"} onChangeText={(text) => setFat(text)} value={fat} maxLength={4} keyboardType="numeric" style={[styles.textInput, {width: 60, textAlign: 'right', paddingRight: 10}]}></TextInput>
                    <Text style={[styles.subHeaderText, {width: 80, textAlign: 'right', height: 30, paddingRight: 5}]}>g</Text>
                  </View>
              </View>

            </ScrollView>
            </View>

            <View style={{display: 'flex', position: 'absolute', bottom: 50, width: '100%', height: 40, justifyContent: 'center', alignContent:'center', left: 45}}>
          <Pressable onPress={() => {saveTargets(); router.push('main/home')}} style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }, {marginTop: 'auto', marginBottom: 30,width: 300, borderRadius: 10,  height: 60, backgroundColor: themeColor().secondary}]}>
                  <MaskedView
                  style={{width: 300, height: 60}}
                  maskElement={<View style={{width: 300, height: 60, borderColor: 'white', borderWidth: 1, borderRadius: 10}}><Text></Text></View>}>
                  <LinearGradient colors={['#12c2e9', '#c471ed' , '#f7797d']}  style={{ flex: 1 }}/>
                  </MaskedView>
                  <View style={{ width: 300, height: 60}}>
                    <Text style={{ fontFamily: 'JetBrainsMono', fontSize: 26, color: 'white', width: 300, height: 60, textAlign: 'center', marginTop: -47}}>Save Changes</Text>
                  </View>
              </Pressable>   
            </View>
            </KeyboardAvoidingView>
        </View>
)}
export default targets

const styles = StyleSheet.create({
  
    Content: {
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
        fontFamily: 'Arial',
        fontWeight: 900,
        textAlign: 'center',
        opacity: 0.4,
      },
      headerContainer: {
        width: 385,
        height: 90,
        backgroundColor: themeColor().secondary,
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        marginBottom: 0,
      },
      headerText: {
        color: 'white',
        fontFamily: 'JetBrainsMono',
        fontSize: 20,
        opacity: .6,
      },
      subHeaderText: {
        color: 'white',
        opacity: .6,
        fontFamily: 'JetBrainsMono',
        fontSize: 16,
        paddingLeft: 10,
        marginBottom: -10,
      },
      foodInformationContainer: {
        width: 375,
        
        borderRadius: 10,
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
      },
      foodMacrosContainer: {
        width: 375,
        height: 300,
    
        gap: 0,
        
        borderRadius: 10,
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
      },
      createFoodButtonText: {
        color: 'white',
        fontFamily: 'JetBrainsMono',
        fontSize: 20,
      },
      flexContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: themeColor().secondary,
        borderRadius: 10,
      },
      label: {
        fontFamily: 'JetBrainsMono',
        color: 'white',
        fontSize: 20,
        marginLeft: 15,
      },
      textInput: {
        width: 200,
        borderColor: 'white',
        borderWidth: 2,
        height: 40,
        borderRadius: 5,
        marginLeft: 'auto',
        color: 'white',
        fontSize: 16,
        fontFamily: 'JetBrainsMono',
        marginRight: 10,
      },
      newServingButton: {
        backgroundColor: '#306844',
        width: 300,
        height: 30,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        marginTop: -10,
        marginBottom: -50,
      }
  })
