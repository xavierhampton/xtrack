import AsyncStorage from "@react-native-async-storage/async-storage";
const fetchData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('profile-data');
        return (jsonValue != null) ? JSON.parse(jsonValue) : null
    } 
    catch (e) {
        return null
    } 
}

const pushData = async (i) => {
    try {
        await AsyncStorage.setItem('date-overview-cache', String(data.getMonth()) + '/' + String(data.getDate()) + '/' + String(data.getFullYear()));
    }
        catch (e) {
        return
    }
}