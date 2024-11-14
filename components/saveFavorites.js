import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function saveFavorites(food, bool) {
    const pushData = async (i, d) => {
        try {
            const data = JSON.stringify(d)
            await AsyncStorage.setItem(i, data);
        }
            catch (e) {
            console.log('save error')
            return
        }
    }
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
 
    if (bool == false) {
        favoritesArray = favoritesArray.filter( (f) => {
            return food.name !== f.name
        })
    }

    if (bool == true) {
        favoritesArray.push(food)
        if (favoritesArray.length > 100) {
            favoritesArray.shift()
        }  
    }
  
        pushData('favorites', favoritesArray)
        console.log(favoritesArray)  

}