import { I18nManager } from 'react-native';
const languageId = I18nManager.isRTL ? 'ar' : 'eng';

export const GET = {
  CARD_TYPE: 'card-type',
  USER: 'user',
  SELLERS: 'users/sellers',
  SELLING_POINTS: 'users/selling-points/all',
  TRANSACTIONS: 'transaction/',
};
export const POST = {
  LOGIN: 'login',
  PURCHASE: 'transaction/pruchase/card/',
  BARREN: 'transaction/stock-take',
  BILL: 'transaction/pruchase/bill',
};
export const PUT = {
  CHANGE_PASSWORD: 'user/change-password',
  SAVE_DEVICEE_TOKEN: 'notifications/token',
};
