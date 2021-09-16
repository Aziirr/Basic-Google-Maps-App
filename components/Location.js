import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Switch} from "react-native";
import MyButton from "./MyButton";

class Location extends Component {
    constructor() {
        super();
    }

    toggleSwitch = event => {
        let currentState = !this.props.switchValue
        if (currentState)
            this.props.toggleSwitch({
                timestamp: this.props.timeStamp,
                latitude: this.props.latitude,
                longitude: this.props.longitude
            }, true)
        else
            this.props.toggleSwitch({timestamp: this.props.timeStamp}, false)

    }

    render() {
        return (
            <View style={{flex: 1, flexDirection: "row"}}>
                <View style={style}><Text>{this.props.timeStamp}</Text>
                    <Text style={style}>Latitude: {this.props.latitude}</Text>
                    <Text style={style}>Longitude: {this.props.longitude}</Text>
                </View>
                <View><Switch
                    onValueChange={this.toggleSwitch}
                    value={this.props.switchValue}/></View>
            </View>
        );
    }
}

const style = {marginRight: 4}

export default Location;