import React, {Component, useState} from 'react';
import {
    View,
    SafeAreaView,
    FlatList,
    Switch
} from 'react-native';
import MyButton from "./MyButton";
import Location from './Location'
import * as Permissions from "expo-permissions";
import {ActivityIndicator} from 'react-native'
import {AsyncStorage} from "react-native"

export default class extends Component {
    constructor() {
        super();
        this.state = {data: [], mainSwitchValue: false, switches: [], loading: false}
    }

    setPermissions = async () => {
        let {status} = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            alert('Odmawiam przydzielenia uprawnień do czytania lokalizacji')
        }
    }

    readData = async () => {
        let data = await AsyncStorage.getItem('locations');
        data = JSON.parse(data)
        if (data)
            this.setState({data: data})
    }

    updateState = (element) => {
        this.setState({data: element})
    }

    changeLoadingState = (value) => {
        this.setState({loading: value})
    }

    mainSwitchToggle = () => {
        let currentState = !this.state.mainSwitchValue
        this.setState({mainSwitchValue: currentState})
        let data = this.state.data
        for (const element of data)
            element.switch = !element.switch
        if (currentState) {
            let array = []
            for (const element of data) {
                array.push({
                    timestamp: element.timestamp,
                    latitude: element.coords.latitude,
                    longitude: element.coords.longitude
                })
            }
            for (const element of data)
                element.switch = true
            this.setState({switches: array})
        } else {
            this.setState({switches: []})
            for (const element of data)
                element.switch = false
        }
        this.setState({data: data})
    }

    switchToggle = (element, on) => {
        let arr = this.state.switches
        let data = this.state.data
        let dataIndex = data.findIndex(dataElement => dataElement.timestamp === element.timestamp)
        data[dataIndex].switch = !data[dataIndex].switch
        this.setState({data: data})
        if (on) {
            arr.push(element)
        } else {
            let index = arr.findIndex(arrayElement => arrayElement.timestamp === element.timestamp)
            arr.splice(index, 1)
        }
    }

    componentDidMount() {
        this.setPermissions()
        this.readData()
    }


    render() {
        const renderItem = ({item}) => (
            <Location timeStamp={item.timestamp} latitude={item.coords.latitude} longitude={item.coords.longitude}
                      toggleSwitch={this.switchToggle} switchValue={item.switch}/>)

        if (!this.state.loading) {

            return [
                <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}><MyButton
                    title={'Pobierz i zapisz pozycję'}
                    action={'save'}
                    navigation={this.props.navigation}
                    update={this.updateState}
                    loading={this.changeLoadingState}
                /><MyButton
                    title={'Usuń wszystkie dane'} action={'delete_all'} update={this.updateState}
                    navigation={this.props.navigation}/>
                    <MyButton
                        title={'Przejdź do mapy'} action={'map'} navigation={this.props.navigation}
                        markers={this.state.switches} loading={this.changeLoadingState}
                    /></View>,
                <View>
                    <Switch
                        onValueChange={this.mainSwitchToggle}
                        value={this.state.mainSwitchValue}/>
                </View>,
                <SafeAreaView style={{flex: 1}}>
                    <FlatList
                        data={this.state.data}
                        renderItem={renderItem}
                        keyExtractor={item => item.timestamp.toString()}
                    />
                </SafeAreaView>
            ]
        } else
            return (<ActivityIndicator size="large" color="#0000ff"/>)
    }
}