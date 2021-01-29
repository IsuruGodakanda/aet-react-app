import { toQueryString } from 'Utils/commonUtil';

import baseAPIService from './baseAPI';

const authURL = 'auth';
const usersURL = 'users';

export const login = async (payload: ILoginDTO): Promise<any> => {
  return baseAPIService('POST', authURL, payload);
};

export const addEmployee = async (payload: IEmployeeObj): Promise<any> => {
  return baseAPIService('POST', usersURL, payload);
};

export const getTableData = async (url: string, filterQuery: ITableFilterPayload): Promise<any> => {
  const dataUrl = `${url}${toQueryString(filterQuery)}`;
  return baseAPIService('GET', dataUrl);
};

export const deleteTableRecordById = async (url: string): Promise<any> => {
  const dataUrl = `${url}`;
  return baseAPIService('DELETE', dataUrl);
};

export const getUserById = async (id: string | undefined): Promise<any> => {
  const dataUrl = `${usersURL}/${id}`;
  return baseAPIService('GET', dataUrl);
};

export const updateUserById = async (id: string | undefined, payload: IEmployeeObj): Promise<any> => {
  const dataUrl = `${usersURL}/${id}`;
  return baseAPIService('PUT', dataUrl, payload);
};
