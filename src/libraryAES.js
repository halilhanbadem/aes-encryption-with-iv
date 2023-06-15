/**
 * Developer: Halil Han BADEM
 * Created date: 13 02 2022 22 46
 * Modify Developer: ------
 * Modify date: 15 06 2023 15 31
 */

const {
    randomFill
    , createCipheriv
    , createDecipheriv
} = require("crypto");


class libraryAES {
    #EConfig;

    constructor(config) {
        if (!config) {
            throw 'the config definition is missing.';
        }

        if (config.type === undefined || !config.type) {
            throw 'specify the encryption type in the config.';
        }

        this.#EConfig = config;
    };

    /**
     *
     * @param {string} data
     * @param {string} key
     * @returns {Promise<string>}
     */
    Encryption(data, key) {
        const localConfig = this.#EConfig;
        return new Promise(function (resolve, reject) {



            randomFill(new Uint8Array(16), (error, ivkey) => {
                try {
                    if (error) {
                        reject(error);
                    }

                    const cipher = createCipheriv(localConfig.type, key, ivkey);
                    let encrypted = cipher.update(data, 'utf8', 'hex');
                    encrypted += cipher.final('hex');
                    encrypted = localConfig.output === "base64" ? Buffer.from(encrypted, 'utf8')
                        .toString('base64') : encrypted;
                    resolve(encrypted + "." + Buffer.from(ivkey, 'hex')
                        .toString('base64'));
                } catch (e) {
                    reject(e);
                }
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
        const localConfig = this.#EConfig;
        return new Promise(function (resolve, reject) {


            try {

                const cipher = createCipheriv(localConfig.type, key, Buffer.from(ivkey, 'utf8'));
                let encrypted = cipher.update(data, 'utf8', 'hex');
                encrypted += cipher.final('hex');
                encrypted = localConfig.output === "base64" ? Buffer.from(encrypted, 'utf8')
                    .toString('base64') : encrypted;
                resolve(encrypted);
            } catch (e) {
                reject(e);
            }

        });
    };

    /**
     *
     * @param {string} data
     * @param {string} key
     * @returns {Promise<string>}
     */
    Decryption(data, key) {
        const localConfig = this.#EConfig;
        return new Promise(function (resolve, reject) {


            try {

                let autoIVKey = data.split('.')[1];
                let justData = data.split('.')[0];
                autoIVKey = Buffer.from(autoIVKey, 'base64');
                const decipher = createDecipheriv(localConfig.type, key, autoIVKey);
                justData = localConfig.output === "base64" ? Buffer.from(justData, 'base64')
                    .toString('utf8') : justData;
                let decrypted = decipher.update(justData, 'hex', 'utf8');
                decrypted += decipher.final('utf8');
                resolve(decrypted);
            } catch (e) {
                reject(e);
            }
        })

    };

    /**
     *
     * @param {string} data
     * @param {string} key
     * @param {string} ivkey
     * @returns {Promise<string>}
     */
    DecryptionWithIV(data, key, ivkey) {
        const localConfig = this.#EConfig;
        return new Promise(function (resolve, reject) {
            try {
                const decipher = createDecipheriv(localConfig.type, key, Buffer.from(ivkey, 'utf8'));
                data = localConfig.output === "base64" ? Buffer.from(data, 'base64')
                    .toString('utf8') : data;
                let decrypted = decipher.update(data, 'hex', 'utf8');
                decrypted += decipher.final('utf8');
                resolve(decrypted);
            } catch (e) {
                reject(e);
            }
        });
    };

    /**
     *
     * @param {string} data
     * @param {string} key
     * @returns {Promise<string>}
     */
    EncryptionDifferenceAlgo(data, key) {
        const localConfig = this.#EConfig;
        return new Promise(function (resolve, reject) {

            randomFill(new Uint8Array(16), (error, iv) => {
                if (error) {
                    reject(error);
                }

                try {
                    const cipher = createCipheriv(localConfig.type, key, iv);
                    let encrypted = cipher.update(data, 'utf8', 'hex');
                    encrypted += cipher.final('hex');

                    //iv is divided into 2 equal parts.
                    iv = Buffer.from(iv, 'hex')
                        .toString('hex');
                    let DifferenceAlgoOutput = encrypted;
                    if (iv.length % 2 === 0) {
                        DifferenceAlgoOutput = iv.substring(0, iv.length / 2) + encrypted + iv.substring(iv.length / 2, iv.length);
                    }


                    DifferenceAlgoOutput = localConfig.output === "base64" ? Buffer.from(DifferenceAlgoOutput, 'hex')
                        .toString('base64') : DifferenceAlgoOutput;

                    resolve(DifferenceAlgoOutput);
                } catch (e) {
                    reject(e);
                }
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
        const localConfig = this.#EConfig;
        return new Promise(function (resolve, reject) {
            try {
                data = localConfig.output === "base64" ? Buffer.from(data, 'base64')
                    .toString('hex') : data;
                const onlyData = data.substring(16, data.length - 16);
                const ivKey = data.substring(0, 16) + data.substring(data.length - 16, data.length);
                const decipher = createDecipheriv(localConfig.type, key, Buffer.from(ivKey, 'hex'));
                let decrypted = decipher.update(onlyData, 'hex', 'utf8');
                decrypted += decipher.final('utf8');
                resolve(decrypted);
            } catch (e) {
                reject(e);
            }
        })
    }
}

module.exports = libraryAES;
