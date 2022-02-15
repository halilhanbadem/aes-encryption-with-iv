# AES Encryption with IV
![](https://img.shields.io/github/issues/halilhanbadem/aes-encryption-with-iv?style=for-the-badge)
![](https://img.shields.io/github/license/halilhanbadem/aes-encryption-with-iv?style=for-the-badge)
![](https://img.shields.io/github/repo-size/halilhanbadem/aes-encryption-with-iv?style=for-the-badge)
![](https://img.shields.io/npm/dt/aes-encryption-with-iv?style=for-the-badge)
![](https://img.shields.io/npm/v/aes-encryption-with-iv?style=for-the-badge)

Thanks to this package, you can perform AES encryption type with simpler and different security algorithms. It is not dependent on any 3rd party library. It runs functions from the crypto library of Node JS. AES encryption has an important place today. It is a type of encryption that I use especially in data transfers with its strong algorithm. This is how you can make transactions, you can use the library that I have mentioned and designed as a hobby with the following document.

# Install

`npm i aes-encryption-with-iv`

or 

`yarn add aes-encryption-with-iv`

# Usage

 ## Configuration
There are 2 config parameters. One of them is the `type` parameter and the `other` is the output parameter.The `type` parameter prompts you for an aes encryption type. `output`, on the other hand, asks what type (`hex` or `base64`) the output and input will be. Example;
 
 ```
{
    type: "aes-256-cbc",
    output: "base64"
}
 ```
 
 > :warning: **`output` is an optional parameter. `type` is required.**

 You must define the config file when constructing the class. E.g;
```javascript
const AESProvider = require("aes-encryption-with-iv");
var libAES = new AESProvider({
	type: "aes-256-cbc",
	output: "base64"
});
```

 ## Functions 
| Function name                | Description                    |
| ---------------------------- | ------------------------------ |
| `Encryption(data, key)`   | It encrypts the data, IV Key is generated automatically.       |
| `Decryption(data, key)`   | Decrypts data. The encrypted data must be derived from the `Encrypt(data, key)` function.    |
| `EncryptionWithIV(data, key, ivkey)`   | It encrypts the data, It is not a recommended function.       |
| `DecryptionWithIV(data, key, ivkey)`   | Decrypts data. The encrypted data must be derived from the `DecryptionWithIV(data, key, ivkey)` function.       |
| `EncryptionDifferenceAlgo(data, key)`   | It performs encryption by hiding the IV Key.       |
| `DecryptionDifferenceAlgo(data, key)`   | Decrypts data. The encrypted data must be derived from the `DecryptionDifferenceAlgo(data, key)` function.       |

### `EncryptionDifferenceAlgo(data, key)` and `DecryptionDifferenceAlgo(data, key)`
The main purpose of this function is to make the iv key value more undetectable. By standard your IV key (CBC is the best example) should be 16 bytes. The relevant IV key is divided into 2 equal parts and combined with the front and back ends. In the encryption solution, the first 16 (because it is hex type) and the last 16 values on the front and back ends are taken. This result returns us the IV Key. The data in the middle is our encrypted data. This encrypted data is decrypted with standard `crypto` functions.

## Recommended
 - The tests were generally done in 256-cbc type. You can create an issue for the problem to be experienced in different algorithms.
 - All functions are asynchronous. It returns `Promise<string>` to you.
 - Compiled in v16.13.2 version of nodejs.
 - Since it is in beta stage, please report any errors including the document.

## Planned in Future Releases
 - [x] npm release
 - [x] examples
 - [ ] file encryption
 - [ ] aes encrypted data transfer via nodejs with different languages


## Quick Example
```javascript
const AESProvider = require("aes-encryption-with-iv");
var libAES = new AESProvider({
    type: "aes-256-cbc",
    output: "hex"
});

var MyData = "This my very secret data!";
var MyKey = "cGceKQLGHjdwsm3FxKC7WzNuYKqZKSYF";

(async () => {
    var EncryptedOutput = await libAES.EncryptionDifferenceAlgo(MyData, MyKey);
    console.log(EncryptedOutput);
    var DecryptedOutput = await libAES.DecryptionDifferenceAlgo(EncryptedOutput, MyKey);
    console.log(DecryptedOutput);
})();
```

### Output
```
fec4c731ef630bb9f0a76e21ba291003438540f9463fbeffeed5a850645b160a36ef6013b5150b795ff2d52bddddc789
This my very secret data!
```

## Collaborations
You can send a PR for collaboration or report a bug. For paid works, please use my e-mail address https://halilhanbadem.dev/contact/

