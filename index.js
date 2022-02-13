const libraryAES = require("./src/libraryAES");


const ExampleData = "Halil Han BADEM";
const ExampleKey = "6Jdyu4mcnQcN5rnaC2pqWckX8fcmnvXn";
const ExampleIVKey = "qBgG8rKRAT5Y6Bsw";

const config = {
    type: "aes-256-cbc",
    output: "base64"
};

var libAES = new libraryAES(config);


(async() => {
  var a = await libAES.Encryption(ExampleData, ExampleKey);
  console.log(a);
  var b = await libAES.Decryption(a, ExampleKey);
  console.log(b);  
  var c = await libAES.EncryptionWithIV(ExampleData, ExampleKey, ExampleIVKey);
  console.log(c);
  var d = await libAES.DecryptionWithIV(c, ExampleKey, ExampleIVKey);
  console.log(d);
})();