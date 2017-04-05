import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

const validateInput = (data) => {
  const errors = {};

  if (Validator.isEmpty(data.fName)) {
    errors.fName = 'This field is required';
  }

  if (Validator.isEmpty(data.lName)) {
    errors.lName = 'This field is required';
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = 'This field is required';
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'This field is required';
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'This field is required';
  }
  if (Validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = 'This field is required';
  }
  if (!Validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = 'Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateInput;
