import axios from 'axios';
import { setupCache } from 'axios-cache-adapter';
import { serverIP } from '../constant';
// Create `axios-cache-adapter` instance
const cache = setupCache({
    maxAge: 15 * 60 * 1000,
});

// Create `axios` instance passing the newly created `cache.adapter`
const api = axios.create({
    adapter: cache.adapter,
    baseURL: `${serverIP}/api/`,
});

export default api;
