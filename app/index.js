import {View, Pressable, Text} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import {Redirect, router} from 'expo-router'
import {themeColor} from '@/hooks/theme'
import { useState } from 'react'

export default function Index() {
    const [redirect, setRedirect] = useState(false)
    if (redirect) {
        return <Redirect href="main/home" />
    }

    return (
    <View style={{backgroundColor: themeColor().primary, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Pressable style={{display: 'flex', justifyContent:'center', alignItems: 'center', backgroundColor: themeColor().secondary, width: 360, height: 70, marginTop: 'auto', marginBottom: 40, borderRadius: 10}} onPress={() => {router.push('main/home')}}>
            <Text style={{fontFamily:'JetBrainsMono', color:'white', fontSize: 25}}>Continue</Text>
            </Pressable>
    </View>
        
    )
}