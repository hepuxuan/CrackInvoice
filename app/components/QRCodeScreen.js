'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    VibrationIOS,
} from 'react-native';

import {serialize} from '../utils/Serialize';
import {writeFile, INVOICE_PATH} from '../utils/IO';
import cIWebSocket from '../utils/WebSocket';

import Camera from 'react-native-camera';
import {Button} from './Button';
import store from 'react-native-simple-store';
var MessageBarAlert = require('react-native-message-bar').MessageBar;
var MessageBarManager = require('react-native-message-bar').MessageBarManager;

export class QRCodeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            qrContent: null,
            scanned: false,
        };
    }

    componentDidMount() {
       MessageBarManager.registerMessageBar(this.refs.alert);
    }

    componentWillUnmount() {
        MessageBarManager.unregisterMessageBar();
    }

    _onBarCodeRead(result) {
        let qrText;
        try {
            const qrCodeValue = JSON.parse(result.data);
            if (qrCodeValue.clientId) {
                cIWebSocket.triggerLoginSuccess(qrCodeValue.clientId);
                this.setState({
                    scanned: true,
                });

                MessageBarManager.showAlert({
                    title: '登陆成功',
                    message: '登陆成功， 请返回网页客户端查看',
                    alertType: 'success',
                    shouldHideOnTap: true,
                    viewTopOffset: 70,
                });

                setTimeout(() => {
                    this.props.navigator.pop();
                }, 3000);
            } else {
                // qrText = serialize.toDisplayString(qrCodeValue));
                // cIWebSocket.sendInvoice(qrCodeValue);

                MessageBarManager.showAlert({
                    title: '扫描成功',
                    message: '扫描成功',
                    alertType: 'success',
                    shouldHideOnTap: true,
                    viewTopOffset: 70,
                });

                this.setState({
                    qrContent: qrCodeValue,
                    scanned: true,
                });
            }
        }
        catch(err) {
            // ignore
        }
    }

    _onSendInvoice() {
        cIWebSocket.sendInvoice(this.state.qrContent, () => {
            MessageBarManager.showAlert({
                title: '发送成功',
                message: '发送成功， 请返回网页客户端查看',
                alertType: 'success',
                shouldHideOnTap: true,
                viewTopOffset: 70,
            });
        }, () => {
            MessageBarManager.showAlert({
                title: '发送失败',
                message: '发送失败， 请先登录网页客户端',
                alertType: 'error',
                shouldHideOnTap: true,
                viewTopOffset: 70,
            });
        });
    }

    _onSaveQRCode() {
        store.save('qrCode', this.state.qrContent).then(() => {
            MessageBarManager.showAlert({
                title: '保存成功',
                message: '保存成功，即将返回首页',
                alertType: 'success',
                shouldHideOnTap: true,
                viewTopOffset: 70,
            });

            setTimeout(() => {
                this.props.navigator.pop();
            }, 3000);
        });
    }

    _onBack() {
        this.props.navigator.pop();
    }

    render() {
        return (
            <View style={styles.contentContainer}>
                <MessageBarAlert ref="alert" />
                {
                    this.state.qrContent ? (
                        <View style={styles.contentContainer}>
                            <Button
                                onPress={this._onSendInvoice.bind(this)}
                                text='发送至网页客户端'/>
                            <Button
                                onPress={this._onSaveQRCode.bind(this)}
                                text='保存新二维码'/>
                            <Button
                                onPress={this._onBack.bind(this)}
                                text='返回主页'/>
                        </View>
                    ) : (
                        !this.state.scanned ? (
                            <Camera onBarCodeRead={this._onBarCodeRead.bind(this)} style={styles.camera}>
                                <View style={styles.rectangleContainer}>
                                    <View style={styles.rectangle}/>
                                </View>
                            </Camera>
                        ) : null
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
