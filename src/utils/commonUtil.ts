import CryptoJS from 'crypto-js';
import jwt_decode from 'jwt-decode';
import { isEmpty } from 'lodash-es';
import Validator from 'validator';

const secretKey = process.env.SECRET_KEY || '';

export const isEmail = (value: string): boolean => {
  if (!isEmpty(value)) {
    return Validator.isEmail(value);
  }
  return false;
};

export const encodeData = (value: string): any => {
  return CryptoJS.AES.encrypt(value, secretKey).toString();
};

export const decodeData = (token: string): any => {
  return CryptoJS.AES.decrypt(token, secretKey).toString(CryptoJS.enc.Utf8);
};

export const decodeJWT = (token: string): any => {
  return jwt_decode(token);
};

export const camelCaseToNormalString = (word: string): string => {
  const separatedString = word.replace(/[A-Z]/g, (m) => ` ${m.toLowerCase()}`);
  return separatedString.charAt(0).toUpperCase() + separatedString.slice(1);
};

export const camelCaseToUnderscoreSeperated = (word: string): string => {
  return word.replace(/[A-Z]/g, (m) => `_${m.toLowerCase()}`);
};

export const toQueryString = (queryObject: ITableFilterPayload): string => {
  let queryString = '';
  Object.entries(queryObject).forEach(([key, val]) => {
    if (val || val === 0) {
      queryString += `${camelCaseToUnderscoreSeperated(key)}=${val}&`;
    }
  });

  return queryString && `?${queryString.slice(0, -1)}`;
};
