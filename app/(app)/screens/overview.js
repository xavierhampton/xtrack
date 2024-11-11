import {View, Text, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, TextInput} from 'react-native'
import { useState, useEffect } from 'react';
import {themeColor} from '@/hooks/theme';
import {router, useLocalSearchParams} from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dropdown } from 'react-native-element-dropdown'
import { Bar } from 'react-native-progress';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';


const overview = (props) => {

  const [value, setValue] = useState('0');
  const [isFocus, setIsFocus] = useState(false);
  const [food, setFood] = useState({name: 'NULL', selectedServing: 0, mult: '1', servings: [{servingName: 'NULL', weight: '0', cal: '0', car: '0', pro: '0', fat: '0'}]})

  const [dailyCalories, setTargetCalories] = useState('2000')
  const [dailyPro, setTargetPro] = useState('200')
  const [dailyCar, setTargetCar] = useState('350')
  const [dailyFat, setTargetFat] = useState('70')

  const [mult, setMult] = useState('1')

  const [date, setDate] = useState(new Date())

    const [foodArr, setFoodArr] = useState([])

    const [data, setData] = useState([{ label: 'Item 1', value: '1' },
      { label: 'Item 2', value: '2' },
      { label: 'Item 3', value: '3' },])


      const fetchGoals = async () => {
        const d = await getTargets()
        setTargetCalories(d['cal'])
        setTargetCar(d['car'])
        setTargetPro(d['pro'])
        setTargetFat(d['fat'])
    }

    const fetchFoods = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(String(date.getMonth()) + '/' + String(date.getDate()) + '/' + String(date.getFullYear()));
            return setFoodArr(jsonValue != null ? JSON.parse(jsonValue) : [])          } catch (e) {
            console.log('fetch error')
            return
          }
          
        };

      const updateFood = () => {
        let foodObject = JSON.parse(JSON.stringify(food));
        foodObject.mult = mult
        foodObject.selectedServing = value
        setFood(foodObject)
      }

    const fetchCache = async () => {
        try {
        const jsonValue = await AsyncStorage.getItem('overview-cache');
        const cacheVal = jsonValue != null ? JSON.parse(jsonValue) : null;
        setFood(cacheVal)
        updateList(cacheVal)
      }
        catch (e) {
        console.log('fetch error')
        return
      }
    }
    
    const updateList = (f) => {
      let tmp = []
      if (f.servings) {
        for (let i = 0; i < f.servings.length; i++) {
          console.log(i)
          tmp.push({label: f.servings[i].servingName + " (" + f.servings[i].weight + " g)", value: String(i)})
        }
        setData(tmp)
      } 
    }
    const storeFoods = async (value) => {
      try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(String(date.getMonth()) + '/' + String(date.getDate()) + '/' + String(date.getFullYear()), jsonValue);
      } catch (e) {
        console.log('save error')
        return
      }
    }

    const pushToDay = () => {
      let tmpFoodArr;
      if (Array.isArray(foodArr)) {tmpFoodArr = JSON.parse(JSON.stringify(foodArr))}
      else {tmpFoodArr = []}
      tmpFoodArr.push(food)
      storeFoods(tmpFoodArr)
      router.push('/main/home')
    }


    useEffect(() => {
      updateFood()
    }, [mult, value])

    useEffect(() => {
      fetchFoods()
  }, [date])

    useEffect(() => {fetchCache(); fetchGoals()}, [])
    
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
                    <TextInput onChangeText={(text) => setMult(text)} keyboardType='numeric' placeholder={'1'} maxLength={3} style={[styles.textInput, {width: 80, padding: 5, textAlign: 'right', paddingRight: 10}]}></TextInput>
                  </View>
                  <View style={[styles.flexContainer, {height: 60, width: 375, borderTopRightRadius: 0, borderTopLeftRadius: 0, paddingBottom: 10}]}>
                    <Text style={styles.label}>Serving Size</Text>
                    <Dropdown
                      style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={[styles.selectedTextStyle, {fontFamily: 'JetBrainsMono'}]}
                      data={data}
                      maxHeight={300}
                      
                      containerStyle ={{backgroundColor: 'rgba(0,255,0,0)', borderWidth: 0}}
                      itemContainerStyle={{backgroundColor: themeColor().secondary, borderRadius: 10}}
                      itemTextStyle={{color: 'white', fontFamily: 'JetBrainsMono'}}
                      labelField="label"
                      valueField="value"
                      fontFamily='JetBrainsMono'
                      placeholder={!isFocus ? 'Select item' : '...'}
                      value={value}
                      activeColor= {themeColor().secondary}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={item => {
                        setValue(item.value);
                        setIsFocus(false);
                      }}
        />
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
                </ScrollView>
                <View style={{display: 'flex', position: 'absolute', bottom: 35, width: '100%', height: 40, justifyContent: 'center', alignContent:'center', left: 45}}>
          <Pressable  style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }, {width: 300, height: 60, backgroundColor: themeColor().secondary}]}>
                  <MaskedView
                  style={{width: 300, height: 60}}
                  maskElement={<View style={{width: 300, height: 60, borderColor: 'white', borderWidth: 3, borderRadius: 10}}><Text></Text></View>}>
                  <LinearGradient colors={['#12c2e9', '#c471ed' , '#f7797d']}  style={{ flex: 1 }}/>
                  </MaskedView>
                  <View style={{ width: 300, height: 60}}>
                    <Text onPress = {() => {pushToDay()}} style={{ fontFamily: 'JetBrainsMono', fontSize: 26, color: 'white', width: 300, height: 60, textAlign: 'center', transform: 'translateY(-47px)'}}>Track Food</Text>
                  </View>
              </Pressable>   
            </View>
                </View>
                </KeyboardAvoidingView>
        </View>
    )
}

export default overview

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
  foodInformationContainer: {
    width: '100%',
    
    borderRadius: 10,
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
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
  },
  dropdown: {
      margin: 8,
      marginLeft: 'auto',
      marginRight: 10,
      height: 50,
      borderBottomColor: 'white',
      borderBottomWidth: 0.5,
      width: 180,
      
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