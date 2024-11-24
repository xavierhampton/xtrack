import {View, Pressable, Text, Image} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import MaskedView from '@react-native-masked-view/masked-view'
import {Redirect, router} from 'expo-router'
import {themeColor} from '@/hooks/theme'
import { useState, useEffect } from 'react'
import Carousel from 'react-native-reanimated-carousel';

export default function Index() {
    const [redirect, setRedirect] = useState(true)
    const [bubbles, setBubbles] = useState('')
    if (redirect) {
        return <Redirect href="main/home" />
    }

    const data = [require('@/assets/images/index1.png'), require('@/assets/images/index2.png'), require('@/assets/images/index2.png'), require('@/assets/images/index2.png'), require('@/assets/images/index2.png')]

    const updateBubbles = (index) => {
        let root = []
        for (let i = 0; i < data.length; i++) {
            if (i == index) {
                root.push(<View style={styles.selected}></View>)
            }
            else {
                root.push(<View style={styles.unselected}></View>)
            }
        }
        setBubbles(root)
    }
    
    useEffect(() => {
        updateBubbles(0)
    }, [])
    
    return (
    <View style={{backgroundColor: themeColor().primary, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 50}}>
        <MaskedView style={{ width: 120, height: 40}} maskElement={<Text  style={{fontSize: 35,fontFamily: 'JetBrainsMono',letterSpacing: -3, textAlign: 'center'}}>xTracK</Text>}>
                <LinearGradient colors={['#12c2e9', '#c471ed' , '#f7797d']}  style={{ flex: 1 }}/>
        </MaskedView>


        <Carousel
                style={{marginTop: 60}}
                loop
                width={320}
                height={400}

                data={data}
                scrollAnimationDuration={500}
                onSnapToItem={(i) => {updateBubbles(i)}}
                renderItem={({ index }) => (
                    <View
                        style={{
                            flex: 1,
                            borderWidth: 1,
                            justifyContent: 'center',
                            borderRadius: 10
                        }}
                    >
                        <Image style={{
                    flex: 1,
                    width: null,
                    height: null,
                    resizeMode: 'contain'
                    }} 
                    source={data[index]}></Image>
                    </View>
                )}
            />
            <View style={{display: 'flex', flexDirection: 'row', marginBottom: 20, gap: 2}}>
                 {bubbles}
            </View>
                
                
                <Text style={{fontFamily: 'JetBrainsMono', color: 'white', fontSize: 16, width: 280, textAlign: 'center', opacity: 0.6, marginBottom: 200}}>Put your health first by tracking your food!</Text>




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
const styles = {
unselected: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    width: 15,
    height: 15,
    borderRadius: 100
},
selected: {
    backgroundColor: 'rgba(255,255,255,0.6)',
    width: 20,
    height: 15,
    borderRadius: 20
}
}