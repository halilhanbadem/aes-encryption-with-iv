const {randomFill, scrypt, createCipheriv, createDecipheriv} = require("crypto");
const libraryUtils = require("./libraryUtils");
var UtilsProvider = new libraryUtils();

class libraryAES {
  EConfig;
  constructor (config) {
    if (!config) {
        throw 'the config definition is missing.';  
    };

    if (config.type == undefined || !config.type) {
        throw 'please specify the encryption type in the config.';
    };

    this.EConfig = config;
  };

  Encryption(data, key) {
    var localConfig;
    localConfig = this.EConfig;
    return new Promise(function(resolve, reject) {
        scrypt(key, 'salt', UtilsProvider.getKeyLength(localConfig.type), (error, key) => {
            if (error) {
                reject(error);
            };

            randomFill(new Uint8Array(16), (error, ivkey) => {
                if (error) {
                    reject(error);
                };

                var cipher = createCipheriv(localConfig.type, key, ivkey);
                var encrypted = cipher.update(data, 'utf8', 'hex');
                encrypted += cipher.final('hex');

                if (localConfig.output == "base64") {
                    encrypted = Buffer.from(encrypted, 'utf8').toString('base64');
                };

                resolve(encrypted + "." + Buffer.from(ivkey, 'hex').toString('base64'));
            });
        });
    });
  };

  EncryptionWithIV(data, key, ivkey) {
    var localConfig;
    localConfig = this.EConfig;
    return new Promise(function(resolve, reject) {
        scrypt(key, 'salt', UtilsProvider.getKeyLength(localConfig.type), (error, key) => {
            if (error) {
                reject(error);
            };

            var cipher = createCipheriv(localConfig.type, key, Buffer.from(ivkey, 'utf8'));
            var encrypted = cipher.update(data, 'utf8', 'hex');
            encrypted += cipher.final('hex');
            resolve(encrypted);
        });
    });
  };

  Decryption(data, key) {
    var localConfig;
    localConfig = this.EConfig;
    return new Promise(function(resolve, reject) {
        scrypt(key, 'salt', UtilsProvider.getKeyLength(localConfig.type), (error, key) => {
            if (error) {
                reject(error);
            };

            var autoIVKey = data.split('.')[1];
            var justData = data.split('.')[0];
            autoIVKey = Buffer.from(autoIVKey, 'base64');
            var decipher = createDecipheriv(localConfig.type, key, autoIVKey);

            if (localConfig.output == "base64") {
               justData = Buffer.from(justData, 'base64').toString('utf8');   
            };

            var decrypted = decipher.update(justData, 'hex', 'utf8');
            decrypted += decipher.final('utf8');
            resolve(decrypted);
        })
    });
  };

  DecryptionWithIV(data, key, ivkey) {
    var localConfig;
    localConfig = this.EConfig;
    return new Promise(function(resolve, reject) {
        scrypt(key, 'salt', UtilsProvider.getKeyLength(localConfig.type), (error, key) => {
            if (error) {
                reject(error);
            };

            var decipher = createDecipheriv(localConfig.type, key, Buffer.from(ivkey, 'utf8'));
            var decrypted = decipher.update(data, 'hex', 'utf8');
            decrypted += decipher.final('utf8');
            resolve(decrypted);
        });
    });
  };




};

module.exports = libraryAES;