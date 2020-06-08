// Import dependencies
import api from './cachedClient';
import BackgroundTask from 'react-native-background-task';

import AsyncStorage from '@react-native-community/async-storage';

const backgroundMagic = () => {
    BackgroundTask.define(async () => {
        // Fetch some data over the network which we want the user to have an up-to-
        // date copy of, even if they have no network when using the app
        const response = await fetch('http://feeds.bbci.co.uk/news/rss.xml')
        const text = await response.text()

        // Data persisted to AsyncStorage can later be accessed by the foreground app
        await AsyncStorage.removeItem('@allProducts')
        await AsyncStorage.removeItem('@lat');
        await AsyncStorage.removeItem('@long');

        // Remember to call finish()
        BackgroundTask.finish()
    })
    BackgroundTask.schedule({
        period: 900, // Aim to run every 15 mins - more conservative on battery
    })
}
const productsList = async (lat: any, long: any) => {
    const geoShops = await api.get(`shopkeeper/bygeo?lat=${lat}&long=${long}&distance=8000`);
    const shopIds = [];
    const getData = async () => {
        return Promise.all(
            geoShops.data.message.map((shopid: object) =>
                shopIds.push(shopid.productListId),
            ),
        );
    };
    let shopdata = await getData();
    const getProducts = await api.get(
        `ShopProducts/allProducts?shopIds=${shopIds.join()}`,
    );
    await AsyncStorage.setItem('@allProducts', JSON.stringify(getProducts));
    return getProducts;
};

const nearbyShopkeeper = async (lat: any, long: any) => {
    const geoShops = await api.get(`shopkeeper/bygeo?lat=${lat}&long=${long}&distance=8000`);
    let shops;
    if (geoShops.data.message) {
        shops = geoShops.data.message;
    }
    else {
        shops = [];
    }
    return shops;
};

export default { productsList, nearbyShopkeeper, backgroundMagic };

// ------------ WRINTING
