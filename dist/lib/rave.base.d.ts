export = RaveBase;
declare class RaveBase {
    constructor(public_key: any, secret_key: any, _base_url: any);
    getPublicKey: () => any;
    getSecretKey: () => any;
    getBaseUrl: () => string;
    setBaseUrl: (new_base_url: any) => void;
    request: (path: any, payload: any, callback: any) => Promise<any> | {
        uri: any;
        baseUrl: string;
        method: any;
        json: boolean;
        headers: {
            'Content-Type': string;
            Authorization: string;
        };
    };
    encrypt(data: any): any;
    getIntegrityHash(data: any): any;
    _makeRequest(requestOptions: any, callback: any): void;
    _makePromiseRequest(requestOptions: any): Promise<any>;
}
