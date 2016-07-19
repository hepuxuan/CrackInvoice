'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    VibrationIOS,
} from 'react-native';

import {serialize} from '../utils/Serialize'
import {writeFile, INVOICE_PATH} from '../utils/IO'

import Camera from 'react-native-camera';
var Button = require('react-native-button');

export class QRCodeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {qrContent: ''};
    }

    _onBarCodeRead(result) {
        let qrText;
        try {
            qrText = serialize.toDisplayString(JSON.parse(result.data));
            writeFile(qrText, INVOICE_PATH);
        }
        catch(err) {
            qrText = '格式错误';
        }
        this.setState({
            qrContent: qrText,
        });
        
    }
    render() {
        return (
            <View style={styles.contentContainer}>
                {
                    this.state.qrContent ? (
                        <View style={styles.text}>
                            <Text>{this.state.qrContent}</Text> 
                        </View>
                    ) : (
                        <Camera onBarCodeRead={this._onBarCodeRead.bind(this)} style={styles.camera}>
                            <View style={styles.rectangleContainer}>
                                <View style={styles.rectangle}/>
                            </View>
                        </Camera>
                    )
                }
            </View>
        );
    }
}

var styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
    },

    text: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    camera: {
        flex:1,
        justifyContent: 'center',
    },

    rectangleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },

    rectangle: {
        height: 250,
        width: 250,
        borderWidth: 2,
        borderColor: '#00FF00',
        backgroundColor: 'transparent',
    },
});
