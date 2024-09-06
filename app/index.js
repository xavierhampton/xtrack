import {Text, View } from "react-native";
import { StyleSheet } from "react-native";
import {themeColor} from '@/hooks/theme'
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import {useEffect} from 'react'
import {auth} from '../firebase'

export default function Index() {

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        console.log('Redirecting to Homepage')
        console.log(user.email)
        router.push('/home')
      }
    })
  }, [])

  return (

    
    <View style={styles.container}>
      <Text 
      style={{
        marginTop: 'auto',
        color: 'white',
        }}>
        Add a splash cover page here or something cool.
        </Text>

      <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={() => {router.push("./register")}}
      style={styles.registerButton} >
        <Text style={styles.registerButtonText}>
            Register &gt;    
        </Text>
      </TouchableOpacity>


      <TouchableOpacity onPress={() => {router.push("./signIn")}}
      style={styles.signInButton} >
        <Text style={styles.signButtonText}>
            Sign In &gt;    
        </Text>
      </TouchableOpacity>

      </View>
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: themeColor(global.theme).primary,
    },
    buttonContainer: {
      marginTop: 'auto',
      marginBottom: 40,
    },
    registerButton: {
      width: 300,
      height: 60,
      textAlign: 'center',
      backgroundColor: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      alignContent: 'center',
      borderRadius: 8,
      overflow: 'hidden',
      marginBottom: 20,


      shadowColor: '#FFFFFF',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: .6,
      shadowRadius: 4,  
      elevation: 5
    },
    signInButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      alignContent: 'center',
      width: 300,
      height: 60,
      
      overflow: 'visible',
      borderColor: 'white',
      borderWidth: 1,
      borderRadius: 8,


      shadowColor: '#FFFFFF',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: .6,
      shadowRadius: 4,  
      elevation: 5
      
    },
    signButtonText: {
      textAlign: 'center',
      lineHeight: 60,
      fontSize: 24,
      fontFamily: 'JetBrainsMono',
      color: 'white',
      overflow:'visible',

    },
    registerButtonText: {
      textAlign: 'center',
      color: themeColor(global.theme).primary,
      lineHeight: 60,
      fontSize: 24,
      fontFamily: 'JetBrainsMono',
    }
})
