import React, {Component} from 'react';
import {
    View,
    KeyboardAvoidingView,
    TextInput,
    StyleSheet,
    Text,
    Platform,
    TouchableWithoutFeedback,
    Button,
    Keyboard
} from 'react-native';
import MyButton from "./MyButton";
import * as Font from "expo-font";


export default class extends Component {
    constructor() {
        super();
        this.state = {fontLoaded: false}
    }

    componentDidMount = async () => {
        await Font.loadAsync({
            'myFont': require('../myfont.ttf'), // Uwaga: proszę w nazwie fonta nie używać dużych liter
        });
        this.setState({fontLoaded: true})
    }

    render() {
        if (this.state.fontLoaded)
            return (
                <View style={{flex: 1, alignItems: 'center'}}>
                    <Text style={{
                        fontFamily: 'myFont',
                        fontSize: 100,
                        textAlign: 'center'
                    }}>Witamy</Text>
                    <MyButton title={'Start'} action={'start'} navigation={this.props.navigation}/>
                </View>
            )
        else
            return null
    }
}