import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function saveFavorites(food, bool) {
    const pushData = async (i, d) => {
        try {
            await AsyncStorage.setItem(i, d);
        }
            catch (e) {
            return
        }
    }
    const fetchData = async (d) => {
        try {
            const jsonValue = await AsyncStorage.getItem(d);
            return (jsonValue != null) ? JSON.parse(jsonValue) : null
        } 
        catch (e) {
            return null
        } 
    }

    food.favorite = true

    let fFlag = false
    let rFlag = false
    let favoritesArray = await fetchData('favorites')
    let recentsArray = await fetchData('recents')

    if (!Array.isArray(favoritesArray)) {
        favoritesArray = []
    }
    if (!Array.isArray(recentsArrayArray)) {
        recentsArray = []
    }


    if (bool === false) {
    for (let i = 0; i < favoritesArray.length; i++) {
        if (favoritesArray[i] == food) {
            recentsArray[i].favorite = false
            fFlag = true
        }
    }
}
    else {
        favoritesArray.push(food)
        fFlag = true
    }

    for (let i = 0; i < recentsArray.length; i++) {
        if (recentsArray[i] == food) {
            recentsArray[i].favorite = bool
            rFlag = true
        }
    }

    if (fFlag) {
        pushData('favorites', favoritesArray)
    }
    if (rFlag) {
        pushData('recents', recentsArray)
    }


}