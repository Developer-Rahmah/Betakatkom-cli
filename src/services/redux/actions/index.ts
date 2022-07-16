export const setAuthTokenAction = (authToken: string) => ({
  type: 'SET_AUTH_TOKEN',
  payload: authToken,
});
export const setUserIdAction = (userId: string) => ({
  type: 'SET_USER_ID',
  payload: userId,
});
export const setLanguageAction = (langCode: string) => ({
  type: 'SET_LANGUAGE',
  payload: langCode,
});
export const setBalanceAction = (balance: number) => ({
  type: 'SET_USER_BALANCE',
  payload: balance,
});
export const setUserAction = (user: any) => ({
  type: 'SET_USER',
  payload: user,
});
export const setPasswordAction = (password: string) => ({
  type: 'SET_PASSWORD',
  payload: password,
});
