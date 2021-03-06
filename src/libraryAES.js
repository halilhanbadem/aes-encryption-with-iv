/**
 * Developer: Halil Han BADEM
 * Created date: 13 02 2022 22 46
 * Modify Developer: ------
 * Modify date: 
 */

const { randomFill, scrypt, createCipheriv, createDecipheriv } = require("crypto");
const libraryUtils = require("./libraryUtils");
var UtilsProvider = new libraryUtils();

class libraryAES {
    #EConfig;
    constructor(config) {
        if (!config) {
            throw 'the config definition is missing.';
        };

        if (config.type == undefined || !config.type) {
            throw 'specify the encryption type in the config.';
        };

        this.#EConfig = config;
    };

    /**
     * 
     * @param {string} data 
     * @param {string} key 
     * @returns {Promise<string>}
     */
    Encryption(data, key) {
        var localConfig;
        localConfig = this.#EConfig;
        return new Promise(function (resolve, reject) {
            scrypt(key, 'salt', UtilsProvider.getKeyLength(localConfig.type), (error, key) => {
                if (error) {
                    reject(error);
                    return;
                };

                randomFill(new Uint8Array(16), (error, ivkey) => {
                    if (error) {
                        reject(error);
                        return;
                    };

                    var cipher = createCipheriv(localConfig.type, key, ivkey);
                    var encrypted = cipher.update(data, 'utf8', 'hex');
                    encrypted += cipher.final('hex');
                    encrypted = localConfig.output == "base64" ? encrypted = Buffer.from(encrypted, 'utf8').toString('base64') : encrypted;
                    resolve(encrypted + "." + Buffer.from(ivkey, 'hex').toString('base64'));
                });
            });
        });
    };

    /**
     * 
     * @param {string} data 
     * @param {string} key 
     * @param {string} ivkey 
     * @returns {Promise<string>}
     */
    EncryptionWithIV(data, key, ivkey) {
        var localConfig;
        localConfig = this.#EConfig;
        return new Promise(function (resolve, reject) {
            scrypt(key, 'salt', UtilsProvider.getKeyLength(localConfig.type), (error, key) => {
                if (error) {
                    reject(error);
                    return;
                };

                var cipher = createCipheriv(localConfig.type, key, Buffer.from(ivkey, 'utf8'));
                var encrypted = cipher.update(data, 'utf8', 'hex');
                encrypted += cipher.final('hex');
                encrypted = localConfig.output == "base64" ? encrypted = Buffer.from(encrypted, 'utf8').toString('base64') : encrypted;
                resolve(encrypted);
            });
        });
    };

    /**
     * 
     * @param {string} data 
     * @param {string} key 
     * @returns {Promise<string>}
     */
    Decryption(data, key) {
        var localConfig;
        localConfig = this.#EConfig;
        return new Promise(function (resolve, reject) {
            scrypt(key, 'salt', UtilsProvider.getKeyLength(localConfig.type), (error, key) => {
                if (error) {
                    reject(error);
                    return;
                };

                var autoIVKey = data.split('.')[1];
                var justData = data.split('.')[0];
                autoIVKey = Buffer.from(autoIVKey, 'base64');
                var decipher = createDecipheriv(localConfig.type, key, autoIVKey);
                justData = localConfig.output == "base64" ? justData = Buffer.from(justData, 'base64').toString('utf8') : justData;
                var decrypted = decipher.update(justData, 'hex', 'utf8');
                decrypted += decipher.final('utf8');
                resolve(decrypted);
            })
        });
    };

    /**
     * 
     * @param {string} data 
     * @param {string} key 
     * @param {string} ivkey 
     * @returns {Promise<string>}
     */
    DecryptionWithIV(data, key, ivkey) {
        var localConfig;
        localConfig = this.#EConfig;
        return new Promise(function (resolve, reject) {
            scrypt(key, 'salt', UtilsProvider.getKeyLength(localConfig.type), (error, key) => {
                if (error) {
                    reject(error);
                    return;
                };

                var decipher = createDecipheriv(localConfig.type, key, Buffer.from(ivkey, 'utf8'));
                data = localConfig.output == "base64" ? data = Buffer.from(data, 'base64').toString('utf8') : data;
                var decrypted = decipher.update(data, 'hex', 'utf8');
                decrypted += decipher.final('utf8');
                resolve(decrypted);
            });
        });
    };

    /**
     * 
     * @param {string} data 
     * @param {string} key 
     * @returns {Promise<string>}
     */
    EncryptionDifferenceAlgo(data, key) {
        var localConfig;
        localConfig = this.#EConfig;
        return new Promise(function (resolve, reject) {
            scrypt(key, 'salt', UtilsProvider.getKeyLength(localConfig.type), (error, key) => {
                if (error) {
                    reject(error);
                    return;
                };

                randomFill(new Uint8Array(16), (error, iv) => {
                    if (error) {
                        reject(error);
                        return;
                    };

                    var cipher = createCipheriv(localConfig.type, key, iv);
                    var encrypted = cipher.update(data, 'utf8', 'hex');
                    encrypted += cipher.final('hex');

                    //iv is divided into 2 equal parts.
                    iv = Buffer.from(iv, 'hex').toString('hex');
                    var DifferenceAlgoOutput = encrypted;
                    if (iv.length % 2 == 0) {
                        DifferenceAlgoOutput = iv.substring(0, iv.length / 2) + encrypted + iv.substring(iv.length / 2, iv.length);
                    };

                    DifferenceAlgoOutput = localConfig.output == "base64" ? Buffer.from(DifferenceAlgoOutput, 'hex').toString('base64') : DifferenceAlgoOutput;

                    resolve(DifferenceAlgoOutput);
                });
            });
        });
    };

    /**
     * 
     * @param {string} data 
     * @param {string} key 
     * @returns {Promise<string>}
     */
    DecryptionDifferenceAlgo(data, key) {
        var localConfig;
        localConfig = this.#EConfig;
        return new Promise(function (resolve, reject) {
            scrypt(key, 'salt', UtilsProvider.getKeyLength(localConfig.type), (error, key) => {
                if (error) {
                    reject(error);
                    return;
                };

                data = localConfig.output == "base64" ? Buffer.from(data, 'base64').toString('hex') : data;
                var onlydata, ivkey;
                onlydata = data.substring(16, data.length - 16);
                ivkey = data.substring(0, 16) + data.substring(data.length - 16, data.length);
                var decipher = createDecipheriv(localConfig.type, key, Buffer.from(ivkey, 'hex'));
                var decrypted = decipher.update(onlydata, 'hex', 'utf8');
                decrypted += decipher.final('utf8');
                resolve(decrypted);
            })
        });
    }
};

module.exports = libraryAES;