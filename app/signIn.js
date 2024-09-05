import { TextInput} from 'react-native';
import { Image, StyleSheet} from 'react-native';
import { View, Text, Button } from 'react-native';
import React, {useState, useEffect} from 'react';
import { TouchableOpacity } from 'react-native';
import {themeColor} from '@/hooks/theme'
import {router} from 'expo-router'
import {auth} from '../firebase'
import {googleSignIn} from '../components/auth_google_signin'


import {signInWithEmailAndPassword} from 'firebase/auth'

export default function SignInScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        console.log('Redirecting to Homepage')
        console.log(user.email)
        router.push("/home")
      }
    })
  }, [])

  const handeLogin = () => {
      signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
          const user = userCredential.user
          console.log(`Logged in with: ${user.email}`)
      })
      .catch(error => alert(error.message))
  }
  
    return (
      <View
      style={styles.container}
      >
        <View
        style={styles.inputContainer}
        >
          <TextInput
          style={styles.input}
          value={email}
          onChangeText={text => setEmail(text)}
          />
          
          <TextInput
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
          />

        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
          onPress= {() => {handeLogin()}} 
          style= {styles.button}>
            <Text style= {styles.buttonText}>Login</Text></TouchableOpacity>
        </View>
        <Button title="Google"
        onPress={googleSignIn}></Button>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      alignItems: 'center',
      paddingTop: 200,
      backgroundColor: themeColor(theme).primary,
    },
    input: {
      marginTop: 5,
      paddingVertical: 15,
      width: 290,
      height: 60,
      borderWidth: 2,
      borderColor: 'white',
      color: 'white',
      fontSize: 20,
      padding: 10,
    },
    inputContainer: {
      margin: 0,
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'column',
    },
    button: {
      display: 'flex',
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',

      width: 300,
      height: 60,
      textAlign: 'center',
      backgroundColor: 'white',
      borderRadius: 8,
      overflow: 'hidden',
      marginBottom: 20,
      marginTop: 20,


      shadowColor: '#FFFFFF',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: .6,
      shadowRadius: 4,  
      elevation: 5
    },
    buttonText: {
      color: themeColor(theme).primary,
      fontFamily: 'JetBrainsMono',
      fontSize: 24,
    },
  });