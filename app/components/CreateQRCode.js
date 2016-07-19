import React, { Component } from 'react';
import {
    Dimensions,
    StyleSheet,
    View,
    Text,
    TextInput,
} from 'react-native';

import {Button} from './Button';
import {Index} from '../app';
import {writeFile, QR_PATH} from '../utils/IO';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
var _ = require('lodash');
var MessageBarAlert = require('react-native-message-bar').MessageBar;
var MessageBarManager = require('react-native-message-bar').MessageBarManager;

export class CreateQRCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyName: null,
            taxRegistrationNumber: null,
            phone: null,
            bankName: null,
            bankAccount: null,
            saved: false,
        };
    }
    _onSaveQRCode(companyInfo) {
        let qrCode = JSON.stringify(_.pick(this.state, ['companyName', 'taxRegistrationNumber', 'phone', 'bankName', 'bankAccount']));
        writeFile(qrCode, QR_PATH).then(() => {
            let newState = _.clone(this.state);
            newState.saved = true;
            this.setState(newState);
            MessageBarManager.showAlert({
                title: '保存成功',
                message: '保存成功， 请点击确定返回首页',
                alertType: 'success',
                shouldHideAfterDelay: false,
                shouldHideOnTap: true,
            });
        });
    }
    _onGoBack() {
        this.props.navigator.push({
            component: Index,
            title: '税表小助手',
        }); 
    }
    _onInputChange(text, attr) {
        let newState = _.clone(this.state);
        newState[attr] = text;
        this.setState(newState);
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
                <KeyboardAwareScrollView style={styles.scrollView}
                    contentContainerStyle={styles.scrollContentContainer}>
                    <MessageBarAlert ref="alert" />
                    <TextInput
                        ref="1"
                        style={styles.textInput}
                        onChangeText={(text) => this._onInputChange(text, 'companyName')}
                        text={this.state.companyName}
                        placeholder="公司名称"
                    />
                    <TextInput
                        ref="2"
                        style={styles.textInput}
                        onChangeText={(text) => this._onInputChange(text, 'taxRegistrationNumber')}
                        text={this.state.taxRegistrationNumber}
                        keyboardType="numeric"
                        placeholder="纳税人识别号"
                    />
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(text) => this._onInputChange(text, 'phone')}
                        text={this.state.phone}
                        keyboardType="numeric"
                        placeholder="电话（一般为座机）"
                    />
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(text) => this._onInputChange(text, 'bankName')}
                        text={this.state.bankName}
                        placeholder="开户银行"
                    />
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(text) => this._onInputChange(text, 'bankAccount')}
                        text={this.state.bankAccount}
                        keyboardType="numeric"
                        placeholder="开户银行账号"
                    />
                </KeyboardAwareScrollView>
                {this.state.saved ? (
                    <Button
                        onPress={this._onGoBack.bind(this)}
                        text='确定'/> 
                ) : (
                    <Button
                        onPress={this._onSaveQRCode.bind(this)}
                        text='保存二维码'/>
                )}
            </View>
        );
    }
}

var styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollView: {
        width: Dimensions.get('window').width,
    },
    textInput: {
        borderRadius:4,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        alignItems: 'center',
    }
});
