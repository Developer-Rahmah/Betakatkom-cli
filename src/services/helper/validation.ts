export const validateEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const validatePassword =
  /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/;

export function validateUsername(username) {
  if (!/^[a-z0-9_-]{3,16}$/i.test(username)) {
    return 'Enter a user name 3 to 16 characters long';
  } else {
    return null;
  }
}

export function validateCode(code) {
  if (!code) {
    return 'Enter a valid code';
  } else {
    return null;
  }
}
