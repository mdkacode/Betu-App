import api from './cachedClient';

const addOrder = async (userId: string, data: object) => {
    const geoShops = await api.put(`usercart/update?userId=${userId}`, data);
    return geoShops.data;
}

const fetchPlacedOrder = async (userId: string) => {
    const usercartData = await api.get(`usercart/find?userId=${userId}`);
    return usercartData.data;
}
export default { addOrder, fetchPlacedOrder }