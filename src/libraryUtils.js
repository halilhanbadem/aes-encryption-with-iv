/**
 * Developer: Halil Han BADEM
 * Created date: 13 02 2022 22 46
 * Modify Developer: ------
 * Modify date: 
 */

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