import React, {useEffect, useState} from 'react';
import {Button, NativeSyntheticEvent, StyleSheet, Text, TextInputChangeEventData, View} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentAddress, selectDirectionDistance, selectDirectionDuration} from "../redux/mapSelectors";

import {getDirectionsThunkCreator,} from "../redux/mapReducer";
import Input from "@ant-design/react-native/es/input-item/Input";

export type AddressFormValues = {
    origin: string;
    destination: string;
}


export const AddressForm: React.FC = () => {
    const currentAddress = useSelector(selectCurrentAddress);
    const dispatch = useDispatch();
    const directionDistance = useSelector(selectDirectionDistance);
    const directionDuration = useSelector(selectDirectionDuration);

    useEffect(() => {
        setOrigin(currentAddress);
    }, [currentAddress]);

    const [origin, setOrigin] = useState(currentAddress);
    const [destination, setDestination] = useState('');

    const originChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setOrigin(e.nativeEvent.text);
    }

    const destinationChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setDestination(e.nativeEvent.text);
    }

    const onSubmit = () => {
        console.log('origin: ', origin);
        console.log('destination: ', destination);
        if (origin !== '' && destination !== '') {
            dispatch(getDirectionsThunkCreator({origin, destination}));
        }
    }

    const getTime = (seconds: number) => {
        if (seconds > 0) {
            const h = Math.floor(seconds / 60 / 60);
            const m = Math.floor(seconds / 60) - (h * 60);
            let time = {
                hours: h,
                minutes: m,
            }
            return time;
        }
        return {hours: 0, minutes: 0};
    }
    const time = getTime(directionDuration);

    return (
        <View style={styles.container}>
            {
                directionDuration > 0 && directionDistance > 0 &&
                <View>
                    <View style={styles.directionDuration}>
                        {
                            time.hours > 0 &&
                            <Text style={{color: 'white'}}>
                                Duration : {time.hours}h {time.minutes}m
                            </Text>
                        }
                        {
                            time.hours === 0 &&
                            <Text style={{color: 'white'}}>
                                Duration : {time.minutes}m
                            </Text>
                        }
                    </View>
                    <View style={styles.directionDistance}>
                        <Text style={{color: 'white'}}>
                            Distance : {Math.floor(directionDistance / 1000)}km
                        </Text>
                    </View>
                </View>
            }
            <Text style={{color: 'white'}}>Origin</Text>
            <Input style={styles.originInput} value={origin} onChange={originChange}/>
            <Text style={{color: 'white'}}>Destination</Text>
            <Input style={styles.destinationInput} selectionColor={'grey'}
                   value={destination} onChange={destinationChange}/>
            <View style={styles.button}>
                <Button  color={'#d09683'} onPress={onSubmit} title="Submit"/>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#363237',
        padding: 5,
    },
    originInput: {
        backgroundColor: 'white',
        color: 'black',
        borderRadius: 10,
        height: 50,
    },
    destinationInput: {
        backgroundColor: 'white',
        color: 'black',
        borderRadius: 10,
        height: 50,
        marginBottom: 5,
    },
    button: {
        width: 100,
    },
    directionDuration: {
        textAlign: 'center',
        paddingBottom: 5,
    },
    directionDistance: {
        paddingBottom: 5,
        borderBottomWidth: 2,
        borderBottomColor: '#d09683',
    }
});
