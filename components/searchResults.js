import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function searchResults(q) {
    const fetchData = async (d) => {
        try {
            const jsonValue = await AsyncStorage.getItem(d);
            return (jsonValue != null) ? JSON.parse(jsonValue) : null
        } 
        catch (e) {
            console.log('fetch error')
            return null
        } 
    }

    let favoritesArray = await fetchData('favorites')
    let recentsArray = await fetchData('recents')
    let res = []

    if (!Array.isArray(favoritesArray)) {
        favoritesArray = []
    }
    if (!Array.isArray(recentsArray)) {
        recentsArray = []
    }
 
    for (f of recentsArray) {
        if (f.name.includes(q)) {
            res.push(f)
        }
    }
    for (f of favoritesArray) {
        if (f.name.includes(q)) {
            res.push(f)
        }
    }

    return res 

}