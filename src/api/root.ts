import axios from 'axios';

const apiRoot = axios.create({ baseURL: 'https://api.jikan.moe/v3' });

export default apiRoot;
