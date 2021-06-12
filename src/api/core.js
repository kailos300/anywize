import axios from 'axios';
import { storage } from 'util/storage';
import { parseMethod, interceptedMethods } from './helpers';

class Api {
  axiosInstance;

  constructor() {
  const baseURL = 'http://157.230.25.213:3000/api/'
    this.axiosInstance = axios.create({
      baseURL,
      headers: { 'Content-Type': 'application/json' }
    });

    /**
     * Log endpoint calls to console in development
     * Set default authorization headers
     */
    this.axiosInstance.interceptors.request.use(config => {
      if (process.env.NODE_ENV === 'development') {
        if (config.method === 'get') {
          console.info(`${config.method} - ${config.url}`);
        }
        if (interceptedMethods.some(m => m === config.method)) {
          console.info(`${config.method} - ${config.url}, ${config.data}`);
        }
      }

      config.headers['Authorization'] = this.getAuthToken();
      return config;
    }, err => {
      console.error(err);
    });

    this.axiosInstance.interceptors.response.use(response => {
      return response;
    }, error => {
      if (error.response.status === 401) {
        const token = storage.get('token');

        if (token) {
          return this.axiosInstance(error.config);
        } else {
          storage.clear();
        }
      }
    });
  }

  getAuthToken = () => {
    return `Bearer ${storage.get('token')}`;
  };

  async fetch(url, method = 'GET', data = {}, config) {
    try {
      let options = {
        method: parseMethod(method),
        data,
        ...config
      };


      const response = await this.axiosInstance({ url, ...options });

      if (response)
        return response.data ?? response;
    } catch (error) {
      console.log(error);
    }
  };

  async post(url, data, config) {
    return this.fetch(url, 'POST', data, config);
  }

  async put(url, data, config) {
    return this.fetch(url, 'PUT', data, config);
  }

  async patch(url, data, config) {
    return this.fetch(url, 'PATCH', data, config);
  }

  async delete(url, config) {
    return this.fetch(url, 'DELETE', undefined, config);
  }
}

// TODO: Set the url in .env file and use it from there. Create separate .env files for prod and dev
const baseURL = process.env.NODE_ENV === 'production' ? window.location.origin : 'http://localhost:3000';

export { baseURL };
export const coreApi = new Api(baseURL);
export default Api;
