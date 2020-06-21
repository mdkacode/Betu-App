// Import dependencies
import api from './cachedClient';

import AsyncStorage from '@react-native-community/async-storage';


const productsList = async (lat: any, long: any) => {
    const geoShops = await api.get(`shopkeeper/bygeo?lat=${lat}&long=${long}&distance=81000`);
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
    const geoShops = await api.get(`shopkeeper/bygeo?lat=${lat}&long=${long}&distance=81000`);
    let shops;
    if (geoShops.data.message) {
        shops = geoShops.data.message;
    }
    else {
        shops = [];
    }
    return shops;
};

export default { productsList, nearbyShopkeeper };

// ------------ WRINTING
