import * as CryptoJS from 'crypto-js';

export function encrypt(token: string) {
  return CryptoJS.AES.encrypt(token, 'secret');
}

export function decrypt(token: string) {
  return CryptoJS.AES.decrypt(token, 'secret');
}
