import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function checkFavorites(food) {
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

    if (!Array.isArray(favoritesArray)) {
        favoritesArray = []
    }
 
    for (let f of favoritesArray) {
        if (f.name == food.name) {
            return true
        }
    }
    return false
}