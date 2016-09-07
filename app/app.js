/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    NavigatorIOS,
} from 'react-native';

import {Button} from './components/Button';
import {QRCodeScreen} from './components/QRCodeScreen';
import {CreateQRCode} from './components/CreateQRCode'
import {DisplayQRCode} from './components/DisplayQRCode'
import store from 'react-native-simple-store';
var MessageBarAlert = require('react-native-message-bar').MessageBar;
var MessageBarManager = require('react-native-message-bar').MessageBarManager;

console.disableYellowBox = true;

export class CrackInvoice extends Component {
    render() {
        return (
            <NavigatorIOS
                style={styles.container}
                initialRoute={{
                    title: '税表小助手',
                    backButtonTitle: '主页',
                    component: Index,
                }}
                renderScene={(route, navigator) =>
                    <Index></Index>
                }
            />
        );
    }
}

export class Index extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
       MessageBarManager.registerMessageBar(this.refs.alert);
    }

    componentWillUnmount() {
        MessageBarManager.unregisterMessageBar();
    }

    render() {
        return (
            <View style={styles.contentContainer}>
                <MessageBarAlert ref="alert" />
                <Button
                    onPress={this._onPressScanQRCode.bind(this)}
                    text='扫描二维码'/>
                <Button
                    onPress={this._onPressDisplayQRCode.bind(this)}
                    text='显示二维码'/>
                <Button
                    onPress={this._onPressCreateQRCode.bind(this)}
                    text='生成二维码'/>
            </View>
        );
    }

    _onPressScanQRCode() {
        this.props.navigator.push({
            component: QRCodeScreen,
            title: '扫描二维码',
        });
    }

    _onPressDisplayQRCode() {
        store.get('qrCode').then((qRcode) => {
            if (qRcode) {
                this.props.navigator.push({
                    component: DisplayQRCode,
                    title: '显示二维码',
                    passProps: {
                        qRcode: JSON.stringify(qRcode),
                    },
                });
            } else {
                MessageBarManager.showAlert({
                    title: '错误',
                    message: '您还没有可用的二维码，请点击生成二维码',
                    alertType: 'error',
                    shouldHideOnTap: true,
                    viewTopOffset: 100,
                });
            }
        }); 
    }

    _onPressCreateQRCode() {
        this.props.navigator.push({
            component: CreateQRCode,
            title: '生成二维码',
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
    }
});
