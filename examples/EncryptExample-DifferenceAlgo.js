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
  var x = await libAES.EncryptionDifferenceAlgo(ExampleData, ExampleKey, ExampleIVKey);
  console.log(x);
  var y = await libAES.DecryptionDifferenceAlgo(x, ExampleKey);
  console.log(y);   
})();