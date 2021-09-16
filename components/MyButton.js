import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {AsyncStorage, Text, TouchableOpacity} from "react-native";
import * as Font from "expo-font";
import * as Location from "expo-location";
import {ActivityIndicator} from 'react-native';

export default class MyButton extends Component {
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
    setData = async () => {
        let pos = await this.getPosition()
        pos.switch = false
        let arr = await AsyncStorage.getItem('locations');
        arr = JSON.parse(arr)
        if (!arr)
            arr = []
        arr.push(pos)
        await AsyncStorage.setItem('locations', JSON.stringify(arr));
        this.update(arr)
        this.props.loading(false)
    }

    deleteData = async () => {
        await AsyncStorage.setItem('locations', JSON.stringify([]));
        this.update([])
    }

    update = (element) => {
        this.props.update(element)
    }

    getPosition = async () => {
        this.props.loading(true)
        return await Location.getCurrentPositionAsync({})
    }

    click = async event => {
        if (this.props.action === 'start')
            this.props.navigation.navigate('Locations')
        else if (this.props.action === 'save') {
            await this.setData()
        } else if (this.props.action === 'map') {
            if (this.props.markers.length > 0) {
                let pos = await this.getPosition()
                this.props.loading(false)
                this.props.navigation.navigate('Map', {pos: pos, markers: this.props.markers})
            } else
                alert("Proszę wybrać minimum jeden marker")
        } else if (this.props.action === 'delete_all') {
            await this.deleteData()
        }
    }

    render() {
        const style = {
            border: '2px solid black',
            textAlign: 'center',
        }
        return (
            <TouchableOpacity style={this.style} onPress={this.click}>
                <Text style={{fontWeight: 'bold', fontSize: 60, fontFamily: 'myFont'}}> {this.props.title} </Text>
            </TouchableOpacity>
        )
    }
}

MyButton.propTypes = {
    title: PropTypes.string.isRequired,
    action: PropTypes.string.isRequired,
    navigation: PropTypes.object.isRequired
};