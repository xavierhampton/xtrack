import { Tabs } from 'expo-router';
import React, {useState, useEffect} from 'react';
import '@/components/UserTheme.js'
import {View, Text, Pressable} from 'react-native'

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import {themeColor} from '@/hooks/theme'
import AntDesign from '@expo/vector-icons/AntDesign';
import MaskedView from '@react-native-masked-view/masked-view'
import { LinearGradient } from 'expo-linear-gradient';

import {router} from 'expo-router'
import AddFoodModal from '@/components/AddFoodModal'




export default function TabLayout() {

  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  }

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
                width: 10,
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
    <AddFoodModal isVisible={isModalVisible} onClose={toggleModal}>
      </AddFoodModal>

        <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }]} onPress={toggleModal}>

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
    </View>
    
  );
}