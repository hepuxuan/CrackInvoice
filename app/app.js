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
import {readFile, QR_PATH} from './utils/IO';

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
        this.state = {};
        
    }

    componentDidMount() {
       readFile(QR_PATH).then((qRcode) => {
            this.setState({qRcode: qRcode});
        }); 
    }

    render() {
        return (
            <View style={styles.contentContainer}>
                <Button
                    onPress={this._onPressScanQRCode.bind(this)}
                    text='扫描二维码'/>
                {this.state.qRcode ? (
                    <Button
                    onPress={this._onPressDisplayQRCode.bind(this)}
                    text='显示二维码'/>
                    ) : null}
                
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
        this.props.navigator.push({
            component: DisplayQRCode,
            title: '显示二维码',
            passProps: {
                qRcode: this.state.qRcode,
            },
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
        alignItems: 'center',
        justifyContent: 'center',
    }
});
