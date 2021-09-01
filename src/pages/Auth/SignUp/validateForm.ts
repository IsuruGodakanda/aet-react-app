import { isEmpty } from 'lodash-es';
import { isEmail } from 'Utils/commonUtil';

const validateForm = (loginData: any): IErrorObj => {
  const errors: any = {};

  if (!isEmail(loginData.email)) {
    errors.email = 'Email is invalid';
  }

  if (isEmpty(loginData.email)) {
    errors.email = 'Email is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateForm;
