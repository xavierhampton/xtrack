import { Stack } from "expo-router";
import { Tabs } from 'expo-router';
import React, {useState} from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import {configureReanimatedLogger, ReanimatedLogLevel} from 'react-native-reanimated';


import * as SystemUI from 'expo-system-ui';


import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  configureReanimatedLogger({
    level: ReanimatedLogLevel.warn,
    strict: false, 
  });

  SystemUI.setBackgroundColorAsync("black");


  const [loaded] = useFonts({
    JetBrainsMono: require('../assets/fonts/JetBrainsMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView>
    <Stack
    screenOptions={{headerShown: false}}>
      <Stack.Screen name="auth" options={{headerShown: false}}/>
      <Stack.Screen name="index" options={{headerShown: false}}/>
      <Stack.Screen name="(app)" options={{headerShown: false}}/>
    </Stack>
    </GestureHandlerRootView>
  );
}
