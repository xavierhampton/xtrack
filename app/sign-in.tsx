import ParallaxScrollView from '@/components/ParallaxScrollView';
import { KeyboardAvoidingView, TextInput } from 'react-native';
import { Image, StyleSheet, Platform } from 'react-native';
import { View } from 'react-native';
import React from 'react';

export default function SignInScreen() {
    return (
      <KeyboardAvoidingView
      style={styles.container}
      behavior='padding'
      >
        <View
        style={styles.inputContainer}
        >
          <TextInput
          style={styles.input}
          />
          
          <TextInput
          style={styles.input}
          secureTextEntry
          />

        </View>
      </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    input: {
      marginTop: 15,
      paddingVertical: 15,
    },
    inputContainer: {
      margin: 0,
    },
  });