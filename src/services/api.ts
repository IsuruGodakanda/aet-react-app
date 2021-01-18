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
