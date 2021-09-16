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
    Keyboard,
    SafeAreaView,
    FlatList
} from 'react-native';

export default class extends Component {
    render() {
        const data = this.props.route.params
        console.log(data)
        return (
            <SafeAreaView style={{flex:1}}>
             <View></View>
             <View><Text>{data.username}</Text></View>
             <View><Text>{data.password}</Text></View>
             <View><Text>{data.date}</Text></View>
            </SafeAreaView>
        )
            ;
    }
}