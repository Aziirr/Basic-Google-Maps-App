import React from 'react';
import MapView from 'react-native-maps';
import {StyleSheet, Text, View, Dimensions} from 'react-native';

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {currentPosition: null}
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView style={styles.mapStyle} initialRegion={{
                    latitude: this.props.route.params.pos.coords.latitude,
                    longitude: this.props.route.params.pos.coords.longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,
                }}>
                    {this.props.route.params.markers.map(element => {
                        return (<MapView.Marker
                            coordinate={{
                                latitude: element.latitude,
                                longitude: element.longitude,
                            }}
                            title={"Znacznik"}
                            description={""}
                            key={element.timestamp}
                        />)
                    })}
                </MapView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});