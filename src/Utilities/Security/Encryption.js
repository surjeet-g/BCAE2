const CryptoJS = require("crypto-js");
const { SECERT_KEY, TDLog } = require("../Constants/Constant");

export const encryption = (obj = {}) => {
  try {
    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(obj), SECERT_KEY);
    return ciphertext.toString();
  } catch (error) {
    TDLog("Encryption", "error encrypting", error);
  }
};

//decryption({ data: "1" }));
export const decryption = (cipherString) => {
  try {
    if (cipherString == "") throw "can't be empty cipher test";
    const bytes = CryptoJS.AES.decrypt(cipherString, SECERT_KEY);
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(plaintext);
  } catch (error) {
    TDLog("Decryption", "error decrypting", error);
  }
};
