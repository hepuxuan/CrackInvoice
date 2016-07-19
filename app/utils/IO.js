let RNFS = require('react-native-fs');
export const INVOICE_PATH = RNFS.DocumentDirectoryPath + '/invoice.txt';
export const QR_PATH = RNFS.DocumentDirectoryPath + '/qrContent.txt';

export let writeFile = function (content, path) {
    return RNFS.writeFile(path, content, 'utf8');
};

export let readFile = function (path) {
    return RNFS.readFile(path, 'utf8');
};
