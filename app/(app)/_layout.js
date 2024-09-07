import { Tabs } from 'expo-router';
import React from 'react';
import '@/components/UserTheme.js'

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import {themeColor} from '@/hooks/theme'

export default function TabLayout() {

  return (
    <Tabs 
      screenOptions={{
        tabBarItemStyle: {
            paddingBottom: 15,
            
        },
        tabBarStyle: {
            backgroundColor: themeColor().secondary,
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            paddingBottom: 0,
            borderColor: themeColor().primary,
            marginTop: 0,
            borderTopWidth: 0,
            borderBottomWidth: 0,

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
                fontSize: 35,
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
                fontSize: 30,
            }} />
          ),
        }}
      />
    </Tabs>
  );
}