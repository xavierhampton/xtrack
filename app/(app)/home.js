import {View, Text, Button} from 'react-native'
import {auth} from '@/firebase'
import {router} from 'expo-router'
import React from 'react'

export default function Home() {

    const handleSignOut = () => {
        auth
        .signOut()
        .then(() => {
            router.push('/')
        })
        .catch(error => console.log(error.message))
    }

    return (
        <View>
            <Text>Helo World</Text>
            <Button onPress={handleSignOut}>Sign Out</Button>
        </View>
    );



}