import { Stack } from "expo-router";
import { Tabs } from 'expo-router';
import React, {useState} from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';

import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

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
    <Stack
    screenOptions={{headerShown: false}}>
      <Stack.Screen name="index" options={{headerShown: false}}/>
    </Stack>
  );
}
