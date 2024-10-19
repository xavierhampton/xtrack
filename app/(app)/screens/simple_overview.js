import {View, Text, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, TextInput} from 'react-native'
import { useState, useEffect } from 'react';
import {themeColor} from '@/hooks/theme';
import {router} from 'expo-router'
import { Bar } from 'react-native-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';



const simple_overview = (props) => {

    const [foodArr, setFoodArr] = useState({})
    const [value, setValue] = useState(0);
    const [food, setFood] = useState({name: 'NULL', selectedServing: 0, mult: 1, servings: [{servingName: 'NULL', weight: '0', cal: '0', car: '0', pro: '0', fat: '0'}]})

    const [dailyCalories, setDailyCalories] = useState('2000')
    const [dailyPro, setDailyPro] = useState('200')
    const [dailyCar, setDailyCar] = useState('350')
    const [dailyFat, setDailyFat] = useState('70')
    const [date, setDate] = useState('')

    const [mult, setMult] = useState('1')

    const showConfirmAlert = () => {
      Alert.alert(
        'Remove Food?',
        'This will permanently remove the food from the current day.',
        [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'Confirm',
            onPress: () => {deleteFood()},
          },
        ],
        { cancelable: false } 
      );
    };
  
    const fetchDate = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('date-overview-cache');
        setDate(jsonValue)          } catch (e) {
        console.log('fetch error')
        return
    }
  }

    const fetchFoods = async () => {
      try {
          const jsonValue = await AsyncStorage.getItem(date);
          setFoodArr(jsonValue != null ? JSON.parse(jsonValue) : null)          } catch (e) {
          console.log('fetch error')
          return
        }
      };

      const storeFoods = async (newFoodArr) => {
        try {
          const jsonValue = JSON.stringify(newFoodArr);
          await AsyncStorage.setItem(date, jsonValue);
        } catch (e) {
          console.log('store error')
          return
        }
      }

    const fetchCache = async () => {
        try {
        const jsonValue = await AsyncStorage.getItem('overview-cache');
        const cacheVal = jsonValue != null ? JSON.parse(jsonValue) : null;
        setFood(cacheVal)
        setValue(cacheVal.selectedServing)
      }
        catch (e) {
        console.log('fetch error')
        return
      }
    }

    const deleteFood = () => {
      let tmpFoodArr = JSON.parse(JSON.stringify(foodArr))
      for (let i = 0; i < tmpFoodArr.length; i++)
        if ((tmpFoodArr[i].name == food.name) && (tmpFoodArr[i].mult == food.mult) && (tmpFoodArr[i].selectedServing == food.selectedServing)) {
           tmpFoodArr.splice(i,1);
           break;
        }
      (tmpFoodArr.length > 0) ? storeFoods(tmpFoodArr) :  storeFoods('')
      router.push('main/home')
    }
    
    useEffect(() => {fetchDate()}, [])
    useEffect(() => {fetchCache(); fetchFoods()}, [date])
    
    return (
        <View style={{backgroundColor: themeColor().primary}}>
            <KeyboardAvoidingView behavior='padding' style={{width: '100%', height: '100%'}} contentContainerStyle={{backgroundColor: 'black'}}>
              <View style={styles.content}> 

              <View style={[styles.headerContainer, {display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center'}]}>
              <Pressable onPress={() => {router.push('main/home')}} style={{width: 26, marginBottom: 10, marginLeft:'auto', backgroundColor: themeColor().secondary}}>
                      <Text style={[styles.closeButton, {marginLeft: 'auto', fontSize: 40, transform: 'translateX(-10px) translateY(10px)'}]}>x</Text>
                    </Pressable>
                <Text style={[styles.headerText, {transform: 'translateY(-20px)'}]}>{food.name}</Text>
              </View>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 100, width: '100%'}}>
                <View style={{display: 'block', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center'}}>
              
              <View style={{display: 'block', width: '100%'}}>
                <Text style={[styles.subHeaderText, {marginTop: 20, width: 375, transform: 'translateY(-10px)'}]}>Customize</Text>
              </View>

              <View style={styles.foodInformationContainer}>
                  
                  <View style={[styles.flexContainer, {height: 80, width: 375, borderBottomLeftRadius: 0, borderBottomRightRadius: 0}]}>
                    <Text style={styles.label}>Amount</Text>
                    <TextInput editable={false} keyboardType='numeric' placeholder={'1'} maxLength={3} style={[styles.textInput, {width: 80, padding: 5, textAlign: 'right', paddingRight: 10}]}></TextInput>
                  </View>
                  <View style={[styles.flexContainer, {height: 60, width: 375, borderTopRightRadius: 0, borderTopLeftRadius: 0, paddingBottom: 10}]}>
                    <Text style={styles.label}>Serving Size</Text>
                    <Text style={[{marginLeft: 'auto', color: 'white', opacity: 0.6, fontSize: 16, fontFamily: 'JetBrainsMono', marginRight: 10,}, {width: 190, padding: 5, textAlign: 'right', paddingRight: 10}]}>{food.servings[food.selectedServing].servingName}</Text>
                    </View>
                </View>

                
              <View style={{display: 'block', width: '100%'}}>
                <Text style={[styles.subHeaderText, {marginTop: 20, width: 375}]}>Summary</Text>
              </View>

                <View style={[styles.flexContainer, {width: 375, height: 225, marginTop: 10, paddingTop: -5, flexDirection: 'column', gap: 18}]}>
                      <View style={[styles.barContainer, {width: 320}]}>
                        <View style={[styles.labelContainer, {width: 320}]}>
                          <View style={{display: 'flex', flexDirection:'row',marginRight: 'auto'}}>
                            <Text style={[styles.barText,{fontSize: 16}]}>Calories - </Text>
                            <Text style={[styles.barText,{fontSize: 12, opacity: 0.6, marginBottom: 3, marginTop: 'auto',}]}>{mult * food.servings[parseInt(value)].cal}/{dailyCalories} kcal</Text>
                          </View>
                            
                            <Text style={[styles.barText,{marginLeft: 'auto', fontSize: 14, opacity: 0.6, marginTop: 'auto'}]}>{((dailyCalories != 0) ? parseInt((mult *food.servings[parseInt(value)].cal / dailyCalories) * 100) : 0)}%</Text>
                        </View>
                         <Bar color={'#9da2b0'} progress={((dailyCalories != 0) ? mult * food.servings[parseInt(value)].cal / dailyCalories : 0)} width={320} height={10}></Bar>
                      </View>

                      <View style={[styles.barContainer, {width: 320}]}>
                        <View style={[styles.labelContainer, {width: 320}]}>
                        <View style={{display: 'flex', flexDirection:'row',marginRight: 'auto'}}>
                            <Text style={[styles.barText,{fontSize: 16}]}>Carbs - </Text>
                            <Text style={[styles.barText,{fontSize: 12, opacity: 0.6, marginBottom: 3, marginTop: 'auto',}]}>{mult *food.servings[parseInt(value)].car}/{dailyCar} g</Text>
                          </View>                            
                          <Text style={[styles.barText,{marginLeft: 'auto', fontSize: 14, opacity: 0.6, marginTop: 'auto'}]}>{((dailyCar != 0) ? parseInt((mult *food.servings[parseInt(value)].car / dailyCar) * 100) : 0)}%</Text>
                        </View>
                         <Bar color={'#43d07c'} progress={((dailyCar != 0) ? mult *food.servings[parseInt(value)].car / dailyCar : 0)} width={320} height={10}></Bar>
                      </View>

                      <View style={[styles.barContainer, {width: 320}]}>
                        <View style={[styles.labelContainer, {width: 320}]}>
                        <View style={{display: 'flex', flexDirection:'row',marginRight: 'auto'}}>
                            <Text style={[styles.barText,{fontSize: 16}]}>Protein - </Text>
                            <Text style={[styles.barText,{fontSize: 12, opacity: 0.6, marginBottom: 3, marginTop: 'auto',}]}>{mult *food.servings[parseInt(value)].pro}/{dailyPro} g</Text>
                          </View>                             
                          <Text style={[styles.barText,{marginLeft: 'auto', fontSize: 14, opacity: 0.6, marginTop: 'auto'}]}>{((dailyPro != 0) ? parseInt((mult *food.servings[parseInt(value)].pro / dailyPro) * 100) : 0)}%</Text>
                        </View>
                         <Bar color={'#1cc9d8'} progress={((dailyPro != 0) ? mult *food.servings[parseInt(value)].pro / dailyPro : 0)} width={320} height={10}></Bar>
                      </View>

                      <View style={[styles.barContainer, {width: 320}]}>
                        <View style={[styles.labelContainer, {width: 320}]}>
                        <View style={{display: 'flex', flexDirection:'row',marginRight: 'auto'}}>
                            <Text style={[styles.barText,{fontSize: 16}]}>Fat - </Text>
                            <Text style={[styles.barText,{fontSize: 12, opacity: 0.6, marginBottom: 3, marginTop: 'auto',}]}>{mult *food.servings[parseInt(value)].fat}/{dailyFat} g</Text>
                          </View>                             
                          <Text style={[styles.barText,{marginLeft: 'auto', fontSize: 14, opacity: 0.6, marginTop: 'auto'}]}>{((dailyFat != 0) ? parseInt((mult *food.servings[parseInt(value)].fat / dailyFat) * 100) : 0)}%</Text>
                        </View>
                         <Bar color={'#eb3c05'} progress={((dailyFat != 0) ? mult *food.servings[parseInt(value)].fat / dailyFat : 0)} width={320} height={10}></Bar>
                      </View>
                      
                </View>
                </View>
                  <Pressable onPress={() => {showConfirmAlert()}}>
                    <Text style={{color:'red', fontSize: 15, fontFamily: 'JetBrainsMono', opacity: 0.5, textDecorationLine: 'underline', textAlign: 'center', marginTop: 20,}}>Remove Food</Text>
                  </Pressable>
                </ScrollView>
              </View>
            </KeyboardAvoidingView>
         </View>
    )
}

export default simple_overview

const styles = {
content: {
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
  foodInformationContainer: {
    width: '100%',
    
    borderRadius: 10,
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
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
    marginRight: 'auto',
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

  },flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: themeColor().secondary,
    borderRadius: 10,
  },
  subHeaderText: {
    color: 'white',
    opacity: .6,
    fontFamily: 'JetBrainsMono',
    fontSize: 16,
    paddingLeft: 10,
    marginBottom: -10,
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.6)',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.6)',

  },
  barContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  labelContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  barText: {
    color: 'white',
    fontFamily: 'JetBrainsMono',
  }
}