import { Stack } from "expo-router";
import { Tabs } from 'expo-router';
import React, {useState} from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { useColorScheme } from '@/hooks/useColorScheme';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';

declare global {
  var theme: string;
}

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [theme, setTheme] = useState('galaxy');
  global.theme = theme

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
