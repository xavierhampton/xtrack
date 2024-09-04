import {Text, View } from "react-native";
import {Link} from 'expo-router'
import { StyleSheet } from "react-native";
import {themeColor} from '@/hooks/theme'

export default function Index() {
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
      <Link href="/sign-in"
      style={styles.registerButton} >
        <Text style={styles.registerButtonText}>
            Register &gt;    
        </Text>
      </Link>

      <Link href="/sign-in"
      style={styles.signInButton} >
        <Text style={styles.signButtonText}>
            Sign In &gt;    
        </Text>
      </Link>

      </View>
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: themeColor(theme).primary,
    },
    buttonContainer: {
      marginTop: 'auto',
      marginBottom: 60,
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
      color: themeColor(theme).primary,
      lineHeight: 60,
      fontSize: 24,
      fontFamily: 'JetBrainsMono',
    }
})
