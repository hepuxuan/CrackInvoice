let RNFS = require('react-native-fs');
import { NativeModules } from 'react-native';

export const INVOICE_PATH = RNFS.DocumentDirectoryPath + '/invoice.txt';

var Documents = NativeModules.ICloudDocuments;

export let writeFile = function (content, path) {
    return RNFS.writeFile(path, content, 'utf8').then(() => {
        console.log(path)
        Documents.replaceFileToICloud(path, (err,resultURL)=>{
            console.log(err)
        });
    });
};
