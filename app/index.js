import {View, Pressable, Text} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import MaskedView from '@react-native-masked-view/masked-view'
import {Redirect, router} from 'expo-router'
import {themeColor} from '@/hooks/theme'
import { useState } from 'react'
import Carousel from 'react-native-reanimated-carousel';

export default function Index() {
    const [redirect, setRedirect] = useState(false)
    if (redirect) {
        return <Redirect href="main/home" />
    }

    return (
    <View style={{backgroundColor: themeColor().primary, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 50}}>
        <MaskedView style={{ width: 120, height: 40}} maskElement={<Text  style={{fontSize: 35,fontFamily: 'JetBrainsMono',letterSpacing: -3, textAlign: 'center'}}>xTracK</Text>}>
                <LinearGradient colors={['#12c2e9', '#c471ed' , '#f7797d']}  style={{ flex: 1 }}/>
        </MaskedView>


        <Carousel
                loop
                width={300}
                height={600 / 2}
                autoPlay={true}
                data={[...new Array(6).keys()]}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ index }) => (
                    <View
                        style={{
                            flex: 1,
                            borderWidth: 1,
                            justifyContent: 'center',
                        }}
                    >
                        <Text style={{ textAlign: 'center', fontSize: 30 }}>
                            {index}
                        </Text>
                    </View>
                )}
            />






        <View style={{display: 'flex', position: 'absolute', bottom: 50, width: '100%', height: 40, justifyContent: 'center', alignContent:'center', left: 45}}>
          <Pressable onPress={() => { router.push('main/home')}} style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }, {marginTop: 'auto', marginBottom: 30,width: 300, borderRadius: 10,  height: 60, backgroundColor: themeColor().secondary}]}>
                  <MaskedView
                  style={{width: 300, height: 60}}
                  maskElement={<View style={{width: 300, height: 60, borderColor: 'white', borderWidth: 1, borderRadius: 10}}><Text></Text></View>}>
                  <LinearGradient colors={['#12c2e9', '#c471ed' , '#f7797d']}  style={{ flex: 1 }}/>
                  </MaskedView>
                  <View style={{ width: 300, height: 60}}>
                    <Text style={{ fontFamily: 'JetBrainsMono', fontSize: 26, color: 'white', width: 300, height: 60, textAlign: 'center', marginTop: -47}}>Continue</Text>
                  </View>
              </Pressable>   
            </View>
    </View>
        
    )
}