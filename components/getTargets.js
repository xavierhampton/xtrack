import AsyncStorage from "@react-native-async-storage/async-storage";
const fetchData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('targets');
        return (jsonValue != null) ? JSON.parse(jsonValue) : null
    } 
    catch (e) {
        return null
    } 
}
export default async function getTargets() {
        const data = await fetchData()
        if (data) {
            return data
        }
        return {'cal': 0, 'pro': 0, 'car':0, 'fat': 0}
}