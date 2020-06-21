import { Alert } from 'react-native';
import api from './cachedClient';

const userLocation = async (lat: any, long: any) => {

    const userLocationData = await api.get(`reverseGeoCode?at=${parseFloat(lat)},${parseFloat(long)}`);
    return userLocationData.data;
}
const userProfile = async (userId: object) => {

    const userProfileData = await api.post(`user/add`, userId);
    return userProfileData.data;
}

const updateUserProfile = async (userId: string, body: object) => {

    const userProfileData = await api.post(`user/update?phone=${userId}`, body);
    return userProfileData.data;
}

const getUserProfile = async (userId: string) => {

    const userProfileData = await api.get(`user/one?phone=${userId}`);
    return userProfileData.data;
}





export default { userLocation, userProfile, updateUserProfile, getUserProfile };