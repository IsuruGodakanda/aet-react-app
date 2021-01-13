import { decodeData, encodeData } from 'Utils/commonUtil';

const isVerifySession = (): any => {
  try {
    const decoded = JSON.parse(decodeData(sessionStorage.session));
    if (decoded.userAgent === navigator.userAgent) {
      return decoded;
    }
    sessionStorage.clear();
    window.location.replace('/');
    return null;
  } catch (error) {
    sessionStorage.clear();
    window.location.replace('/');
    return null;
  }
};

// Set Single key value
export const setSession = (json: any): void => {
  if (sessionStorage.session) {
    const existingSession = isVerifySession();
    if (existingSession) {
      const mergeResult = { ...existingSession, ...json };

      sessionStorage.setItem('session', encodeData(JSON.stringify(mergeResult)));
    }
  } else {
    const agent = { userAgent: navigator.userAgent };
    const mergeResult = { ...json, ...agent };

    sessionStorage.setItem('session', encodeData(JSON.stringify(mergeResult)));
  }
};

// Retrieve session data
export const getSession = (key: string): any => {
  if (sessionStorage.session) {
    const existingSession = isVerifySession();
    if (existingSession) {
      return existingSession[key];
    }
  }
  return null;
};

// Remove session data
export const removeSession = (keyArray: string[]): void => {
  if (sessionStorage.session) {
    const existingSession = isVerifySession();
    if (existingSession) {
      keyArray.forEach((key) => {
        delete existingSession[key];
      });

      sessionStorage.setItem('session', encodeData(JSON.stringify(existingSession)));
    }
  }
};

// Set session keys
export enum SessionKey {
  AUTH_TOKEN = 'authToken',
}
