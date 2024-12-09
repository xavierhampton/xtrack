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
    if (q.trim() == '') {
        return []
    }

    let favoritesArray = await fetchData('favorites')
    let recentsArray = await fetchData('recents')
    let res = []
    let foundSet = new Set()

    if (!Array.isArray(favoritesArray)) {
        favoritesArray = []
    }
    if (!Array.isArray(recentsArray)) {
        recentsArray = []
    }
    for (f of favoritesArray) {
        if ((f.name).toLowerCase().includes(q) || (f.barcode && f.barcode.includes(q))) {
            res.push(f)
            foundSet.add((f.name).toLowerCase())
        }
    }

    for (f of recentsArray) {
        if ((f.name).toLowerCase().includes(q) && (!foundSet.has((f.name).toLowerCase()))) {
            res.push(f)
        }
        else if ((f.barcode && f.barcode.includes(q)) && (!foundSet.has((f.name).toLowerCase()))){
            res.push(f)
        }
    }
    return res 

}