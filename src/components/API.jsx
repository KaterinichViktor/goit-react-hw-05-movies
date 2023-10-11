// api.js
import axios from 'axios';

const apiKey = '6298eebf16614acdcdf7a20ae39c00ce';
const apiUrl = 'https://api.themoviedb.org/3';


const instance = axios.create({
  baseURL: apiUrl,
});

instance.interceptors.request.use((config) => {
  config.params = config.params || {};
  config.params['api_key'] = apiKey;
  return config;
});

export default instance;
