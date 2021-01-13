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
