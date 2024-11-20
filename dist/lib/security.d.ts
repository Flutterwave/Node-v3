declare function getKey(seckey: any): any;
export function encrypt(key: any, text: any): any;
export function getIntegrityHash(data: any, pubkey: any, seckey: any): any;
export { getKey as getEncryptionKey };
