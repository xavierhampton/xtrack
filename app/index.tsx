import { Pressable, Text, View } from "react-native";
import {Button} from "react-native"
import {Link} from 'expo-router'
import { StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text 
      style={{
        marginTop: 'auto',
        }}>
        Add a splash cover page here or something cool.
        </Text>

      <View style={styles.buttonContainer}>
      <Link href="/sign-in"
      style={styles.registerButton} >
        <Text style={styles.buttonText}>
            Register     
        </Text>
      </Link>

      <Link href="/sign-in"
      style={styles.signInButton} >
        <Text style={styles.buttonText}>
            Sign In     
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
      backgroundColor: '#151515',
    },

    buttonContainer: {
      marginTop: 'auto',
      marginBottom: 60,
    },

    registerButton: {
      width: 300,
      height: 60,
      textAlign: 'center',
      backgroundColor: '#F8A145',
      borderColor: 'black',
      borderWidth: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      alignContent: 'center',
      borderRadius: 8,
      overflow: 'hidden',

    },

    signInButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      alignContent: 'center',
      width: 300,
      height: 60,
      
      overflow: 'hidden',
      borderColor: '#F8A145',
      borderWidth: 1,
      borderRadius: 8,

      color: '#F8A145',
    },

    buttonText: {
      textAlign: 'center',
      color: 'white',
      lineHeight: 60,
      fontSize: 20,
      fontFamily: 'JetBrainsMono',
    }


})
