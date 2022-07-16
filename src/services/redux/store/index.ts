import applicationReducer from '../reducer';

const {createStore} = require('redux');

const store = createStore(applicationReducer);
export default store;
