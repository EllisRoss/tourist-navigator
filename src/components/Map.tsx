import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import MapboxGL, {Logger} from '@react-native-mapbox-gl/maps';
import {useSelector} from "react-redux";
import {
    selectCurrentLocation,
    selectDestinationCoordinates,
    selectGeoDirection,
    selectOriginCoordinates,
    selectSelectedGeoNames,
    selectShowRoute
} from "../redux/mapSelectors";
import {mapBoxApiToken} from "../api/mapAPI";
import {AddressForm} from "./AddressForm";

Logger.setLogCallback(log => {
    const {message} = log;
    if (
        message.match('Request failed due to a permanent error: Canceled') ||
        message.match('Request failed due to a permanent error: Socket Closed')
    ) {
        return true;
    }
    return false;
});

MapboxGL.setAccessToken(
    mapBoxApiToken,
);
export const Map = () => {
    const currentLocation = useSelector(selectCurrentLocation);
    const selectedGeoNames = useSelector(selectSelectedGeoNames);
    const showRoute = useSelector(selectShowRoute);
    const geoDirection = useSelector(selectGeoDirection);
    const originCoordinates = useSelector(selectOriginCoordinates);
    const destinationCoordinates = useSelector(selectDestinationCoordinates);
    const [coordinates, setCoordinates] = useState([0, 0]);

    useEffect(() => {
        if (currentLocation) {
            setCoordinates([currentLocation.longitude, currentLocation.latitude]);
        }
    }, []);

    useEffect(() => {
        if (originCoordinates !== '') {
            const coordsArr = originCoordinates.split(',');
            console.log(coordsArr[0], coordsArr[1])
            setCoordinates([Number(coordsArr[0]), Number(coordsArr[1])]);
        }
    }, [originCoordinates]);

    const VenuesPoints = selectedGeoNames.map((geoName, index) => {
        let coords = [Number(geoName.lng), Number(geoName.lat)]
        let id = String(Math.random() * (geoName.lng - geoName.lat));
        console.log(index + 1, ': ', id)
        return <MapboxGL.PointAnnotation coordinate={coords}
                                         id={id}
                                         key={id}
                                         title={geoName.title}>
            <MapboxGL.Callout title={geoName.title}/>
        </MapboxGL.PointAnnotation>
    })

    const destinationPoint = () => {
        let destCoords = destinationCoordinates.split(',');
        let id = String(Math.random() * (Number(destCoords[0]) - Number(destCoords[1])));
        return <MapboxGL.PointAnnotation coordinate={[Number(destCoords[0]), Number(destCoords[1])]}
                                         key={id}
                                         id={id}
                                         title={'Destination'}>
            <MapboxGL.Callout title={'Destination'}/>
        </MapboxGL.PointAnnotation>
    }

    const originPoint = () => {
        let orCoords = originCoordinates.split(',');
        let id = String(Math.random() * (Number(orCoords[0]) - Number(orCoords[1])));
        return <MapboxGL.PointAnnotation coordinate={[Number(orCoords[0]), Number(orCoords[1])]}
                                         key={id}
                                         id={id}
                                         title={'Origin'}>
            <MapboxGL.Callout title={'Origin'}/>
        </MapboxGL.PointAnnotation>
    }
    return (
        <View style={styles.page}>
            <View style={styles.container}>
                <MapboxGL.MapView style={styles.map}>
                    <MapboxGL.Camera zoomLevel={15} centerCoordinate={coordinates}/>
                    {
                        !showRoute && <MapboxGL.PointAnnotation coordinate={coordinates} id="Test"/>
                    }

                    {
                        originCoordinates !== '' && originPoint()
                    }

                    {
                        destinationCoordinates !== '' && destinationPoint()
                    }

                    {VenuesPoints}

                    {(showRoute && geoDirection) &&
                    <MapboxGL.ShapeSource id='routeSource' shape={geoDirection}>
                        <MapboxGL.LineLayer id={'lines'}
                                            style={{
                                                lineJoin: "round",
                                                lineColor: 'green',
                                                lineWidth: 6,
                                                lineCap: "round",
                                            }}/>
                    </MapboxGL.ShapeSource>
                    }
                </MapboxGL.MapView>

            </View>
            <View style={styles.addressForm}>
                <AddressForm/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    page: {
        flex: 1,
    },
    container: {
        flex: 5,
        backgroundColor: '#FFCF73',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    addressForm: {
        width: '100%',
        height: 250,
    }
});
