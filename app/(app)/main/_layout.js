import { Tabs, router } from 'expo-router';
import '@/components/UserTheme.js'
import React, {useState, useEffect,useCallback, useRef, useMemo } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import {themeColor} from '@/hooks/theme'
import AntDesign from '@expo/vector-icons/AntDesign';
import MaskedView from '@react-native-masked-view/masked-view'
import { LinearGradient } from 'expo-linear-gradient';
import SearchBar from "react-native-dynamic-search-bar";
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchFood from '@/components/SearchFood'



export default function TabLayout() {
  const sheetRef = useRef(null);
  const snapPoints = useMemo(() => ["75%", "95%"], []);

  // callbacks
  const handleSheetChange = useCallback((index) => {
  }, []);
  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  const [recentsSelected, setRecentsSelected] = useState(true)
  const [searchSelected, setSearchSelected] = useState(false)
  const [favoritesSelected, setFavoritesSelected] = useState(false)
  const selectRecents = () => {setRecentsSelected(true); setSearchSelected(false); setFavoritesSelected(false)}
  const selectFavorites = () => {setRecentsSelected(false); setSearchSelected(false); setFavoritesSelected(true)}
  const selectSearch = () => {setRecentsSelected(false); setSearchSelected(true); setFavoritesSelected(false)}

  const [recentsCache , setRecentsCache] = useState([])
  const [favoritesCache , setFavoritesCache] = useState([])
  const [searchCache, setSearchCache] = useState([])


  const fetchRecents = async() => {
      try {
          const jsonValue = await AsyncStorage.getItem('recents');
          setRecentsCache(jsonValue != null ? JSON.parse(jsonValue) : [])} 
          catch (e) {
          console.log('fetch error')
          return
          }
        
      };

      const fetchFavorites = async() => {
        try {
            const jsonValue = await AsyncStorage.getItem('favorites');
            setFavoritesCache(jsonValue != null ? JSON.parse(jsonValue) : [])} 
            catch (e) {
            console.log('fetch error')
            return
            }
          
        };

      const pushOverviewCache = async (f) => {
        try {
          const jsonValue = JSON.stringify(f);
          await AsyncStorage.setItem('overview-cache', jsonValue);
        }
         catch (e) {
          console.log('store error')
          return
        }
      }

  const recentsBody = () => {
    if (!recentsCache || recentsCache.length == 0) {
      return (
      <View style={{marginTop: 50, display: 'flex', alignItems: 'center'}}>
        <Text style={styles.emptyText}>You currently have no recents stored. Create some food to start storing!</Text>
      </View>
      )
    }
    const body = []
    for (let i = recentsCache.length - 1; i >= 0 ; i--) {
        body.push(<SearchFood key={i} pushCache={() => {pushOverviewCache(recentsCache[i])}} name={recentsCache[i].name} cal={recentsCache[i].servings[0].cal} 
          pro={recentsCache[i].servings[0].pro} car={recentsCache[i].servings[0].car}
          fat={recentsCache[i].servings[0].fat} pressFunc={() => {console.log('TODO')}}></SearchFood>)    
      }
    return (
      <View style={{marginTop: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: -10}}>
        {body}
      </View>)
  }

  const favoritesBody = () => {
    if (!favoritesCache || favoritesCache.length == 0) {
      return (
      <View style={{marginTop: 50, display: 'flex', alignItems: 'center'}}>
        <Text style={styles.emptyText}>You currently have no favorites stored. Favorite some food to start storing!</Text>
      </View>
      )
    }
    
    const body = []
    for (let i = favoritesCache.length - 1; i >= 0 ; i--) {
        body.push(<SearchFood key={i} pushCache={() => {pushOverviewCache(favoritesCache[i])}} name={favoritesCache[i].name} cal={favoritesCache[i].servings[0].cal} 
          pro={favoritesCache[i].servings[0].pro} car={favoritesCache[i].servings[0].car}
          fat={favoritesCache[i].servings[0].fat} pressFunc={() => {console.log('TODO')}}></SearchFood>)    
      }
    return (
      <View style={{marginTop: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: -10}}>
        {body}
      </View>)
  }

  const searchBody = () => {
    if (!searchCache || searchCache.length == 0) {
      return (
      <View style={{marginTop: 50, display: 'flex', alignItems: 'center'}}>
        <Text style={styles.emptyText}>You currently have no food that match your search. Type in a new query above!</Text>
      </View>
      )
    }
    else return (<Text>TODO</Text>)
    const body = []
  }
  



  const createScrollBody = () => {
    if (recentsSelected) {
      return recentsBody()
    }
    else if (searchSelected) {
      return searchBody()
    }
    else if (favoritesSelected) {
      return favoritesBody()
    }
  }

  useEffect(() => {fetchRecents(); fetchFavorites()}, [])

  return (
    <View style={{height: '100%', width: '100%'}}>
    <Tabs 
      screenOptions={{
        tabBarItemStyle: {
            paddingBottom: 15,
            height: 80,
            width: 50, 
        },
        tabBarStyle: {
            backgroundColor: themeColor().secondary,
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            paddingLeft: 20,
            paddingRight: 20,
            paddingBottom: 35,
            borderColor: themeColor().primary,
            marginTop: 0,
            borderTopWidth: 0,
            borderBottomWidth: 0,
            shadowColor: 'white',
            shadowRadius: 10,
            shadowOpacity: .05,
             },
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'white',
        headerShown: false,
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} 
            style={{
                fontSize: 40,
            }}/>
          ),
        }}
      />
      <Tabs.Screen
        name="unknown"
        options={{
          title: 'unknown',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} 
            style={{
                width: 0,
                height: 0,
                fontSize: 0,
            }}/>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'settings' : 'settings-outline'} color={color} 
            style={{
                fontSize: 40,
            }} />
          ),
        }}
      />
    </Tabs>    
        <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }]} onPress={() => handleSnapPress(1)}>
      <MaskedView
        Text={'d'}
        style={{
        display: 'flex',
        
        width: 100,
        height: 80,
        position: 'absolute',
        bottom: 35,
        left: '50%',
        transform: 'translateX(-38px))'}
      }
        maskElement={<View>
      <AntDesign  name="pluscircle" size={76} color="black" /></View>}>
          <LinearGradient colors={['#12c2e9', '#c471ed' , '#f7797d']}  style={{ flex: 1 }}/>
      </MaskedView>
      </Pressable>



      <BottomSheet
        ref={sheetRef}
        enablePanDownToClose={true}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
        backgroundStyle={{backgroundColor: themeColor().primary}}
        handleIndicatorStyle={{backgroundColor: 'rgba(170,170,170,1)'}}
      >
        <BottomSheetScrollView>
        
        <View style={{
          height: 50,
          width: '100%',
          backgroundColor: themeColor().primary,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          alignContent: 'center',}}>
              <View style={{display: 'flex', gap: 10, flexDirection: 'row', justifyContent: 'center', alignContent: 'center'}}>
                <SearchBar
                onFocus={selectSearch}
                placeholder="Search here"
                onPress={() => {}}
                onChangeText={(text) => console.log(text)}
                darkMode={true}
                style={{height: 60, backgroundColor: themeColor().secondary, width: 280}}
                fontSize={16}
                fontFamily='JetBrainsMono'
              />
              <Pressable onPress={() => router.push('screens/create')} style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }, {width: 60, height: 60}]}>
                  <MaskedView
                  style={{width: 60, height: 60}}
                  maskElement={<View style={{width: 60, height: 60, backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'white', borderWidth: 3, borderRadius: 10}}><Text></Text></View>}>
                  <LinearGradient colors={['#12c2e9', '#c471ed' , '#f7797d']}  style={{ flex: 1 }}/>
                  </MaskedView>
                  <Text style={{position: 'absolute', fontFamily: 'JetBrainsMono', fontSize: 60, color: 'white', width: 60, height: 60, textAlign: 'center', bottom: 12}}>+</Text>
              </Pressable>

              </View>
        
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          width: 280,
          height: 40,
          borderRadius: 40,
          marginTop: 10,}}>
            <Pressable onPress={selectRecents}><View style={[recentsSelected ? {
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
            <Pressable onPress={selectSearch}><View
            style={[searchSelected ? {
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
            <Pressable onPress={selectFavorites}><View style= {[favoritesSelected ? {
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
        </View>
        <View style={{width: 400, height: 'auto', marginTop: 50, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          {createScrollBody()}
        </View>
        </BottomSheetScrollView>
      </BottomSheet>

    </View>
    
  );
}

const styles = StyleSheet.create({
  emptyText: {
    fontFamily: 'JetBrainsMono',
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.4,
    width: 350
  },
})

