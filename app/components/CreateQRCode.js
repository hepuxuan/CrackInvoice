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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
var _ = require('lodash');
var MessageBarAlert = require('react-native-message-bar').MessageBar;
var MessageBarManager = require('react-native-message-bar').MessageBarManager;
import store from 'react-native-simple-store';

export class CreateQRCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyName: null,
            taxRegistrationNumber: null,
            phone: null,
            bankName: null,
            bankAccount: null,
            address: null,
            saved: false,
            offsetY: 0,
        };
    }
    _onSaveQRCode(companyInfo) {
        let qrCode = _.pick(this.state, ['companyName', 'taxRegistrationNumber', 'phone', 'bankName', 'bankAccount', 'address']);
        store.save('qrCode', qrCode).then(() => {
            let newState = _.clone(this.state);
            newState.saved = true;
            this.setState(newState);
            MessageBarManager.showAlert({
                title: '保存成功',
                message: '保存成功， 请点击确定返回首页',
                alertType: 'success',
                shouldHideOnTap: true,
                viewTopOffset: 70,
            });

            this.refs.scroll.scrollToPosition(0, 0, true);
        });
    }
    _onGoBack() {
        this.props.navigator.pop();
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
                <MessageBarAlert ref="alert" />
                <KeyboardAwareScrollView style={styles.scrollView}
                    ref="scroll"
                    contentContainerStyle={styles.scrollContentContainer}>
                    
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(text) => this._onInputChange(text, 'companyName')}
                        text={this.state.companyName}
                        placeholder="公司名称"
                    />
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(text) => this._onInputChange(text, 'taxRegistrationNumber')}
                        text={this.state.taxRegistrationNumber}
                        keyboardType="numeric"
                        placeholder="纳税人识别号"
                    />
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(text) => this._onInputChange(text, 'address')}
                        text={this.state.address}
                        placeholder="地址"
                    />
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(text) => this._onInputChange(text, 'phone')}
                        text={this.state.phone}
                        keyboardType="numeric"
                        placeholder="电话"
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
