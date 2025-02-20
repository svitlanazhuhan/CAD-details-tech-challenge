import path from 'path';

export const EMAIL = process.env.CADDETAILS_USERNAME ?? ''
export const PASSWORD = process.env.CADDETAILS_PASSWORD ?? ''
export const DOWNLOAD_PATH = path.resolve(__dirname, 'downloads', 'cad-files.zip')

export const INVALID_CREDENTIALS = {
  invalidEmail: 'invalid-email@domain',  
  unregisteredEmail: 'unregistered-user@gmail.com',
  invalidPassword: 'incorrectPassword123',  
  emptyEmail: '',  
  emptyPassword: '',
};

export const ERROR_MESSAGES = {
  invalidEmail: 'The Email field is not a valid e-mail address.',
  unregisteredEmail: 'The email you entered did not match any accounts in our records.',
  invalidPassword: 'The email and password you entered did not match our records.',
  emptyEmail: 'The Email field is required.',
  emptyPassword: 'The Password field is required.',
};