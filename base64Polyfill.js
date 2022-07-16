import {decode, encode} from 'base-64';
const t = () => {
  if (!global.btoa) {
    global.btoa = encode;
  }

  if (!global.atob) {
    global.atob = decode;
  }
};
export default t;
