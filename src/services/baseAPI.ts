import axios from 'axios';

import { SessionKey, getSession, removeSession } from './securityService';

const baseAPI = async (method: 'POST' | 'PUT' | 'GET' | 'DELETE', url: string, payload?: any): Promise<any> => {
  let result = null;

  const headers = getSession(SessionKey.AUTH_TOKEN) && {
    Authorization: getSession(SessionKey.AUTH_TOKEN),
  };

  const dataOrParams = ['POST', 'PUT'].includes(method) ? 'data' : 'params';

  axios.defaults.baseURL = process.env.SERVICE_API_URL;

  await axios
    .request({
      url,
      method,
      headers,
      [dataOrParams]: payload,
    })
    .then((response) => {
      result = response.data;
    })
    .catch((error) => {
      result = error.response;
      if (
        error.response &&
        (error.response.status === 403 || (error.response.status === 401 && getSession(SessionKey.AUTH_TOKEN)))
      ) {
        removeSession([SessionKey.AUTH_TOKEN]);
        window.location.replace('/');
      } else if (error.response && error.response.status === 500) {
        throw new Error(`{"code": "${error.response.status}","message": "Something went wrong! Try again" }`);
      } else {
        throw new Error(
          `{"code": "${error.response.headers['server-status-code']}","message": "${error.response.headers['server-status-message']}" }`
        );
      }
    });

  return result;
};

export default baseAPI;
