import React, { Component } from 'react';
import {
    StyleSheet,
} from 'react-native';
var BasicButton = require('react-native-button');
var _ = require('lodash');

export class Button extends Component {
    static propTypes = {
        text: React.PropTypes.string,
        onPress: React.PropTypes.func,
    };

    render() {
        return(
            <BasicButton
                style={styles.button}
                onPress={this.props.onPress}>
                {this.props.text}
            </BasicButton>
        );
    }
}


var styles = StyleSheet.create({
    button: {
        marginTop: 5,
        marginBottom: 5,
        padding:10,
        height:45,
        overflow:'hidden',
        borderRadius:4,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'transparent',
        fontSize: 20,
        color: '#0097CE',
    }
});