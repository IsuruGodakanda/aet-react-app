import baseAPIService from './baseAPI';

const authURL = 'auth';
const usersURL = 'users';

export const login = async (payload: ILoginDTO): Promise<any> => {
  return baseAPIService('POST', authURL, payload);
};

export const getDashboardRecords = async (payload: IUsersDTO): Promise<any> => {
  return baseAPIService('POST', usersURL, payload);
};
