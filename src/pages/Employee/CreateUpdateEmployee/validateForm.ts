import { isEmpty } from 'lodash-es';
import { isEmail } from 'Utils/commonUtil';

const validateForm = (employeeData: any): IErrorObj => {
  const errors: any = {};

  if (!isEmail(employeeData.email)) {
    errors.email = 'Email is invalid';
  }

  if (isEmpty(employeeData.email)) {
    errors.email = 'Email is required';
  }

  if (isEmpty(employeeData.name)) {
    errors.name = 'Name is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateForm;
