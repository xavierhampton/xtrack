import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import {themeColor} from '@/hooks/theme'

export default function TabLayout() {

  return (
    <Tabs 
      screenOptions={{
        tabBarItemStyle: {
            paddingBottom: 5,
        },
        tabBarStyle: {
            backgroundColor: themeColor(theme).secondary,
            borderRadius: 30,
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            marginBottom: 10,
            paddingBottom: 0,
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
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} 
            style={{
                fontSize: 30,
            }} />
          ),
        }}
      />
    </Tabs>
  );
}