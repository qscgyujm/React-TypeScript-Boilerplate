import apiRoot from './root';

export const getFetchAPI = () => apiRoot.get('/search/anime?q=naruto');

export const postFetchAPI = () => apiRoot.post('/search/anime?q=naruto');
