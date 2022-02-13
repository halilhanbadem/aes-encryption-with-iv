class libraryUtils {
   constructor () {

   };

   getKeyLength(EncryptionType) {
     var EncType = EncryptionType.split('-')[1];

     switch (EncType) {
         case '128':
             return 16;   
         case '192':
             return 24;         
         case '256':
             return 32;  
         default:
             return 24
     };
   };
};

module.exports = libraryUtils;