import React, { Component } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
var QRCode = require('react-native-qrcode');

export class DisplayQRCode extends Component {
    render() {
        return(
            <View style={styles.container}>
                <QRCode value={this.props.qRcode} />
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});